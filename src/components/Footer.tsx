import { MarginWordmark } from './MarginWordmark';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL } from '../data/media';

const copyrightYear = new Date().getFullYear();

const NAV_LINKS = [
  { href: '#work', label: 'Arbeiten' },
  { href: '#studio', label: 'Studio' },
  { href: '#capabilities', label: 'Kompetenzen' },
  { href: '#approach', label: 'Methodik' },
  { href: '#faq', label: 'FAQ' }
];

interface FooterProps {
  onOpenLegal?: (tab: 'impressum' | 'datenschutz' | 'agb' | 'cookies') => void;
  onOpenInquiry?: () => void;
}

export function Footer({ onOpenLegal, onOpenInquiry }: FooterProps) {
  return (
    <footer className="site-footer" data-theme="dark" aria-label="Seitenfuß">
      <div className="page-container">
        {/* Upper Grid: Editorial Studio Architecture */}
        <div className="footer-columns-grid">
          {/* Column 1: Studio POV & Status */}
          <div className="footer-col footer-col-brand">
            <span className="eyebrow footer-col-eyebrow">MARGIN / ATELIER</span>
            <p className="footer-brand-statement">
              Digitale Präsenz.
              Mit Haltung.
            </p>

          </div>

          {/* Column 2: Navigation */}
          <div className="footer-col">
            <span className="eyebrow footer-col-eyebrow">Bereiche</span>
            <nav aria-label="Hauptnavigation im Footer">
              <ul className="footer-menu-list">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={window.location.pathname === '/' ? link.href : `/${link.href}`} className="footer-menu-link">
                      {link.label}
                    </a>
                  </li>
                ))}
                {onOpenInquiry && (
                  <li>
                    <a
                      href="/anfrage"
                      className="footer-menu-link footer-menu-action"
                      onClick={(e) => {
                        e.preventDefault();
                        onOpenInquiry();
                      }}
                    >
                      Projekt anfragen ↗
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          </div>

          {/* Column 3: Legal & Compliance */}
          <div className="footer-col">
            <span className="eyebrow footer-col-eyebrow">Rechtliches</span>
            <ul className="footer-menu-list">
              <li>
                <a
                  href="/impressum"
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
                  href="/datenschutz"
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
                  href="/agb"
                  className="footer-menu-link"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenLegal?.('agb');
                  }}
                >
                  AGB & Konditionen
                </a>
              </li>

            </ul>
          </div>

          {/* Column 4: Direct Dispatch & Contact */}
          <div className="footer-col footer-col-contact">
            <span className="eyebrow footer-col-eyebrow">Kontakt</span>
            <div className="footer-direct-contact">
              <a href={`tel:${CONTACT_PHONE_TEL}`} className="footer-contact-link" title="Direkt anrufen">
                <span className="contact-prefix">T.</span>
                <span className="contact-value">{CONTACT_PHONE}</span>
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="footer-contact-link" title="E-Mail senden">
                <span className="contact-prefix">M.</span>
                <span className="contact-value">{CONTACT_EMAIL}</span>
              </a>
            </div>
            <p className="footer-timing-note">
              Design & Entwicklung aus einer Hand.
            </p>
          </div>
        </div>

        {/* Lower Row: Copyright Statement */}
        <div className="footer-sub-bar">
          <p className="footer-copy">
            © {copyrightYear} MARGIN. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>

      {/* Monumental MARGIN wordmark */}
      <div className="footer-wordmark" aria-hidden="true">
        <MarginWordmark />
      </div>
    </footer>
  );
}
