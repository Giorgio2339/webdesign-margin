# First implementation review — one correction pass

1. **PROBLEM** Hero line masks increase the approved line spacing.
   **WHY** Adjacent negative margins collapse, pushing supporting copy and media down.
   **EXACT CORRECTION** Give the existing hero lines a vertical flex context; balance editorial mask padding with one bottom margin.
   **DO NOT CHANGE** Type size, headline, line breaks, palette or section composition.

2. **PROBLEM** Discover is masked out at the process entry.
   **WHY** The first chapter uses the same entrance state as subsequent chapters.
   **EXACT CORRECTION** Show chapter 01 immediately; mask only chapter replacements.
   **DO NOT CHANGE** Four approved phases, descriptions or mobile sequence.

3. **PROBLEM** Automatic touch reveals letterbox landscape interfaces inside portrait project media.
   **WHY** That reduces the visual scale of project presentation while scrolling.
   **EXACT CORRECTION** Keep photographic covers on touch; show the interface when opening the case.
   **DO NOT CHANGE** Desktop directional masks, large mobile canvases or project order.

4. **PROBLEM** Temporary desktop hero encode is 7.8 MB.
   **WHY** Moving grain consumes disproportionate bandwidth at an unconstrained CRF.
   **EXACT CORRECTION** Apply a capped bitrate to desktop and mobile H.264 encodes, retain fast-start and remove audio.
   **DO NOT CHANGE** Approved footage, duration, poster or media aspect ratios.

Applied together once. Subsequent changes are limited to functional defects found in browser verification.
