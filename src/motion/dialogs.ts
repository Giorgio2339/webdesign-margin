import { gsap, Flip, EASE, reducedMotion } from './config';
import { consumeMedia } from './runtime';

// The bridge lives in the native dialog's top layer. Navigation never waits for it.
export function enterCase(dialog: HTMLDialogElement) {
  const target = dialog.querySelector<HTMLElement>('.case-media');
  const snapshot = consumeMedia();
  if (!target || reducedMotion()) return () => {};
  dialog.scrollTop = 0;
  const context = gsap.context(() => {
    gsap.from('.case-content > :not(.case-media)', { y: 18, opacity: 0, duration: .55, ease: EASE.editorial, stagger: .025 });
  }, dialog);
  let bridge: HTMLElement | null = null;
  let tween: gsap.core.Timeline | null = null;
  if (snapshot && snapshot.rect.width && snapshot.rect.height) {
    bridge = snapshot.node;
    bridge.removeAttribute('id'); bridge.removeAttribute('href');
    bridge.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
    bridge.className = 'case-transition-bridge'; bridge.setAttribute('aria-hidden', 'true');
    dialog.append(bridge);
    gsap.set(bridge, { position: 'fixed', left: snapshot.rect.left, top: snapshot.rect.top, width: snapshot.rect.width, height: snapshot.rect.height, zIndex: 20, margin: 0, pointerEvents: 'none', opacity: 1 });
    gsap.set(target, { visibility: 'hidden' });
    try {
      const fit = Flip.fit(bridge, target, { getVars: true, scale: false }) as gsap.TweenVars;
      tween = gsap.timeline({ defaults: { ease: EASE.spatial }, onComplete: () => { gsap.set(target, { clearProps: 'visibility' }); bridge?.remove(); } });
      const cover = bridge.querySelector('.cover-layer'), overlay = bridge.querySelector('.interaction-overlay');
      if (cover) tween.to(cover, { clipPath: 'inset(0 0 100% 0)', duration: .3 }, 0);
      if (overlay) tween.to(overlay, { opacity: 0, duration: .2 }, 0);
      tween.to(bridge, { ...fit, duration: window.innerWidth > 1024 ? .72 : .44 }, .04);
    } catch { gsap.set(target, { clearProps: 'visibility' }); bridge.remove(); }
  }
  return () => { tween?.kill(); bridge?.remove(); gsap.set(target, { clearProps: 'visibility' }); context.revert(); };
}
export function exitCase(dialog: HTMLDialogElement, done: () => void) {
  const id = dialog.dataset.projectId;
  const target = document.querySelector<HTMLElement>(`#project-${id} .project-media`);
  const source = dialog.querySelector<HTMLElement>('.case-media');
  if (!target || !source || reducedMotion()) { done(); return () => {}; }
  const r = target.getBoundingClientRect();
  if (r.bottom < 0 || r.top > window.innerHeight) { const fade = gsap.to(dialog, { opacity: 0, duration: .2, onComplete: done }); return () => fade.kill(); }
  const bridge = source.cloneNode(true) as HTMLElement;
  bridge.className = 'case-transition-bridge'; bridge.setAttribute('aria-hidden', 'true'); dialog.append(bridge);
  const sr = source.getBoundingClientRect();
  gsap.set(bridge, { position: 'fixed', left: sr.left, top: sr.top, width: sr.width, height: sr.height, zIndex: 20, margin: 0 });
  const tl = gsap.timeline({ onComplete: () => { bridge.remove(); done(); } });
  tl.to(dialog.querySelector('.case-content'), { opacity: 0, duration: .18 }, 0)
    .to(bridge, { left: r.left, top: r.top, width: r.width, height: r.height, duration: .48, ease: EASE.spatial }, 0)
    .to(dialog, { backgroundColor: 'rgba(12,13,16,0)', duration: .22 }, .28);
  return () => { tl.kill(); bridge.remove(); };
}
