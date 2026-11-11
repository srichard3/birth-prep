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

Every gestational week in `content.js` is also shown as a calendar date, worked back from
the due date, so nothing has to be stored twice. The timeline axis draws its ticks, then
measures them and widens the spacing if the dates would collide — which is how it stays
readable on a phone without scrolling sideways.

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

`app.js` holds the logic and never needs editing to change the plan. `icons.js` holds the
stroke-icon set; `HABITS`, `MILESTONES` and `SECTIONS` each name one by key.

## On a phone

It installs to the home screen — `manifest.webmanifest` plus an apple-touch-icon — and runs
standalone with safe-area padding top and bottom. Tap targets are 42px or larger, hover
styles are behind `@media (hover: hover)` so they don't stick after a tap, and
`touch-action: manipulation` drops the double-tap zoom delay.

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
