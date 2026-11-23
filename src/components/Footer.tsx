import { MarginWordmark } from './MarginWordmark';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL } from '../data/media';
import { LocaleSwitcher } from './LocaleSwitcher';
import { HOME } from '../i18n/home';
import { routePath } from '../i18n/locale';
import { useLocale } from '../i18n/useLocale';

const copyrightYear = new Date().getFullYear();

interface FooterProps {
  onOpenLegal?: (tab: 'impressum' | 'datenschutz' | 'agb' | 'cookies') => void;
  onOpenInquiry?: () => void;
}

export function Footer({ onOpenLegal, onOpenInquiry }: FooterProps) {
  const locale = useLocale();
  const t = HOME[locale].footer;
  const nav = HOME[locale].nav;
  const navLinks = [{ href: '#work', label: nav.work }, { href: '#studio', label: nav.studio }, { href: '#capabilities', label: nav.capabilities }, { href: '#approach', label: nav.approach }, { href: '#faq', label: 'FAQ' }];
  return (
    <footer className="site-footer" data-theme="dark" aria-label={locale === 'de' ? 'Seitenfuß' : 'Footer'}>
      <div className="page-container">
        {/* Upper Grid: Editorial Studio Architecture */}
        <div className="footer-columns-grid">
          {/* Column 1: Studio POV & Status */}
          <div className="footer-col footer-col-brand">
            <span className="eyebrow footer-col-eyebrow">MARGIN / ATELIER</span>
            <p className="footer-brand-statement">
              {t.statement}
            </p>

          </div>

          {/* Column 2: Navigation */}
          <div className="footer-col">
            <span className="eyebrow footer-col-eyebrow">{t.sections}</span>
            <nav aria-label={locale === 'de' ? 'Hauptnavigation im Footer' : 'Footer navigation'}>
              <ul className="footer-menu-list">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={window.location.pathname === routePath('home', locale) ? link.href : `${routePath('home', locale)}${link.href}`} className="footer-menu-link">
                      {link.label}
                    </a>
                  </li>
                ))}
                {onOpenInquiry && (
                  <li>
                    <a
                      href={routePath('inquiry', locale)}
                      className="footer-menu-link footer-menu-action"
                      onClick={(e) => {
                        e.preventDefault();
                        onOpenInquiry();
                      }}
                    >
                      {nav.project} ↗
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          </div>

          {/* Column 3: Legal & Compliance */}
          <div className="footer-col">
            <span className="eyebrow footer-col-eyebrow">{t.legal}</span>
            <ul className="footer-menu-list">
              <li>
                <a
                  href={routePath('impressum', locale)}
                  className="footer-menu-link"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenLegal?.('impressum');
                  }}
                >
                  Impressum
                </a>
              </li>
              <li>
                <a
                  href={routePath('datenschutz', locale)}
                  className="footer-menu-link"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenLegal?.('datenschutz');
                  }}
                >
                  Datenschutz
                </a>
              </li>
              <li>
                <a
                  href={routePath('agb', locale)}
                  className="footer-menu-link"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenLegal?.('agb');
                  }}
                >
                  {nav.terms}
                </a>
              </li>

            </ul>
          </div>

          {/* Column 4: Direct Dispatch & Contact */}
          <div className="footer-col footer-col-contact">
            <span className="eyebrow footer-col-eyebrow">{t.contact}</span>
            <div className="footer-direct-contact">
              <a href={`tel:${CONTACT_PHONE_TEL}`} className="footer-contact-link" title={locale === 'de' ? 'Direkt anrufen' : 'Call us'}>
                <span className="contact-prefix">T.</span>
                <span className="contact-value">{CONTACT_PHONE}</span>
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="footer-contact-link" title={locale === 'de' ? 'E-Mail senden' : 'Email us'}>
                <span className="contact-prefix">M.</span>
                <span className="contact-value">{CONTACT_EMAIL}</span>
              </a>
            </div>
            <p className="footer-timing-note">
              {t.note}
            </p>
          </div>
        </div>

        {/* Lower Row: Copyright Statement */}
        <div className="footer-sub-bar">
          <p className="footer-copy">
            © {copyrightYear} MARGIN. {t.rights}
          </p>
          <LocaleSwitcher />
        </div>
      </div>

      {/* Monumental MARGIN wordmark */}
      <div className="footer-wordmark" aria-hidden="true">
        <MarginWordmark />
      </div>
    </footer>
  );
}
