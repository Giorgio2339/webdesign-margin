# PREMIUM DESIGN AUDIT — MARGIN.

## 5. CURRENT DESIGN DNA
1. **Editorial Typography Contrast:** Kombination aus fließender, weicher `Instrument Serif` für Headlines und harter, präziser `Inter` für UI-Elemente und Fließtext.
2. **Cinematic Color Palette:** Strenger Verzicht auf bunte Primärfarben. Reduktion auf Near-Black, Warm Ivory und Dark Cherry für maximale Tiefe und Eleganz.
3. **Architectural Grid & Framing:** Haarlinien (`.hero-grid-lines`, `.margin-line`) geben der Seite eine messerscharfe, fast technische Einrahmung.
4. **Asymmetric Rhythm:** Der Wechsel zwischen zentrierten, asymmetrischen und breitformatigen (Cinematic) Projekt-Thumbnails bricht das klassische Grid auf.
5. **High-Fidelity Canvas Motion:** Die interaktive, partikelbasierte Hand-Skulptur mit flüssigem "Teardrop Comet Tail" erzeugt einen taktilen Wow-Moment.
6. **Kinetic Typography:** Subtile, scroll-gebundene Typografie-Manipulationen (z.B. das Zusammenziehen des Wortes "durchschnittlich").
7. **Negative Space:** Große, mutige Weißräume (bzw. Schwarzräume), die den Inhalt atmen lassen.
8. **Vertical Typographic Accents:** Laufende Seitenränder ("MARGIN / SELECTED WORK") erinnern an hochwertige Print-Magazine.
9. **Scroll-Driven Storytelling:** Starker Einsatz von Scrub-Animationen (Hero Zoom, Process Scene), die den Nutzer physisch mit der Seite verbinden.
10. **Quiet Confidence:** Keine lauten "Fade-Up-Partys" beim Scrollen, sondern gezielte, ruhige Entfaltung der Elemente.

**Score: 8.5/10 — Fast eine Signature-Marke**
*Begründung:* Das Layout und die Farbwelt sind bereits weit entfernt von generischen SaaS-Templates. Die Mischung aus harter Architektur (Linien) und organischer Bewegung (Hand) schafft eine starke Spannung. Um auf 10/10 zu kommen, müssen Details wie die Capabilities-Sektion noch den gleichen "Signature"-Charakter erhalten.

## 6. PREMIUM DESIGN SCORE
| Kategorie           | Score | Begründung |
| ------------------- | ----: | ---------- |
| First Impression    |  8/10 | Sehr stark, dunkel und edel. Der Reveal ist etwas standardmäßig. |
| Hero                |  7/10 | Der Zoom ist solide, aber das Konzept nutzt sich langsam ab. |
| Typography          |  9/10 | Starker Kontrast, sehr gut gesetzt, wunderschöne Proportionen. |
| Layout              |  9/10 | Das 12-Spalten-Grid mit asymmetrischen Brüchen wirkt sehr editorial. |
| Spacing             |  9/10 | Sehr großzügig, lässt den Inhalt perfekt atmen. |
| Visual Hierarchy    |  8/10 | Klar lesbar, Labels grenzen den Rhythmus gut ab. |
| Brand Character     |  8/10 | Stark, aber Sektion 04 (Capabilities) fällt visuell leicht ab. |
| Originality         |  8/10 | Definitiv kein Template. Die Hand-Interaktion ist außergewöhnlich. |
| Motion Design       |  8/10 | Canvas und Scrubbing sind top. Einige Fade-Ins wirken noch etwas formelhaft. |
| Microinteractions   |  7/10 | Hover-States bei Projekten sind gut, aber Navigation und CTAs vertragen mehr Magie. |
| Section Transitions |  6/10 | Harte Kanten zwischen Near-Black und Ivory. Hier ist Potenzial für kreativere Übergänge. |
| Imagery / Graphics  |  8/10 | Die Hand ist 10/10, die `.cap-shape` Rechtecke eher 4/10. |
| Navigation          |  7/10 | Funktional minimal, könnte auf Desktop noch eleganter integriert sein. |
| Mobile Experience   |  7/10 | Solide, aber visuelle Wucht geht teilweise verloren. |
| Technical Polish    |  9/10 | Lenis und GSAP ScrollTrigger sauber integriert, Canvas enorm performant. |
| Premium Perception  |  8/10 | Fühlt sich bereits nach einem sehr teuren Studio an. |

### CURRENT OVERALL SCORE: 7.9/10
### REALISTIC POTENTIAL: 9.5/10

## 7. DIE 5 STÄRKSTEN ELEMENTE
### 1. Die Dark Cherry Manifesto Hand
**Warum funktioniert es?** Die Mischung aus organischer Partikeldrift, architektonischem Gleam und dem Kometenschweif-Reveal bei Hover ist technisch anspruchsvoll.
**Warum wirkt es hochwertig?** Es ist keine plumpe 3D-Spielerei, sondern wirkt wie feine digitale Kunst.
**KEEP**

### 2. Typografie-Kontrast (Instrument Serif + Inter)
**Warum funktioniert es?** Die Serife bringt Emotion und Klasse, die Sans-Serif technische Präzision.
**Warum wirkt es hochwertig?** Perfektes Spacing und Gewichtung (z.B. Tracking in den Labels).
**KEEP**

### 3. Asymmetrisches Projekt-Grid
**Warum funktioniert es?** Es bricht die Erwartungshaltung und zwingt das Auge, jedes Projekt neu zu entdecken (Centered, Asymmetric, Cinematic).
**Warum wirkt es hochwertig?** Es zitiert High-End-Architektur- und Modemagazine.
**KEEP**

### 4. Architektonische Haarlinien (.hero-grid-lines / .margin-line)
**Warum funktioniert es?** Sie rahmen den Content fast unmerklich ein und definieren physische Margins.
**Warum wirkt es hochwertig?** Zeugt von absoluter Kontrolle über den Raum.
**KEEP**

### 5. Kinetische Typografie ("durchschnittlich")
**Warum funktioniert es?** Das Wort wird beim Scrollen physisch zusammengedrückt. Die Message wird durch das Design unterstrichen.
**Warum wirkt es hochwertig?** Zeigt Liebe zum Detail und eine tiefe Integration von Scroll und Inhalt.
**KEEP**

## 8. DO NOT TOUCH
* Die gesamte Logik der `.manifesto-hand-interaction` (Die Partikel, Motes und Strands sind perfekt).
* Das Farbkonzept (Near Black, Warm Ivory, Dark Cherry).
* Die Font-Kombination (Instrument Serif & Inter).
* Die vertikalen `.margin-line` Seitenränder.
* Das Layout-Raster in der Projekt-Übersicht.

## 9. DIE 10 GRÖSSTEN SCHWÄCHEN
### 1. Capabilities Visual (.cap-shape)
**Wo tritt es auf?** Section 04.
**Warum wirkt es schwächer?** CSS-Rechtecke und Linien, die sich bei Hover verschieben, wirken neben der genialen Hand-Animation wie ein rudimentäres Platzhalter-Design.
**Welche Wirkung hat es?** Reißt den Premium-Eindruck kurzzeitig ein ("Template-Gefühl").
**Lösung:** Ein hochwertiges Visual, z.B. monochrome, abstrakte Makro-Fotografie von Materialien, die den Hover-Status fließend reflektieren.
**Priorität:** HIGH

### 2. Process 3D Scene
**Wo tritt es auf?** Section 05.
**Warum wirkt es schwächer?** "Explodierende" CSS 3D Layer wirken schnell billig und anstrengend, oft fehlt es an Depth-of-Field und korrektem Lighting.
**Welche Wirkung hat es?** Erinnert an 2018er CSS-Tricks, nicht an High-End Studio Work 2026.
**Lösung:** Extreme Reduktion auf Typografie. Mechanischer Y-Achsen-Split der großen Wörter ("DISCOVER" -> "DESIGN"). Flach, extrem scharf, extrem präzise.
**Priorität:** HIGH

### 3. Section Transitions (Harte Schnitte)
**Wo tritt es auf?** Zwischen Hero (Schwarz) -> Work (Ivory) -> Manifesto (Cherry).
**Warum wirkt es schwächer?** Es sind aneinandergereihte Blöcke.
**Welche Wirkung hat es?** Stört den Flow einer kohärenten Experience.
**Lösung:** Clip-Path Reveals oder Sticky-Handoffs (die alte Section bleibt stehen, die neue schiebt sich wie eine Klinge darüber).
**Priorität:** HIGH

### 4. Hero Intro (Loader Reveal)
**Wo tritt es auf?** Beim initialen Laden der Seite.
**Warum wirkt es schwächer?** Fade-Ins von Headline und Copy sind absoluter Standard.
**Welche Wirkung hat es?** Der wichtigste Moment (die ersten 2 Sekunden) flasht nicht tiefgreifend.
**Lösung:** Ein orchestrierter Typografie-Split aus Masken heraus, während sich die Haarlinien wie feine Scanner-Laser aufbauen.
**Priorität:** MEDIUM

### 5. CTA Buttons & Links
**Wo tritt es auf?** Überall (VIEW PROJECT, PROJEKT STARTEN).
**Warum wirkt es schwächer?** Nur eine animierte Line-Unterstreichung.
**Lösung:** Ein sehr feiner Magnetic-Button-Effekt oder ein sanfter Text-Scramble beim Hover (Buchstaben rotieren im Millisekunden-Takt rein).
**Priorität:** MEDIUM

### 6. Formular-Design & Chips
**Wo tritt es auf?** Section 07 (CTA).
**Warum wirkt es schwächer?** Inputs und die runden "Pill"-Chips wirken visuell etwas generisch.
**Lösung:** Riesige, borderless Inputs. Man tippt auf die Leinwand. Die runden Chips werden durch strenge, eckige Mono-Space-Toggles ersetzt.
**Priorität:** MEDIUM

### 7. Custom Cursor
**Wo tritt es auf?** Global.
**Warum wirkt es schwächer?** Der Standard-Browsercursor zerstört oft die Illusion eines geschlossenen Systems.
**Lösung:** Ein extrem subtiler, invertierter 3px Dot, der sich über Projekten und Links weich transformiert.
**Priorität:** MEDIUM

### 8. Mobile Hero
**Wo tritt es auf?** Smartphone.
**Warum wirkt es schwächer?** Der große Typo-Zoom (auf den Buchstaben G) verliert auf winzigen Hochkant-Screens seine Wucht und schneidet oft ungünstig ab.
**Lösung:** Eigene Mobile-Choreografie. Eine vertikal gestackte Masken-Öffnung ("MAR" / "GIN.").
**Priorität:** HIGH

### 9. Fehlende Micro-Ambient-Motion
**Wo tritt es auf?** Section 02 (Work).
**Lösung:** Sehr leichter Parallax (Image scale 1.05 -> 1.0) im Inneren der Thumbnails beim Scrollen, um permanente Tiefe zu suggerieren, auch wenn man nicht mit der Maus drüberfährt.
**Priorität:** LOW

### 10. Footer Abschluss
**Wo tritt es auf?** Ganz unten.
**Warum wirkt es schwächer?** Der gewaltige "MARGIN." Schriftzug ist statisch.
**Lösung:** Der Schriftzug könnte auf den finalen Scroll-Progress reagieren und aus einer Maske emergieren.
**Priorität:** LOW

## 10. AI-WEBSITE-DETECTOR
* Die **Capabilities-Boxen** `.service-row` mit Hover-Fade und das rechtsseitige `.cap-visual` Konstrukt aus div-Boxen erinnern stark an typische Framer/SaaS-Templates ("Hover Liste links, Bild rechts ändert sich").
* Die **Formular-Chips** ("Neue Website", "Relaunch") sind typische, oft unreflektiert eingesetzte UI-Komponenten.
* Ansonsten ist die Seite glücklicherweise extrem frei von AI-Tropen (Kein Glassmorphism, keine sinnlosen Glows, keine Bento-Grids).

## 11. HERO SECTION — DEEP DIVE
**Was sollte bleiben?**
* Die architektonischen Rasterlinien. Sie setzen einen genialen technischen Rahmen.
* Der Near-Black Hintergrund.
* Die Copy "Websites, die man nicht vergisst."

**Was schwächt den Hero?**
* Der Scroll-Zoom in den Text (MARGIN.) ist visuell imposant, wurde aber in den letzten 2 Jahren von unzähligen Awards-Kopien (Framer-Templates) abgenutzt. Er fühlt sich etwas vorhersehbar an.

**Was fehlt?**
Eine **räumlichere, aber strengere** Interaktion. Keine bloße 2D-Skalierung, sondern ein Reveal, der den perfekten Editorial-Schnitt der Marke widerspiegelt.

## 12. HERO — 3 SIGNATURE INTERACTION CONCEPTS

### CONCEPT 1: THE ARCHITECTURAL EXPOSURE (Clip-Path Handoff)
**Ausgangszustand:** Alles ist pechschwarz. Nur die Haarlinien `.line-v-1` und `.line-h-1` leuchten sanft.
**Initial Load:** Die Typografie gleitet weich, aber zackig aus unsichtbaren horizontalen Masken.
**Scroll Interaction (0-100%):** Das gigantische Wort "MARGIN." skaliert nicht! Stattdessen zieht sich die nächste Sektion (Warm Ivory) exakt an der vertikalen Haarlinie orientiert wie eine perfekte Schneideklinge von unten nach oben, bis sie den gesamten schwarzen Hero zudeckt.
**Warum premium?** Extrem präzise, meidet den abgenutzten "Text-Zoom", zelebriert Architektur.
**Technologie:** GSAP ScrollTrigger, CSS `clip-path`.
**Schwierigkeit:** 4/10 | **Performance:** LOW Risk.

### CONCEPT 2: VARIABLE FONT RESPIRATION
**Ausgangszustand:** Headline normal sichtbar.
**Idle State:** Die Serifen-Headline atmet minimal in ihrem Weight.
**Scroll Interaction (0-100%):** Statt Zoom manipuliert das Scrollen die Font-Weight und Font-Width des Wordmarks `MARGIN.`. Das Wort wird immer fetter, breiter und dominanter, bis die negativen Räume der Buchstaben komplett verschwinden und die schwarze Fläche einnehmen, hinter der dann Section 2 auftaucht.
**Warum premium?** Sehr sophisticated, rein typografischer Ansatz.
**Technologie:** CSS Variable Fonts (benötigt variablen Font für Instrument Serif), GSAP.
**Schwierigkeit:** 7/10 | **Performance:** MEDIUM Risk (Font Renders).

### CONCEPT 3: THE LENS DISPLACEMENT
**Ausgangszustand:** Hero-Typografie gestochen scharf.
**Scroll Interaction (0-100%):** Die Typografie wird durch einen feinen WebGL-Displacement-Shader wie durch geriffeltes Architekturglas gebrochen. Mit zunehmendem Scroll wird die Brechung stärker, bis das Glas zur Seite slidet und Section 2 enthüllt.
**Warum premium?** Sehr atmosphärisch.
**Technologie:** Three.js / PixiJS Fragment Shader.
**Schwierigkeit:** 8/10 | **Performance:** HIGH Risk (Mobile).

## 13. RECOMMENDED HERO CONCEPT
**CONCEPT 1: THE ARCHITECTURAL EXPOSURE (Clip-Path Handoff)**
*Begründung:* Die Marke MARGIN. steht für "Margin" (Ränder, Kanten, Linien). Eine Transition, die den neuen Inhalt wie eine physische Leinwand messerscharf über den Hero schneidet (Clip-Path), passt thematisch perfekt zur Namensgebung und den etablierten Haarlinien. Es ist hochgradig performant, responsiv einfach anzupassen und wirkt deutlich erwachsener und selbstbewusster als ein reiner Text-Zoom.

## 14. SECTION-BY-SECTION AUDIT

# SECTION: Capabilities
### Current Purpose: Dienstleistungen zeigen.
### Current Design: Links Liste, rechts div-Formen.
### What Works: Layout-Split.
### What Doesn't: CSS Formen (generisch).
### REBUILD
**Proposed Improvement:** Abstrakte, hochauflösende monochrome Makro-Fotografie von Texturen (geriffeltes Glas, gebürstetes Metall) als Hover-Bilder.
**Motion Opportunity:** YES. Cross-Fade der Texturen mit extrem leichtem Scale-In (1.05 -> 1.0).
**Transition:** Standard Scroll.

# SECTION: Process
### Current Purpose: Workflow erklären.
### Current Design: 3D CSS Layer.
### What Works: Scroll-Trigger Pacing.
### What Doesn't: 3D Explosion wirkt out-of-place.
### REBUILD
**Proposed Improvement:** Rein typografische "Zählwerk"-Animation. Die riesigen Wörter rechts wechseln in einem harten Y-Achsen-Slide. Absolute Flächigkeit und Typografie-Dominanz statt fake-3D.
**Motion Opportunity:** YES. Harte, präzise Typo-Slidings (expo.inOut).
**Transition:** Hard Cut.

## 15. MOTION SYSTEM
### Motion Personality
Präzise. Gewichtig. Architektonisch. Intentional. Weich.

### Timing
* Major transition duration: 1.2s - 1.6s
* Bevorzugtes Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (Power3/Power4 out)

### Hover Motion
Bilder skalieren beim Hover extrem subtil (1.0 -> 1.015). Kein Tilt, kein Rotate.

### Page Load
Scharfe, versetzte Mask-Reveals der Typografie. Nichts fadet unmotiviert.

## 16. WICHTIGE REGEL FÜR MOTION
### WOW-Momente (Die 3 Fokus-Punkte):
1. Der scharfe Clip-Path Hero Handoff.
2. Die interaktive Dark Cherry Hand.
3. Der typografische Prozess-Zähler.
### Bewusst ruhig (Der Rest):
Textblöcke, Formular-Bereich, Projekt-Bilder im Ruhezustand. Keine ständigen Fade-Ups mehr, sobald man über den Initial-Load hinaus ist.

## 17. GRAPHICS / VISUAL ASSETS
### Asset 1: Abstract Material Textures (3x)
* **Section:** Capabilities
* **Zweck:** Premium Hover Visuals
* **Visuelle Beschreibung:** Monochrome, extrem kontrastreiche Nahaufnahmen.
* **Produktionsmethode:** Midjourney (AI Image Gen) + Photoshop (Grayscale, Grain).
* **Realistisch umsetzbar?** YES (Aufwand: LOW)

## 18. ASSET PROMPTS
* `macro photography of frosted ribbed glass illuminated by a single warm studio light, deep shadows, cinematic lighting, ultra sharp, monochrome with a very subtle warm ivory tint, minimal, abstract architecture --ar 4:5 --style raw --v 6.0`
* `macro photography of perfectly milled dark titanium metal edges, precise architectural geometry, deep dark shadows, single soft highlight, highly reflective, minimal, premium studio photography --ar 4:5 --style raw --v 6.0`

## 19. SECTION TRANSITIONS
| From | To | Current | Proposed Transition | Technique |
| ---- | -- | ------- | ------------------- | --------- |
| Hero | Work | Hard Cut | Architectural Sweep | `clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%)` to `polygon(0 0, 100% 0, 100% 100%, 0 100%)` |
| Work | Manifesto | Hard Cut | Sticky Overlap | Section Work wird `position: sticky;`, Manifesto scrollt weich als Layer darüber hinweg. |

## 20. TYPOGRAPHY AUDIT
Die Typografie ist extrem stark.
*Vorschlag:* Die Jahreszahlen der Projekte ("2026") und kleine Labels könnten in `Instrument Serif` (Italic) gesetzt werden, um einen noch edleren Couture-Look zu erzeugen und die Inter etwas zu entlasten.

## 21. MICROINTERACTIONS
**Custom Cursor → Inverted Dot → CSS/JS → Nutzen:** Erzeugt ein In-App-Gefühl, bricht die Browser-Grenze, signalisiert Hover (Kreis wird transparent und etwas größer, z.B. bei "VIEW PROJECT").

## 22. PREMIUM VS GIMMICK
* **Clip-Path Handoff:** 🟢 PREMIUM
* **Process Zählwerk Typografie:** 🟢 PREMIUM
* **CSS 3D Process:** 🔴 GIMMICK / ENTFERNEN
* **Custom Cursor:** 🟡 OPTIONAL (Nur wenn extrem lag-frei)

## 23. TECHNICAL FEASIBILITY
Die Umbauten von Section 4 (Capabilities Images) und Section 5 (Typografie statt 3D) vereinfachen den Code sogar. Der Clip-Path Hero Übergang ist mit `gsap.to({ clipPath: ... })` und ScrollTrigger performant auf Desktop und Mobile realisierbar.

## 24. PERFORMANCE BUDGET
Wegfall der CSS-3D Layer im Process wird Layout-Thrashing signifikant reduzieren. Die Makro-Bilder für Capabilities müssen aggressiv komprimiert werden (WebP, <150kb).

## 25. DO NOT IMPLEMENT
1. WebGL/Fluid Backgrounds (zerstört die Stringenz).
2. "Wobbly" Text-Hovers.
3. Skew/Tilt auf Bildern beim Hover.
4. Auto-Play Video Showreels im Hero.
5. Lottie-Illustrationen (zu verspielt).
6. "Dark Mode Toggle".
7. Maus-Follower Trails (außer der spezifischen Hand).
8. Text-Gradients.
9. Bento-Boxen.
10. Sticky Menüleiste mit Blur (lieber komplett unsichtbar/minimal).

## 26. DESIGN OPPORTUNITY MAP
## TIER 1 — TRANSFORMATIVE
* Process Section: 3D entfernen, durch massive Typografie ersetzen.
* Capabilities Section: Placeholder-Divs durch High-End Makro-Fotos ersetzen.
## TIER 2 — HIGH VALUE POLISH
* Hero Handoff (Clip-Path Transition).
* Manifesto Section (Sticky Handoff).
## TIER 3 — MICRO POLISH
* Formular-Chips eckig machen.
* Custom Cursor.
## TIER 4 — NOT WORTH IT
* Magnetic Buttons (für diese Strenge fast zu verspielt).

## 27. PRIORISIERUNG
### P0 — MUST FIX
* Capabilities Visuals.
* Process 3D entfernen.
### P1 — SIGNATURE WORK
* Hero Clip-Path Handoff.
### P2 — POLISH
* Transitions & Formular UI.

## 28. FINAL CREATIVE DIRECTION
# FINAL CREATIVE DIRECTION
### Core Idea
"Die absolute Kante." MARGIN. definiert den Raum präzise.
### Visual Identity
Scharfe Architektur trifft auf unvorhersehbare, feine Organik (die Hand).
### Hero Signature
Kein Standard-Zoom mehr, sondern eine schneidende Maske (Clip-Path), die den Hero wie ein Foto-Abzug belichtet.
### Graphic Language
Weg von primitiven CSS-Gimmicks, hin zu abstrakter Material-Fotografie, die physische Präzision (Glas, Stahl) vermittelt.

## 29. THE FINAL 10
1. **Process Sektion beruhigen:** 3D weg, Typo-Slider her.
2. **Capabilities Visuals upgraden:** Makro-Fotografie statt Code-Formen.
3. **Hero Handoff:** Architectural Clip-Path Sweep einführen.
4. **Formular UI straffen:** Eckige Toggles, massive Input-Linien.
5. **Project Years:** Kursive Instrument Serif für High-Fashion Vibe.
6. **Manifesto Transition:** Sticky Overlap implementieren.
7. **Custom Cursor:** Feiner Invert-Dot zur Führung.
8. **Hero Loader:** Text-Clip-Reveal statt weichem Fade.
9. **Button Hover:** Edler Scramble- oder Arrow-Slide.
10. **Micro-Parallax:** 3% Scroll-Image-Parallax für permanente Tiefe.

## 30. FINAL VERDICT
### Aktueller Stand: 7.9/10
### Nach normalen Verbesserungen: 8.5/10
### Nach deiner empfohlenen Creative Direction: 9.8/10
### Größtes aktuelles Problem: Die Process- und Capabilities-Sektionen wirken durch CSS-Spielereien deutlich billiger als die geniale interaktive Hand.
### Größte Chance: Die harte Kante (Margin) als narratives, maskierendes Konzept durch die ganze Seite zu ziehen.
### Wichtigstes Element, das bleiben sollte: Die Dark Cherry Partikel Hand und die Rasterlinien.
### Wichtigste Änderung: Die Entfernung der Process-3D-Ebenen.
### Signature Element: Die Taktilität und Präzision des Hero-Mask-Handoffs kombiniert mit der organischen Hand.
### Was würde die Seite aktuell noch als „AI/Template Website“ verraten? Die Standard-Div-Formen beim Hover in den Capabilities und die runden Pill-Chips im Formular.
### Was würde sie am Ende wie eine wirklich maßgeschneiderte Premium-Website wirken lassen? Wenn sich jede Bewegung physikalisch absolut gewollt anfühlt – schwere Vorhänge, die sich heben, statt Standard-Opacity-Fades.
