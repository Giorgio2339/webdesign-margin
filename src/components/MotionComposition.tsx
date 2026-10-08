import { imageAttributes } from '../data/images';

// Ein Interface erwacht vor den Augen des Besuchers: Struktur → Typografie → Bild → Kinetik.
const PHASES = [
  { label: 'Struktur', note: 'Raster — 12 Spalten / 2.2vw Steg' },
  { label: 'Typografie', note: 'Newsreader 400 — Spationierung −4.5%' },
  { label: 'Bild', note: 'Ausschnitt — sechs Spalten, dann rahmenlos' },
  { label: 'Kinetik', note: 'Beschleunigung — cubic-bezier(.76, 0, .24, 1)' }
];
const IMAGE = '/assets/motion_night_facade.png';

export function MotionComposition() {
  return (
    <section id="motion" className="motion-study" data-theme="dark" aria-labelledby="motion-title">
      <div className="motion-track">
        <div className="motion-stage" data-phase="3">
          <div className="motion-canvas">
            <figure className="motion-image">
              <img
                src={IMAGE}
                alt="Langzeitbelichtung einer beleuchteten Glasfassade bei Nacht mit kinetischen Lichtspuren"
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
              <span className="motion-line"><span>Gestaltet,</span></span>
              <span className="motion-line motion-line-move"><span>um zu <em>bewegen.</em></span></span>
            </h2>

          </div>
          <div className="motion-index">
            <p className="eyebrow">Wie ein Interface erwacht</p>
            <ol aria-label="Entwurfsphasen">
              {PHASES.map((phase, i) => (
                <li key={phase.label} data-step={i}>
                  <span>0{i + 1}</span>
                  {phase.label}
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
