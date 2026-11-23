import { useState } from 'react';
import { imageAttributes } from '../data/images';
import { getCapabilities } from '../data/projects';
import { HOME } from '../i18n/home';
import { useLocale } from '../i18n/useLocale';

export function Capabilities() {
  const locale = useLocale();
  const t = HOME[locale].capabilities;
  const capabilities = getCapabilities(locale);
  const [activeFragment, setActiveFragment] = useState(0);

  return (
    <section id="capabilities" className="capabilities section-pad" data-theme="light" aria-labelledby="capabilities-title">
      <div className="surface-takeover" aria-hidden="true" />
      <div className="page-container capabilities-layout">
        <div className="capabilities-intro">
          <p className="eyebrow section-label">{t.label}</p>
          <h2 id="capabilities-title">
            {t.lines[0]}<br />
            {t.lines[1]}<br />
            {t.lines[2]}
          </h2>
          <div
            className="capability-fragment-slot"
            data-motion-slot="capability-fragment"
            data-fragment={activeFragment}
            aria-hidden="true"
          >
            {capabilities.map((cap, i) => (
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
              <span>{capabilities[activeFragment]?.index} · {capabilities[activeFragment]?.title}</span>
            </div>
          </div>
        </div>
        <div className="capabilities-list">
          {capabilities.map((cap, i) => {
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
