import type { ReactNode } from 'react';

interface Principle {
  glyph: ReactNode;
  tag: string;
  title: string;
  description: string;
}

const PRINCIPLES: Principle[] = [
  {
    tag: 'Entdecken',
    title: 'Position vor Pixeln',
    description: 'Jedes Projekt beginnt mit Markenstrategie und Zielgruppen-Verständnis – lange vor dem ersten Layout.',
    glyph: (
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
        <polygon points="8.5,2 15.5,14.5 1.5,14.5" />
      </svg>
    )
  },
  {
    tag: 'Formen',
    title: 'Eigenständig im Design',
    description: 'Maßgeschneiderte Typografie, räumliche Spannung und unverkennbare Markenidentität – keine Standard-Templates.',
    glyph: (
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
        <polygon points="8.5,1.5 15.5,8.5 8.5,15.5 1.5,8.5" />
      </svg>
    )
  },
  {
    tag: 'Beleben',
    title: 'Bewegung mit Haltung',
    description: 'Kinematische Choreografie führt den Blick, klärt Hierarchien und schafft spürbare, taktile Interaktion.',
    glyph: (
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <circle cx="8.5" cy="8.5" r="6.75" />
      </svg>
    )
  },
  {
    tag: 'Bauen',
    title: 'Auf Höchstleistung geeicht',
    description: 'Präziser Code, sorgfältig geprüfte Ladezeiten und Bewegung, die sich dem jeweiligen Gerät anpasst.',
    glyph: (
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="13" height="13" />
      </svg>
    )
  }
];

export function StudioPOV() {
  return (
    <section id="studio" className="studio section-pad" data-theme="light" aria-labelledby="studio-title">
      <div className="page-container">
        <p className="eyebrow section-label">Die MARGIN Haltung</p>
        <h2 id="studio-title" className="studio-statement">
          Die meisten Websites entstehen<br className="desktop-break" /> aus Templates.<br />
          <span>MARGIN baut<br className="desktop-break" /> digitale Monumente.</span>
        </h2>
        <div className="principles-row">
          {PRINCIPLES.map((p) => (
            <div key={p.tag} className="principle-item">
              <div className="principle-tag">
                <span className="principle-glyph">{p.glyph}</span>
                <span className="principle-keyword">{p.tag}</span>
              </div>
              <h3 className="principle-title">{p.title}</h3>
              <p className="principle-desc">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
