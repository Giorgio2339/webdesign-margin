import { CONTACT_PHONE, CONTACT_PHONE_TEL } from '../data/media';
import { useLocale } from '../i18n/useLocale';
import { HOME } from '../i18n/home';
import { LocaleSwitcher } from './LocaleSwitcher';

interface SubpageHeaderProps {
  onNavigateHome: () => void;
  onNavigateInquiry?: () => void;
  currentTitle?: string;
  showInquiryButton?: boolean;
}

export function SubpageHeader({
  onNavigateHome,
  onNavigateInquiry,
  currentTitle,
  showInquiryButton = true
}: SubpageHeaderProps) {
  const locale = useLocale();
  const nav = HOME[locale].nav;
  return (
    <header className="subpage-header" data-theme="dark">
      <div className="page-container subpage-header-inner">
        <div className="subpage-header-left">
          <button
            type="button"
            className="subpage-brand-btn"
            onClick={onNavigateHome}
            aria-label={locale === 'de' ? 'Zurück zur Startseite' : 'Back to home'}
          >
            <img src="/assets/margin_logo_light.png" alt="MARGIN" width="160" height="37" />
          </button>
          {currentTitle && (
            <span className="subpage-title-badge">
              <span className="badge-divider">/</span>
              <span>{currentTitle}</span>
            </span>
          )}
        </div>

        <div className="subpage-header-actions">
          <LocaleSwitcher />
          <button
            type="button"
            className="subpage-back-link text-action"
            onClick={onNavigateHome}
          >
            ← {nav.home}
          </button>

          <a
            href={`tel:${CONTACT_PHONE_TEL}`}
            className="subpage-phone-link"
            title={locale === 'de' ? 'Direkt anrufen' : 'Call us'}
          >
            <span className="pill-lbl">T.</span>
            <span className="pill-val">{CONTACT_PHONE}</span>
          </a>

          {showInquiryButton && onNavigateInquiry && (
            <button
              type="button"
              className="text-action header-project"
              onClick={onNavigateInquiry}
            >
              <span>{nav.project}</span>
              <span aria-hidden="true">↗</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
