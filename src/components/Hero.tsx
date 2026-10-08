import { useEffect, useState } from 'react';
import { imageAttributes } from '../data/images';
import { HERO_FILM } from '../data/media';
import type { FilmAsset } from '../data/media';

export function HeroMedia({ asset }: { asset: FilmAsset }) {
  const [reduceMotion, setReduceMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(preference.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  return (
    <div className="hero-media-shell" data-media-status={asset.temporary ? 'temporary' : 'final'}>
      <div className="hero-media-frame" data-transition-media="hero">
        <div className="hero-media-inner">
          <picture>
            {asset.mobilePoster && <source media="(max-width: 600px)" srcSet={asset.mobilePoster} />}
            <img
              src={asset.poster}
              alt={asset.posterAlt ?? ''}
              fetchPriority="high"
              {...imageAttributes(asset.poster, '(max-width: 600px) 100vw, 100vw')}
            />
          </picture>
          {asset.desktopSource && !reduceMotion && (
            <video
              poster={asset.poster}
              autoPlay
              muted
              playsInline
              loop={asset.loop}
              preload="metadata"
              disablePictureInPicture
              aria-hidden="true"
            >
              {asset.mobileSource && <source media="(max-width: 600px)" src={asset.mobileSource} type="video/mp4" />}
              <source src={asset.desktopSource} type="video/mp4" />
            </video>
          )}
          <div className="hero-media-meta" aria-hidden="true">
            <span>{asset.eyebrow}</span>
            <span className="hero-media-status">
              <i /> Film / 00:11
            </span>
          </div>
        </div>
      </div>
      <span className="hero-release-corner hero-release-left" aria-hidden="true" />
      <span className="hero-release-corner hero-release-right" aria-hidden="true" />
    </div>
  );
}

export function Hero({ onOpenInquiry }: { onOpenInquiry: () => void }) {
  return (
    <section id="hero" className="hero" data-theme="dark" aria-labelledby="hero-title">
      {/* Full-bleed media background (direct child of section for full 100vw width without grey margins on ultra-wide screens) */}
      <HeroMedia asset={HERO_FILM} />

      <div className="page-container">
        <div className="hero-top-bar">
          <span className="eyebrow">Unabhängiges Webdesign-Atelier</span>
          <span className="eyebrow hero-discipline">Art Direction &amp; Code-Architektur</span>
        </div>
        <h1 id="hero-title" className="hero-title">
          <span className="split-line-mask"><span className="split-line-inner">Außergewöhnliche</span></span>
          <span className="split-line-mask"><span className="split-line-inner">Digitale</span></span>
          <span className="split-line-mask"><span className="split-line-inner"><em>Präsenzen</em></span></span>
        </h1>
        <div className="hero-statement-grid">
          <p>
            Maßgeschneiderte Websites und digitale Erlebnisse.{' '}<br className="desktop-break" />
            Eigenständig im Charakter. Präzise in jedem Detail.
          </p>
          <a href="#work" className="text-action hero-explore">
            Ausgewählte Arbeiten entdecken <span aria-hidden="true">↓</span>
          </a>
          <button className="text-action hero-project" onClick={onOpenInquiry}>
            Projekt starten <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}
