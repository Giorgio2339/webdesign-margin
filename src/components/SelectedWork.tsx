import { imageAttributes } from '../data/images';
import { getProjects } from '../data/projects';
import { HOME } from '../i18n/home';
import { useLocale } from '../i18n/useLocale';
import type { Project } from '../types';
import type { MouseEvent } from 'react';

export function SelectedWork({ onSelectProject }: { onSelectProject: (project: Project, source?: HTMLElement | null) => void }) {
  const locale = useLocale();
  const t = HOME[locale].work;
  const projects = getProjects(locale);
  const visit = (event: MouseEvent<HTMLAnchorElement>, project: Project) => {
    if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onSelectProject(project, event.currentTarget.closest('article')?.querySelector<HTMLElement>('.project-media'));
  };

  return (
    <section id="work" className="selected-work section-pad" data-theme="dark" aria-labelledby="work-title">
      <div className="surface-takeover" aria-hidden="true" />
      <div className="page-container">
        <div className="work-heading">
          <h2 id="work-title">{t.title}</h2>
          <p className="eyebrow">{t.subtitle}</p>
        </div>
        <div className="projects-sequence">
          {projects.map((project) => (
            <article
              className={`project-canvas-item project-${project.alignment}`}
              key={project.id}
              id={`project-${project.id}`}
              data-project-id={project.id}
            >
              <a
                href={`/${locale}/work/${project.id}`}
                className="project-media"
                style={project.aspectRatio ? { aspectRatio: project.aspectRatio } : undefined}
                onClick={(event) => visit(event, project)}
                aria-label={`${t.view}: ${project.name}`}
                data-project-id={project.id}
                data-transition-media={project.id}
              >
                <span className="interface-layer" aria-hidden="true">
                  <img
                    src={project.poster ?? project.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    {...imageAttributes(
                      project.poster ?? project.image,
                      project.alignment === 'center'
                        ? '(max-width: 600px) 84vw, 83.33vw'
                        : '(max-width: 600px) 84vw, 50vw'
                    )}
                  />
                  {project.interfaceVideo && (
                    <video muted playsInline loop preload="none" poster={project.poster ?? project.image}>
                      <source src={project.interfaceVideo} type="video/mp4" />
                    </video>
                  )}
                </span>
                <span className="cover-layer">
                  <img
                    src={project.coverImage ?? project.image}
                    alt={`${project.name} — ${t.alt}`}
                    loading="lazy"
                    decoding="async"
                    {...imageAttributes(
                      project.coverImage ?? project.image,
                      project.alignment === 'center'
                        ? '(max-width: 600px) 84vw, 83.33vw'
                        : '(max-width: 600px) 84vw, 50vw'
                    )}
                  />
                </span>
                <span className="interaction-overlay" aria-hidden="true">
                  <span>{t.view}</span>
                  <span>↗</span>
                </span>
              </a>
              <div className="project-meta">
                <span className="eyebrow project-index">{project.index} / 03</span>
                <h3>
                  <span>{project.shortName}</span>
                  <span className="project-descriptor">{project.descriptor}</span>
                </h3>
                <div className="project-context">
                  <p className="project-discipline">{project.discipline}</p>
                  <p>{project.statement}</p>
                  <a
                    href={`/${locale}/work/${project.id}`}
                    className="text-action"
                    onClick={(event) => visit(event, project)}
                  >
                    {t.view} <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
