import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL } from '../data/media';
import { HOME } from '../i18n/home';
import { useLocale } from '../i18n/useLocale';

export function ConversionCTA({ onOpenInquiry }: { onOpenInquiry: () => void }) {
  const t = HOME[useLocale()].closing;
  const [emailUser, emailHost] = CONTACT_EMAIL.split('@');
  const [emailDomain, emailTld] = emailHost.split('.');
  return <section id="contact" className="closing closing-refined" data-theme="dark" aria-labelledby="contact-title">
    <div className="page-container closing-inner">
      <div className="closing-header">
        <p className="eyebrow closing-eyebrow">{t.eyebrow}</p>
        <h2 id="contact-title" className="closing-title">
          <span className="closing-line closing-line-1"><span className="closing-line-inner">{t.lineA}</span></span>
          <span className="closing-line closing-line-2"><span className="closing-line-inner"><em>{t.lineB}</em></span></span>
        </h2>
        <p className="closing-narrative">{t.narrative}</p>
      </div>
      <div className="contact-options" aria-label={t.eyebrow}>
        <button type="button" className="contact-option contact-option-primary" onClick={onOpenInquiry}>
          <span className="contact-option-label">01 / {t.project}</span>
          <span className="contact-option-value">{t.project}<span aria-hidden="true">↗</span></span>
          <span className="contact-option-note">{t.projectInfo}</span>
        </button>
        <a className="contact-option" href={`tel:${CONTACT_PHONE_TEL}`}>
          <span className="contact-option-label">02 / {t.phone}</span>
          <span className="contact-option-value">{CONTACT_PHONE}<span aria-hidden="true">↗</span></span>
          <span className="contact-option-note">{t.phoneInfo}</span>
        </a>
        <a className="contact-option" href={`mailto:${CONTACT_EMAIL}`}>
          <span className="contact-option-label">03 / {t.email}</span>
          <span className="contact-option-value"><span className="contact-email-text">{emailUser}@<wbr />{emailDomain}.<wbr />{emailTld}</span><span aria-hidden="true">↗</span></span>
          <span className="contact-option-note">{t.emailInfo}</span>
        </a>
      </div>
    </div>
  </section>;
}
