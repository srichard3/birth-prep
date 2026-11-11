/* Birth Prep — state, week maths, rendering. No build step, no deps. */

(function () {
  'use strict';

  /* ---------- storage (never let a blocked localStorage break the page) ---------- */
  const store = {
    get(k, fallback) {
      try {
        const v = localStorage.getItem('bp.' + k);
        return v === null ? fallback : JSON.parse(v);
      } catch (e) { return fallback; }
    },
    set(k, v) {
      try { localStorage.setItem('bp.' + k, JSON.stringify(v)); } catch (e) { /* ignore */ }
    }
  };

  /* ---------- week maths ---------- */
  const DAY = 86400000;

  function parseISO(s) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
    if (!m) return null;
    return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  }

  function todayUTC() {
    const n = new Date();
    return new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()));
  }

  /* 40w0d at the due date. Returns {weeks, days, total} in gestational terms. */
  function gestational(due) {
    const d = parseISO(due);
    if (!d) return null;
    const daysLeft = Math.round((d - todayUTC()) / DAY);
    const totalDays = 280 - daysLeft;
    return {
      weeks: Math.floor(totalDays / 7),
      days: ((totalDays % 7) + 7) % 7,
      daysLeft: daysLeft,
      exact: totalDays / 7
    };
  }

  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  /* The calendar day a gestational week starts on. The due date is 40w0d,
     so week w begins (280 - w*7) days before it. */
  function weekDate(week) {
    const d = parseISO(due);
    return d ? new Date(d.getTime() - (280 - week * 7) * DAY) : null;
  }

  function fmtDate(d) {
    return d ? MONTHS[d.getUTCMonth()] + ' ' + d.getUTCDate() : '';
  }

  function fmtDateYear(d) {
    return d ? fmtDate(d) + ', ' + d.getUTCFullYear() : '';
  }

  /* Monday-based ISO week key, used to bucket the tick counts. */
  function weekKey(date) {
    const t = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const day = t.getUTCDay() || 7;
    t.setUTCDate(t.getUTCDate() + 4 - day);
    const y0 = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
    const wk = Math.ceil(((t - y0) / DAY + 1) / 7);
    return t.getUTCFullYear() + '-W' + String(wk).padStart(2, '0');
  }

  /* ---------- tiny markdown ---------- */
  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function inline(s) {
    return esc(s)
      .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
      .replace(/\*([^*]+)\*/g, '<i>$1</i>');
  }

  function md(src) {
    const lines = String(src).trim().split('\n');
    const out = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      if (!line.trim()) { i++; continue; }

      if (line.startsWith('### ')) {
        out.push('<h4>' + inline(line.slice(4)) + '</h4>');
        i++;
        continue;
      }

      if (line.startsWith('> ')) {
        const buf = [];
        while (i < lines.length && lines[i].startsWith('> ')) { buf.push(lines[i].slice(2)); i++; }
        out.push('<blockquote>' + inline(buf.join(' ')) + '</blockquote>');
        continue;
      }

      if (line.startsWith('|')) {
        const rows = [];
        while (i < lines.length && lines[i].startsWith('|')) {
          const cells = lines[i].split('|').slice(1, -1).map(c => c.trim());
          if (!/^-+$/.test(cells[0] || '')) rows.push(cells);
          i++;
        }
        out.push('<table>' + rows.map(r =>
          '<tr>' + r.map((c, n) =>
            '<td class="' + (n === 0 ? 'k' : 'v') + '">' + inline(c) + '</td>').join('') + '</tr>'
        ).join('') + '</table>');
        continue;
      }

      if (/^[-*] /.test(line)) {
        const buf = [];
        while (i < lines.length && /^[-*] /.test(lines[i])) { buf.push(lines[i].slice(2)); i++; }
        out.push('<ul>' + buf.map(b => '<li>' + inline(b) + '</li>').join('') + '</ul>');
        continue;
      }

      if (/^\d+\. /.test(line)) {
        const buf = [];
        while (i < lines.length && /^\d+\. /.test(lines[i])) {
          buf.push(lines[i].replace(/^\d+\. /, ''));
          i++;
        }
        out.push('<ol>' + buf.map(b => '<li>' + inline(b) + '</li>').join('') + '</ol>');
        continue;
      }

      const para = [];
      while (i < lines.length && lines[i].trim() &&
             !/^(#|>|\||[-*] |\d+\. )/.test(lines[i])) { para.push(lines[i]); i++; }
      out.push('<p>' + inline(para.join('\n')).replace(/\n/g, '<br>') + '</p>');
    }
    return out.join('');
  }

  /* ---------- state ---------- */
  let due = store.get('due', DEFAULT_DUE);
  let log = store.get('log', {});
  const wk = weekKey(new Date());
  if (!log[wk]) log[wk] = {};

  function count(id) { return log[wk][id] || 0; }

  function bump(id, target) {
    const next = count(id) >= target ? 0 : count(id) + 1;
    log[wk][id] = next;
    store.set('log', log);
  }

  function activeHabits(gw) {
    return HABITS.filter(h => gw >= h.from && gw < h.to);
  }

  /* ---------- render: this week ---------- */
  function renderWeek() {
    const g = gestational(due);
    const chip = document.getElementById('weekChip');
    const lede = document.getElementById('weekLede');

    if (!g) {
      chip.textContent = 'set a due date';
      lede.textContent = 'Add a due date in settings and this fills in.';
      document.getElementById('habits').innerHTML = '';
      return;
    }

    const gw = g.weeks;
    chip.textContent = gw + 'w' + g.days + 'd';
    const dueTxt = ' <span class="muted">Due ' + fmtDate(parseISO(due)) + '.</span>';
    lede.innerHTML = (gw >= 40
      ? '<b>Week ' + gw + '.</b> Any day now.'
      : '<b>Week ' + gw + '.</b> ' + g.daysLeft + ' days to go.') + dueTxt;

    /* next milestone */
    const next = MILESTONES.find(m => m.week > gw);
    const card = document.getElementById('focusCard');
    if (next) {
      card.hidden = false;
      const away = next.week - gw;
      document.getElementById('focusText').innerHTML =
        '<b>' + fmtDate(weekDate(next.week)) + '</b> <span class="muted">(week ' + next.week + ')</span> — ' +
        inline(next.text) +
        ' <span class="muted">' + away + ' week' + (away === 1 ? '' : 's') + ' away.</span>';
    } else {
      card.hidden = true;
    }

    const list = document.getElementById('habits');
    const items = activeHabits(gw);
    list.innerHTML = items.map(h => {
      const c = count(h.id);
      const pct = Math.min(100, Math.round((c / h.target) * 100));
      const done = c >= h.target;
      return '' +
        '<li>' +
          '<button class="habit' + (done ? ' is-done' : '') + '" data-id="' + h.id + '" data-target="' + h.target + '" type="button">' +
            '<span class="ring" style="--pct:' + pct + '">' +
              '<span class="ring-n">' + c + '<span class="ring-t">/' + h.target + '</span></span>' +
            '</span>' +
            '<span class="habit-txt">' +
              '<span class="habit-name">' + icon(h.icon) + esc(h.name) + '</span>' +
              '<span class="habit-note">' + esc(h.note) + '</span>' +
            '</span>' +
            '<span class="habit-tick">' + icon(done ? 'check' : 'plus') + '</span>' +
          '</button>' +
        '</li>';
    }).join('');

    const all = items.length > 0 && items.every(h => count(h.id) >= h.target);
    document.getElementById('doneNote').hidden = !all;
  }

  /* ---------- render: plan ---------- */
  function renderPlan() {
    const host = document.getElementById('plan');
    host.innerHTML = SECTIONS.map(s => {
      const callout = s.callout
        ? '<div class="callout"><h4>' + esc(s.callout.title) + '</h4>' + md(s.callout.body) + '</div>'
        : '';
      return '' +
        '<details class="panel" id="p-' + s.id + '">' +
          '<summary>' +
            '<span class="panel-i">' + icon(s.icon) + '</span>' +
            '<span class="panel-t">' + esc(s.title) + '</span>' +
            '<span class="panel-s">' + esc(s.teaser) + '</span>' +
            '<span class="chev" aria-hidden="true"></span>' +
          '</summary>' +
          '<div class="panel-b">' + md(s.body) + callout + '</div>' +
        '</details>';
    }).join('');
  }

  /* ---------- render: timeline ---------- */
  function renderTimeline(step) {
    step = typeof step === 'number' ? step : 4;
    const g = gestational(due);
    const gw = g ? g.weeks : 20;
    const lo = Math.min(20, gw);
    const hi = 40;
    const span = hi - lo;
    /* stop at 96% so the week-40 tick and the birth marker aren't clipped */
    const pos = w => ((w - lo) / span) * 96;

    const ticks = [];
    for (let w = hi; w >= lo; w -= step) ticks.unshift(w);

    const nowPct = Math.max(0, Math.min(100, pos(g ? g.exact : lo)));

    const rows = TRACKS.map(t => {
      const left = pos(t.start);
      const width = t.kind === 'span' ? pos(t.end) - left : 0;
      const bar = t.kind === 'span'
        ? '<span class="bar" style="left:' + left + '%;width:' + width + '%"></span>'
        : '<span class="dot' + (t.accent ? ' is-accent' : '') + '" style="left:' + left + '%"></span>';
      const past = g && t.end < gw;
      const when = t.kind === 'span'
        ? fmtDate(weekDate(t.start)) + ' – ' + fmtDate(weekDate(t.end))
        : fmtDate(weekDate(t.start));
      return '' +
        '<div class="trow' + (past ? ' is-past' : '') + '">' +
          '<span class="tlabel">' +
            '<span class="tname">' + esc(t.label) + '</span>' +
            '<span class="tdate">' + when + '</span>' +
          '</span>' +
          '<span class="ttrack">' + bar + '</span>' +
        '</div>';
    }).join('');

    document.getElementById('chart').innerHTML = '' +
      '<div class="chart">' +
        '<div class="taxis">' +
          '<span class="tlabel"><span class="tdate">week / date</span></span>' +
          '<span class="ttrack">' +
            ticks.map(w => {
              const at = pos(w);
              const edge = at < 6 ? ' is-first' : (at > 90 ? ' is-last' : '');
              return '<span class="tick' + edge + '" style="left:' + at + '%">' +
                '<b>' + w + '</b><i>' + fmtDate(weekDate(w)) + '</i></span>';
            }).join('') +
          '</span>' +
        '</div>' +
        '<div class="tbody">' + rows + '</div>' +
      '</div>';

    /* the "now" line sits inside each track, so it lines up with the bars */
    document.querySelectorAll('#chart .tbody .ttrack').forEach(el => {
      const m = document.createElement('span');
      m.className = 'nowline';
      m.style.left = nowPct + '%';
      el.appendChild(m);
    });

    /* The ticks carry dates now, so they need real room. Draw, measure, and
       if any two touch, space them further apart and draw again. Rects are
       all zero while the view is hidden, so skip the check then. */
    if (step < 8) {
      const r = Array.prototype.map.call(
        document.querySelectorAll('#chart .tick'), e => e.getBoundingClientRect());
      if (r.length > 1 && r[0].width > 0) {
        for (let i = 1; i < r.length; i++) {
          if (r[i].left - r[i - 1].right < 8) { renderTimeline(step + 2); return; }
        }
      }
    }

    document.getElementById('miles').innerHTML = MILESTONES.map(m => {
      const state = !g ? '' : (m.week < gw ? ' is-past' : (m.week === gw ? ' is-now' : ''));
      return '<li class="mile' + state + '">' +
        '<b><span class="mile-d">' + fmtDate(weekDate(m.week)) + '</span>' +
        '<span class="mile-w">Week ' + m.week + '</span></b>' +
        '<span class="mile-t">' + icon(m.icon) + '<span>' + inline(m.text) + '</span></span></li>';
    }).join('');
  }

  function renderAll() {
    renderWeek();
    renderTimeline();
  }

  /* ---------- wiring ---------- */
  document.getElementById('habits').addEventListener('click', function (e) {
    const btn = e.target.closest('.habit');
    if (!btn) return;
    bump(btn.dataset.id, +btn.dataset.target);
    renderWeek();
  });

  document.getElementById('tabs').addEventListener('click', function (e) {
    const btn = e.target.closest('.tab');
    if (!btn) return;
    const view = btn.dataset.view;
    document.querySelectorAll('.tab').forEach(t => t.classList.toggle('is-on', t === btn));
    document.querySelectorAll('.view').forEach(v => { v.hidden = v.id !== 'view-' + view; });
    if (view === 'timeline') renderTimeline();
    document.getElementById('main').scrollTo?.(0, 0);
    window.scrollTo(0, 0);
    try { location.hash = view; } catch (err) { /* ignore */ }
  });

  const settingsBtn = document.getElementById('settingsBtn');
  const settings = document.getElementById('settings');
  settingsBtn.addEventListener('click', function () {
    const open = settings.hidden;
    settings.hidden = !open;
    settingsBtn.setAttribute('aria-expanded', String(open));
  });

  const dueInput = document.getElementById('dueDate');
  dueInput.value = due;
  dueInput.addEventListener('change', function () {
    due = dueInput.value || DEFAULT_DUE;
    store.set('due', due);
    echoDue();
    renderAll();
  });

  function echoDue() {
    const g = gestational(due);
    document.getElementById('dueEcho').textContent = g
      ? 'That puts her at ' + g.weeks + ' weeks ' + g.days + ' days today — due ' +
        fmtDateYear(parseISO(due)) + '.'
      : 'Pick a date.';
  }

  document.getElementById('resetWeek').addEventListener('click', function () {
    log[wk] = {};
    store.set('log', log);
    renderWeek();
  });

  /* open the view named in the hash, on load and on back/forward */
  function routeFromHash() {
    const name = (location.hash || '').replace('#', '');
    if (['week', 'plan', 'timeline'].indexOf(name) === -1) return;
    if (document.querySelector('.tab.is-on')?.dataset.view === name) return;
    const btn = document.querySelector('.tab[data-view="' + name + '"]');
    if (btn) btn.click();
  }
  /* tick spacing is measured, so redraw the chart after a resize */
  let resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { renderTimeline(); }, 150);
  });

  window.addEventListener('hashchange', routeFromHash);
  routeFromHash();

  echoDue();
  renderPlan();
  renderAll();
})();
