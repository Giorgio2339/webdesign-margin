import { useEffect, useRef, useState } from 'react';
import { imageAttributes } from '../data/images';
import { HERO_MEDIA } from '../data/media';
import type { HeroAsset } from '../data/media';
import { HOME } from '../i18n/home';
import { useLocale } from '../i18n/useLocale';

export function HeroMedia({ asset }: { asset: HeroAsset }) {
  const [videoReady, setVideoReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    let timer: number | undefined;
    let idle: number | undefined;
    const cancel = () => {
      window.clearTimeout(timer);
      if (idle !== undefined) window.cancelIdleCallback(idle);
    };
    const schedule = () => {
      cancel();
      if (preference.matches || connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? '')) {
        setVideoReady(false);
        setPlaying(false);
        return;
      }
      // Paint the poster and type first; video decoding must not compete with entry.
      timer = window.setTimeout(() => {
        if ('requestIdleCallback' in window) {
          idle = window.requestIdleCallback(() => setVideoReady(true), { timeout: 2000 });
        } else {
          setVideoReady(true);
        }
      }, 1400);
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });
    preference.addEventListener('change', schedule);
    return () => {
      cancel();
      window.removeEventListener('load', schedule);
      preference.removeEventListener('change', schedule);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let visible = false;
    const update = () => {
      if (visible && !document.hidden) void video.play().catch(() => setPlaying(false));
      else video.pause();
    };
    const observer = new IntersectionObserver(entries => {
      visible = Boolean(entries[0]?.isIntersecting);
      update();
    });
    observer.observe(video);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
      video.pause();
    };
  }, [videoReady]);

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
          {asset.desktopSource && videoReady && (
            <video
              poster={asset.poster}
              ref={videoRef}
              className={playing ? 'is-playing' : undefined}
              onPlaying={() => setPlaying(true)}
              onError={() => setPlaying(false)}
              muted
              playsInline
              loop={asset.loop}
              preload="none"
              disablePictureInPicture
              aria-hidden="true"
            >
              {asset.mobileSource && <source media="(max-width: 600px)" src={asset.mobileSource} type="video/mp4" />}
              <source src={asset.desktopSource} type="video/mp4" />
            </video>
          )}
        </div>
      </div>
      <span className="hero-release-corner hero-release-left" aria-hidden="true" />
      <span className="hero-release-corner hero-release-right" aria-hidden="true" />
    </div>
  );
}

export function Hero({ onOpenInquiry }: { onOpenInquiry: () => void }) {
  const locale = useLocale();
  const t = HOME[locale].hero;
  return (
    <section id="hero" className="hero" data-theme="dark" aria-labelledby="hero-title">
      {/* Full-bleed media background (direct child of section for full 100vw width without grey margins on ultra-wide screens) */}
      <HeroMedia asset={HERO_MEDIA} />

      <div className="page-container">
        <div className="hero-top-bar">
          <span className="eyebrow">{t.eyebrow}</span>
          <span className="eyebrow hero-discipline">{t.discipline}</span>
        </div>
        <h1 id="hero-title" className="hero-title">
          {t.lines.map((line, index) => <span className="split-line-mask" key={line}><span className="split-line-inner">{index === 2 ? <em>{line}</em> : line}</span></span>)}
        </h1>
        <div className="hero-statement-grid">
          <p>{t.statement}</p>
          <a href="#work" className="text-action hero-explore">{t.explore} <span aria-hidden="true">↓</span></a>
          <button className="text-action hero-project" onClick={onOpenInquiry}>{HOME[locale].nav.project} <span aria-hidden="true">↗</span></button>
        </div>
      </div>
    </section>
  );
}
