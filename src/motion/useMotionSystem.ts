import type { RefObject } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger, SplitText, useGSAP, EASE } from './config';
import { attachScrollEngine, scrollToElement } from './runtime';

export function useMotionSystem(scope: RefObject<HTMLDivElement | null>, isHome: boolean) {
  useGSAP(() => {
    const root = scope.current; if (!root || !isHome) return;
    const mm = gsap.matchMedia();
    const fontRefresh = () => ScrollTrigger.refresh();
    let alive = true;
    void document.fonts.ready.then(() => { if (alive) fontRefresh(); });
    document.fonts.addEventListener('loadingdone', fontRefresh);
    mm.add({ always: '(min-width: 0px)', reduce: '(prefers-reduced-motion: reduce)', desktop: '(min-width: 1025px) and (min-height: 700px) and (pointer: fine)', wide: '(min-width: 901px)', touch: '(pointer: coarse)' }, context => {
      const { reduce, desktop, touch } = context.conditions!;
      const cleanup: (() => void)[] = [];
      root.dataset.motionPhase = reduce ? 'reduced' : 'signature';
      const $ = <T extends HTMLElement>(selector: string) => root.querySelector<T>(selector);
      const $$ = <T extends HTMLElement>(selector: string) => [...root.querySelectorAll<T>(selector)];
      const anchor = (event: MouseEvent) => {
        const a = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
        if (!a || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        const target = document.getElementById(a.hash.slice(1)); if (!target) return;
        event.preventDefault(); scrollToElement(target, Boolean(reduce));
        if (window.location.pathname === '/') window.history.replaceState(window.history.state, '', a.hash);
        if (a.classList.contains('skip-link')) target.focus({ preventScroll: true });
      };
      document.addEventListener('click', anchor);
      cleanup.push(() => document.removeEventListener('click', anchor));
      const header = $('.site-header')!;
      let boundaries: { top: number; bottom: number; theme: string }[] = [], lastTheme = '', lastScrolled = '';
      const measure = () => {
        boundaries = $$('[data-theme]').map(el => { const r = el.getBoundingClientRect(); return { top: r.top + window.scrollY, bottom: r.bottom + window.scrollY, theme: el.dataset.theme ?? 'light' }; });
      };
      const headerUpdate = () => {
        const y = window.scrollY;
        const theme = boundaries.find(b => b.top <= y + 44 && b.bottom > y + 44)?.theme ?? 'dark';
        if (theme !== lastTheme) {
          lastTheme = theme;
          header.dataset.headerTheme = theme;
          header.classList.toggle('theme-dark', theme === 'dark');
          header.classList.toggle('theme-light', theme !== 'dark');
          document.documentElement.style.setProperty('--scrollbar-surface', theme === 'dark' ? 'var(--surface-dark)' : 'var(--surface-primary)');
        }
        const scrolled = String(y > 64);
        if (scrolled !== lastScrolled) { lastScrolled = scrolled; header.dataset.scrolled = scrolled; }
      };
      const refresh = () => { measure(); headerUpdate(); };
      measure(); headerUpdate();
      ScrollTrigger.addEventListener('refresh', refresh);
      window.addEventListener('scroll', headerUpdate, { passive: true });
      cleanup.push(() => { ScrollTrigger.removeEventListener('refresh', refresh); window.removeEventListener('scroll', headerUpdate); });
      if (reduce) return () => { cleanup.reverse().forEach(fn => fn()); };
      // One wheel engine, driven by the same ticker as GSAP. Touch remains native.
      if (!reduce && !touch) {
        const lenis = new Lenis({ lerp: .18, smoothWheel: true, syncTouch: false, autoRaf: false, prevent: el => Boolean(el.closest('dialog')) });
        const tick = (time: number) => lenis.raf(time * 1000);
        lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(tick); attachScrollEngine(lenis);
        cleanup.push(() => { gsap.ticker.remove(tick); lenis.off('scroll', ScrollTrigger.update); attachScrollEngine(null); lenis.destroy(); });
      }
      // Existing line geometry is retained; generous mask padding protects Newsreader descenders.
      root.classList.add('motion-enabled'); cleanup.push(() => root.classList.remove('motion-enabled'));
      if (window.scrollY < 80 && !window.location.pathname.startsWith('/work/')) {
        const entry = gsap.timeline({ defaults: { ease: 'power4.out' } });
        entry
          .from('.hero-media-frame', { scale: 1.08, opacity: 0.85, duration: 1.4, ease: 'power3.out' }, 0)
          .from('.site-header', { y: -16, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0.12)
          .from('.hero-top-bar', { opacity: 0, y: -10, duration: 0.6 }, 0.22)
          .from('.hero-title .split-line-inner', {
            yPercent: 125,
            skewY: 3.5,
            opacity: 0,
            duration: 1.1,
            stagger: 0.09,
            ease: 'power4.out'
          }, 0.08)
          .from('.hero-statement-grid > *', {
            y: 28,
            skewY: 1.5,
            opacity: 0,
            duration: 0.85,
            stagger: 0.08,
            ease: 'power3.out'
          }, 0.48);
      }
      const hero = $('.hero')!;
      const release = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.45,
          invalidateOnRefresh: true
        }
      });
      release
        .to('.hero-media-inner', {
          scale: desktop ? 1.08 : 1.04,
          yPercent: desktop ? 7 : 3,
          ease: 'none'
        }, 0)
        .to('.hero-title', {
          y: desktop ? -120 : -50,
          skewY: desktop ? -2.8 : -1.4,
          opacity: desktop ? 0.08 : 0.2,
          ease: 'none'
        }, 0)
        .to('.hero-statement-grid', {
          y: desktop ? -70 : -30,
          skewY: desktop ? -1.8 : -0.8,
          opacity: 0,
          ease: 'none'
        }, 0)
        .to('.hero-top-bar', { opacity: 0, y: -30, ease: 'none' }, 0)
        .to('.hero-release-corner', { scaleX: 0, ease: 'none' }, 0);
      const heroVideo = $<HTMLVideoElement>('.hero-media-inner video');
      if (heroVideo) {
        let visible = false;
        const observer = new IntersectionObserver(entries => { visible = Boolean(entries[0]?.isIntersecting); if (visible && !document.hidden) void heroVideo.play().catch(() => {}); else heroVideo.pause(); });
        observer.observe(heroVideo);
        const visibility = () => { if (document.hidden) heroVideo.pause(); else if (visible) void heroVideo.play().catch(() => {}); };
        document.addEventListener('visibilitychange', visibility);
        cleanup.push(() => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility); heroVideo.pause(); });
      }
      // Only selected statements split into responsive line masks. AutoSplit rebuilds after fonts/width changes.
      $$('.studio-statement, #assembly-title, #process-title').forEach(el => {
        const split = SplitText.create(el, { type: 'lines', mask: 'lines', autoSplit: true, aria: 'auto', onSplit: self => {
          self.masks.forEach(mask => { mask.classList.add('editorial-line-mask'); });
          return gsap.from(self.lines, { yPercent: 105, duration: .75, stagger: .07, ease: EASE.editorial,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
        } });
        cleanup.push(() => split.revert());
      });
      $$('.principle-item, .capability-row').forEach(el => gsap.from(el, { y: desktop ? 20 : 12, opacity: 0.6, duration: .65, ease: EASE.editorial, scrollTrigger: { trigger: el, start: 'top 94%', once: true } }));
      // Assembly stage: sequential lateral entrance scrubbed on scroll
      const assemblyStage = $('.assembly-stage');
      if (assemblyStage) {
        const visuals = $$<HTMLElement>('[data-assembly-visual]');
        const wordmark = $('.assembly-wordmark');

        const assemblyTl = gsap.timeline({
          scrollTrigger: {
            trigger: assemblyStage,
            start: desktop ? 'top 75%' : 'top 82%',
            end: desktop ? 'bottom 40%' : 'bottom 45%',
            scrub: 0.6,
            invalidateOnRefresh: true,
          }
        });

        if (wordmark) {
          assemblyTl.fromTo(wordmark,
            { scale: 0.94, opacity: 0, y: 24 },
            { scale: 1, opacity: 1, y: 0, ease: 'power2.out' },
            0
          );
        }

        // Sequential lateral scroll entrance for each project visual:
        // 1. SILLAGE (left) glides in piece-by-piece from the left
        if (visuals[0]) {
          assemblyTl.fromTo(visuals[0],
            { x: desktop ? -140 : -60, y: 20, opacity: 0, scale: 0.95 },
            { x: 0, y: 0, opacity: 1, scale: 1, ease: 'power2.out' },
            0.08
          );
        }

        // 2. MORI (right) glides in piece-by-piece from the right
        if (visuals[1]) {
          assemblyTl.fromTo(visuals[1],
            { x: desktop ? 140 : 60, y: 20, opacity: 0, scale: 0.95 },
            { x: 0, y: 0, opacity: 1, scale: 1, ease: 'power2.out' },
            0.34
          );
        }

        // 3. ROVE (bottom) glides in piece-by-piece from the side/bottom
        if (visuals[2]) {
          assemblyTl.fromTo(visuals[2],
            { x: desktop ? 100 : 40, y: 70, opacity: 0, scale: 0.95 },
            { x: 0, y: 0, opacity: 1, scale: 1, ease: 'power2.out' },
            0.58
          );
        }
      }
      // Crop study: architectural light and shadow spread with interactive precision detail loupe
      const photo = $('.editorial-photo');
      if (photo) {
        const frame = photo.querySelector<HTMLElement>('.photo-frame')!,
              visual = photo.querySelector<HTMLElement>('.photo-visual')!,
              crops = photo.querySelectorAll('.photo-crop'),
              credit = photo.querySelector('.photo-credit'),
              img = frame?.querySelector('img'),
              titleLines = photo.querySelectorAll('.photo-title-line > span'),
              copyDetails = photo.querySelectorAll('.photo-copy .section-label, .photo-statement p, .photo-caption-meta');

        if (titleLines.length) {
          gsap.from(titleLines, {
            yPercent: 110,
            opacity: 0,
            stagger: 0.08,
            duration: 0.85,
            ease: EASE.editorial,
            scrollTrigger: { trigger: photo, start: 'top 96%', once: true }
          });
        }

        if (copyDetails.length) {
          gsap.from(copyDetails, {
            y: 20,
            opacity: 0,
            stagger: 0.07,
            duration: 0.75,
            ease: EASE.editorial,
            scrollTrigger: { trigger: photo, start: 'top 96%', once: true }
          });
        }

        if (visual && frame && img) {
          gsap.from(visual, {
            y: 30,
            opacity: 0.6,
            duration: 0.9,
            ease: EASE.editorial,
            scrollTrigger: { trigger: photo, start: 'top 96%', once: true }
          });

          if (crops.length) {
            gsap.from(crops, {
              scale: 0.6,
              opacity: 0,
              stagger: 0.05,
              duration: 0.6,
              ease: EASE.editorial,
              scrollTrigger: { trigger: photo, start: 'top 96%', once: true }
            });
          }

          if (credit) {
            gsap.from(credit, {
              opacity: 0,
              duration: 0.6,
              scrollTrigger: { trigger: photo, start: 'top 96%', once: true }
            });
          }

          if (desktop) {
            gsap.fromTo(img,
              { yPercent: -3 },
              {
                yPercent: 3,
                ease: 'none',
                scrollTrigger: {
                  trigger: photo,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.35
                }
              }
            );
          }
        }
      }
      // The incoming surface crosses the boundary later, giving the user ample time to absorb the assembly runway.
      $$('.surface-takeover').forEach(el => gsap.from(el, { yPercent: 100, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: desktop ? 'top 80%' : 'top 90%', end: desktop ? 'top 55%' : 'top 72%', scrub: true } }));
      $$('.assembly-visual, .project-media').forEach((media, index) => {
        const cover = media.querySelector('.cover-layer, .assembly-cover-layer')!;
        const image = cover.querySelector('img')!;
        if (desktop) gsap.fromTo(image, { yPercent: -1.6 }, { yPercent: 1.6, ease: 'none', scrollTrigger: { trigger: media, start: 'top bottom', end: 'bottom top', scrub: .35 } });
        const mask = index % 3 === 0 ? 'inset(0 0 100% 0)' : index % 3 === 1 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)';
        const initialScale = media.matches('.assembly-visual') ? 1 : 1.035;
        const reveal = gsap.timeline({ paused: true, defaults: { ease: EASE.spatial, duration: .48 } })
          .fromTo(cover, { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: mask }, 0)
          .fromTo(image, { scale: initialScale }, { scale: 1.018 }, 0);
        let pointerInside = false;
        const enter = () => { pointerInside = true; reveal.play(); };
        const leave = () => { pointerInside = false; if (!media.matches(':focus-within')) reveal.reverse(); };
        const focusin = () => reveal.play();
        const focusout = () => { if (!pointerInside) reveal.reverse(); };
        if (!touch) {
          media.addEventListener('pointerenter', enter); media.addEventListener('pointerleave', leave);
        }
        media.addEventListener('focusin', focusin); media.addEventListener('focusout', focusout);
        // The same reveal can run again on every visit. Scrolling upward restores the cover.
        ScrollTrigger.create({ trigger: media, start: 'top 72%', end: 'bottom top',
          onEnter: () => { if (touch) reveal.play(0); },
          onEnterBack: () => reveal.reverse(),
          onLeaveBack: () => { pointerInside = false; reveal.reverse(); }
        });
        let previousScroll = window.scrollY;
        const resetOnUp = () => {
          const y = window.scrollY;
          if (y < previousScroll - 2) reveal.reverse();
          else if ((touch || pointerInside || media.matches(':focus-within')) && y > previousScroll + 2) {
            const bounds = media.getBoundingClientRect();
            if (bounds.top < innerHeight * .72 && bounds.bottom > innerHeight * .25) reveal.play();
          }
          previousScroll = y;
        };
        window.addEventListener('scroll', resetOnUp, { passive: true });
        cleanup.push(() => {
          window.removeEventListener('scroll', resetOnUp);
          media.removeEventListener('pointerenter', enter); media.removeEventListener('pointerleave', leave);
          media.removeEventListener('focusin', focusin); media.removeEventListener('focusout', focusout);
        });
      });
      $$('.project-canvas-item').forEach((item, index) => {
        const media = item.querySelector<HTMLElement>('.project-media');
        const meta = item.querySelector<HTMLElement>('.project-meta');
        if (!media || !meta) return;
        const entryMask = !desktop || index === 0 ? 'inset(8% 0 0 0)' : index === 1 ? 'inset(0 10% 0 0)' : 'inset(0 0 0 10%)';
        const projectEntry = gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 94%', toggleActions: 'play none none reverse' }, defaults: { ease: EASE.spatial } });
        projectEntry.from(media, { clipPath: entryMask, y: desktop ? 24 : 14, duration: .75 })
          .from(meta.children, { y: desktop ? 20 : 12, opacity: 0, duration: .5, stagger: .05, ease: EASE.editorial }, .15);
      });
      // Motion study: one page is composed in front of the visitor — structure, type, image, motion.
      const study = $('.motion-study');
      if (study) {
        const stage = study.querySelector<HTMLElement>('.motion-stage')!,
              image = study.querySelector<HTMLElement>('.motion-image')!,
              canvas = study.querySelector<HTMLElement>('.motion-canvas')!,
              img = image?.querySelector('img');

        if (desktop && image && img && stage) {
          let phase = 0;
          stage.dataset.phase = '0';
          cleanup.push(() => { stage.dataset.phase = '3'; });
          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            onUpdate() {
              const next = Math.max(0, Math.min(3, Math.floor(this.time())));
              if (next !== phase) {
                phase = next;
                stage.dataset.phase = String(next);
              }
            },
            scrollTrigger: {
              trigger: stage,
              start: 'top top',
              end: '+=140%',
              pin: true,
              pinSpacing: true,
              scrub: .6,
              invalidateOnRefresh: true
            }
          });
          tl.fromTo('.motion-progress i', { scaleX: 0 }, { scaleX: 1, duration: 4 }, 0)
            .fromTo('.motion-grid', { opacity: 1 }, { opacity: 0, duration: .5 }, 3.15)
            .fromTo('.motion-grid i', { scaleY: 0 }, { scaleY: 1, duration: .5, stagger: .03, ease: 'power2.out' }, .1)
            .fromTo('.motion-line > span', { yPercent: 125, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .6, stagger: .15, ease: EASE.editorial }, 1.1)
            .fromTo(image, { clipPath: 'inset(100% 0% 0% 50%)' }, { clipPath: 'inset(0% 0% 24% 50%)', duration: .75, ease: 'power3.inOut' }, 2.05)
            .fromTo(img, { scale: 1.35 }, { scale: 1.12, duration: .75, ease: 'power2.out' }, 2.05)
            .to(image, { clipPath: 'inset(0% 0% 0% 0%)', duration: .8, ease: 'power3.inOut' }, 3.05)
            .to(img, { scale: 1, duration: .8, ease: 'power2.inOut' }, 3.05)
            .fromTo('.motion-line-move em', { x: 0 }, { x: () => Math.min(48, window.innerWidth * 0.035), duration: .8, ease: EASE.spatial }, 3.1)
            .to({}, { duration: .3 });
        } else if (stage && canvas && image) {
          stage.dataset.phase = '0';
          cleanup.push(() => { stage.dataset.phase = '3'; });
          const mobileStudy = gsap.timeline({
            defaults: { ease: EASE.editorial },
            onUpdate() { stage.dataset.phase = String(Math.min(3, Math.floor(this.progress() * 4))); },
            scrollTrigger: { trigger: canvas, start: 'top 88%', end: 'top 22%', scrub: .3, invalidateOnRefresh: true }
          });
          mobileStudy.fromTo(image, { opacity: .15 }, { opacity: 1, duration: 1 }, 0)
            .fromTo('.motion-line > span', { yPercent: 115 }, { yPercent: 0, duration: .6, stagger: .12 }, .15);

        }
      }
      const slot = $('.capability-fragment-slot');
      if (desktop && slot) {
        cleanup.push(() => { gsap.killTweensOf(slot); slot.style.removeProperty('opacity'); slot.style.removeProperty('transform'); });
        const rows = $$('.capability-row');
        rows.forEach((row, i) => {
          const show = () => {
            slot.dataset.fragment = String(i);
            gsap.to(slot, { opacity: 1, y: 0, duration: .35, ease: EASE.editorial, overwrite: true });
          };
          row.addEventListener('pointerenter', show);
          row.addEventListener('focusin', show);
          cleanup.push(() => {
            row.removeEventListener('pointerenter', show);
            row.removeEventListener('focusin', show);
          });
        });
      }
      // FAQ editorial entrance
      const faq = $('#faq');
      if (faq) {
        const faqLines = faq.querySelectorAll('.faq-title-line > span');
        if (faqLines.length) {
          gsap.from(faqLines, {
            yPercent: 110,
            duration: 0.85,
            stagger: 0.08,
            ease: EASE.editorial,
            scrollTrigger: { trigger: faq, start: 'top 86%', once: true }
          });
        }
        const faqIntro = faq.querySelectorAll('.faq-intro .section-label, .faq-intro-text, .faq-intro-cta');
        if (faqIntro.length) {
          gsap.from(faqIntro, {
            y: 20,
            opacity: 0,
            duration: 0.75,
            stagger: 0.07,
            ease: EASE.editorial,
            scrollTrigger: { trigger: faq, start: 'top 86%', once: true }
          });
        }
        const faqItems = faq.querySelectorAll('.faq-item');
        if (faqItems.length) {
          gsap.from(faqItems, {
            y: 32,
            opacity: 0,
            duration: 0.75,
            stagger: 0.08,
            ease: EASE.editorial,
            scrollTrigger: { trigger: '.faq-list', start: 'top 88%', once: true }
          });
        }
      }
      // The closing section: quiet confidence, live atelier dispatch, and direct contact
      if ($('.closing')) {
        gsap.timeline({ defaults: { ease: EASE.editorial }, scrollTrigger: { trigger: '.closing', start: desktop ? 'top 65%' : 'top 72%', once: true } })
          .from('.closing-badge-row', { opacity: 0, y: 12, duration: .6 }, 0)
          .from('.closing-line-1 .closing-line-inner', { yPercent: 112, duration: .95 }, .08)
          .from('.closing-line-2 .closing-line-inner', { yPercent: 112, duration: .95 }, .24)
          .from('.closing-narrative', { opacity: 0, y: 16, duration: .7 }, .42)
          .from('.dispatch-primary', { opacity: 0, y: 22, duration: .7 }, .58)
          .from('.dispatch-channel-card', { opacity: 0, y: 22, duration: .7, stagger: .12 }, .68);
      }
      // Wordmark remains rock-solid and resting at the bottom. No jumping or popup scrub!
      const wordmark = $('.footer-wordmark svg');
      if (wordmark) {
        gsap.set(wordmark, { yPercent: 0, opacity: 1, clearProps: 'transform' });
      }
      ScrollTrigger.refresh();
      return () => { cleanup.reverse().forEach(fn => fn()); };
    });
    return () => { alive = false; mm.revert(); document.fonts.removeEventListener('loadingdone', fontRefresh); };
  }, { scope, dependencies: [isHome], revertOnUpdate: true });
}
