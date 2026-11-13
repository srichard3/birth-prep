/* Birth Prep — all content lives here, so the plan can be edited
   without touching app logic. Weeks are gestational weeks. */

const DEFAULT_DUE = '2027-04-01';

/* Trackable habits. `from`/`to` gate them by gestational week. */
const HABITS = [
  { id: 'aerobic',  icon: 'activity', name: 'Aerobic',          target: 5, from: 0,  to: 41,
    note: '30 min at talk-test pace' },
  { id: 'strength', icon: 'dumbbell', name: 'Strength',         target: 3, from: 0,  to: 41,
    note: '8–15 reps, 2–3 in reserve' },
  { id: 'mobility', icon: 'expand',   name: 'Mobility',         target: 5, from: 0,  to: 41,
    note: '10–15 min' },
  { id: 'pfBuild',  icon: 'shield',   name: 'Pelvic floor',     target: 4, from: 0,  to: 32,
    note: 'Strengthening sets' },
  { id: 'pfRelax',  icon: 'waves',    name: 'Pelvic floor',     target: 4, from: 32, to: 41,
    note: 'Release work — reverse Kegels, lengthening' },
  { id: 'breath',   icon: 'wind',     name: 'Breathing',        target: 5, from: 0,  to: 41,
    note: '5 min diaphragmatic' },
  { id: 'perineal', icon: 'droplet',  name: 'Perineal massage', target: 5, from: 34, to: 41,
    note: '3–5 min' }
];

/* Things that change on a date rather than being done repeatedly. */
const MILESTONES = [
  { week: 20, icon: 'dumbbell', text: 'No lying flat on her back for sets — switch those to an incline.' },
  { week: 32, icon: 'waves', text: 'Shift the pelvic floor work from building to releasing.' },
  { week: 34, icon: 'droplet', text: 'Start perineal massage, 3–7×/week.' },
  { week: 36, icon: 'person', text: 'If the baby is breech, ask about ECV. Time-sensitive.' },
  { week: 40, icon: 'heart', text: 'In labor: stay upright and keep moving. The strongest evidence of anything here.' }
];

/* Bars and markers for the timeline view. */
const TRACKS = [
  { label: 'Aerobic, 150 min/wk',   start: 20, end: 40, kind: 'span' },
  { label: 'Strength, 2–3×/wk',     start: 20, end: 40, kind: 'span' },
  { label: 'Mobility, 10–15 min',   start: 20, end: 40, kind: 'span' },
  { label: 'Pelvic floor, build',   start: 20, end: 32, kind: 'span' },
  { label: 'Pelvic floor, release', start: 32, end: 40, kind: 'span' },
  { label: 'Perineal massage',      start: 34, end: 40, kind: 'span' },
  { label: 'Breech check, ECV',     start: 36, end: 36, kind: 'mark' },
  { label: 'Birth',                 start: 40, end: 40, kind: 'mark', accent: true }
];

/* Reference material. Each section is one accordion panel.
   `body` is a small subset of markdown: **bold**, *italic*, > quote,
   - bullets, 1. numbers, | tables |, and ### subheads. */
const SECTIONS = [
  {
    id: 'overview',
    icon: 'star',
    title: 'Start here',
    teaser: 'The one thing that beats everything else',
    body: `
Above all else, **continuous labor support cut cesarean rates (RR 0.78)** across 27 trials and roughly 16,000 women, and the effect was largest when the support came from a **doula** rather than hospital staff or family. If a doula is an option, booking one does more than anything else on this list.

Nothing here needs to be perfect. The aerobic minutes and the perineal massage are the two with the best evidence behind them; everything else is worth doing but won't make or break anything.
`
  },
  {
    id: 'aerobic',
    icon: 'activity',
    title: 'Aerobic',
    teaser: '150 min per week',
    body: `
Shorter labor, lower risk of C-section, diabetes, preeclampsia.

**The talk test** — ACOG's own phrasing:

> "As long as a woman can carry on a conversation while exercising, she likely is not overexerting herself."

The practical version: **she can talk in full sentences, but couldn't comfortably sing.** If she can sing, go harder. If she can only manage a few words, ease off.

**Borg RPE scale** — ACOG specifies to aim for a **13–14 out of 20**, labeled "somewhat hard." On that scale 6 is sitting still, 11 is light, 13 is somewhat hard, 15 is hard, 20 is maximal.

Concretely: breathing noticeably heavier, maybe lightly sweating, but sustainable for 30 minutes and able to hold a conversation.

### How to split 150 minutes
- **30 min × 5 days** — the standard
- **~22 min daily**
`
  },
  {
    id: 'strength',
    icon: 'dumbbell',
    title: 'Strength training',
    teaser: 'Retaining physical ability, and recovery',
    body: `
For retaining physical ability and helping recovery. Always exhale on the effort, try to not lay down on back, and try to do supported/stable exercises.

### Programming
| Frequency | **2–3×/week**, separate from the 150 aerobic minutes |
| Reps | **8–15** — avoids maximal strain without going feather-light |
| Effort | Leave **2–3 reps in reserve**. Never grind to failure |
| Breathing | **Exhale on exertion.** No breath-holding |
| Stop a set if | Coning/doming along the midline, pelvic heaviness, or leaking |

**A sample session:** goblet squat · Romanian deadlift · row · glute bridge · farmer's carry · side plank. Six movements, 2–3 sets each, 40 minutes.

### What to actually train
Five priorities, chosen for her specific goals:

**1. Glutes and posterior chain — the top priority**
Her center of gravity is shifting forward all pregnancy. Strong glutes and hamstrings stabilize the pelvis against that, and this is the main defense against pelvic girdle pain.
→ Glute bridges, hip thrusts, Romanian deadlifts, step-ups

**2. Upper back and scapular work**
Counteracts the forward posture from breast growth — and more importantly, **postpartum is hours a day of feeding and carrying in forward flexion.** This is prehab for a problem that hasn't started yet.
→ Rows (seated, bent-over, band), face pulls, band pull-aparts

**3. Loaded carries — the most underrated**
Farmer's carries and suitcase carries train grip, trunk stability and posture under load. That is *literally* what parenthood is: car seat, baby, groceries, all one-sided.
→ Walk 20–40m holding weight, upright posture

**4. Squat pattern**
Functional for getting up off the floor with a baby in your arms, repeatedly, for years.
→ Goblet squats, box squats

**5. Deep core — not crunches**
Anti-movement rather than flexion, which avoids the coning problem.
→ Dead bugs, bird dogs, Pallof press, side planks
`,
    callout: {
      title: "Exercise doesn't cause miscarriage",
      body: `
The best evidence — a 2023 meta-analysis pooling the research — found no link between low-to-moderate exercise in pregnancy and miscarriage.

Most first-trimester losses are chromosomal. In a study of over 7,000 of them, **two-thirds had chromosomal abnormalities** — errors that happen at conception, aren't caused by anything the mother did, and aren't changed by anything she does afterward.

Skipping exercise isn't the cautious choice. It means giving up a lower risk of gestational diabetes and preeclampsia, a lower chance of cesarean, and a shorter first stage of labor.

The situations where exercise genuinely isn't advised are **specific diagnoses** — placenta previa, preeclampsia, a cerclage — that her doctor would have identified. For an uncomplicated pregnancy, moving is the recommended option, not the risky one.

**Danger in lifting >44lb ten times per day.** Occupational studies found increased risk above that threshold — repetitive heavy work over hours, with preterm birth as the outcome. It is a long way from a gym session at 8–15 reps.
`
    }
  },
  {
    id: 'mobility',
    icon: 'expand',
    title: 'Mobility',
    teaser: '10–15 min, most days',
    body: `
### What actually gets restricted, and why
| Hip flexors | Anterior pelvic tilt increases as the bump grows, plus sitting → Half-kneeling lunge stretch, couch stretch (modified) |
| Thoracic spine | Kyphosis from breast growth — and the postpartum carrying posture → Open-book rotations, foam roller extensions, cat-cow |
| Ankles / calves | Limits squat depth, which limits labor positioning → Wall ankle mobilizations, calf stretch |
| Pecs & lats | Forward shoulder posture → Doorway pec stretch, lat stretch on a bench |
| Adductors / inner thigh | Needed for wide-legged positions → Supported butterfly, side-lying |

### How to do it
- **10–15 minutes**, most days, or tacked onto the end of strength sessions
- **Hold 30–60 seconds**, breathe through it — pair it with the diaphragmatic breathing from the pelvic floor work
- **Prefer active over passive.** Controlled movement through range (cat-cow, open-books, 90/90 hip switches) beats hanging passively at end-range
- **Deep supported squat** is the highest-value single position — it builds the hip and ankle range for labor positioning, and most people need a support (wall, counter, blocks under heels) to hold it comfortably
`
  },
  {
    id: 'pf-build',
    icon: 'shield',
    title: 'Pelvic floor — strengthen',
    teaser: 'The trial protocol',
    body: `
Muscle training for incontinence and recovery. Kegels, but also train a slow relax.

Taken from the regimens used in the Cochrane trials:

| Long holds | **3 sets of 8–12** near-maximal contractions, **6–8 second holds**, equal rest |
| Quick flicks | **10 × 1-second** contractions — trains the fast fibers used for a cough or sneeze |
| Frequency | **3–4×/week** minimum; daily is fine |
| Duration | **12–16 weeks** before expecting effect |

**Progression:** if 6–8 seconds isn't achievable yet, start at 3-second holds with 3-second rests and build. Begin lying down, progress to sitting, then standing — standing is hardest because you're working against gravity.
`
  },
  {
    id: 'pf-relax',
    icon: 'waves',
    title: 'Pelvic floor — relax',
    teaser: 'The down-training half',
    body: `
**Diaphragmatic breathing is the foundation.** On the inhale the diaphragm descends and the pelvic floor lengthens with it; on the exhale it recoils. That's the mechanism the whole approach rests on.

- Breathe so the **ribs widen sideways and back**, not just the belly pushing forward
- **5–10 minutes daily**, and it doubles as the anxiety-management piece

**Reverse Kegels** — conscious lengthening rather than lifting. Think of the very beginning of a bowel movement, gently, without bearing down hard.

**Positions that lengthen the floor:** supported deep squat, child's pose, happy baby, side-lying with a pillow between the knees.
`
  },
  {
    id: 'perineal',
    icon: 'droplet',
    title: 'Perineal massage',
    teaser: 'From 34–35 weeks',
    body: `
**3–7 times per week, starting at 34–35 weeks.**

This is the one antenatal practice with real birth-outcome evidence behind it, and the benefit is specific to first-time mothers. Cochrane pooled four trials and 2,497 women: **episiotomy reduced by about 17% (RR 0.83), NNT 18**, plus less perineal trauma requiring stitches.

The trials used daily 5–10 minute sessions. Cochrane notes benefit from as little as once or twice a week. Anywhere in that range is supported, so pick what she'll actually keep doing.

### How to do it
Either she or her partner. Hands clean, nails short.

1. Comfortable and propped up — sitting with knees apart, one leg raised on the bath edge, or semi-reclined with pillows. A warm bath beforehand helps.
2. Plain lubricant — vitamin E oil, a neutral vegetable oil, or water-based. Not a numbing gel; she wants to feel the stretch.
3. Thumbs about 3–5 cm inside, pressing downward toward the rectum and out toward each side.
4. Hold until she feels a mild burning or tingling, then hold steady for about a minute.
5. Sweep slowly in a U-shape side to side, keeping that gentle downward pressure, for three to five minutes.

If her partner does it, index fingers work better than thumbs for the angle. It should feel like stretching, not pain.
`
  },
  {
    id: 'breathwork',
    icon: 'wind',
    title: 'Breathwork',
    teaser: "Don't hold your breath when you push",
    body: `
When it's time to push, keep making sound. Don't hold your breath. The sound itself isn't doing anything — it's a signal that your throat is open rather than clamped shut while you bear down.

### The plan

**Now → 32 weeks — diaphragmatic breathing, most days**

Slow in through the nose, longer out. Ribs widening sideways rather than the belly pushing forward. Five minutes is enough.

*Why:* this isn't training your lungs. It's making the pattern familiar now so you can use it for the pelvic floor work that starts at 32 weeks.

**From 32 weeks — long exhale paired with pelvic floor release**

On the out-breath, let the pelvic floor soften and widen. This is the opposite of a Kegel.

*Why:* most people can't relax the pelvic floor by deciding to. The diaphragm and pelvic floor move together, so a long exhale lowers resting tension there indirectly.

**From 34 weeks — same breath during perineal massage**

*Why:* both are working on the same tissue tension.

**Any lifting — breathe out as you lift**

*Why:* holding your breath against a closed throat raises pressure downward onto the pelvic floor, which is already under more load than usual.

### During labor

**First stage (contractions)**

Breathe slowly, with the out-breath longer than the in-breath. No specific pattern has outperformed another in trials, so pick what feels manageable. Women consistently report that screaming makes things worse — they describe it as coming from fear, or increasing it.

**Second stage (pushing)**

Keep making sound and follow the urge to push. Low sounds are fine if they come, but don't try to control the pitch — it rises as contractions intensify, which is normal. Staff may coach you to hold your breath and push; this is standard practice because it creates pressure and can speed up labor. However, it is much better to breathe out during pushing unless there are reasons to hurry.

### Why the pushing advice is the part with evidence behind it

The rest of the plan rests on anatomy and reasoning. This part has trials.

In 166 first-time mothers without an epidural, controlled open-mouth exhaling was compared with breath-holding: **41% had an intact perineum versus 19%.** That's about one additional intact perineum for every five women using it. The trial was single-center and unblinded, so the true effect is probably smaller.

In the largest trial (250 women, nearly all with epidurals), there was no difference — consistent with a technique that depends on feeling the contractions.

### Safety

Tingling in your hands or lips, or feeling light-headed, means you're breathing too fast. Slow down and lengthen the out-breath.

This is the reason to avoid the rapid "hee-hee-hoo" patterns from older Lamaze material.

### Not worth your time

- Claims that breathing shortens labor. This traces to one meta-analysis that averaged together trials of breath-*holding* and trials of slow breathing, which are opposite techniques.
- "Relaxed jaw, relaxed cervix." Useful as a reminder to check for clenching. It has never been tested, and the cervix is not a sphincter.
- Any method that assigns specific tones to specific anatomy.
`
  },
  {
    id: 'labor',
    icon: 'heart',
    title: 'In labor',
    teaser: 'Where the evidence actually is',
    body: `
### First stage of labor
| 🟢🟢 Stay upright and keep moving | 1h22m shorter, **cesarean RR 0.71**, epidural RR 0.81 |
| 🟢 Water immersion | Epidural/spinal RR 0.90; shortens first stage; no adverse effect on operative delivery or neonatal wellbeing |
| 🟡 Hands and knees | **Significantly reduces back pain** (147 women). This is its real job |
| 🟡 Counter-pressure / hip squeeze | Standard doula technique for back labor. Comfort |
| ○ Birth ball, walking, stairs, swaying | Simply the *vehicles* for staying upright and mobile — which is the thing that's evidenced |

That last row matters: don't get precious about *which* movement. The trials measured **upright and mobile versus lying down**, not specific maneuvers. Walking, rocking, swaying, stairs — they all count. The variable is vertical and moving.
`
  },
  {
    id: 'positioning',
    icon: 'person',
    title: 'Antenatal positioning',
    teaser: 'Breech vs posterior — they get confused',
    body: `
**Breech** (bottom or feet down, ~3–4% at term) and **occiput posterior** (head down but facing her front — "sunny side up," "back to back") are entirely different issues. Almost all the positioning content out there is aimed at posterior. But the thing with real evidence is for breech.

**For breech: this is the one to actually act on.** If the baby is breech at the 36-week check, **ask about ECV.** That's the intervention with real numbers behind it, it's time-sensitive, and it's an actual conversation to have — not something to substitute inversions for.

### Practitioner-delivered
- **Moxibustion** — the one alternative approach with real evidence, and it's for breech
- **ECV** — actual obstetrics, strong evidence, breech only

**For posterior: do it for comfort, not for positioning.** Hands-and-knees genuinely relieves back pain. Forward-leaning sitting is comfortable. The birth ball is pleasant. None of it will turn a baby, and the 15-RCT analysis is fairly decisive on that.

### Daily posture habits
- Sitting upright and leaning forward; **birth ball instead of the sofa**
- Avoiding reclining — couches, recliners, car seats
- Kneeling over a ball while watching TV

### Repeated positions
- **Hands and knees / all fours**, often with pelvic rocking or cat-cow
- Deep squats

### The Spinning Babies "Three Balances"
- **Forward-Leaning Inversion** — hips above head, ~30 seconds
- **Side-Lying Release** — static stretch with the top leg hanging
- **The Jiggle / rebozo sifting** — a woven shawl used to rock the hips and belly

### Labor-specific
- **Abdominal lift and tuck** — during contractions, for a baby not engaging
- **Miles Circuit** — three positions, 30 minutes each: open knee-chest, exaggerated side-lying, then upright/walking
- **Curb walking** — never studied, and the only one here with a real fall risk
`
  }
];
