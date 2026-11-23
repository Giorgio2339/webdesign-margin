import { imageAttributes } from '../data/images';
import { useDialog } from '../hooks/useDialog';
import { getProjects } from '../data/projects';
import { useLocale } from '../i18n/useLocale';
import { HOME } from '../i18n/home';
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
  const locale = useLocale();
  const projects = getProjects(locale);
  const t = HOME[locale].work;
  const en = locale === 'en';
  const ref = useDialog(isOpen, onClose, project?.id, onClosed);
  const next = projects[(projects.findIndex((p) => p.id === project?.id) + 1) % projects.length];

  return (
    <dialog ref={ref} className="case-study-modal" aria-labelledby="case-title" data-project-id={project?.id}>
      {project && (
        <>
          {/* Top Sticky Bar */}
          <div className="dialog-toolbar">
            <button className="case-brand" type="button" onClick={onClose} aria-label={locale === 'de' ? 'MARGIN — Zurück zu den Arbeiten' : 'MARGIN — Back to work'}>
              <img src="/assets/margin_logo_light.png" alt="MARGIN" width="134" height="31" />
            </button>
            <span className="eyebrow case-toolbar-meta">{project.shortName} / {project.index}</span>
            <button className="text-action" onClick={onClose} aria-label={locale === 'de' ? 'Konzeptstudie schließen' : 'Close concept study'}>
              {en ? 'Close' : 'Schließen'} <span aria-hidden="true">×</span>
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
                <span className="spec-label">{en ? 'Brand & context' : 'Marke & Kontext'}</span>
                <span className="spec-val">{project.caseStudy.client}</span>
              </div>
              <div className="case-spec-item">
                <span className="spec-label">{en ? 'Scope of study' : 'Konzeptbausteine'}</span>
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
                alt={`${project.name} — ${en ? 'interface concept study' : 'Interface-Design-Studie'}`}
                {...imageAttributes(project.image, '(max-width: 600px) 90vw, 84vw')}
              />
            </div>

            {/* Strategic Challenge Narrative */}
            <div className="case-story-block">
              <div className="story-label-col">
                <span className="eyebrow story-tag">{en ? '01 / STRATEGY' : '01 / STRATEGIE'}</span>
                <h3>{en ? 'The challenge' : 'Die Herausforderung'}</h3>
              </div>
              <div className="story-text-col">
                <p>{project.caseStudy.challenge}</p>
              </div>
            </div>

            {/* Visual & Kinetic Direction Narrative */}
            <div className="case-story-block">
              <div className="story-label-col">
                <span className="eyebrow story-tag">{en ? '02 / DESIGN' : '02 / GESTALTUNG'}</span>
                <h3>{en ? 'Visual direction' : 'Visuelle Richtung'}</h3>
              </div>
              <div className="story-text-col">
                <p>{project.caseStudy.direction}</p>
              </div>
            </div>

            {/* Design intent of the independent concept study. */}
            <div className="case-metrics-banner">
              <div className="metrics-eyebrow">{en ? 'The idea behind the concept' : 'Leitidee der Konzeptstudie'}</div>
              <p className="case-result-statement">{project.caseStudy.result}</p>
            </div>

            {/* Secondary Cover Specimen */}
            {project.coverImage && (
              <div className="case-cover">
                <img
                  src={project.coverImage}
                  alt={`${project.descriptor} — ${en ? 'detail' : 'Detailaufnahme'}`}
                  {...imageAttributes(project.coverImage, '(max-width: 600px) 90vw, 84vw')}
                  loading="lazy"
                />
              </div>
            )}

            {/* Redesigned Next Study Card (Fixing the bug from Bild 1!) */}
            <div className="case-next-section">
              <span className="eyebrow next-lead-label">{en ? 'Next concept study' : 'Nächste Konzeptstudie'}</span>
              <a
                className="case-next-card"
                href={`/${locale}/work/${next.id}`}
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
                  <span>{t.view}</span>
                  <span className="next-arrow" aria-hidden="true">↗</span>
                </div>
              </a>
            </div>

            {/* Case Footer CTA */}
            <div className="case-footer">
              <div className="footer-cta-copy">
                <span className="eyebrow">{en ? 'Your project' : 'Ihr Vorhaben'}</span>
                <p>{en ? 'What could the next chapter of your brand look like?' : 'Wie könnte das nächste Kapitel Ihrer Marke aussehen?'}</p>
              </div>
              <button className="text-action case-inquiry-btn" onClick={onOpenInquiry}>
                {en ? 'Start a project' : 'Projekt initiieren'} <span aria-hidden="true">↗</span>
              </button>
            </div>
          </div>
        </>
      )}
    </dialog>
  );
}
