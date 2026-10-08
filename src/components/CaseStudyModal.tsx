import { imageAttributes } from '../data/images';
import { useDialog } from '../hooks/useDialog';
import { PROJECTS_DATA } from '../data/projects';
import type { Project } from '../types';

interface CaseStudyModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onClosed: () => void;
  onOpenInquiry: () => void;
  onSelectProject: (project: Project, source?: HTMLElement | null) => void;
}

export function CaseStudyModal({
  project,
  isOpen,
  onClose,
  onClosed,
  onSelectProject,
  onOpenInquiry
}: CaseStudyModalProps) {
  const ref = useDialog(isOpen, onClose, project?.id, onClosed);
  const next = PROJECTS_DATA[(PROJECTS_DATA.findIndex((p) => p.id === project?.id) + 1) % PROJECTS_DATA.length];

  return (
    <dialog ref={ref} className="case-study-modal" aria-labelledby="case-title" data-project-id={project?.id}>
      {project && (
        <>
          {/* Top Sticky Bar */}
          <div className="dialog-toolbar">
            <button className="case-brand" type="button" onClick={onClose} aria-label="MARGIN — Zurück zu den Arbeiten">
              <img src="/assets/margin_logo_light.png" alt="MARGIN" width="134" height="31" />
            </button>
            <span className="eyebrow case-toolbar-meta">{project.shortName} / {project.index}</span>
            <button className="text-action" onClick={onClose} aria-label="Konzeptstudie schließen">
              Schließen <span aria-hidden="true">×</span>
            </button>
          </div>

          <div className="case-content page-container">
            {/* Header Area */}
            <div className="case-header-wrap">
              <p className="eyebrow section-label">{project.discipline}</p>
              <h2 id="case-title">{project.name}</h2>
              <p className="case-overview">{project.caseStudy.overview}</p>
            </div>

            {/* Agency Project Metadata Specs */}
            <div className="case-specs-matrix">
              <div className="case-spec-item">
                <span className="spec-label">Marke &amp; Kontext</span>
                <span className="spec-val">{project.caseStudy.client}</span>
              </div>
              <div className="case-spec-item">
                <span className="spec-label">Konzeptbausteine</span>
                <div className="spec-tags">
                  {project.caseStudy.services.map((s) => (
                    <span key={s} className="spec-tag">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Primary Media Showcase */}
            <div
              className="case-media"
              data-project-id={project.id}
              data-transition-media={project.id}
              style={project.aspectRatio ? { aspectRatio: project.aspectRatio } : undefined}
            >
              <img
                src={project.image}
                alt={`${project.name} Interface Design Studie`}
                {...imageAttributes(project.image, '(max-width: 600px) 90vw, 84vw')}
              />
            </div>

            {/* Strategic Challenge Narrative */}
            <div className="case-story-block">
              <div className="story-label-col">
                <span className="eyebrow story-tag">01 // STRATEGIE</span>
                <h3>Die Herausforderung</h3>
              </div>
              <div className="story-text-col">
                <p>{project.caseStudy.challenge}</p>
              </div>
            </div>

            {/* Visual & Kinetic Direction Narrative */}
            <div className="case-story-block">
              <div className="story-label-col">
                <span className="eyebrow story-tag">02 // GESTALTUNG</span>
                <h3>Visuelle &amp; Kinetische Direktion</h3>
              </div>
              <div className="story-text-col">
                <p>{project.caseStudy.direction}</p>
              </div>
            </div>

            {/* Design intent of the independent concept study. */}
            <div className="case-metrics-banner">
              <div className="metrics-eyebrow">Leitidee der Konzeptstudie</div>
              <p className="case-result-statement">{project.caseStudy.result}</p>
            </div>

            {/* Secondary Cover Specimen */}
            {project.coverImage && (
              <div className="case-cover">
                <img
                  src={project.coverImage}
                  alt={`${project.descriptor} Detailaufnahme`}
                  {...imageAttributes(project.coverImage, '(max-width: 600px) 90vw, 84vw')}
                  loading="lazy"
                />
              </div>
            )}

            {/* Redesigned Next Study Card (Fixing the bug from Bild 1!) */}
            <div className="case-next-section">
              <span className="eyebrow next-lead-label">Nächste Konzeptstudie</span>
              <a
                className="case-next-card"
                href={`/work/${next.id}`}
                onClick={(event) => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button) return;
                  event.preventDefault();
                  onSelectProject(next, event.currentTarget.querySelector<HTMLElement>('img'));
                }}
              >
                <div className="next-card-thumb">
                  <img src={next.coverImage ?? next.image} alt="" {...imageAttributes(next.coverImage ?? next.image, '240px')} loading="lazy" />
                  <span className="thumb-idx">{next.index}</span>
                </div>
                <div className="next-card-body">
                  <span className="next-card-subtitle">{next.discipline}</span>
                  <h4 className="next-card-title">{next.name}</h4>
                  <p className="next-card-desc">{next.statement}</p>
                </div>
                <div className="next-card-action">
                  <span>Projekt ansehen</span>
                  <span className="next-arrow" aria-hidden="true">↗</span>
                </div>
              </a>
            </div>

            {/* Case Footer CTA */}
            <div className="case-footer">
              <div className="footer-cta-copy">
                <span className="eyebrow">Ihr Vorhaben</span>
                <p>Wie könnte das nächste Kapitel Ihrer Marke aussehen?</p>
              </div>
              <button className="text-action case-inquiry-btn" onClick={onOpenInquiry}>
                Projekt initiieren <span aria-hidden="true">↗</span>
              </button>
            </div>
          </div>
        </>
      )}
    </dialog>
  );
}
