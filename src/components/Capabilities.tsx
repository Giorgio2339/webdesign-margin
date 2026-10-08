import { useState } from 'react';
import { imageAttributes } from '../data/images';
import { CAPABILITIES_DATA } from '../data/projects';

export function Capabilities() {
  const [activeFragment, setActiveFragment] = useState(0);

  return (
    <section id="capabilities" className="capabilities section-pad" data-theme="light" aria-labelledby="capabilities-title">
      <div className="surface-takeover" aria-hidden="true" />
      <div className="page-container capabilities-layout">
        <div className="capabilities-intro">
          <p className="eyebrow section-label">Unsere Kompetenzen</p>
          <h2 id="capabilities-title">
            Architektur,<br />
            Ästhetik<br />
            &amp; Code
          </h2>
          <div
            className="capability-fragment-slot"
            data-motion-slot="capability-fragment"
            data-fragment={activeFragment}
            aria-hidden="true"
          >
            {CAPABILITIES_DATA.map((cap, i) => (
              <img
                className={`fragment-${i}`}
                key={cap.index}
                src={cap.image}
                alt={cap.imageAlt ?? cap.title}
                {...imageAttributes(cap.image, '36vw')}
                loading="lazy"
              />
            ))}
            <div className="capability-slot-caption">
              <span>{CAPABILITIES_DATA[activeFragment]?.index} · {CAPABILITIES_DATA[activeFragment]?.title}</span>
            </div>
          </div>
        </div>
        <div className="capabilities-list">
          {CAPABILITIES_DATA.map((cap, i) => {
            const isActive = activeFragment === i;
            return (
              <article
                tabIndex={0}
                className={`capability-row ${isActive ? 'is-active' : ''}`}
                key={cap.index}
                data-capability-id={cap.index}
                onMouseEnter={() => setActiveFragment(i)}
                onFocus={() => setActiveFragment(i)}
              >
                <span className="eyebrow">{cap.index}</span>
                <div className="capability-content">
                  <h3>{cap.title}</h3>
                  <p>{cap.summary}</p>
                  <div className="capability-mobile-visual" aria-hidden="true">
                    <img
                      src={cap.image}
                      alt={cap.imageAlt ?? cap.title}
                      loading="lazy"
                      {...imageAttributes(cap.image, '100vw')}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
