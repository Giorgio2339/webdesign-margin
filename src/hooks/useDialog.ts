import { useLayoutEffect, useRef } from 'react';
import { gsap, EASE, reducedMotion } from '../motion/config';
import { lockDialog, unlockDialog } from '../motion/runtime';
import { enterCase, exitCase } from '../motion/dialogs';

export function useDialog(isOpen: boolean, onClose: () => void, contentKey?: string, onClosed?: () => void) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef(onClose);
  const closedRef = useRef(onClosed);
  useLayoutEffect(() => { closeRef.current = onClose; closedRef.current = onClosed; });
  useLayoutEffect(() => {
    const dialog = ref.current; if (!dialog) return;
    const cancel = (event: Event) => { event.preventDefault(); closeRef.current(); };
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !dialog.open) return;
      const items = [...dialog.querySelectorAll<HTMLElement>('a[href], button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), [tabindex]:not([tabindex="-1"])')].filter(el => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden');
      const first = items[0], last = items.at(-1);
      if (!first) { event.preventDefault(); dialog.focus(); return; }
      const outside = !dialog.contains(document.activeElement);
      if (outside || (event.shiftKey && document.activeElement === first) || (!event.shiftKey && document.activeElement === last)) {
        event.preventDefault(); (event.shiftKey ? last : first)?.focus();
      }
    };
    dialog.addEventListener('keydown', trapFocus);
    dialog.addEventListener('cancel', cancel);
    return () => { dialog.removeEventListener('cancel', cancel); dialog.removeEventListener('keydown', trapFocus); dialog.close(); unlockDialog(dialog); };
  }, []);
  useLayoutEffect(() => {
    const dialog = ref.current; if (!dialog) return;
    let customCleanup: (() => void) | undefined;
    const context = gsap.context(() => {
      const finish = () => {
        dialog.close(); unlockDialog(dialog);
        gsap.set(dialog, { clearProps: 'all' });
        closedRef.current?.();
      };
      if (isOpen) {
        if (!dialog.open) { dialog.showModal(); lockDialog(dialog); }
        gsap.set(dialog, { clearProps: 'all' });
        if (dialog.classList.contains('case-study-modal')) customCleanup = enterCase(dialog);
        else if (!reducedMotion()) {
          if (dialog.classList.contains('menu-overlay')) {
            gsap.from(dialog, { clipPath: 'inset(0 0 100% 0)', duration: .42, ease: EASE.spatial });
            gsap.from('.menu-line-inner', { yPercent: 110, duration: .5, stagger: .045, delay: .15, ease: EASE.editorial });
            gsap.from('.menu-project, .menu-email', { opacity: 0, y: 8, duration: .3, delay: .35, ease: EASE.editorial });
          } else gsap.from(dialog, { xPercent: 12, opacity: 0, duration: .38, ease: EASE.editorial });
        }
      } else if (dialog.open) {
        if (reducedMotion()) finish();
        else if (dialog.classList.contains('case-study-modal')) customCleanup = exitCase(dialog, finish);
        else gsap.to(dialog, { clipPath: dialog.classList.contains('menu-overlay') ? 'inset(0 0 100% 0)' : 'inset(0 0 0 100%)', duration: .25, ease: EASE.spatial, onComplete: finish });
      }
    }, dialog);
    return () => { customCleanup?.(); context.revert(); };
  }, [isOpen, contentKey]);
  return ref;
}
