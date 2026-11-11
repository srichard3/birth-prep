# Birth Prep

A small week-by-week tracker for pregnancy training and birth prep. Three views:

- **This week** — only the habits that apply at the current gestational week, with tap-to-count targets
- **Plan** — the full reference, folded away until opened
- **Timeline** — what starts when, from now to birth

No build step, no dependencies, no backend. Plain HTML, CSS and JS.

## How it works

The due date drives everything. Gestational week is computed from it (40w0d at the due
date), and that week decides which habits show, which milestone is flagged as coming up,
and where the "now" line sits on the timeline.

Ticks are stored in `localStorage`, bucketed by ISO week, so they reset each Monday.
Nothing is sent anywhere — there is no server.

## Editing the plan

All content lives in `content.js`:

| | |
|---|---|
| `HABITS` | Trackable items. `from`/`to` are gestational weeks, so a habit appears and disappears on schedule |
| `MILESTONES` | One-off changes flagged on their week |
| `TRACKS` | The bars and markers on the timeline |
| `SECTIONS` | Reference panels. Body text takes a small markdown subset: `**bold**`, `*italic*`, `### heads`, `> quotes`, `-` bullets, `1.` lists, and `\| pipe \| tables \|` |

`app.js` holds the logic and never needs editing to change the plan.

## Running locally

```
python3 -m http.server 4178
```

Then open <http://localhost:4178>.

## Deploying

Pushed to GitHub Pages from the `main` branch. Any push updates the live site within a
minute or so.

## A note on the content

The guidance here is summarised from Cochrane reviews, ACOG Committee Opinion 804, and
the trials cited inline. It is consumer research, not medical advice, and the dosing
decisions belong to an OB or midwife.
