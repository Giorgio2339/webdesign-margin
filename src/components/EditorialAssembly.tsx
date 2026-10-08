import { imageAttributes } from '../data/images';

const ASSEMBLY_ITEMS = [
  {
    id: 'sillage',
    index: '01',
    shortName: 'SILLAGE',
    coverImage: '/assets/project_sillage.jpg',
    uiImage: '/assets/project_sillage_ui.jpg',
    subline: 'Haute Parfumerie & D2C Flagship'
  },
  {
    id: 'mori',
    index: '02',
    shortName: 'MORI',
    coverImage: '/assets/project_mori.jpg',
    uiImage: '/assets/project_mori_ui.jpg',
    subline: 'Ceremonial Matcha & Ritual Commerce'
  },
  {
    id: 'rove',
    index: '03',
    shortName: 'ROVE',
    coverImage: '/assets/project_rove.jpg',
    uiImage: '/assets/project_rove_ui.jpg',
    subline: 'Architekturstudio & Räumliche Identität'
  }
];

export function EditorialAssembly() {
  return (
    <section className="editorial-assembly" data-theme="light" aria-labelledby="assembly-title">
      <div className="page-container assembly-intro">
        <p className="eyebrow section-label">Eine Haltung</p>
        <h2 id="assembly-title">
          Verschiedene Welten.<br />
          <em>Ein Anspruch.</em>
        </h2>
        <p>Handel, Architektur und komplexe Systeme – gestaltet mit derselben Hingabe an Charakter und Nutzen.</p>
      </div>
      <div className="assembly-stage" data-motion-stage="assembly">
        <span className="assembly-wordmark" aria-hidden="true">MARGIN</span>
        {ASSEMBLY_ITEMS.map((item, index) => (
          <div
            className={`assembly-visual assembly-visual-${index + 1}`}
            key={item.id}
            data-assembly-visual
          >
            <div className="assembly-media-frame">
              {/* Underlying Web Interface Screenshot revealed on hover */}
              <div className="assembly-ui-layer" aria-hidden="true">
                <img
                  src={item.uiImage}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  {...imageAttributes(
                    item.uiImage,
                    index === 0 ? '(max-width: 600px) 88vw, 49vw' : '(max-width: 600px) 68vw, 28vw'
                  )}
                />
                <span className="assembly-ui-badge">Interface</span>
              </div>

              {/* Cover Photographic Artwork (wipes away on hover) */}
              <div className="assembly-cover-layer">
                <img
                  src={item.coverImage}
                  alt={`${item.shortName} Visual Studie`}
                  loading="lazy"
                  decoding="async"
                  {...imageAttributes(
                    item.coverImage,
                    index === 0 ? '(max-width: 600px) 88vw, 49vw' : '(max-width: 600px) 68vw, 28vw'
                  )}
                />
              </div>

              {/* Minimalist Hover Cue */}
              <div className="assembly-hover-hint" aria-hidden="true">
                <span>Interface entdecken</span>
                <span className="hint-arrow">↗</span>
              </div>
            </div>

            <span className="assembly-caption">
              <span>
                <i>{item.index}</i>
                <strong className="assembly-name">{item.shortName}</strong>
              </span>
              <span className="assembly-subline">{item.subline}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
