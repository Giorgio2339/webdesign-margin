# MARGIN — signature motion pass

Continues the approved static pass in `/Users/gio/Desktop/Margin Website`. No new design identity, marketing section, copy claim, project or generated asset was introduced. `motion-review.md` records the first engineering review. A later owner-requested video pass reinstated both supplied films and made their purpose explicit.

## Implemented

- Coordinated GSAP / useGSAP / matchMedia lifecycle with editorial, spatial and micro easing. One Lenis wheel engine uses the GSAP ticker; touch scroll stays native. Responsive contexts clean up triggers, pins, listeners, cursor and media queues. No WebGL or additional animation package.
- Hero line-mask entry, full-viewport film stage, retracting corner marks and muted, inline looping playback. The headline, positioning copy and navigation now sit directly inside the moving monochrome image, with a dark readability scrim and a dedicated mobile crop. The scroll release scales the film and clears the foreground in one controlled chapter. Playback pauses outside the viewport and when the tab is hidden. Existing footage is optimized to ~2 MB desktop and ~783 KB mobile; originals remain intact.
- Selected light/dark boundary takeovers, cached header contrast and deliberate hide/return thresholds. Directional project cover masks respond to hover and keyboard focus. Touch keeps the full-size cover and reveals the interface through case navigation.
- Each project now enters through its own directional viewport mask with a staggered metadata reveal. The varied full-width, portrait and landscape geometry remains intact, so the sequence feels art-directed instead of repeated.
- Four-corner MARGIN cursor with VIEW / PLAY / OPEN states, direct pointer setters and native-input cursors. Disabled on touch, narrow viewports and reduced motion. Native cursor is hidden only after a successful mouse update; the frame lives inside a dialog when needed.
- Real `/work/aurelia`, `/work/kronos`, `/work/valt` URLs, direct visits, reload, back/forward and next-study links. Flip-fit bridges preserve media geometry inside the native top layer. URL changes do not wait for animation. Close uses a spatial return where the source is visible and a short fallback elsewhere.
- Work in Motion uses the supplied 7.37-second architecture-reflection film as a clearly labeled temporary atmosphere study in one calm, wide media field. It has ordinary custom play/pause and progress controls without scroll pinning or oversized “Play / Reel” typography. Mobile uses a dedicated square encode. The source has no audio, so the UI says “Silent film” instead of offering a misleading sound switch.
- The capability area now keeps one art-directed project crop visible on desktop and changes it with the active capability. It uses approved local MARGIN study imagery; no third-party photo or unverified client proof was introduced.
- A light editorial bridge now brings the three existing interface studies together around a large MARGIN wordmark. The images converge from different directions on scroll, remain individually linked to their projects and resolve into a clean static composition for reduced motion.
- Quiet capability fragments, four desktop process chapters in a 140vh pin, an accessible semantic process list, mobile vertical reveals, CTA masks/corner contraction and link microinteractions. Frame-crop mobile menu, Escape, explicit Tab wrapping, native background inertness, scroll locking and focus restoration.
- Reduced motion renders visible static content, ordinary navigation and media; it omits cursor, smooth scrolling, pins, scrubs and large entrances.

## Media replacement contract

Edit `src/data/media.ts`; do not replace component structure.

| Slot | Film | Desktop source | Mobile source | Poster |
| --- | --- | --- | --- | --- |
| Hero | Real MARGIN interface film, 6–10 seconds; silent loop | H.264 MP4, 1920×1080 / 16:9; frame crops to 2.1:1 | H.264 MP4, ~1080×918 / 4:3.4; deliberately re-edited for the mobile crop | Matching approved still; WebP or JPEG |
| Reel | Real studio interactions, 15–20 seconds; optional soundtrack | H.264 MP4, 1920×1080 / 16:9 | Re-edited ~1080×1080 / 1:1 | Matching 1920px desktop and mobile still |

Use `yuv420p`, `+faststart` and 24–30fps. A short GOP (about 6–12 frames) is useful if a future film returns to scroll-controlled seeking. Verify the final file in Chrome and WebKit. Supply a separate audio track within the reel if sound is intended. The current source is silent.

Pending: replace the temporary light/shadow hero with the real MARGIN interface film and replace the explicitly temporary atmosphere study with a real 15–20-second project showreel. Existing project covers/interface studies are preserved; final photographic and mobile interface assets were not supplied. The optional studio-photo section remains unnecessary until an authentic studio image exists.

## Current section and transition direction

- No additional marketing section is needed. The current sequence already covers positioning, proof, motion, capabilities, process and conversion.
- Hero: full-screen muted film, masked typography and one restrained release into the positioning statement.
- Positioning: one calm line reveal; no pinned effect.
- Selected Work: dark boundary takeover, restrained image drift, directional cover-to-interface masks and spatial case transitions.
- Editorial assembly: three existing interface studies converge into one brand composition; no fabricated media or new proof claim.
- Work in Motion: one calm responsive film field with direct custom controls.
- Capabilities: quiet focus/hover fragments only; the text remains the primary content.
- Process: one desktop chapter sequence, vertical mobile reading order.
- CTA: four-corner frame contraction, headline masks and the strongest link underline.
- The next meaningful upgrade is better source material, not another section: a real MARGIN hero film, real interface reel and verified project outcomes.

## Reference translation

The Exo Ape homepage was inspected in rendered scroll states on 2 October 2026. MARGIN adopts the transferable principles—dominant media, oversized typography, asymmetric image scale, expanding film geometry and decisive surface changes—while retaining its own serif system, warm paper tone, dark work environment, project content and conversion path. No Exo Ape copy, imagery, layout or code was imported.

## Verification

- Full homepage in Chrome and Playwright WebKit 26.5 at 1440 / 1024 / 768 / 390px. WebKit tests exercise the Safari engine; they do not claim physical iOS device testing.
- No horizontal overflow, runtime errors or failed production asset requests. Full scroll included hero, positioning, editorial assembly, all projects, reel, capabilities, process, CTA and footer.
- Project masks / keyboard focus, case URLs / reload / history / next study, mobile menu / Tab wrap / Escape, inquiry dismissal, cursor top-layer placement and reduced motion passed.
- The editorial assembly loads all three interface studies without overflow at 1440 / 1024 / 768 / 390px. The showreel has no pin and direct play/pause works across those sizes.
- Exactly one desktop process pin/cursor and zero process pins on compact layouts. All four process holds have one visible title and description.
- Visibility pause/resume, live reduced-motion toggling, three consecutive case opens/closes, focus return and scroll-lock release also pass in the final production build.
- Production build and lint pass after the editorial assembly pass. Final bundle approximately 145.7 kB JS and 7.3 kB CSS gzip. This is a build measurement, not a Lighthouse result.
- Production preview: `http://127.0.0.1:4173/`. Case deep links pass in Vite preview. A production host must serve `index.html` for `/work/*`; hosting is not configured or deployed in this checkout.

Evidence: `qa/editorial-assembly/`, `qa/fullscreen-hero/` and `qa/signature-motion/`. Browser scripts use the local bundled Playwright runtime.

No implementation blocker remains. Real film delivery and validation against those final files remain pending.
