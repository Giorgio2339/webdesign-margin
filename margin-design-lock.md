# MARGIN — STUDIO DESIGN LOCK
### Visual, Spatial, Interaction & Conversion Architectural Directive
**Status:** DESIGN LOCK (APPROVED SPECIFICATION)  
**Role:** Senior Creative Director, Digital Art Director, Interaction Designer, Conversion UX Designer & Frontend Design Architect  
**Subject:** MARGIN (`/Users/gio/Desktop/Margin Website`)  
**Benchmark Reference:** Exo Ape (`https://www.exoape.com/`) — Experience Quality Reference  
**Target:** Original MARGIN Experience (Exo Ape Quality × MARGIN Identity × MARGIN Business Goals)  
**Document Classification:** Single Design Authority for Implementation  

---

## TABLE OF CONTENTS
1. [Executive Summary & Creative Manifesto](#1-executive-summary--creative-manifesto)
2. [Exo Ape Benchmark Audit & Architectural Synthesis](#2-exo-ape-benchmark-audit--architectural-synthesis)
3. [Brand Translation & Conceptual Geometry](#3-brand-translation--conceptual-geometry)
4. [Visual Language & Art Direction](#4-visual-language--art-direction)
5. [Color System & Spatial Palette](#5-color-system--spatial-palette)
6. [Typography System & Scale Hierarchy](#6-typography-system--scale-hierarchy)
7. [Grid, Margin & Spatial Layout Architecture](#7-grid-margin--spatial-layout-architecture)
8. [Header, Global Navigation & Wayfinding](#8-header-global-navigation--wayfinding)
9. [Complete Homepage Architecture & Continuous Scroll Symphony](#9-complete-homepage-architecture--continuous-scroll-symphony)
10. [Exhaustive Section-by-Section Specifications](#10-exhaustive-section-by-section-specifications)
    - [Section 01: The Emergence (Hero / Opening Canvas)](#section-01-the-emergence-hero--opening-canvas)
    - [Section 02: Studio POV & Spatial Manifesto (Point of View)](#section-02-studio-pov--spatial-manifesto-point-of-view)
    - [Section 03: Selected Work Canvas (Primary Project Territory)](#section-03-selected-work-canvas-primary-project-territory)
    - [Section 04: The Kinetic Showcase (Motion & Digital Craft Moment)](#section-04-the-kinetic-showcase-motion--digital-craft-moment)
    - [Section 05: Capabilities Matrix (Disciplines & Scope)](#section-05-capabilities-matrix-disciplines--scope)
    - [Section 06: Working Cadence & Operational Rigor (Process)](#section-06-working-cadence--operational-rigor-process)
    - [Section 07: Proof & Critical Stance (Benchmark & Recognition)](#section-07-proof--critical-stance-benchmark--recognition)
    - [Section 08: Direct Conversion & Studio Initiation (The Invitation)](#section-08-direct-conversion--studio-initiation-the-invitation)
    - [Section 09: Architectural Footer & Studio Colophon](#section-09-architectural-footer--studio-colophon)
11. [Project Presentation System & Work Portals](#11-project-presentation-system--work-portals)
12. [Case Study & Work Detail Architecture](#12-case-study--work-detail-architecture)
13. [Motion Language & Animation Architecture](#13-motion-language--animation-architecture)
14. [Exact Major Animation Choreographies](#14-exact-major-animation-choreographies)
15. [Page Transition Architecture](#15-page-transition-architecture)
16. [Cursor, Pointer & Micro-Interaction System](#16-cursor-pointer--micro-interaction-system)
17. [Media Direction & Art Standards](#17-media-direction--art-standards)
18. [Copywriting Tone & Conversion Editorial](#18-copywriting-tone--conversion-editorial)
19. [Conversion Architecture & UX Funnel](#19-conversion-architecture--ux-funnel)
20. [Desktop Experience Rules (1440px – 2560px)](#20-desktop-experience-rules-1440px--2560px)
21. [Mobile Experience Architecture & Transformation Rules (390px)](#21-mobile-experience-architecture--transformation-rules-390px)
22. [Responsive Breakpoint Matrix & Layout Tables](#22-responsive-breakpoint-matrix--layout-tables)
23. [Performance Constraints & Rendering Budgets](#23-performance-constraints--rendering-budgets)
24. [Accessibility, Inclusive Design & Reduced Motion](#24-accessibility-inclusive-design--reduced-motion)
25. [Anti-Patterns & Explicit Creative Boundaries](#25-anti-patterns--explicit-creative-boundaries)
26. [Build Priorities & Technical Phasing](#26-build-priorities--technical-phasing)
27. [Acceptance Criteria & Quality Sign-Off Checklist](#27-acceptance-criteria--quality-sign-off-checklist)

---

## 1. EXECUTIVE SUMMARY & CREATIVE MANIFESTO

### 1.1 Studio Mission
MARGIN is an elite digital design studio creating web experiences that fundamentally reframe how businesses are perceived. We reject the homogenized landscape of modern web design—characterized by generic SaaS cards, template grids, and disposable animations. MARGIN builds digital presences that possess the gravitational pull, editorial elegance, and cinematic polish of world-class architectural works.

### 1.2 The Core Concept: The Active Margin
In traditional print and classic typography, the *margin* is often mistaken for empty paper—the passive border that surrounds content. At MARGIN, the margin is the **defining architectural actor**. The margin is what creates value, establishes hierarchy, provides breathing space, and directs human attention. 

In digital space, the **Active Margin** is dynamic:
- It acts as a crop, a boundary, a precision alignment frame.
- It expands to immerse the viewer in cinematic canvases.
- It contracts to compress focus onto razor-sharp typography.
- When an element breaks or exceeds its margin, the spatial tension creates genuine emotional resonance.

### 1.3 The Design Formula
$$\text{Exo Ape Quality Principles} \times \text{MARGIN Brand Identity} \times \text{MARGIN Commercial Intent} = \text{An Original MARGIN Experience}$$

The MARGIN website is not a passive brochure. It is the definitive **proof of capability**. Within 5 seconds of interaction, an executive, founder, or art director must conclude: *"This studio operates at the highest tier of international digital craftsmanship."*

---

## 2. EXO APE BENCHMARK AUDIT & ARCHITECTURAL SYNTHESIS

An exhaustive audit of Exo Ape (`https://www.exoape.com/`) was executed across its production markup, responsive stylesheets, layout mechanics, and subpages (`/`, `/work`, `/studio`, `/news`). Below is the technical and creative extraction across all 26 audited dimensions, establishing what we adopt, translate, and reject.

| Audited Dimension | Exo Ape Production Findings | MARGIN Translation & Advancement |
| :--- | :--- | :--- |
| **1. Global Grid & Margins** | 12-column grid (`grid-column-gap: 2.222vw` = 32px at 1440px). Page side margin: `8.333vw` (120px at 1440px, exactly 1/12th of viewport). Content spans 10 columns (83.33vw). Mobile margin: `8vw` (~31px at 390px). | **Adopt & Codify:** Adopt the 8.333vw desktop margin and 8vw mobile margin as fundamental brand margins. In MARGIN, the 8.333vw outer boundary is physically referenced with subtle, hairline crop marks. |
| **2. Header & Navigation** | Fixed wordmark at `top: 3.472vw; left: 3.472vw` (50px). Fixed nav at `top: 3.125vw; right: 3.472vw`. Color dynamically flips via class toggles (`is-light`, `is-dark`, `is-sand`). Links use delayed cubic-bezier underlines. | **Advance:** Adopt fixed spatial anchors and dynamic background color adaptation. Advance by integrating MARGIN's corner crop mark into the wordmark lockup and introducing a prominent, restrained conversion trigger ("Start a Project") directly in the persistent bar. |
| **3. Hero Composition** | Massive hero height (`136.66vw` desktop, `175vh` mobile). Staggered text layers over a sticky background image (`.background.is-sticky { position: sticky; top: 0; }`). Monumental typography (`25.6vw` / ~368px). Services list placed in columns 9–12. | **Advance:** Retain monumental hero scale, but construct a distinctive MARGIN composition: an editorial frame that starts constrained within the 8.333vw margin and softly expands on scroll. Services list replaced with explicit studio positioning and a direct portal to selected work. |
| **4. Typography Scale** | Fluid vw-based scale. Desktop H0: `17.36vw` / Hero H0: `25.6vw`. Body: `1.11vw` (16px), line-height `1.66vw` (24px). Labels: `0.972vw` (14px). Mobile: H0 `25.6vw` (~100px), Body: `3.733vw` (~14.5px). TWK Lausanne used across all weights. | **Differentiate:** Exo Ape relies solely on Lausanne (grotesque sans). MARGIN introduces deliberate **typographic tension**: an authoritative, sculptural Editorial Serif for brandmarks, statements, and editorial titles, contrasted against an ultra-refined, precision Swiss Sans for structural UI, metadata, and body text. |
| **5. Text / Media Synergy** | Text floats freely over or alongside pinned media canvases. Labels accompanied by a 4-point star SVG icon. High contrast between text and background. | **Translate:** Replace generic star icons with MARGIN's proprietary crop-mark / corner framing glyph. Text and media interact with surgical precision, with metadata anchoring to grid lines while media drifts with subtle parallax. |
| **6. Section Heights** | Variable pacing: Hero `136vw`, Showreel `100vh`, Featured News `140vh`, Projects `120vh–150vh`. Eliminates rigid 100vh viewport snapping. | **Adopt:** Variable section heights are mandatory. Rhythm alternates between dense editorial clusters and expansive, media-dominated visual canvases. |
| **7. Whitespace Rhythm** | Section paddings: `10.416vw` (~150px at 1440px) desktop; `21.33vw` (~83px at 390px) mobile. Vast negative space creates luxury perception. | **Adopt:** Maintain generous spatial breathing room (`10.416vw` standard vertical rhythm). Luxury is generated by the confidence to leave space empty. |
| **8. Project Presentation** | Full-bleed or large-span media blocks. On `/work`, desktop uses a 3D horizontal center carousel (`width: 22.08vw; height: 27.5vw`), while mobile uses full-width cards (`height: 104vw`). Hover swaps still image with looping video. | **Advance:** Avoid the 3D horizontal slider which can feel detached. MARGIN uses monumental vertical project canvases with controlled asymmetry, variable aspect ratios (16:9, 4:5, 21:9), and the signature "Escaping Margin" transition. |
| **9. Media Sizing** | Responsive picture tags with Storyblok CDN transforms (`/m/2400x3395/filters:quality(90)`). Optimized WebM/MP4 videos with `playsinline loop muted`. | **Adopt:** Implement multi-resolution responsive picture sets and silent looping ambient video layers with strictly optimized codecs. |
| **10. Scroll Choreography** | Smooth scroll hijacking via virtual scroll / Lenis-like physics. Heavy use of ScrollTrigger pinning, scrubbed transforms, and layer depth. | **Adopt:** Integrate butter-smooth inertial scroll damping (Lenis) paired with scrubbed GSAP transforms. Every scroll tick must feel silky and physically weighted. |
| **11. Reveal Mechanics** | Text lines wrapped in overflow masks: `.title-mask { overflow: hidden; }` containing `.title-line { transform: translateY(100%); }`. | **Adopt:** Mandatory MARGIN reveal standard. All major titles, numbers, and labels emerge from masked bounds. Zero generic opacity fades. |
| **12. Masking & Clipping** | Used for both typography and media entries (`clip-path` and container overflow). | **Advance:** Elevate masking to a core brand metaphor. Crop frames open from hairline boundary lines into full-bleed canvases. |
| **13. Sticky / Pinned Behavior** | Background media pinned while foreground text drifts through the viewport. | **Adopt:** Use sticky positioning for hero media and showreel transitions, keeping GPU composite layers isolated (`will-change: transform`). |
| **14. Parallax Dynamics** | Multi-speed vertical parallax across staggered media lists (e.g. "Spread the News" items drift at different speeds). | **Adopt:** Implement subtle, non-disorienting depth differential (0.85×, 1.0×, 1.15× speeds). |
| **15. Hover Behavior** | Circle-arrow CTA buttons expand fill from center. Links wipe underline from left to right. Project cards trigger background video reveal. | **Advance:** Circle CTA buttons adopt MARGIN's precision geometry. Links use directional wipe underlines. Cards reveal video with smooth crossfade and subtle zoom (`scale: 1.03`). |
| **16. Cursor Behavior** | Floating circular cursor follower (`backdrop-filter: blur(20px); background: rgba(0,0,0,0.15)`) displaying action labels ("EXPLORE", "DRAG"). | **Adopt:** Implement precision custom cursor on desktop only (`@media (hover: hover)`), displaying context-aware studio actions. Strictly disabled on touch devices. |
| **17. Menu Animation** | Fullscreen curtain overlay sliding down with staggered vertical text line reveals. | **Adopt:** Full-viewport architectural drape with staggered menu link masks and integrated studio contact coordinates. |
| **18. Page Transitions** | Overlay curtain (`.overlay { height: 150vh; background: var(--color-dark-grey); }`) sweeps across the screen between routes. | **Advance:** Enhance standard curtain wipes with **Shared Element Transitions**: clicking a project canvas causes the media element to seamlessly expand into the project hero without page flash. |
| **19. Work Page Structure** | Filterless, curated showcase prioritizing visual impact and narrative intrigue over database filtering. | **Adopt:** Work overview presented as an intentional editorial portfolio, emphasizing depth of execution over volume. |
| **20. Case Study Structure** | High-impact hero, editorial metadata ribbon (client, year, role), narrative problem statement, full-bleed media, dual-column design artifacts. | **Adopt:** Structural case-study template with disciplined layout blocks, typographic contrast, and live production previews. |
| **21. Transitions Between Projects** | End-of-project portal featuring next case study, dragging the viewer into the subsequent narrative. | **Adopt:** Infinite continuity: reaching the bottom of a case study pulls the next project canvas up to fill the viewport seamlessly. |
| **22. CTA Placement** | Restrained circular CTAs at the conclusion of sections; subtle footer prompts. | **Advance:** Increase conversion deliberate-ness. Complement artistic CTAs with high-prestige commercial entry points ("Initiate a Project"). |
| **23. Conversion Clarity** | Exo Ape leans heavily into art-studio mood, occasionally obscuring commercial clarity. | **Advance:** MARGIN balances cinematic art direction with explicit commercial clarity. Visitors immediately understand studio capabilities, engagement tiers, and how to start. |
| **24. Mobile Transformations** | Desktop grids collapse into vertical stacks; 3D carousel becomes single-column swipe cards; hero list hidden; menu shifts to burger toggle. | **Adopt & Refine:** Mobile is a bespoke, first-class experience with tailored typography clamps, 48px touch targets, and vertical media aspect ratios. |
| **25. Animation Reduction on Mobile** | Parallax speeds flattened; cursor follower eliminated; sticky complexities simplified to preserve 60fps on mobile Safari. | **Adopt:** Heavy parallax and sticky layers disabled on mobile; motion restricted to performant transforms and opacity. |
| **26. Performance Decisions** | Lazy loading images with `srcset` and `sizes`; video muted and loop restricted; CSS `will-change` on transformed layers; minimal WebGL overhead. | **Adopt:** Pure DOM + CSS transforms + GSAP + Lenis. Zero gratuitous Three.js or heavy shader pipelines that cause mobile battery drain. |

---

## 3. BRAND TRANSLATION & CONCEPTUAL GEOMETRY

```
┌──                                                                ──┐
│                           THE MARGIN                                │
│                                                                    │
│   "Space is not the absence of design. It is design itself."       │
│                                                                    │
└──                                                                ──┘
```

### 3.1 The Brand Meaning
The word **MARGIN** represents the defining boundary where craftsmanship begins. In design, the margin separates chaos from intention. It provides context to content, creates prestige through negative space, and establishes typographic authority.

### 3.2 The Conceptual Vocabulary
- **CROP MARKS & L-BRACKETS:** Architectural framing devices that indicate precision, print heritage, and calibrated digital construction.
- **THE EXPANDING BOUNDARY:** Content begins disciplined within strict grid margins, then expands across the full viewport to signal immersion.
- **CALIBRATED ALIGNMENT:** Strict typographic baseline alignment and modular coordinate points.
- **SURGICAL RESTRAINT:** Zero decorative noise. Elements exist only if they heighten clarity, prestige, or spatial tension.

### 3.3 The Margin Corner Symbol (The "L-Bracket")
The MARGIN brand symbol is a minimalist corner bracket derived from classic print registration and crop marks.
- **Geometry:** A precise right-angled bracket with equal arms (`width: 14px; height: 14px; stroke: 1.5px; fill: none;`).
- **Usage Governance (STRICT):**
  - **Permitted Uses:**
    1. Fixed brandmark lockup top-left (accompanying the MARGIN wordmark).
    2. Precision corner marks on the primary project canvas (top-left, bottom-right).
    3. Kinetic indicator on the interactive conversion modal.
  - **Prohibited Uses:**
    - Must NOT be stamped on every card or button.
    - Must NOT be repeated as background wallpaper or decorative patterns.
    - Must NOT rotate continuously as a loading spinner.

---

## 4. VISUAL LANGUAGE & ART DIRECTION

### 4.1 Creative Direction Pillars
1. **CONFIDENT:** We do not shout, flash, or bombard. The layout speaks with quiet, unshakeable authority.
2. **EDITORIAL:** Grounded in high-end editorial and publication design—dramatic typographic scale contrast, disciplined baseline grids, and narrative pacing.
3. **CINEMATIC:** Projects are treated like motion pictures. Media canvases are expansive, color-graded with naturalistic warmth, and motion is fluid and weighted.
4. **DIGITAL CRAFT:** Every micro-interaction, button hover, and scroll scrub feels physically responsive, buttery smooth, and meticulously engineered.
5. **RESTLESS RESTRAINT:** Every millisecond of motion and every pixel of padding must justify its existence. Decoration is replaced by spatial proportion.

### 4.2 Light vs. Dark Spatial Dramaturgy
Rather than a monotone website, MARGIN orchestrates a **tonal symphony**:
- **Warm Editorial White (`#F7F6F2`):** Used for opening intellectual statements, studio philosophy, capabilities, and editorial reading. It conveys clarity, print heritage, and confidence.
- **Deep Obsidian Slate (`#0C0D10`):** Used for project territory, the kinetic showreel, and digital craft moments. It recedes into the background, allowing visual media to glow with maximum saturation and contrast.
- **The Transition:** Background colors interpolate smoothly over a `1.2s` scroll delta via CSS custom property transitions or GSAP ScrollTrigger canvas fills.

---

## 5. COLOR SYSTEM & SPATIAL PALETTE

```
#F7F6F2                 #0C0D10                 #D15827
WARM CANVAS             OBSIDIAN SLATE          TERRACOTTA ACCENT
Primary Editorial       Cinematic Surface       Precision Accent (≤2%)
```

### 5.1 Palette Tokens

```css
:root {
  /* Surface Tokens — Light Mode (Default Studio State) */
  --surface-primary: #F7F6F2;          /* Warm off-white, editorial cotton paper */
  --surface-secondary: #EFECE6;        /* Subtle secondary surface, stone tint */
  --surface-tertiary: #E5E1D8;         /* Structural borders, hairline rules */
  
  /* Surface Tokens — Dark Mode (Cinematic Project State) */
  --surface-dark: #0C0D10;             /* Obsidian slate, warm deep near-black */
  --surface-dark-card: #14161C;        /* Elevated project card background */
  --surface-dark-border: rgba(247, 246, 242, 0.12); /* Subtle dark hairline */

  /* Ink Tokens — Light Mode */
  --ink-primary: #121316;              /* Deepest carbon black, maximum contrast */
  --ink-secondary: rgba(18, 19, 22, 0.65); /* Editorial body text, subtitles */
  --ink-tertiary: rgba(18, 19, 22, 0.40);  /* Metadata, indices, timestamps */
  --ink-border: rgba(18, 19, 22, 0.10);    /* Light mode dividers, grid rules */

  /* Ink Tokens — Dark Mode */
  --ink-inverted-primary: #F7F6F2;     /* Inverted headings, high contrast */
  --ink-inverted-secondary: rgba(247, 246, 242, 0.65); /* Inverted body text */
  --ink-inverted-tertiary: rgba(247, 246, 242, 0.40);  /* Inverted metadata */

  /* The MARGIN Accent — Restrained Terracotta Rust */
  --color-accent: #D15827;             /* Precision orange/terracotta */
  --color-accent-hover: #BA4B1E;       /* Deepened accent for hover state */
  --color-accent-subtle: rgba(209, 88, 39, 0.12); /* Subtle indicator tint */
}
```

### 5.2 Strict Color Governance
- **The 2% Rule for Accent Orange (`#D15827`):** The accent color must never occupy more than 2% of visible screen real estate at any given time.
- **Allowed Uses:**
  - Interactive crop-mark corner highlight on active project cards.
  - Active category filter dot.
  - Form focus state outline.
  - Live availability dot ("Available for Q3/Q4").
- **Prohibited Uses:**
  - Full-width orange section backgrounds.
  - Huge orange CTA buttons.
  - Orange text paragraphs or headings.
  - Orange gradients, glows, or drop shadows.

---

## 6. TYPOGRAPHY SYSTEM & SCALE HIERARCHY

```
MARGIN SERIF                     TWK LAUSANNE / INTER SANS        MONOSPACE
Editorial Display & Wordmark     Interface, Subtitles, Body       Metadata, Coordinates
"Exceptional digital craft"      "Selected Work — 2026"           "[ 52°22'N  04°53'E ]"
```

### 6.1 Font Pairings & Typographic Tension
1. **Brand & Editorial Serif:** A high-contrast, sculptural, razor-sharp transitional/modern serif (*PPEiko*, *Canela*, or *Newsreader / Playfair Display* in open-source fallback). Used for the MARGIN wordmark, primary philosophical statements, and project titles.
2. **Contemporary Precision Sans:** An ultra-disciplined, clean Swiss grotesque (*TWK Lausanne* / *Inter* / *PP Neue Montreal*). Used for interface controls, navigation, subtitles, section headers, capabilities lists, and editorial body paragraphs.
3. **Monospaced Technical Index:** A clean monospaced font (*JetBrains Mono* / *Space Mono*). Used strictly for project indices (`[ 01 / 06 ]`), dates, aspect ratios, and spatial coordinates.

### 6.2 Fluid Scale Architecture (Desktop 1440px vs. Mobile 390px)

| Token Name | Desktop Size / Line-Height / Letter-Spacing | Mobile Size / Line-Height / Letter-Spacing | Font Family / Weight | Contextual Role |
| :--- | :--- | :--- | :--- | :--- |
| `--type-display-xxl` | `clamp(7.5rem, 16vw, 15rem)` / `0.92` / `-0.04em` | `clamp(3.5rem, 15vw, 5.5rem)` / `0.96` / `-0.03em` | Editorial Serif, 400 | Hero monumental headline, Showreel title |
| `--type-display-xl` | `clamp(4.5rem, 9.5vw, 9rem)` / `0.95` / `-0.03em` | `clamp(2.5rem, 10vw, 3.8rem)` / `1.02` / `-0.02em` | Editorial Serif, 400 | Section flagship titles ("Selected Work", "Point of View") |
| `--type-h1` | `clamp(3.0rem, 5.5vw, 5.5rem)` / `1.08` / `-0.025em` | `clamp(2.0rem, 7vw, 2.8rem)` / `1.15` / `-0.015em` | Precision Sans, 400 | Secondary titles, Project case study titles |
| `--type-h2` | `clamp(2.0rem, 3.2vw, 3.2rem)` / `1.20` / `-0.015em` | `clamp(1.5rem, 5vw, 1.9rem)` / `1.25` / `-0.01em` | Precision Sans, 500 | Feature headers, Capabilities headings |
| `--type-h3` | `clamp(1.25rem, 1.8vw, 1.8rem)` / `1.35` / `-0.01em` | `clamp(1.1rem, 3.8vw, 1.35rem)` / `1.40` / `0em` | Precision Sans, 500 | Capability sub-items, Process step names |
| `--type-body-lead` | `clamp(1.2rem, 1.6vw, 1.6rem)` / `1.55` / `-0.005em` | `clamp(1.05rem, 4vw, 1.25rem)` / `1.50` / `0em` | Precision Sans, 400 | Hero intro statement, POV manifesto text |
| `--type-body` | `clamp(1.0rem, 1.15vw, 1.15rem)` / `1.65` / `0em` | `clamp(0.95rem, 3.6vw, 1.05rem)` / `1.60` / `0em` | Precision Sans, 400 | Editorial narrative, case study body |
| `--type-label` | `clamp(0.75rem, 0.85vw, 0.85rem)` / `1.20` / `+0.08em` | `clamp(0.75rem, 2.8vw, 0.85rem)` / `1.20` / `+0.06em` | Precision Sans, 500 (Uppercase) | Section tags, metadata headers, button text |
| `--type-mono` | `clamp(0.75rem, 0.8vw, 0.8rem)` / `1.20` / `0em` | `clamp(0.7rem, 2.6vw, 0.75rem)` / `1.20` / `0em` | Technical Mono, 400 | Indices `[ 01 ]`, timestamps, coordinates |

### 6.3 Optical Tracking & Baseline Discipline
- Monumental sizes (`--type-display-xxl` and `xl`) must use tight negative tracking (`-0.03em` to `-0.04em`) to prevent sprawling letterforms.
- All small labels and metadata (`--type-label`) must use positive tracking (`+0.06em` to `+0.08em`) with uppercase transformation for absolute legibility.
- Strict optical alignment: Serifs with extreme ascenders/descenders must be wrapped in overflow masks that clip cleanly without truncating glyph flourishes.

---

## 7. GRID, MARGIN & SPATIAL LAYOUT ARCHITECTURE

```
|<-- 8.333vw -->|==================== 83.333vw GRID ====================|<-- 8.333vw -->|
|    OUTER      |  COL 1 |  COL 2 |  COL 3 | ... | COL 10 | COL 11 | COL 12 |    OUTER      |
|    MARGIN     |<-2.2vw->|<-2.2vw->|<-2.2vw->| ... |        |        |        |    MARGIN     |
```

### 7.1 Desktop Grid System (1440px – 2560px)
- **Outer Page Margins:** `8.333vw` (exactly 120px at 1440px; 1/12th of screen width per side).
- **Active Grid Span:** `83.333vw` (10 columns equivalent in 12-column layout).
- **Columns:** 12 symmetrical fluid columns.
- **Gutters:** `2.222vw` (32px at 1440px).
- **Max Container Width Constraint:** While fluid up to 1920px, at screens > 1920px, container caps at `1800px` centered, expanding outer margins symmetrically to preserve optical balance.

### 7.2 Mobile Grid System (320px – 768px, target 390px)
- **Outer Page Margins:** `8.0vw` (~31px at 390px).
- **Active Grid Span:** `84.0vw` (~328px at 390px).
- **Layout Model:** 1-column fluid linear stack; complex desktop offsets collapse into clean vertical hierarchy.
- **Gutters:** `4.0vw` (~15.6px at 390px).

### 7.3 Section Padding Cadence
- **Grand Rhythm (Major Section Transitions):** `padding-top: 10.416vw; padding-bottom: 10.416vw;` (150px at 1440px desktop / 21.33vw (~83px) at 390px mobile).
- **Compressed Rhythm (Intra-Section Sequences):** `padding-top: 5.208vw; padding-bottom: 5.208vw;` (75px at 1440px desktop / 10.66vw (~41px) at 390px mobile).

---

## 8. HEADER, GLOBAL NAVIGATION & WAYFINDING

```
[+] MARGIN                                          WORK    STUDIO    APPROACH    [ START A PROJECT ]
(Left Fixed Anchor)                                 (Right Fixed Navigation Strip)
```

### 8.1 Spatial Geometry & Anchors
- **Fixed Wordmark & Brandmark (Top Left):**
  - Position: `position: fixed; top: 3.472vw; left: 3.472vw; z-index: 90;` (50px at 1440px).
  - Component: Scaled MARGIN editorial serif wordmark paired with the hairline `[+]` corner crop mark.
  - Hover: Subtle scale of crop mark with a `0.3s` cubic-bezier pulse.
- **Fixed Navigation Controls (Top Right):**
  - Position: `position: fixed; top: 3.125vw; right: 3.472vw; z-index: 90;` (45px, 50px at 1440px).
  - Items: `WORK`, `STUDIO`, `APPROACH`, followed by a high-prestige outlined button: `[ START A PROJECT ]`.

### 8.2 Dynamic Color Adaptation (The Adaptive Header)
- The header components dynamically monitor the section entering beneath them using an optimized `IntersectionObserver`.
- When passing over light surfaces (`--surface-primary`):
  - Text & mark: `--ink-primary` (`#121316`).
  - Button border: `rgba(18, 19, 22, 0.25)`.
- When passing over dark surfaces (`--surface-dark`):
  - Text & mark: `--surface-primary` (`#F7F6F2`).
  - Button border: `rgba(247, 246, 242, 0.3)`.
- Transition duration: `transition: color 0.4s ease, border-color 0.4s ease;`.

### 8.3 The Link Wipe Micro-Interaction
- Desktop nav links feature an invisible hairline underline (`height: 1px; bottom: -3px;`).
- Resting state: `transform: scaleX(0); transform-origin: right center; transition: transform 0.45s cubic-bezier(0.76, 0, 0.24, 1);`.
- Hover state: `transform: scaleX(1); transform-origin: left center;`.
- Active Route: Marked with a microscopic square registration dot (`3px × 3px`) centered 6px below the label.

### 8.4 Fullscreen Architectural Menu (Mobile & Secondary Desktop Access)
- **Trigger:** At viewport widths <= 768px, the horizontal row hides and a minimal tactile button emerges: `MENU [+]`.
- **Overlay Open Animation:**
  - An architectural curtain (`background: #0C0D10;`) descends from `translateY(-100%)` to `translateY(0%)` with duration `0.85s`, easing `cubic-bezier(0.85, 0, 0.15, 1)`.
  - Links emerge via masked vertical line reveals: `WORK`, `STUDIO`, `APPROACH`, `CASE STUDIES`, `INQUIRE`.
  - Stagger: `0.08s` delay per line.
  - Footer of menu displays studio coordinates: `[ 52°22'N  04°53'E ] — AMSTERDAM / WORLDWIDE`.

---

## 9. COMPLETE HOMEPAGE ARCHITECTURE & CONTINUOUS SCROLL SYMPHONY

The homepage must NEVER feel like a stack of disconnected component boxes. It is structured as a **single continuous cinematic voyage** where each section naturally dissolves, expands, or compresses into the next.

```
┌────────────────────────────────────────────────────────┐
│ SECTION 01: THE EMERGENCE (HERO)                      │ Light Canvas
│ Monumental Serif Title + Constrained Active Margin     │ 130vh Scroll Span
├────────────────────────────────────────────────────────┤
│ SECTION 02: STUDIO POV & SPATIAL MANIFESTO             │ Light Canvas
│ High-Density Editorial Philosophy + Micro-Coordinates  │ 100vh Fluid Flow
├────────────────────────────────────────────────────────┤
│ SECTION 03: SELECTED WORK CANVAS                       │ Tonal Shift to Dark
│ Flagship Interactive Project Showcases (Escaping Crop) │ 240vh Immersion
├────────────────────────────────────────────────────────┤
│ SECTION 04: THE KINETIC SHOWCASE                       │ Full-Bleed Dark
│ Work In Motion / Sound-Enabled Cinematic Reel          │ 100vh Pinned Scrub
├────────────────────────────────────────────────────────┤
│ SECTION 05: CAPABILITIES MATRIX                        │ Return to Light
│ Discipline Typography Columns + Interactive Deliverables│ 120vh Grid Flow
├────────────────────────────────────────────────────────┤
│ SECTION 06: WORKING CADENCE & OPERATIONAL RIGOR        │ Light Canvas
│ Process Deconstructed + Client Collaboration Rules     │ 110vh Narrative
├────────────────────────────────────────────────────────┤
│ SECTION 07: PROOF & CRITICAL STANCE                    │ Light / Slate
│ Curated Recognition + Qualitative Client Benchmarks    │ 90vh Editorial
├────────────────────────────────────────────────────────┤
│ SECTION 08: DIRECT CONVERSION & STUDIO INITIATION      │ Dark Immersion
│ High-Prestige Project Inquiry Drawer + SLA Promise     │ 100vh Focus
├────────────────────────────────────────────────────────┤
│ SECTION 09: ARCHITECTURAL FOOTER & COLOPHON            │ Dark Anchor
│ Legal Boundaries + Global Coordinates + Back to Top    │ 40vh Closure
└────────────────────────────────────────────────────────┘
```

---

## 10. EXHAUSTIVE SECTION-BY-SECTION SPECIFICATIONS

---

### SECTION 01: THE EMERGENCE (Hero / Opening Canvas)

#### 1. Purpose
Immediately arrest the visitor, establish unmatched typographic and spatial authority, communicate what MARGIN does within 3 seconds, and create visceral curiosity to scroll.

#### 2. Content & Copy
- **Studio Coordinate Tag:** `[ 01 / 08 ] — DIGITAL ART DIRECTION & WEB CRAFT`
- **Monumental Headline:**  
  *Line 1:* `Exceptional`  
  *Line 2:* `Digital`  
  *Line 3:* `Presences`
- **Lead Contextual Statement:**  
  `MARGIN crafts distinctive, highly polished websites for businesses that refuse to look like their competitors. We elevate digital perception through architectural precision, editorial typography, and kinetic restraint.`
- **Exploration Prompt:** `SCROLL TO EXPLORE WORK [ ↓ ]`

#### 3. Spatial Composition & Grid Mapping
- Desktop: `height: 130vh;` with a two-part scroll progression.
- Top coordinate tag positioned at Row 1, Col 1/4.
- Monumental headline spans Col 1/13, running edge-to-edge within the 8.333vw margin.
- Lead paragraph placed at Col 7/12, vertically aligned 4vw below the headline.
- Media canvas: A high-art photographic architectural canvas sits pinned at the background, initially constrained to a central frame (`width: 83.33vw; height: 75vh; border: 1px solid var(--ink-border)`), with the crop marks visible at all four corners.

#### 4. Typography
- Headline: `--type-display-xxl` (Editorial Serif, 400).
- Lead Paragraph: `--type-body-lead` (Precision Sans, 400).
- Coordinate Tag: `--type-mono` (Technical Mono, 400).

#### 5. Media Asset Specification
- Format: Ultra-high-resolution architectural photography depicting minimalist brutalist stone intersecting morning sunlight (metaphor for precision geometry and natural illumination).
- Compression: WebP/AVIF format, 2400px width, progressive decode, `fetchpriority="high"`.

#### 6. Motion & Scroll Choreography
- **Initial Load:** Preloader finishes; the headline lines emerge sequentially from masked boundaries (`y: 110% -> 0%`, duration `1.1s`, stagger `0.12s`, ease `cubic-bezier(0.16, 1, 0.3, 1)`).
- **On Scroll (0% -> 50% viewport):** The headline smoothly drifts upward at `0.75×` scroll speed. The constrained central media canvas gently scales from `scale: 0.96` to `scale: 1.0` while its corner crop marks subtly spread outward toward the viewport boundaries.

#### 7. Micro-Interactions
- Hovering over the corner crop marks causes them to expand by 4px with a subtle orange border glow (`rgba(209, 88, 39, 0.4)`).
- Clicking `SCROLL TO EXPLORE WORK` triggers a silky smooth scroll down to Section 03.

#### 8. Mobile Transformation (390px)
- `height: 100vh;` (no extended 130vh scroll deadspace).
- Headline collapses to `--type-display-xl` (`15vw`).
- Lead paragraph sits directly below the headline without column offset.
- Background media is static behind text with a subtle gradient scrim to guarantee WCAG 4.5:1 text contrast.

---

### SECTION 02: STUDIO POV & SPATIAL MANIFESTO (Point of View)

#### 1. Purpose
Define why MARGIN’s work looks fundamentally different from conventional web agencies; establish intellectual thought leadership and justify premium studio pricing.

#### 2. Content & Copy
- **Section Tag:** `[ 02 / 08 ] — POINT OF VIEW`
- **Flagship Statement:**  
  `Most websites are built from templates. MARGIN builds digital monuments.`
- **Editorial Sub-Paragraphs (Two Columns):**  
  *Col 1:* `The modern web has converged on mediocrity. Generic SaaS layouts, predictable card grids, and pre-packaged motion have made multi-million dollar brands look identical to ten-person startups.`  
  *Col 2:* `We operate on the principle that digital space should possess weight, rhythm, and permanence. We engineer custom digital flagships that communicate immediate commercial value, capture brand prestige, and convert visitors through emotional conviction.`
- **Micro-Metric Grid:**  
  `[ 01 ] ZERO TEMPLATES` | `[ 02 ] 100% BESPOKE ARCHITECTURE` | `[ 03 ] UNCOMPROMISING PERFORMANCE`

#### 3. Spatial Composition & Grid Mapping
- Desktop: `padding-top: 10.416vw; padding-bottom: 10.416vw;`.
- Flagship statement sits in Col 1/9.
- Two-column editorial text sits below: Col 3/7 (Column 1) and Col 8/12 (Column 2).
- Micro-metric strip sits in Col 1/13 with a hairline top divider.

#### 4. Typography
- Flagship Statement: `--type-display-xl` (Editorial Serif, 400).
- Editorial Paragraphs: `--type-body` (Precision Sans, 400).
- Micro-Metrics: `--type-mono` (Technical Mono, 400, Uppercase).

#### 5. Media Asset Specification
- Minimal media in this section; this is an **editorial typographic breathing room** designed to contrast with the heavy media sections surrounding it.
- A delicate interactive SVG crop wireframe sits in Col 11/12, responding subtly to mouse coordinates.

#### 6. Motion & Scroll Choreography
- ScrollTrigger pins the Flagship Statement for 15% scroll delta while the two editorial sub-paragraphs slide up into position.
- Lines reveal via the standard line-mask mechanic.

#### 7. Micro-Interactions
- Hovering over any micro-metric item highlights the numeric index with `--color-accent` (`#D15827`).

#### 8. Mobile Transformation (390px)
- Stacks linearly in 1 column.
- Flagship statement scales to `clamp(2.0rem, 8vw, 2.8rem)`.
- Micro-metrics switch to a vertical 3-row stack with top and bottom hairline borders.

---

### SECTION 03: SELECTED WORK CANVAS (Primary Project Territory)

#### 1. Purpose
Provide undeniable visual proof of world-class capability. Showcase flagship studio projects with monumental visual scale and tactile interaction.

#### 2. Content & Copy
- **Section Header:** `[ 03 / 08 ] — SELECTED COMMISSIONS`
- **Project 01 (Flagship):**  
  - Name: `AURELIA HAUTE JOAILLERIE`  
  - Discipline: `Digital Flagship & E-Commerce Experience`  
  - Statement: `Reinventing high-jewelry e-commerce through high-framerate kinetic macro-photography and fluid transactional architecture.`  
  - Year: `2026`  
  - CTA: `VIEW CASE STUDY [ → ]`
- **Project 02:**  
  - Name: `KRONOS ARCHITECTURAL ATELIER`  
  - Discipline: `Identity Translation & Web Experience`  
  - Statement: `Spatial digital identity for a Zurich-based architecture firm specializing in alpine concrete structures.`  
  - Year: `2025`  
  - CTA: `VIEW CASE STUDY [ → ]`
- **Project 03:**  
  - Name: `VALT VIRTUAL LOGISTICS`  
  - Discipline: `Digital Product & Enterprise Portal`  
  - Statement: `Subverting enterprise logistics software with an editorial dashboard and cinematic onboarding flow.`  
  - Year: `2025`  
  - CTA: `VIEW CASE STUDY [ → ]`
- **Section Exit Portal:** `BROWSE ARCHIVE (14 SELECTED WORKS) [ ↗ ]`

#### 3. Spatial Composition & Grid Mapping
- Surface background shifts smoothly from `--surface-primary` (`#F7F6F2`) to `--surface-dark` (`#0C0D10`).
- Text switches to `--ink-inverted-primary` (`#F7F6F2`).
- Asymmetric alternating rhythm:
  - **Project 01:** Centered monumental canvas (Col 1/13, width: 83.33vw, aspect ratio 16:9).
  - **Project 02:** Left-weighted portrait canvas (Col 2/8, width: 50vw, aspect ratio 4:5), with metadata in Col 9/12.
  - **Project 03:** Right-weighted panoramic canvas (Col 5/13, width: 62vw, aspect ratio 21:9), with metadata in Col 1/4.

#### 4. Typography
- Project Name: `--type-display-xl` (Editorial Serif, 400).
- Project Discipline: `--type-label` (Precision Sans, 500, Uppercase).
- Contextual Statement: `--type-body` (Precision Sans, 400).
- Project Year: `--type-mono` (Technical Mono, 400).

#### 5. Media Asset Specification
- Still State: Master-grade WebP photographic stills (`quality: 92%`).
- Active / Hover State: Muted, looping WebM/MP4 ambient video clips depicting live website interactions, UI micro-details, and smooth kinetic transitions (`1080p, 60fps, bitrate < 3.5Mbps`).

#### 6. Motion & Scroll Choreography: The "Escaping Margin"
- **The Concept:** As each project canvas approaches the vertical center of the viewport, the media element—initially clipped by an 83.33vw editorial border—**expands horizontally** by 4vw on each side toward the viewport edges, while the accompanying metadata remains strictly locked to the 12-column grid.
- **The Effect:** The project physically breaks its margins, signaling to the viewer that this work exceeds standard web boundaries.

#### 7. Micro-Interactions
- Hovering over a project card replaces the cursor with a magnetic circular glass pill displaying `VIEW [ → ]`.
- Background still image crossfades into the ambient video in `300ms`.

#### 8. Mobile Transformation (390px)
- Projects stack vertically; all aspect ratios normalize to 4:5 or 16:10 for vertical screen harmony.
- Horizontal "Escaping Margin" is disabled to prevent horizontal overflow and horizontal scroll locks.
- Video plays automatically in inline muted loop (`autoplay playsinline loop muted`) with a poster image fallback.

---

### SECTION 04: THE KINETIC SHOWCASE (Motion & Digital Craft Moment)

#### 1. Purpose
Deliver an immersive sensory impact that proves MARGIN's mastery of motion design, interactive pacing, and frontend performance.

#### 2. Content & Copy
- **Section Tag:** `[ 04 / 08 ] — DIGITAL CRAFT IN MOTION`
- **Title:** `Work In Motion`
- **Callout:** `Our projects are built to be felt. Put on your headphones and experience our interactive cadence.`
- **Interactive Control:** `[ ▷ PLAY SHOWREEL (1:24) ]` / `[ 🔊 SOUND: ON/OFF ]`

#### 3. Spatial Composition & Grid Mapping
- Section is full-bleed (`width: 100vw; height: 100vh; position: relative; overflow: hidden; background: #000;`).
- Background: High-definition cinematic reel video looping continuously.
- Foreground overlay: Centered minimal typography and circular play trigger.
- Corner marks pinned to `top: 3.472vw; left: 3.472vw; bottom: 3.472vw; right: 3.472vw;`.

#### 4. Typography
- Title: `--type-display-xxl` (Editorial Serif, 400, White).
- Subtitle: `--type-body` (Precision Sans, 400, White with 70% opacity).
- Audio Status: `--type-mono` (Technical Mono, 400).

#### 5. Media Asset Specification
- Video: High-energy, meticulously cut montage of MARGIN digital experiences, typography animations, 3D spatial camera movements, and code architecture.
- Dual Stream: WebM (VP9) for modern Chromium/Firefox; MP4 (H.264/AAC) for Safari.

#### 6. Motion & Scroll Choreography
- On scroll entry: The section scales into view from an interior 90vw frame to fill 100vw screen (`scale: 0.92 -> 1.0`, ScrollTrigger scrub).
- Audio is muted by default; clicking anywhere on the video unmutes with a gentle 0.5s audio gain fade.

#### 7. Micro-Interactions
- Circular play button magnetic attraction: Pulls toward cursor within an 80px radius.
- Volume toggle in bottom right corner with animated equalizer bars.

#### 8. Mobile Transformation (390px)
- Native mobile video container with optimized bitrate (< 2Mbps).
- Touch tap anywhere triggers fullscreen video playback or pause.

---

### SECTION 05: CAPABILITIES MATRIX (Disciplines & Scope)

#### 1. Purpose
Clearly delineate MARGIN's exact service offerings, demonstrating both creative breadth and engineering depth so prospective clients understand our engagement scope.

#### 2. Content & Copy
- **Section Tag:** `[ 05 / 08 ] — CORE CAPABILITIES`
- **Heading:** `Architecture, Artistry & Code`
- **Intro Statement:** `We do not provide generic marketing packages. We deliver comprehensive digital transformations across four interconnected disciplines.`
- **Capability 01:**  
  - Title: `01 / DIGITAL ART DIRECTION`  
  - Scope: `Brand translation, visual systems, high-contrast typography, cinematic art direction, custom iconography, design systems.`
- **Capability 02:**  
  - Title: `02 / BESPOKE WEB ARCHITECTURE`  
  - Scope: `Custom headless web development, Next.js / Vite engineering, performant animations, GSAP scroll choreography, responsive precision.`
- **Capability 03:**  
  - Title: `03 / INTERACTION & CONVERSION UX`  
  - Scope: `Frictionless inquiry funnels, high-prestige transaction architecture, micro-interactions, responsive touch ergonomics, velocity optimization.`
- **Capability 04:**  
  - Title: `04 / CREATIVE FRONTEND ENGINEERING`  
  - Scope: `Zero-template codebases, clean semantic markup, accessibility (WCAG AA), WebGL where intentional, Core Web Vitals perfection.`

#### 3. Spatial Composition & Grid Mapping
- Surface returns to Warm Canvas (`--surface-primary: #F7F6F2`).
- 4-column accordion/table hybrid: Col 1/4 (Section lead) and Col 5/13 (The 4 Capabilities listed sequentially).
- Each capability is separated by a hairline divider with an interactive expand/inspect behavior.

#### 4. Typography
- Section Heading: `--type-display-xl` (Editorial Serif, 400).
- Capability Names: `--type-h2` (Precision Sans, 500).
- Deliverables List: `--type-body` (Precision Sans, 400).

#### 5. Media Asset Specification
- Hovering over each capability row reveals a floating floating preview vignette (aspect ratio 3:2, width 320px) showing live design artifacts related to that discipline.

#### 6. Motion & Scroll Choreography
- Rows reveal with a sequential cascade down the page.
- Hovering over a row smoothly expands its deliverable tags while dimming sibling rows to 35% opacity.

#### 7. Micro-Interactions
- Floating vignette follows cursor with a smooth 0.15s lerp lag.

#### 8. Mobile Transformation (390px)
- Stacks vertically into clear touch-friendly accordion cards.
- Floating hover preview is removed in favor of static inline badges.

---

### SECTION 06: WORKING CADENCE & OPERATIONAL RIGOR (Process)

#### 1. Purpose
Demystify how a project runs, eliminate client anxiety regarding timelines and communication, and demonstrate that MARGIN is a reliable, enterprise-grade creative partner.

#### 2. Content & Copy
- **Section Tag:** `[ 06 / 08 ] — HOW WE COLLABORATE`
- **Heading:** `Four Phases. Zero Ambiguity.`
- **Phase 01:** `01 / THE ARCHITECTURAL AUDIT (Weeks 1–2)` — Deep discovery, competitor deconstruction, visual positioning lock, wireframe choreography.
- **Phase 02:** `02 / ART DIRECTION & DESIGN LOCK (Weeks 3–5)` — Typography hierarchy, high-fidelity visual prototypes, interactive motion proofs, client sign-off.
- **Phase 03:** `03 / FRONTEND CRAFT & ENGINEERING (Weeks 6–9)` — Bespoke development, butter-smooth scroll integration, multi-device testing, Core Web Vitals optimization.
- **Phase 04:** `04 / DEPLOYMENT & DIGITAL ASCENT (Week 10)` — Flawless zero-downtime launch, analytics calibration, CMS client training, post-launch stewardship.
- **Guiding Rule:** `Direct access to principals. No junior account managers. Pure creative and technical velocity.`

#### 3. Spatial Composition & Grid Mapping
- Desktop: Horizontal timeline scrub or 4-column modular layout across Col 1/13.
- Each phase is anchored by its numeric index in monospaced typography.

#### 4. Typography
- Heading: `--type-display-xl` (Editorial Serif, 400).
- Phase Titles: `--type-h3` (Precision Sans, 500).
- Phase Descriptions: `--type-body` (Precision Sans, 400).

#### 5. Media Asset Specification
- Minimalist typographic focus; subtle vector timeline progress bar tracks scroll progress.

#### 6. Motion & Scroll Choreography
- As the user scrolls, a hairline timeline rule fills horizontally from 0% to 100%, illuminating each phase in sequence.

#### 7. Micro-Interactions
- Clicking any phase card scrolls the viewport to anchor that phase centrally.

#### 8. Mobile Transformation (390px)
- Vertical progress track down the left margin; timeline fills vertically as user scrolls downward.

---

### SECTION 07: PROOF & CRITICAL STANCE (Benchmark & Recognition)

#### 1. Purpose
Provide social proof and professional credibility without bragging or resorting to tacky award-badge clutter.

#### 2. Content & Copy
- **Section Tag:** `[ 07 / 08 ] — CRITICAL RECOGNITION`
- **Heading:** `Peer Reviewed. Internationally Recognized.`
- **Curated Awards & Citations:**  
  - `Awwwards — Site of the Day × 12`  
  - `The FWA — FWA of the Day × 6`  
  - `Lovie Awards — Gold, Best Visual Design & Craft`  
  - `Webby Awards — Honoree, Best Navigation & Structure`
- **Editorial Client Testimonial (Single, Authoritative Quote):**  
  `"MARGIN didn't just redesign our website. They forced us to level up our entire brand expression. The day the new site launched, our qualified inbound inquiries doubled in value."`  
  *— Frederik Van Der Meer, Founding Partner, VANDER ARCHITECTURE*

#### 3. Spatial Composition & Grid Mapping
- Col 1/6: Awards index formatted as an editorial publication list.
- Col 7/12: The featured client quote set in large editorial serif type with generous breathing room.

#### 4. Typography
- Heading: `--type-display-xl` (Editorial Serif, 400).
- Testimonial Quote: `--type-h2` (Editorial Serif, 400, Italicized quote marks).
- Attribution: `--type-mono` (Technical Mono, 400).

#### 5. Media Asset Specification
- No fake award badges or garish logos. Clean, precise typographic list with monospaced counts (`× 12`, `× 6`).

#### 6. Motion & Scroll Choreography
- Testimonial words reveal with an understated opacity wipe as the quote enters the center third of the viewport.

#### 7. Micro-Interactions
- Hovering over an award title reveals the verified link icon `[ ↗ ]`.

#### 8. Mobile Transformation (390px)
- Single column: Testimonial sits first, followed by the condensed awards list below.

---

### SECTION 08: DIRECT CONVERSION & STUDIO INITIATION (The Invitation)

#### 1. Purpose
Turn aesthetic admiration into concrete commercial action. Provide a direct, friction-free, high-prestige mechanism for prospective clients to begin a conversation.

#### 2. Content & Copy
- **Section Tag:** `[ 08 / 08 ] — INITIATE A PROJECT`
- **Heading:**  
  `Ready to elevate your digital presence?`
- **Sub-headline:**  
  `We take on a limited number of commissions each quarter to guarantee uncompromising craftsmanship. Currently reviewing projects for Q3 / Q4 2026.`
- **Primary Conversion Trigger:**  
  `[ START A CONVERSATION ]` (Opens Architectural Inquiry Drawer)
- **Direct Communication Alternatives:**  
  - Email: `commissions@margin.design`  
  - Telephone: `+31 (0) 20 894 3000`  
  - Direct Studio Calendar: `Schedule a 20-Min Discovery Call [ → ]`
- **Studio Commitment:**  
  `Every inquiry is reviewed directly by our Creative Director within 24 hours.`

#### 3. Spatial Composition & Grid Mapping
- Section shifts to deep obsidian background (`#0C0D10`).
- Col 2/11: Centered monumental headline, followed by the conversion trigger button and direct contact columns below.
- Pinned corner crop marks in terracotta accent (`#D15827`) frame the entire conversion territory.

#### 4. Typography
- Heading: `--type-display-xl` (Editorial Serif, 400, White).
- Sub-headline: `--type-body-lead` (Precision Sans, 400, White with 75% opacity).
- Contact Links: `--type-mono` (Technical Mono, 400).

#### 5. Media Asset Specification
- Subtle ambient dark grain canvas texture in background (`opacity: 0.04`).

#### 6. Motion & Scroll Choreography
- On entry, the terracotta corner crop marks contract from 100vw to frame the inquiry area at 83.33vw, focusing attention into a physical conversion container.

#### 7. Micro-Interactions
- Primary CTA button features an expanding fill hover animation with magnetic cursor snap.

#### 8. Mobile Transformation (390px)
- CTA button expands to 100% width with 54px touch target height for instant thumb tapping.
- Direct `tel:` and `mailto:` links prominently displayed.

---

### SECTION 09: ARCHITECTURAL FOOTER & STUDIO COLOPHON

#### 1. Purpose
Provide formal legal closure, studio wayfinding, sitemap navigation, and an effortless return to the top of the experience.

#### 2. Content & Copy
- **Left Column:**  
  `MARGIN STUDIO B.V.`  
  `Keizersgracht 482, 1016 EG`  
  `Amsterdam, The Netherlands`  
  `KVK: 84920192`
- **Center Navigation:**  
  `Work` · `Studio` · `Capabilities` · `Process` · `Inquire` · `Archive`
- **Right Column / Socials:**  
  `Instagram [ ↗ ]` · `Twitter / X [ ↗ ]` · `LinkedIn [ ↗ ]` · `Awwwards [ ↗ ]`
- **Bottom Bar:**  
  `© 2026 MARGIN. All boundaries reserved.` | `BACK TO TOP [ ↑ ]`

#### 3. Spatial Composition & Grid Mapping
- Desktop: `padding: 5.2vw 8.333vw 3.47vw; background: #08090B; border-top: 1px solid rgba(247, 246, 242, 0.08);`.
- 3-column layout (Col 1/4, Col 5/8, Col 9/12) with bottom legal bar spanning Col 1/13.

#### 4. Typography
- Text & Links: `--type-mono` and `--type-label` (12px / 14px equivalent, high-legibility muted white).

#### 5. Motion & Micro-Interactions
- Clicking `BACK TO TOP` initiates a silky smooth Lenis scroll back to `y = 0` over 1.2 seconds with a custom cubic-bezier deceleration.

#### 6. Mobile Transformation (390px)
- Stacks vertically into three distinct rows; `BACK TO TOP` button anchored at the very base with 44px tap target.

---

## 11. PROJECT PRESENTATION SYSTEM & WORK PORTALS

```
+--------------------------------------------------------------+
| [01 / 06]                    AURELIA HAUTE JOAILLERIE        |
|                                                              |
|   ┌──────────────────────────────────────────────────────┐   |
|   │                                                      │   |
|   │             MONUMENTAL PROJECT CANVAS                │   |
|   │            (Still -> 60fps Video on Hover)           │   |
|   │                                                      │   |
|   └──────────────────────────────────────────────────────┘   |
|                                                              |
| DIGITAL ART DIRECTION / E-COMMERCE               2026 [ -> ] |
+--------------------------------------------------------------+
```

### 11.1 Rejection of the Generic 3-Column Portfolio Grid
MARGIN strictly rejects the standard agency portfolio grid (three small equal cards in a row with tiny thumbnail images). A world-class studio presents its work as **monumental cultural artifacts**, giving each commission generous visual real estate.

### 11.2 The Three Canvas Typologies
1. **The Hero Flagship Canvas (16:9 Landscape):** Spans Col 1/13 (`width: 83.33vw; height: auto; min-height: 70vh`). Used for the studio's primary marquee case studies.
2. **The Asymmetrical Architectural Canvas (4:5 Portrait):** Spans Col 2/8 (`width: 50vw; height: 65vh`), accompanied by a dedicated metadata reading column in Col 9/12.
3. **The Panoramic Cinematic Canvas (21:9 Ultra-Wide):** Spans Col 3/13 (`width: 70vw; height: 50vh`), projecting ultra-wide cinematic presence.

### 11.3 Project Information Architecture
Each project presentation includes strictly useful, verifiable information:
- **Index:** `[ 01 / 06 ]`
- **Client / Project Name:** Clear, dignified typography.
- **Discipline Taxonomy:** E.g., `Brand Translation & Headless Web Architecture`.
- **Contextual Statement:** Exactly 1–2 sentences explaining the project's strategic thesis.
- **Year of Execution:** E.g., `2026`.
- **Interactive Portal Trigger:** Magnetic circle CTA with arrow icon.

---

## 12. CASE STUDY & WORK DETAIL ARCHITECTURE

### 12.1 The Case Study Hierarchy
When a visitor transitions from the homepage into a case study (`/work/[slug]`), the presentation must maintain unbroken aesthetic continuity:
1. **Case Study Hero Canvas:** The project thumbnail expands to become the full-viewport hero.
2. **Project Metadata Ribbon:** A clean 4-column baseline grid displaying:
   - *Client:* Brand name.
   - *Timeline:* Duration of commission.
   - *Services:* Full taxonomy of delivered disciplines.
   - *Live Production URL:* `VISIT LIVE PLATFORM [ ↗ ]`.
3. **The Strategic Narrative:** Exactly three concise editorial chapters:
   - *Chapter I: The Challenge & Spatial Framing.*
   - *Chapter II: The Visual Architecture & Typographic System.*
   - *Chapter III: Digital Craft, Motion & Performance.*
4. **Cinematic Design Artifacts:** Full-bleed interactive screen recordings, macro component crops, mobile layout comparisons, and design system color chips.
5. **The Continuous Next Project Portal:** At the conclusion of the case study, the next project is already visible at the bottom of the screen. Continuing to scroll pulls the next project hero upward without a full page reload or blank white flash.

---

## 13. MOTION LANGUAGE & ANIMATION ARCHITECTURE

```
LEVEL 1: Macro Spatial Framing (Canvas expansions, section scale shifts)
LEVEL 2: Background Luminescence (Smooth interpolation between light and dark)
LEVEL 3: Masked Reveals (Typography lines emerging from hidden bounds)
LEVEL 4: Micro-Interactions (Magnetic buttons, link underlines, cursor labels)
```

### 13.1 Motion Manifesto
- Motion is not decoration; motion is **temporal information architecture**.
- Every animation must have an **Object**, a **Trigger**, a **Purpose**, and a clear rationale for **Why Static is Weaker**.
- We strictly ban universal fade-ins (`opacity: 0 -> 1`).
- All physical motion uses custom easing curves modeled on heavyweight physical inertia.

### 13.2 Easing Curves & Timing Physics Table

| Motion Curve Name | Cubic-Bezier Formula | Duration | Usage Context |
| :--- | :--- | :--- | :--- |
| **`--ease-editorial-out`** | `cubic-bezier(0.16, 1, 0.3, 1)` | `1.1s – 1.4s` | Typography line-mask reveals, hero text entrance |
| **`--ease-spatial-morph`** | `cubic-bezier(0.85, 0, 0.15, 1)` | `0.9s – 1.2s` | "Escaping Margin" canvas expansion, full-bleed zooms |
| **`--ease-curtain`** | `cubic-bezier(0.76, 0, 0.24, 1)` | `0.85s` | Page transition curtain wipes, menu open/close |
| **`--ease-magnetic`** | `cubic-bezier(0.25, 1, 0.5, 1)` | `0.35s` | Cursor pill tracking, magnetic button displacement |
| **`--ease-underline`** | `cubic-bezier(0.76, 0, 0.24, 1)` | `0.45s` | Directional link underline wipes |

---

## 14. EXACT MAJOR ANIMATION CHOREOGRAPHIES

### 14.1 Choreography 01: Preloader to Hero Canvas Unfolding
- **Trigger:** Browser window load event complete.
- **Phase A (0.0s – 0.6s):** A central hairline crop mark `[+]` pulses once in terracotta orange (`#D15827`).
- **Phase B (0.6s – 1.2s):** The crop mark's four corner brackets separate outward toward the 8.333vw margin lines.
- **Phase C (0.9s – 1.8s):** As the crop marks hit the margin bounds, the hero background image fades in from `scale: 1.05` to `scale: 1.0`.
- **Phase D (1.2s – 2.2s):** The three monumental headline lines emerge sequentially from their overflow masks (`y: 110% -> 0%`).

### 14.2 Choreography 02: Typography Line-Mask Split Reveal
- **Trigger:** Element enters viewport (ScrollTrigger `start: "top 85%"`).
- **Structure:**
  ```html
  <div class="split-line-mask" style="overflow: hidden;">
    <div class="split-line-inner" style="transform: translateY(115%); will-change: transform;">
      Exceptional Digital Presences
    </div>
  </div>
  ```
- **Execution:** `gsap.to(inner, { y: "0%", duration: 1.15, ease: "cubic-bezier(0.16, 1, 0.3, 1)", stagger: 0.1 });`

### 14.3 Choreography 03: The "Escaping Margin" Expansion
- **Trigger:** Project card reaches viewport center (ScrollTrigger `start: "top 60%", end: "center center", scrub: 1.2`).
- **Execution:** The image container's inline margins smoothly animate from `margin: 0 0` (constrained within 83.33vw) to `margin: 0 -4vw` (expanding to 91.33vw), while its border-radius softens from `2px` to `0px`. The visual impression is that the project physically expands past its designated margin.

### 14.4 Choreography 04: The Kinetic Showreel Portal Scrub
- **Trigger:** Scrolling into Section 04.
- **Execution:** The showreel section begins pinned. As the user scrolls through the 100vh pin delta, the central video canvas expands from `scale: 0.88` with a 40px margin border until it becomes 100% full-bleed without borders, at which point the pin releases seamlessly into Section 05.

---

## 15. PAGE TRANSITION ARCHITECTURE

### 15.1 Seamless Continuity
MARGIN avoids standard multipage reloads. When navigating between routes:
- **Shared Element Canvas Transition (Preferred):**
  - Clicking a project card captures its exact bounding client rect.
  - The card's image scales and repositions to become the destination page's hero canvas over `0.85s` using `--ease-spatial-morph`.
  - The destination page typography reveals into place without any white screen flash.
- **Curtain Wipe (Fallback for general navigation):**
  - An obsidian curtain (`#0C0D10`) sweeps upward from `translateY(100%)` to `translateY(0%)` over `0.6s`.
  - Route state is swapped in the background.
  - The curtain sweeps off toward `translateY(-100%)` over `0.6s`, revealing the new page already rendered.

---

## 16. CURSOR, POINTER & MICRO-INTERACTION SYSTEM

### 16.1 Desktop Custom Cursor Pill
- On devices with fine pointers (`@media (hover: hover) and (pointer: fine)`):
  - The system cursor is replaced by a custom cursor element.
  - **Resting State:** A crisp 8px dot with a subtle 32px outer ring (`border: 1px solid rgba(18, 19, 22, 0.25)`).
  - **Interactive State (Hovering over links/buttons):** Expands to a 48px circle, ring snaps to border, dot scales to 0.
  - **Project Canvas State:** Morphs into an elongated frosted pill (`backdrop-filter: blur(16px); background: rgba(12, 13, 16, 0.7); color: #fff;`) with monospaced text: `EXPLORE [ → ]`.
- **Absolute Rule:** The custom cursor is **completely disabled** on mobile, tablet, and touch-enabled devices. Native touch feedback is preserved.

---

## 17. MEDIA DIRECTION & ART STANDARDS

### 17.1 Visual Assets Standard
- **No Stock Clichés:** Zero smiling business people in boardrooms, zero floating generic wireframe globes, zero abstract neon 3D shapes.
- **Art Direction Style:** High-contrast architectural photography, tactile physical textures (granite, cast glass, brushed aluminum, raw linen), and razor-sharp macro screengrabs of custom digital interfaces.
- **Color Grading:** Controlled color temperatures with desaturated ambient tones, natural skin tones, and rich carbon blacks.

### 17.2 Media Format & Compression Standard
- All still imagery delivered in next-gen formats (`.webp` and `.avif`) with high-resolution 2× retina density.
- All ambient video encoded in two tracks:
  - Track 1: `video/webm` (VP9 codec, CRF 28, zero audio track).
  - Track 2: `video/mp4` (H.264, Level 4.1, Baseline, zero audio track).
- Background video tags must always include: `playsinline loop muted disablepictureinpicture disableremoteplayback preload="none"`.

---

## 18. COPYWRITING TONE & CONVERSION EDITORIAL

### 18.1 The Voice of MARGIN
- **Tone:** Intellectual, composed, precise, architecturally minded, uncompromising.
- **Sentence Structure:** Short, rhythmic, high impact. Active verbs, zero passive corporate waffle.

### 18.2 Copywriting Contrast Matrix

| Banned Cliché Agency Copy (PROHIBITED) | The MARGIN Voice (MANDATORY STANDARD) |
| :--- | :--- |
| *"We create digital experiences that inspire and delight."* | **"We engineer digital flagships that fundamentally alter how businesses are valued."** |
| *"We are a passionate team of creative thinkers and makers."* | **"A dedicated studio of digital architects, art directors, and frontend engineers."** |
| *"Check out our awesome portfolio of recent work!"* | **"Selected commissions. Six case studies in digital craftsmanship."** |
| *"Contact us today for a free quote!"* | **"Initiate a project. We accept a limited number of commissions per quarter."** |
| *"Innovative solutions for the modern digital era."* | **"Architectural precision, editorial typography, and kinetic restraint."** |

---

## 19. CONVERSION ARCHITECTURE & UX FUNNEL

```
[ PERSISTENT HEADER CTA ] ----------+
                                    |
[ SECTION 08 IMMERSIVE CTA ] -------> ===> [ THE ARCHITECTURAL INQUIRY DRAWER ]
                                    |      - Scope Selection (Brand / Web / Product)
[ CASE STUDY CONCLUSION CTA ] ------+      - Timeline & Budget Qualification
                                           - Direct Calendar Booking or Structured Brief
```

### 19.1 Commercial Intent Without Aesthetic Compromise
MARGIN is a commercial design studio. Aesthetics serve to build commercial authority, and commercial conversion must be effortless, dignified, and high-prestige.

### 19.2 The Three Conversion Entry Points
1. **Persistent Header Button:** Top-right `[ START A PROJECT ]` button, unobtrusive but always accessible.
2. **Section 08 Marquee Portal:** The dedicated conversion territory at the conclusion of the homepage narrative.
3. **Case Study Final Action:** Every project page concludes with: `"Desire an equivalent standard for your brand? Initiate a conversation [ → ]"`.

### 19.3 The Architectural Inquiry Drawer (The Modal Experience)
Clicking any conversion trigger opens a full-height architectural drawer sliding in from the right (`width: min(600px, 92vw)`):
- **Step 1: Scope Identification:** Clean pill selectors (`[ Brand Identity ]`, `[ Digital Flagship ]`, `[ Headless E-Commerce ]`, `[ Custom Web App ]`).
- **Step 2: Budget Expectation:** Transparent tiers reflecting premium studio positioning (`[ €20k–€35k ]`, `[ €35k–€60k ]`, `[ €60k+ ]`).
- **Step 3: Direct Contact Information:** Name, Organization, Email, Project Brief field.
- **Direct Alternative:** Integrated Cal.com / Calendly embed: `Schedule a 20-min Discovery Call directly with our Creative Director`.
- **Response Commitment:** Monospaced guarantee: `[ RESPONSE WITHIN 24 HOURS GUARANTEED ]`.

---

## 20. DESKTOP EXPERIENCE RULES (1440px – 2560px)

1. **Window Resizing Resilience:** All layout grids and typography calculate from fluid `vw` units and CSS `clamp()`, ensuring seamless scaling across 1440px, 1920px (standard iMac/Studio Display), and 2560px (ultra-wide).
2. **Maximum Content Constraint:** At viewports > 1920px, central content is capped at `1800px` max-width to prevent unreadable line lengths for body text.
3. **Inertial Wheel Smoothing:** Desktop incorporates lightweight, performant inertial smooth scrolling (Lenis) with damped wheel physics (`lerp: 0.08, smoothWheel: true`).
4. **Zero Layout Shifts:** All image containers explicitly declare aspect-ratio boxes or padding-bottom wrappers to prevent any Cumulative Layout Shift (CLS = 0.00).

---

## 21. MOBILE EXPERIENCE ARCHITECTURE & TRANSFORMATION RULES (390px)

```
DESKTOP (1440px)                             MOBILE (390px)
----------------------------------------     ----------------------------------------
12-Column Grid with Asymmetric Offsets       1-Column Linear Vertical Flow
Horizontal 3-Part Project Variations         Single Harmonious 4:5 Portrait Canvases
Hover-Triggered Looping Videos               Inline Muted Auto-Playing Loops
Custom Glass Magnetic Cursor Follower        Native OS Touch Feedback (Cursor Disabled)
Scrubbed Extended Height Sections (150vh)    Native Fluid Sections (100vh Max Pinned)
Horizontal Nav Strip with Delayed Underline  Architectural Fullscreen Overlay Drawer
```

### 21.1 First-Class Mobile Philosophy
Mobile is not a scaled-down desktop; mobile is an **intimate, tactile editorial experience**. 
- Minimum touch target for all buttons and interactive controls is **48px × 48px**.
- Outer side margins are locked to `8.0vw` (~31px at 390px).
- Heavy multi-layer parallax is flattened to simple vertical flow to preserve a buttery 60fps on mobile Safari.
- Typography scales gracefully via `clamp()` formulas, ensuring headlines never wrap into single orphan words.

---

## 22. RESPONSIVE BREAKPOINT MATRIX & LAYOUT TABLES

| Breakpoint Range | Device Class | Outer Margins | Grid Columns | Typography Multiplier | Motion Strategy |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`320px – 480px`** | Mobile Devices (iPhone 14/15/16) | `8.0vw` | 1 Column | 1.0× Mobile Clamp Scale | Linear scroll, 0 parallax, native touch |
| **`481px – 768px`** | Large Phones & Mini Tablets | `6.0vw` | 2 Columns | 1.15× Mobile Scale | Simplified scroll, no cursor follower |
| **`769px – 1024px`** | Tablets & Small Laptops | `6.0vw` | 6 Columns | 0.85× Desktop Clamp Scale | Partial parallax, touch or cursor adaptive |
| **`1025px – 1440px`**| Standard Laptops & Desktops | `8.333vw` | 12 Columns | 1.0× Desktop Clamp Scale | Full motion suite, magnetic cursor, Lenis |
| **`1441px – 1920px`**| High-Res Desktop Displays | `8.333vw` | 12 Columns | 1.05× Desktop Scale | Full motion suite, maximum cinematic impact |
| **`1921px+`** | Ultra-Wide Displays (4K/5K) | Max 1800px box | 12 Columns | Scaled with clamp cap | Centered grid with expanded outer margins |

---

## 23. PERFORMANCE CONSTRAINTS & RENDERING BUDGETS

### 23.1 Core Web Vitals Targets
- **Largest Contentful Paint (LCP):** `< 1.2s` (Target: < 900ms on 4G networks).
- **Interaction to Next Paint (INP):** `< 100ms` (Target: < 50ms).
- **Cumulative Layout Shift (CLS):** `0.00` (Strictly zero shift).
- **First Input Delay (FID):** `< 50ms`.

### 23.2 Technical Asset Budgets
- **Total Initial JS Bundle:** `< 120KB` gzipped (Vanilla JS / lightweight GSAP core + Lenis).
- **Total Initial CSS:** `< 35KB` gzipped (pure vanilla CSS custom properties, zero Tailwind bloat).
- **Hero Image Weight:** `< 180KB` (WebP/AVIF format with responsive srcset).
- **Background Video Streaming:** Capped at `2.5Mbps` bitrate, lazy-loaded only when section approaches viewport.

### 23.3 GPU Layer & Hardware Acceleration Guidelines
- Only animate `transform` and `opacity`.
- Use `will-change: transform` strictly during active animation lifecycles and remove immediately afterward to prevent mobile memory leaks.
- Zero expensive CSS `filter: drop-shadow()` or nested `backdrop-filter: blur()` over animated elements during active scroll.

---

## 24. ACCESSIBILITY, INCLUSIVE DESIGN & REDUCED MOTION

### 24.1 WCAG 2.1 AA Compliance
- **Color Contrast:** All body text maintains a minimum contrast ratio of `7:1` against its background; large display headings maintain at least `4.5:1`.
- **Keyboard Navigation:** Every interactive element has a visible, high-contrast `:focus-visible` architectural outline in terracotta accent (`#D15827`).
- **Semantic HTML5:** Strict semantic document outline (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`, exactly one `<h1>` per page).
- **Screen Reader Announcements:** All decorative SVG icons and crop marks are marked with `aria-hidden="true"`. All interactive controls possess clear `aria-label` descriptors.

### 24.2 Reduced Motion Strategy (`prefers-reduced-motion`)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .split-line-inner {
    transform: none !important;
  }
  .custom-cursor {
    display: none !important;
  }
}
```
When reduced motion is detected:
- Smooth scrolling (Lenis) is disabled in favor of standard instant scrolling.
- Overflow masked line reveals are disabled; content renders instantly at `y: 0`.
- Media parallax and escaping margin expansions are locked to static resting states.

---

## 25. ANTI-PATTERNS & EXPLICIT CREATIVE BOUNDARIES

The following 20 design patterns are **expressly prohibited** on the MARGIN platform:

1. **NO Bento Grids:** Bento boxes have become an overused template cliché. MARGIN uses classical editorial column composition.
2. **NO Card Stacking Clutter:** No repetitive little cards with rounded corners, icons in little pastel squares, or drop shadows.
3. **NO Glassmorphism Everywhere:** No gratuitous frosted glass cards that look like standard Dribbble mockups.
4. **NO Neon Glowing Borders:** No gradient borders with neon pulsing highlights.
5. **NO Meaningless 3D Objects:** No floating metallic spheres, chrome donuts, or random Three.js blobs that provide zero editorial context.
6. **NO Generic SaaS Headings:** No 64px Inter Bold headings paired with purple gradients.
7. **NO AI / Marketing Clichés:** No copy containing "unlock", "supercharge", "next-gen", "paradigm shift", or "revolutionize".
8. **NO Fake Prestige or Gold Accents:** No shiny gold gradients or fake "award-winning" gold wreaths. Prestige comes from typographic restraint.
9. **NO Fabricated Metrics:** No fake stats such as "99.8% Client Happiness" or "10M+ Users Reached".
10. **NO Unreadable Light Grey Text:** No low-contrast grey-on-white text that fails accessibility standards.
11. **NO Universal Fade-Up Animation:** No lazy `opacity: 0 -> 1` and `y: 30px` applied identically to every element.
12. **NO Aggressive Scroll Jacking:** No unnatural scroll traps that lock user control or fight natural wheel momentum.
13. **NO Mobile Cursor Artifacts:** No floating laggy dots chasing fingers on mobile touchscreens.
14. **NO Fullscreen Autoplay Video with Audio:** Audio must always remain user-initiated.
15. **NO Unoptimised Heavy Frameworks:** No 5MB React runtime bundles loaded for what is fundamentally an editorial brand flagship.
16. **NO Popups or Aggressive Modals:** No "Sign up for our newsletter" popups appearing after 5 seconds.
17. **NO Overused Corner Marks:** The MARGIN crop mark must be used sparingly as an architectural seal, not stamped onto every container.
18. **NO Generic 3-Column Portfolio Grids:** Projects must receive significant, varied visual territory.
19. **NO Horizontal Scroll Locks that Trap Users:** No full-page horizontal pinning that prevents natural vertical progress.
20. **NO Broken Aspect Ratios or Media Stretches:** All images and videos must use strict `object-fit: cover` with predefined container ratios.

---

## 26. BUILD PRIORITIES & TECHNICAL PHASING

Implementation must proceed strictly according to the following phased roadmap:

```
PHASE 1: Foundation Tokens & Grid System
         (CSS Custom Properties, Fluid Clamp Scales, 12-Column Grid, Lenis Setup)
                           │
                           ▼
PHASE 2: Architectural Layout & Typographic Skeleton
         (Header Navigation, 9 Homepage Sections, Footer Colophon)
                           │
                           ▼
PHASE 3: Kinetic Engine & Masked Reveals
         (GSAP ScrollTrigger, Overflow Masks, Dynamic Header Color Adaptation)
                           │
                           ▼
PHASE 4: Project Portals & "Escaping Margin" Mechanics
         (Flagship Canvases, Video-on-Hover, Asymmetrical Layouts)
                           │
                           ▼
PHASE 5: Conversion Architecture & Interactive Drawer
         (Inquiry Drawer Modal, Form Validation, Calendar Embed)
                           │
                           ▼
PHASE 6: Mobile Transformation & Performance Hardening
         (390px Viewport Audit, Touch Optimization, Core Web Vitals Sign-off)
```

---

## 27. ACCEPTANCE CRITERIA & QUALITY SIGN-OFF CHECKLIST

Before any page or component is considered production-ready for MARGIN, it must achieve 100% compliance against the following 30 verification criteria:

- [ ] **1. Typographic Authority:** Does the page feature clear contrast between the Editorial Serif and Precision Sans?
- [ ] **2. Monumental Scale:** Does the hero title possess commanding physical presence (`> 15vw`) without awkward line wraps?
- [ ] **3. Active Margin Discipline:** Are the `8.333vw` desktop and `8.0vw` mobile margins strictly preserved across all sections?
- [ ] **4. Line-Mask Mechanics:** Do all major titles and section labels reveal smoothly from overflow masks without generic opacity fades?
- [ ] **5. Dynamic Header Adaptation:** Does the fixed header invert its color seamlessly within 400ms when crossing light/dark section thresholds?
- [ ] **6. Color Discipline:** Is the terracotta accent (`#D15827`) restricted strictly to functional indicators and kept under 2% visual area?
- [ ] **7. Surface Palette Balance:** Does the warm canvas (`#F7F6F2`) feel warm and cotton-like rather than sterile default white?
- [ ] **8. Dark Canvas Depth:** Does the dark obsidian canvas (`#0C0D10`) feel rich and warm rather than flat RGB `#000000`?
- [ ] **9. "Escaping Margin" Effect:** Do project canvases dynamically expand past the 83.33vw grid when scrolled into central view?
- [ ] **10. Video Stream Quality:** Are all looping background videos completely silent, muted, playsinline, and under 3.5Mbps bitrate?
- [ ] **11. Performance Score:** Does Lighthouse report Performance >= 95, Accessibility = 100, Best Practices = 100, SEO = 100?
- [ ] **12. Inertial Scroll Feel:** Does the scroll physics (Lenis) feel silky and weighted without feeling laggy or fighting user intent?
- [ ] **13. Mobile 390px Integrity:** Has the layout been verified on a physical mobile viewport (390px width) without horizontal overflow?
- [ ] **14. Mobile Touch Targets:** Are all mobile buttons and links at least 48px × 48px in clickable area?
- [ ] **15. Custom Cursor Behavior:** Is the custom magnetic cursor follower enabled only on desktop and completely absent on touch devices?
- [ ] **16. Magnetic Button Physics:** Do primary interactive CTA buttons exhibit subtle physical displacement toward the cursor (max 12px)?
- [ ] **17. Zero Layout Shift:** Does the page load with CLS = 0.00, with all media reserving its aspect ratio prior to asset download?
- [ ] **18. Image Resolution:** Are all photographic assets sharp on 2× retina screens with responsive `srcset` definitions?
- [ ] **19. Directional Underlines:** Do text link underlines wipe from left-to-right on enter, and right-to-left on exit?
- [ ] **20. Conversion Clarity:** Can a new visitor understand what MARGIN does and find the inquiry mechanism within 5 seconds?
- [ ] **21. Inquiry Drawer Usability:** Does the project inquiry modal open cleanly, validate inputs, and handle keyboard Escape key dismissals?
- [ ] **22. Copywriting Authenticity:** Is all copy free of agency clichés, marketing buzzwords, and unsubstantiated claims?
- [ ] **23. Reduced Motion Compliance:** Does setting `prefers-reduced-motion: reduce` instantly disable all continuous animations and parallax?
- [ ] **24. Semantic Markup:** Does the page contain exactly one `<h1>`, logical heading hierarchy (`<h2>`, `<h3>`), and semantic landmarks?
- [ ] **25. Focus Rings:** Are keyboard tab navigation focus states clearly visible with a custom terracotta focus indicator?
- [ ] **26. Corner Crop Restraint:** Is the corner crop mark `[+]` used only in designated anchor locations and never repeated as wallpaper?
- [ ] **27. Continuous Flow:** Are there zero jarring hard boundaries or awkward stacked card boxes between sections?
- [ ] **28. Browser Rendering Authority:** Does the final rendered result in Chrome, Safari, and Firefox look visually identical to this design lock?
- [ ] **29. Back to Top Smoothness:** Does clicking the footer "BACK TO TOP" trigger a smooth, elegant deceleration back to the hero?
- [ ] **30. The "Exo Ape Test":** Does the finished site stand shoulder-to-shoulder with internationally celebrated studios in art direction and craft?

---

**END OF DESIGN LOCK SPECIFICATION**  
*MARGIN Studio Architecture — Approved for Implementation.*
