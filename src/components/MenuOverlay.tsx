import { useDialog } from '../hooks/useDialog';
import { CONTACT_EMAIL } from '../data/media';
import type { LegalTab } from './LegalModal';
import { HOME } from '../i18n/home';
import { routePath } from '../i18n/locale';
import { useLocale } from '../i18n/useLocale';
import { LocaleSwitcher } from './LocaleSwitcher';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry: () => void;
  onOpenLegal?: (tab: LegalTab) => void;
}

export function MenuOverlay({ isOpen, onClose, onOpenInquiry, onOpenLegal }: MenuOverlayProps) {
  const locale = useLocale();
  const nav = HOME[locale].nav;
  const ref = useDialog(isOpen, onClose);

  return (
    <dialog ref={ref} id="navigation-menu" className="menu-overlay" aria-label={locale === 'de' ? 'Hauptnavigation' : 'Main navigation'}>
      <div className="menu-header">
        <a href={routePath('home', locale)} onClick={onClose} aria-label={`MARGIN — ${nav.home}`}>
          <img src="/assets/margin_logo_light.png" alt="MARGIN" width="200" height="46" />
        </a>
        <button className="text-action" onClick={onClose} autoFocus>
          {nav.close} <span aria-hidden="true">×</span>
        </button>
      </div>
      <nav className="menu-links" aria-label={locale === 'de' ? 'Mobile Navigation' : 'Mobile navigation'}>
        {[
          [nav.work, '#work'],
          [nav.studio, '#studio'],
          [nav.capabilities, '#capabilities'],
          [nav.approach, '#approach'],
          ['FAQ', '#faq']
        ].map(([label, target], i) => (
          <a className="menu-line" href={target} onClick={onClose} key={target}>
            <span className="eyebrow">0{i + 1}</span>
            <span className="menu-line-inner">{label}</span>
          </a>
        ))}
        <button
          className="menu-project text-action"
          onClick={() => {
            onClose();
            onOpenInquiry();
          }}
        >
          {nav.project} <span aria-hidden="true">↗</span>
        </button>
      </nav>
      <div className="menu-bottom-row">
        <a className="menu-email" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
        {onOpenLegal && (
          <div className="menu-legal-links">
            <button
              type="button"
              className="menu-legal-btn"
              onClick={() => {
                onClose();
                onOpenLegal('impressum');
              }}
            >
              Impressum
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              className="menu-legal-btn"
              onClick={() => {
                onClose();
                onOpenLegal('datenschutz');
              }}
            >
              Datenschutz
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              className="menu-legal-btn"
              onClick={() => {
                onClose();
                onOpenLegal('cookies');
              }}
            >
              Cookies
            </button>
          </div>
        )}
        <LocaleSwitcher />
      </div>
    </dialog>
  );
}
