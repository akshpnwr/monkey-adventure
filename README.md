# Handoff: Monkey Adventure — Landing Page

## Overview
Single-page marketing site for **Monkey Adventure**, a tour & adventure travel company in Rishikesh, Uttarakhand. Sells rafting, bungee, camping, treks and spiritual tours, and captures enquiries through a booking form. Signature feature: a decorative **rope + climber** that winds down the page and acts as a scroll-progress indicator.

**Target:** a vanilla JS project (plain HTML + CSS + JS, no framework, no build step required).

## About the Design Files
`Monkey Adventure.dc.html` is a **design reference built in HTML** — a prototype showing intended look and behaviour, not production code. It runs on a custom template runtime (`support.js`, `{{ }}` holes, `<sc-for>`, `<sc-if>`, a `DCLogic` class), which should **not** be ported. Recreate it as:
- `index.html` — semantic markup
- `styles.css` — the inline styles converted to classes / CSS custom properties
- `main.js` — data arrays, rendering of repeated cards, tabs, form, rope/climber
- `<image-slot>` (`image-slot.js`) is a design-tool placeholder → replace with real `<img>` (or `<picture>`) elements.

Open the `.dc.html` file in a browser to see the live reference (keep `support.js` and `image-slot.js` beside it).

## Fidelity
**High-fidelity.** Final colours, type, spacing, copy and interactions. Recreate pixel-accurately. Copy marked *placeholder* below must be replaced with real business data.

---

## Design Tokens

### Colours
| Token | Hex | Use |
|---|---|---|
| `--ink` | `#12261E` | Primary text, dark sections, buttons |
| `--paper` | `#F3EDE1` | Page background, light text on dark |
| `--teal` | `#1F5C55` | Packages section bg, accents, italic highlights |
| `--marigold` | `#F2A120` | Primary CTA, highlights on dark, rope |
| `--rust` | `#C2461A` | Hover state, numerals, eyebrow rule |
| `--body` | `#2C4038` | Secondary body text on paper |
| `--muted-on-dark` | `#D8D2C4` | Body text on ink |
| Hairline | `rgba(18,38,30,0.12–0.25)` | Borders/dividers |
| Header bg | `rgba(243,237,225,0.92)` + `backdrop-filter: blur(10px)` | Sticky nav |

Rope/climber-only colours: `#7A4A10`, `#D88E1C`, `#FFE3A3`, `#0A1712`, `#3A5A4E`, `#9E6B3E`, `#2E8579`, `#103631`, `#E0643A`, `#8E3210`, `#F0C49A`, `#B9814F`, `#A8650F`, `#FFF6DD`.

### Typography
Google Fonts: `Bricolage Grotesque` (opsz 12–96; weights 400/600/800) and `Instrument Serif` (regular + italic).
```html
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
```
- Body: Bricolage Grotesque, `-webkit-font-smoothing: antialiased`.
- **Accent words** in every headline: Instrument Serif *italic*, weight 400, letter-spacing −0.02em (e.g. "Ganga.", "adrenaline.", "packages", "tourists never.", "trip.").

| Role | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| H1 hero | `clamp(56px, 9vw, 132px)` | 800 | 0.88 | −0.05em |
| H2 section | `clamp(40px, 5.5vw, 76px)` (Why us: `clamp(40px,5vw,68px)`) | 800 | 0.95 | −0.045em |
| H3 card | 26px | 800 | 1.05 | −0.03em |
| Lead | `clamp(18px,1.6vw,21px)` / 18px | 400 | 1.5–1.55 | — |
| Body | 15–16px | 400 | 1.5 | — |
| Eyebrow / labels | 13–14px uppercase | 600 | — | 0.06–0.08em |
| Nav / buttons | 15–17px | 600 / 800 | — | — |
| Testimonial | Instrument Serif `clamp(30px,3.8vw,52px)` | 400 | 1.15 | −0.01em |

Use `text-wrap: pretty` on paragraphs, `balance` on testimonial.

### Spacing / layout
- Content container: `max-width: 1320px; margin: 0 auto; padding-inline: clamp(16px, 4vw, 40px)`.
- Section top padding: `clamp(72px, 9vw, 128px)`.
- Card grid gaps: 20px. Large panel padding: `clamp(28px, 5vw, 64px)`.

### Radii
999px (pills/buttons), 32px (big panels), 22px (package card), 20px (images/activity cards/success box), 18px (hero badge), 14px (package image), 12px (inputs). Hero image: `240px 240px 24px 24px` (arch).

### Shadows
Only on the rope/climber (SVG filters, see below). UI is flat.

---

## Screens / Sections (top → bottom)

### 1. Sticky header
- `position: sticky; top: 0; z-index: 20`; bottom border 1px hairline 0.12.
- Row: flex, space-between, wrap, gap 20px, padding 14px.
- **Logo**: 38px ink circle with "MA" (marigold, 800, 15px) + wordmark "Monkey" (800, 19px, −0.03em) over "Adventure" (Instrument Serif italic 18px).
- **Links**: Activities · Packages · Why us · Contact → `#activities`, `#packages`, `#about`, `#book`. 15px/600, gap `clamp(14px,2.4vw,30px)`. Hover colour `--rust`.
- **CTA** "Book a trip →": ink pill, paper text, padding 11×20; hover bg rust.
- `html { scroll-behavior: smooth }`.

### 2. Hero (`#top`)
- Grid `repeat(auto-fit, minmax(min(100%,460px),1fr))`, gap `clamp(24px,4vw,56px)`, `align-items: end`. Top padding `clamp(32px,5vw,64px)`.
- Left column (animates `rise` 0.8s):
  - Eyebrow: 28×2px rust line + "Rishikesh · Uttarakhand" (14px/600 uppercase 0.08em, teal).
  - H1: "Go wild / by the *Ganga.*" (accent word teal), margin-top 20px.
  - Lead (max 30ch, `--body`): "Whitewater rafting, Himalayan treks and riverside camps — planned by locals who grew up on these rapids."
  - Buttons (gap 12, wrap, mt 32): **Explore packages** (marigold bg, ink text, 800, 16px, padding 16×26; hover: ink bg/marigold text) → `#packages`. **WhatsApp us** (1.5px ink border, padding 15×26, `white-space: nowrap`; hover ink bg/paper text) → `#book` (should become a `https://wa.me/<number>` link in production).
- Right column (rise, 0.15s delay): image, height `clamp(360px,48vw,600px)`, arch radius. Image: raft hitting a rapid on the Ganga.
  - Overlay badge bottom-left (`left:-14px; bottom:28px`): ink, radius 18, padding 16×20, max-w 230. "Season open" (Instrument Serif italic 15px marigold) / "Rafting runs Sept → June" (600, 17px).

### 3. Marquee strip
- Full-bleed ink band, `transform: rotate(-1.2deg)`, `width:104%; margin-left:-2%`, padding 18px 0, margin-top `clamp(48px,6vw,80px)`.
- Items (800, `clamp(22px,2.6vw,34px)`, nowrap, gap 40): River Rafting ✦ Bungee Jumping ✦ Camping ✦ Himalayan Treks ✦ Ganga Aarti ✦ Char Dham Yatra ✦ — sequence duplicated; ✦ in marigold.
- `@keyframes marquee { from {transform:translateX(0)} to {transform:translateX(-50%)} }` — 32s linear infinite.

### 4. Activities (`#activities`)
- Header row: H2 "Pick your *adrenaline.*" (max 14ch) + paragraph (max 36ch) "Every activity runs with certified guides, safety kit and pickup from your hotel in Rishikesh." Flex space-between, align end, wrap.
- Grid `repeat(auto-fit, minmax(min(100%,270px),1fr))`, gap 20, mt 48.
- Card: column, gap 16. Image 340px tall, radius 20, with tag pill top-right (paper bg, 13px/600, padding 6×12). Title row: H3 + "from ₹…" (Instrument Serif italic 20px teal, nowrap). Description 16px, `--body`.
- Data (*placeholder prices*):
  - River Rafting · "Grade III–IV" · from ₹600 · "16 km, 26 km or 36 km runs from Shivpuri and Marine Drive."
  - Bungee & Swing · "83 m drop" · from ₹3,700 · "India's highest fixed-platform jump at Mohan Chatti, plus giant swing."
  - Riverside Camping · "Overnight" · from ₹1,500 · "Beach tents, bonfire, meals and volleyball on the sand."
  - Treks & Hikes · "Easy–Moderate" · from ₹900 · "Kunjapuri sunrise, Neer Garh waterfall and multi-day Himalayan trails."

### 5. Packages (`#packages`)
- Teal panel, radius 32, paper text.
- Header: H2 "Tour *packages*" (accent marigold) + **filter tabs**: pill group on `rgba(0,0,0,0.2)`, padding 5, gap 6. Tabs: All / Adventure / Trek / Spiritual. Tab: padding 10×18, 15px/600, radius 999. Active: marigold bg + ink text; inactive: transparent + paper text.
- Grid `repeat(auto-fill, minmax(min(100%,340px),1fr))`, gap 20, mt 40.
- Card: paper bg, ink text, radius 22, padding 12. Image 210px, radius 14. Body padding 18/10/10, gap 12:
  - Meta: "{days} · {category}" 13px/600 uppercase teal.
  - H3 name; inclusions 15px `--body`.
  - Footer (mt auto, pt 14, 1px **dashed** top border rgba(18,38,30,0.25)): price "₹X,XXX" (24px/800) + " / person" (14px/400) and **Enquire** button (ink pill, padding 12×18, hover rust).
- Data (*placeholder prices*):
  | Name | Cat | Duration | Inclusions | Price |
  |---|---|---|---|---|
  | Rafting + Riverside Camp | Adventure | 2D / 1N | 16 km rafting, beach camp stay, bonfire, all meals, cliff jumping. | ₹2,499 |
  | Adrenaline Weekend | Adventure | 3D / 2N | 26 km rafting, bungee jump, flying fox, camp stay and transfers. | ₹7,999 |
  | Rishikesh Soul Tour | Spiritual | 2D / 1N | Ganga Aarti, Laxman & Ram Jhula, Beatles Ashram, sunrise yoga session. | ₹3,299 |
  | Kunjapuri Sunrise Trek | Trek | 1 Day | Pre-dawn pickup, guided hike, Himalayan sunrise view, breakfast. | ₹1,199 |
  | Char Dham Yatra | Spiritual | 10D / 9N | Yamunotri, Gangotri, Kedarnath, Badrinath — hotels, cab and guide. | ₹28,500 |
  | Kedarkantha Snow Trek | Trek | 6D / 5N | Winter summit trek with tents, meals, permits and certified trek leader. | ₹9,999 |
- Option (was a design tweak): a `SHOW_PRICES` flag; when false, replace price with "Price on request" (16px/600).

### 6. Why us (`#about`)
- Grid `repeat(auto-fit, minmax(min(100%,420px),1fr))`, gap `clamp(32px,5vw,72px)`, align center.
- Left: 2-col image pair, each `clamp(260px,30vw,420px)` tall, radius 20; second offset `margin-top: 48px`. Images: guide team; campfire by the river.
- Right: H2 "Locals first, *tourists never.*" (accent teal). Paragraph (max 44ch): "We're a small crew from Tapovan who treat every guest like a friend visiting home. No call centres, no surprise add-ons."
- List (mt 32, top hairline): rows `grid 48px 1fr`, gap 16, padding 20 0, bottom hairline. Numeral Instrument Serif italic 28px rust; title 800/20px; desc 16px.
  - 01 Certified river guides — Trained rescue kayakers on every rafting trip.
  - 02 One price, all in — Transfers, gear, meals and permits are always included.
  - 03 Small groups — More time on the water, less time waiting in line.

### 7. Testimonial
- Centred, max-width 1100. Quote (*placeholder*): "The 26 km run from Shivpuri was the best day of our India trip — and the camp dinner after was even better." Attribution 16px/600 teal: "Guest review · Rafting + Camping package".

### 8. Booking (`#book`)
- Ink panel, radius 32, grid `repeat(auto-fit, minmax(min(100%,380px),1fr))`.
- Left: H2 "Plan your *trip.*" (marigold accent); paragraph `--muted-on-dark`: "Tell us your dates and group size. We reply on WhatsApp within a few hours." Contact blocks pinned to bottom (label 13px uppercase marigold 600; value 20px/600):
  - Phone / WhatsApp — `+91 98XXX XXXXX` (*placeholder*)
  - Base camp — Tapovan, Rishikesh, Uttarakhand
- Right: form (grid gap 14):
  - Row: Name (placeholder "Your name") | Phone (placeholder "+91") — 2-col `auto-fit minmax(180px,1fr)`.
  - Package `<select>`: the 6 package names + "Custom trip". Default "Rafting + Riverside Camp".
  - Row: Travel date (`type=date`) | Travellers (`type=number`, min 1, default 2).
  - Labels 14px/600, gap 6. Inputs: paper bg, no border, radius 12, padding 14, 16px, ink text.
  - **Send enquiry →**: full-width marigold pill, 800/17px, padding 18, mt 8; hover bg paper. (This button is the rope's anchor point.)
  - Error line (marigold 15px): "Please add your name and phone number."
- Success state replaces the form: teal box radius 20 padding 32: "Shukriya, {name}!" (Instrument Serif italic 40px marigold), "We've got your enquiry for **{package}**. Expect a WhatsApp message from our team shortly." (18px), and "Send another" outline button (1.5px paper border).

### 9. Footer
- Top hairline. Row space-between, wrap, 14px `--body`, padding 28: **Monkey Adventure** (800, ink) · "Rafting · Camping · Treks · Tours — Rishikesh" · "© 2026 Monkey Adventure".

---

## Interactions & Behaviour

### Package filter
Click tab → set `activeTab`; re-render package grid showing `cat === activeTab` (or all). No animation.

### Enquire button
Sets the form's Package select to that package, clears success state, then smooth-scrolls so `#book` sits 80px below the viewport top (`window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 80, behavior: 'smooth' })`).

### Form
- Validation on submit: name and phone must be non-empty (trimmed). Otherwise show error line. Typing in any field clears the error.
- Valid → show success state. "Send another" → back to form, clears name + phone (keeps package/date/pax).
- **Prototype does not send anywhere.** In production: POST to a backend / form service, or build a `https://wa.me/<number>?text=` link with the encoded fields.

### Entrance animation
`@keyframes rise { from {opacity:0; transform:translateY(24px)} to {opacity:1; transform:none} }` — hero text 0.8s ease, hero image 0.8s ease 0.15s delay. Respect `prefers-reduced-motion` (disable rise, marquee, and climber pose-swap).

### Rope + climber (scroll indicator) — signature feature
A single absolutely-positioned SVG (`position:absolute; top:0; left:0; z-index:15; pointer-events:none; overflow:visible`) sized to the full document (`width = documentElement.clientWidth`, `height = documentElement.scrollHeight`). Page wrapper must be `position: relative; overflow-x: hidden`.

**Path layout (`layout()`)** — run on load, resize, and via `ResizeObserver` on `document.body` (images loading change height):
1. `W = clientWidth`, `pad = clamp(16, W*0.04, 40)`, `lo = max(10, (W − min(W,1320))/2 + pad/2)`, `hi = W − lo` → rope swings within the side gutters.
2. Start `(lo, 118)` (just below header).
3. End = top-centre of the **Send enquiry** button in document coords, minus 4px (`rect.left + rect.width/2`, `rect.top + scrollY − 4`).
4. `hb` = bottom of `#top` hero + 40px. Point `(lo, hb)` — rope hangs straight down the left gutter past the hero.
5. `n = max(2, round((endY − hb)/820))` segments; intermediate points alternate x between `hi` and `lo` at evenly spaced y.
6. Connect consecutive points with cubic Béziers: `c1 = (p0.x, p0.y + dy*0.55)`, `c2 = (p1.x, p1.y − dy*0.55)` → smooth S-waves.
7. Sample each segment at 81 points into a lookup table (LUT) of `[x,y]` for positioning.

**Rope rendering** (same `d`, stacked strokes, all round caps/joins):
1. Shadow: `#12261E` opacity .28, width 10, `translate(4 7)`, Gaussian blur stdDev 3.
2. Base `#7A4A10` width 9.
3. Body `#D88E1C` width 7.
4. Highlight `#F2A120` width 3.5, `translate(-0.8 -0.8)`.
5. Twist `#7A4A10` opacity .75, width 7, `dasharray 1.6 5.4`.
6. Sheen `#FFE3A3` opacity .7, width 1.2, `translate(-1.6 -1.6)`, `dasharray 3 4`.
- Start anchor: circle r 9, paper fill, 4.5px ink stroke, drop shadow. End anchor: circle r 7, `#7A4A10` fill, 2.5px marigold stroke.

**Climber position (`onScroll`, passive listener)**:
- `p = clamp(scrollY / (scrollHeight − innerHeight), 0, 1)`.
- Target y = `lut[0].y + p * (lut[last].y − 40 − lut[0].y)` (stops 40px above the button so the label stays readable).
- Binary-search the LUT by y (path is monotonic in y), lerp x/y.
- Angle: tangent from LUT neighbours ±2 → `deg = atan2(−(N.x − P.x), N.y − P.y)` in degrees, ±4° wobble by pose.
- Transform: `translate(x y) rotate(deg) scale(1.2) translate(-20 -32)` (figure drawn in a 40×64 box, origin centred).
- **Climb cycle**: `poseA = floor(scrollY / 70) % 2 === 0` — swaps limb poses every 70px scrolled, so it "climbs" up or down as you scroll.
- Throttle with `requestAnimationFrame` in production.

**Climber figure** (SVG, 40×64 viewBox, drop shadow `dx4 dy6 stdDev2.5 #12261E @ .35`). Draw order: far limbs → torso → near limbs.
- Gradients: shirt linear L→R `#2E8579 → #1F5C55 (45%) → #103631`; backpack linear diag `#E0643A → #8E3210`; helmet radial (cx .35 cy .3 r .8) `#FFE3A3 → #F2A120 (45%) → #A8650F`; skin radial `#F0C49A → #B9814F`.
- Far limbs (stroke `#0A1712`): pose A — arm `M16 22 L11 28 L19 31` (w3.2), leg `M18 40 L14 50 L19 60` (w3.8), hand circle (19,31) r2.2 `#9E6B3E`. Pose B — arm `M24 22 L29 28 L21 31`, leg `M22 40 L26 50 L21 60`, hand (21,31).
- Torso: rect x14 y19 w12 h22 rx5.5 shirt gradient; backpack rect x14.5 y22 w11 h12 rx3; strap line `M15.5 25 L24.5 25` marigold w1; harness `M14.5 38.5 L25.5 38.5` rust w3.
- Head: circle (20,15) r5 skin; helmet `M14.4 15.4 A5.6 5.8 0 0 1 25.6 15.4 Z` helmet gradient, 1px ink stroke; glint ellipse (18,11.6) rx1.8 ry1 `#FFF6DD` @ .8.
- Near limbs (stroke `#12261E`, with `#3A5A4E` highlight lines): pose A — arm `M24 22 L29 13 L21 5` (w3.8) + hl `M24 22 L29 13` w1.1 translate(-0.6 0); leg `M22 40 L29 46 L21 52` (w4.4) + hl `M22.5 40.5 L28.5 45.5` w1.2; hand (21,5) r2.6 skin. Pose B — arm `M16 22 L11 13 L19 5` + hl translate(0.6 0); leg `M18 40 L11 46 L19 52` + hl `M17.5 40.5 L11.5 45.5`; hand (19,5).

The native scrollbar is left untouched (the rope is an additional indicator, not a replacement).

## State (vanilla JS)
```js
const state = {
  activeTab: 'All',            // 'All' | 'Adventure' | 'Trek' | 'Spiritual'
  form: { name:'', phone:'', pkg:'Rafting + Riverside Camp', date:'', pax:2 },
  error: false,
  sent: false
};
// rope: lut (array of [x,y]), recomputed in layout(); poseA derived from scrollY
```
Render activities/packages/reasons from data arrays (see section tables) via template literals or `<template>` cloning.

## Responsive
All grids use `auto-fit/auto-fill` + `minmax(min(100%, Npx), 1fr)` so they collapse to one column on mobile; type uses `clamp()`. Nav wraps. Rope recalculates on resize; on very narrow screens (< ~480px) the gutter is ~10px, so the rope will cross content — consider hiding the rope on mobile or making it a slim fixed side rope.

## Assets
No final images exist — all are placeholders to be supplied by the client (landscape JPG/WebP, `object-fit: cover`):
- Hero: raft hitting a rapid on the Ganga (arch crop)
- Activities: rafting, bungee platform, tents on a river beach, trekkers on a ridge
- Packages: camp at dusk, bungee jumper mid-air, Ganga Aarti at Triveni Ghat, Kunjapuri temple sunrise, Kedarnath valley, snowy Himalayan trail
- About: guide team, campfire by the river
- Logo is the typographic "MA" mark — replace with a real logo if one exists.
- Climber and rope are inline SVG (specified above) — no external files.

## Placeholders to replace before launch
Phone number, all prices, package inclusions, testimonial, WhatsApp link, form submission endpoint.

## Files
- `Monkey Adventure.dc.html` — full design reference (markup at top; data + logic, incl. rope maths, in the `<script data-dc-script>` block at the bottom).
- `support.js` — prototype runtime (needed only to view the reference; do not port).
- `image-slot.js` — prototype image placeholder (do not port; use `<img>`).
