import { imageAttributes } from '../data/images';
import { HOME } from '../i18n/home';
import { useLocale } from '../i18n/useLocale';

// Ein Interface erwacht vor den Augen des Besuchers: Struktur → Typografie → Bild → Kinetik.
const IMAGE = '/assets/motion_night_facade.png';

export function MotionComposition() {
  const t = HOME[useLocale()].motion;
  return (
    <section id="motion" className="motion-study" data-theme="dark" aria-labelledby="motion-title">
      <div className="motion-track">
        <div className="motion-stage" data-phase="3">
          <div className="motion-canvas">
            <figure className="motion-image">
              <img
                src={IMAGE}
                alt={t.alt}
                loading="lazy"
                decoding="async"
                {...imageAttributes(IMAGE, '100vw')}
              />
            </figure>
            <div className="motion-grid" aria-hidden="true">
              {Array.from({ length: 12 }, (_, i) => (
                <i key={i} />
              ))}
            </div>
            <h2 id="motion-title" className="motion-title">
              <span className="motion-line"><span>{t.lineA}</span></span>
              <span className="motion-line motion-line-move"><span><em>{t.lineB}</em></span></span>
            </h2>

          </div>
          <div className="motion-index">
            <p className="eyebrow">{t.intro}</p>
            <ol aria-label={t.phaseLabel}>
              {t.phases.map((phase, i) => (
                <li key={phase} data-step={i}>
                  <span>0{i + 1}</span>
                  {phase}
                </li>
              ))}
            </ol>
            <span className="motion-progress" aria-hidden="true">
              <i />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
