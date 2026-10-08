# MARGIN — static structural pass

Completed in the existing Vite / React project at `/Users/gio/Desktop/Margin Website`.
The registered `Margin Webdesign` path was stale. No new site or design identity was created.
The current structural brief takes precedence over the older motion and proof examples in `margin-design-lock.md`.

- Preserved the palette, Newsreader / Inter pairing, serif / italic hero relationship, wordmark, three project names, existing media and dark work territory.
- Light typographic navigation; shorter hero copy; three positioning principles; individually composed portfolio canvases; four concise capabilities; four process chapters; full dark CTA environment; minimal footer.
- Removed custom cursor, preloader, mounted GSAP / Lenis choreography, hover-dependent reveals, redundant descriptions, fake metrics, example production links, simulated form success, unsupported location / telephone / social links and invented budget brackets.
- Retained project details as dialogs: this checkout had no project detail routes. The three presentations are labeled design studies because no evidence of delivered client work or outcomes was supplied.
- Omitted the optional photo section: no dedicated approved studio photograph was supplied. No blank section or invented image was added.

## Motion boundaries

- Hero: `.hero-media-shell > .hero-media-frame > .hero-media-inner`; desktop / mobile source and poster fields in `src/data/media.ts`. Static hero uses the poster, with no autoplay or background video download.
- Work: `data-project-id`, `data-transition-media`, `.cover-layer`, `.interface-layer`, `.interaction-overlay`. Layers have identical dimensions. No reveal animation is installed. Optional interface video / poster fields are present.
- Reel: `data-motion-stage="reel"`; play, pause, sound and keyboard-seek controls reflect actual video events. Controls remain disabled while no real film is configured. Playback pauses when leaving the viewport or hiding the tab.
- Process: `.process-stage`, `.process-step`, `.process-index`, `.process-title`, `.process-description`, `data-process-step`.
- Header: `data-header-theme`, `data-scrolled`; section `data-theme` attributes. CTA frame and capability fragment hooks are prepared.
- Native dialogs supply focus trapping, Escape dismissal and focus restoration. Shared dialog cleanup restores scrolling.
- GSAP, @gsap/react and Lenis are installed but excluded from the static application bundle. No second animation or scrolling engine was added.

## Media still pending

- Replace the legacy hero light / shadow clip and poster with the real 6–10 second MARGIN interface film, including a mobile source.
- Supply the real 15–20 second studio reel, soundtrack and poster. The unrelated architecture clip is disconnected; a clearly marked Valt interface still currently occupies the reel slot.
- Existing covers and interface studies are retained. Original files are untouched; responsive WebP renditions are supplied. Final photography approval and delivered-work evidence were not supplied.

## Verification and limits

- Full rendered homepage inspected at 1440, 900 and 390 pixels. Final mobile verification used touch mode. No horizontal overflow, broken images, failed requests or browser runtime errors.
- Checked hero, positioning, all three projects, reel, capabilities, process, CTA and footer. Corrected the mobile process headline and project order, overlay leakage, header contrast and modal edge treatment.
- Keyboard dialog focus, Escape, return focus, menu navigation and invalid-email validation passed. Play / pause / sound / keyboard seek passed using a browser-only video fixture; the actual final reel remains absent.
- `npm run build` and `npm run lint` pass. Bundle: approximately 74.9 kB JavaScript and 5.0 kB CSS gzip. This is build output, not a Lighthouse score.
- Inquiry prepares an email draft; it does not pretend a backend has received the message. Contact uses the address previously supplied by the owner: `info@marginwebdesign.online`.
- No legal routes or approved legal text exist in this checkout; no fake legal destination was added.
- No technical blocker for this static pass. Advanced motion is deliberately deferred.

Browser results and opening viewport captures: `qa/static-pass/`.
