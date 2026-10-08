import { CONTACT_PHONE, CONTACT_PHONE_TEL } from '../data/media';

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
  return (
    <header className="subpage-header" data-theme="dark">
      <div className="page-container subpage-header-inner">
        <div className="subpage-header-left">
          <button
            type="button"
            className="subpage-brand-btn"
            onClick={onNavigateHome}
            aria-label="Zurück zur Startseite"
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
          <button
            type="button"
            className="subpage-back-link text-action"
            onClick={onNavigateHome}
          >
            ← Zur Startseite
          </button>

          <a
            href={`tel:${CONTACT_PHONE_TEL}`}
            className="subpage-phone-link"
            title="Direkt anrufen"
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
              <span>Projekt starten</span>
              <span aria-hidden="true">↗</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
