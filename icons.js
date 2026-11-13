/* Birth Prep — one stroke-icon set, drawn inline so there is no icon font,
   no extra request, and no flash of missing glyphs. 24×24, currentColor. */

const ICONS = {
  /* aerobic — a heart-rate trace */
  activity: '<path d="M3 12h3.5l2.2-6.5L13 18.5l2.2-6.5H21"/>',

  /* strength — a dumbbell */
  dumbbell: '<path d="M5.5 9v6M8.5 7v10M15.5 7v10M18.5 9v6M8.5 12h7"/>',

  /* mobility — range of motion, opening outwards */
  expand: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',

  /* pelvic floor, building — a shield lifting */
  shield: '<path d="M12 3.2 5 6v5.8c0 4.4 3 7.4 7 9 4-1.6 7-4.6 7-9V6Z"/>' +
          '<path d="M12 15.5V9.8M9.6 12.2 12 9.8l2.4 2.4"/>',

  /* pelvic floor, releasing — letting go */
  waves: '<path d="M3 9.5c2-2.2 4-2.2 6 0s4 2.2 6 0 4-2.2 6 0"/>' +
         '<path d="M3 15.5c2-2.2 4-2.2 6 0s4 2.2 6 0 4-2.2 6 0"/>',

  /* breathing */
  wind: '<path d="M3 8h9.5a3 3 0 1 0-3-3"/><path d="M3 12h12.5a3 3 0 1 1-3 3"/><path d="M3 16h7"/>',

  /* perineal massage — oil */
  droplet: '<path d="M12 3.5c0 0 6 6.1 6 10a6 6 0 0 1-12 0c0-3.9 6-10 6-10Z"/>',

  /* start here */
  star: '<path d="m12 3.8 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.6 9.9l5.8-.8Z"/>',

  /* in labor */
  heart: '<path d="M12 20.3s-7.2-4.5-7.2-9.5A4.3 4.3 0 0 1 12 8a4.3 4.3 0 0 1 7.2 2.8c0 5-7.2 9.5-7.2 9.5Z"/>',

  /* antenatal positioning */
  person: '<circle cx="12" cy="5.8" r="2.6"/><path d="M12 8.4v6.2M8.4 11.4h7.2M12 14.6 9.2 20M12 14.6 14.8 20"/>',

  /* milestones */
  flag: '<path d="M5.5 21V3.8"/><path d="M5.5 4.2h11L14.3 8l2.2 3.8h-11Z"/>',

  /* coming up */
  bell: '<path d="M18 8.5a6 6 0 0 0-12 0c0 6.5-2 7.5-2 7.5h16s-2-1-2-7.5"/>' +
        '<path d="M10.3 19.5a2.2 2.2 0 0 0 3.4 0"/>',

  /* everything done */
  checkCircle: '<path d="M21 11.2V12a9 9 0 1 1-5.4-8.2"/><path d="m8.6 11.6 3 3 9-9"/>',

  /* tab: this week */
  calendarCheck: '<path d="M4.5 6.5h15v14h-15Z"/><path d="M4.5 10.5h15M8.5 3.8v4M15.5 3.8v4"/>' +
                 '<path d="m9.2 15.3 2 2 3.6-3.6"/>',

  /* tab: plan */
  list: '<path d="M9 6.5h11M9 12h11M9 17.5h7"/><path d="M4.6 6.5h.01M4.6 12h.01M4.6 17.5h.01"/>',

  /* tab: timeline */
  timeline: '<path d="M4 6.5h10M8.5 12h11M4 17.5h6.5"/>',

  /* settings */
  sliders: '<path d="M4 7.5h8.5M18.5 7.5H20M4 16.5h3.5M13.5 16.5H20"/>' +
           '<circle cx="15.5" cy="7.5" r="2.6"/><circle cx="10.5" cy="16.5" r="2.6"/>',

  /* a plus, for the tap target */
  plus: '<path d="M12 6.5v11M6.5 12h11"/>',

  /* a tick, for a target already hit */
  check: '<path d="m5.5 12.5 4.3 4.3L18.8 7.8"/>'
};

function icon(name, cls) {
  const body = ICONS[name];
  if (!body) return '';
  return '<svg class="ic' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" fill="none" ' +
    'stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" ' +
    'aria-hidden="true" focusable="false">' + body + '</svg>';
}
