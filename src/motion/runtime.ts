import type Lenis from 'lenis';

let engine: Lenis | null = null;
const locks = new Set<HTMLDialogElement>();
let previousOverflow = '';
let pendingAnchor: HTMLElement | null = null;
export function scrollToElement(target: HTMLElement, immediate = false) {
  if (locks.size) { pendingAnchor = target; return; }
  const offset = target.id === 'hero' || target.id === 'main-content' ? 0 : -100;
  if (engine) engine.scrollTo(target, { offset, immediate });
  else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + offset, behavior: immediate ? 'instant' : 'smooth' });
}
export function attachScrollEngine(value: Lenis | null) { engine = value; if (locks.size) engine?.stop(); }
export function lockDialog(dialog: HTMLDialogElement) {
  if (!locks.size) { previousOverflow = document.documentElement.style.overflow; document.documentElement.style.overflow = 'hidden'; }
  locks.add(dialog); engine?.stop(); announceDialog();
}
export function unlockDialog(dialog: HTMLDialogElement) {
  locks.delete(dialog);
  if (!locks.size) {
    document.documentElement.style.overflow = previousOverflow;
    if (pendingAnchor) { const target = pendingAnchor; pendingAnchor = null; scrollToElement(target); }
    engine?.start();
  }
  announceDialog();
}
function announceDialog() { document.dispatchEvent(new CustomEvent('margin:dialog', { detail: [...locks].at(-1) ?? null })); }
export function restoreScroll(y: number) { if (engine) engine.scrollTo(y, { immediate: true, force: true }); else window.scrollTo(0, y); }
export interface MediaSnapshot { node: HTMLElement; rect: DOMRect }
let snapshot: MediaSnapshot | null = null;
export function captureMedia(element: HTMLElement | null) {
  if (!element) { snapshot = null; return; }
  let node = element.cloneNode(true) as HTMLElement;
  if (element.matches('img,video')) { const wrapper = document.createElement('div'); wrapper.append(node); node = wrapper; }
  snapshot = { node, rect: element.getBoundingClientRect() };
}
export function consumeMedia() { const value = snapshot; snapshot = null; return value; }
