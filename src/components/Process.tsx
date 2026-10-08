import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../motion/config';
import { restoreScroll } from '../motion/runtime';

const STANDARDS = [
  { title: 'Raum & Typografie', note: 'Ein Raster, das ordnet. Eine Schrift, die Charakter gibt. Abstände, die den Blick führen.', caption: 'Proportion / Rhythmus / Kontrast', specimen: 'Aa', name: 'Satzspiegel' },
  { title: 'Code & Bewegung', note: 'Klare Struktur und gezielte Bewegung. Ein Interface, das sich unmittelbar und selbstverständlich anfühlt.', caption: 'Struktur / Reaktion / Übergang', specimen: '</>', name: 'Interaktion' },
  { title: 'Direkter Austausch', note: 'Kurze Wege zwischen Idee, Entwurf und Umsetzung. Entscheidungen werden am konkreten Design getroffen.', caption: 'Idee / Entwurf / Umsetzung', specimen: '↗', name: 'Verbindung' },
  { title: 'Sorgfalt bis zum Launch', note: 'Typografie, Bedienung und Darstellung werden auf kleinen und großen Bildschirmen geprüft.', caption: 'Ansicht / Bedienung / Prüfung', specimen: '01—04', name: 'Endkontrolle' }
];

export function Process({ onOpenInquiry }: { onOpenInquiry?: () => void }) {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<ScrollTrigger | null>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const track = section.querySelector<HTMLElement>('.craft-scroll-track')!;
      const stage = section.querySelector<HTMLElement>('.craft-layout')!;
      const scenes = [...section.querySelectorAll<HTMLElement>('.craft-scene')];
      section.dataset.scrollCraft = 'true';
      gsap.set(scenes, { autoAlpha: 0, y: 24 });
      gsap.set(scenes[0], { autoAlpha: 1, y: 0 });
      let chapter = -1;
      const sequence = gsap.timeline({
        defaults: { ease: 'none' },
        onUpdate() {
          const next = Math.min(3, Math.floor(this.time()));
          if (next !== chapter) { chapter = next; setActive(next); }
        },
        scrollTrigger: {
          id: 'craft-sequence',
          refreshPriority: -1,
          trigger: track,
          start: () => `top top+=${innerWidth <= 760 ? 88 : 104}`,
          end: () => `+=${Math.max(1, track.offsetHeight - stage.offsetHeight)}`,
          scrub: .35,
          invalidateOnRefresh: true
        }
      });
      sequence.to({}, { duration: 4 }, 0);
      for (let index = 1; index < scenes.length; index++) {
        sequence.to(scenes[index - 1], { autoAlpha: 0, y: -24, duration: .4 }, index - .2)
          .fromTo(scenes[index], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .4, immediateRender: false }, index - .2);
      }
      scrollRef.current = sequence.scrollTrigger ?? null;
      return () => {
        scrollRef.current = null;
        delete section.dataset.scrollCraft;
        setActive(0);
      };
    });
    return () => media.revert();
  }, { scope: sectionRef });

  const select = (index: number) => {
    const trigger = scrollRef.current;
    if (trigger) restoreScroll(trigger.start + (trigger.end - trigger.start) * ((index + .4) / 4));
    else setActive(index);
  };
  return (
    <section ref={sectionRef} id="approach" className="margin-standard section-pad" data-theme="light" aria-labelledby="standard-title">
      <div className="page-container">
        <header className="craft-intro">
          <p className="eyebrow">Der MARGIN Maßstab</p>
          <h2 id="standard-title">Qualität wird nicht behauptet.<br /><em>Sie zeigt sich im Detail.</em></h2>
        </header>
        <div className="craft-scroll-track">
        <div className="craft-layout">
          <div className="craft-plate" data-study={active} aria-hidden="true">
            {STANDARDS.map((standard, index) => (
              <div className={`craft-scene ${active === index ? 'is-active' : ''}`} data-study={index} key={standard.title}>
                <div className="craft-plate-label"><span>Studie / 0{index + 1}</span><span>{standard.name}</span></div>
                <div className="craft-grid"><i /><i /><i /><i /><i /><i /></div>
                <div className="craft-specimen">{standard.specimen}<span className="craft-period">.</span></div>
                <div className="craft-baseline" />
                <div className="craft-plate-foot"><span>MARGIN</span><span>{standard.caption}</span></div>
              </div>
            ))}
          </div>
          <div className="craft-index" aria-label="Unsere Standards">
            <div className="craft-scroll-cue" aria-hidden="true"><span>Scrollen zum Entdecken</span><span>0{active + 1} / 04</span></div>
            {STANDARDS.map((standard, index) => (
              <div className={`craft-row ${index === active ? 'is-active' : ''}`} key={standard.title}>
                <h3>
                  <button type="button" onClick={() => select(index)} aria-expanded={active === index} aria-controls={`craft-note-${index}`}>
                    <span className="craft-number">0{index + 1}</span>
                    <span>{standard.title}</span>
                    <span className="craft-toggle" aria-hidden="true">{index === active ? '−' : '+'}</span>
                  </button>
                </h3>
                <div className="craft-note" id={`craft-note-${index}`} aria-hidden={active !== index}><div><p>{standard.note}</p></div></div>
              </div>
            ))}
            {onOpenInquiry && <button className="text-action craft-cta" type="button" onClick={onOpenInquiry}>Projekt besprechen <span aria-hidden="true">↗</span></button>}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

export default Process;
