import { useEffect } from 'react';
import { SubpageHeader } from '../components/SubpageHeader';
import { Footer } from '../components/Footer';

interface ImpressumPageProps {
  onNavigateHome: () => void;
  onNavigateInquiry: () => void;
  onNavigateRoute: (route: string) => void;
}

export function ImpressumPage({ onNavigateHome, onNavigateInquiry, onNavigateRoute }: ImpressumPageProps) {
  useEffect(() => {
    document.title = 'Impressum — MARGIN Webdesign';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="subpage-shell" data-theme="dark">
      <SubpageHeader
        onNavigateHome={onNavigateHome}
        onNavigateInquiry={onNavigateInquiry}
        currentTitle="Impressum"
      />

      <main className="subpage-main">
        <div className="legal-standard-container">
          {/* Breadcrumb */}
          <nav className="subpage-breadcrumb" aria-label="Breadcrumb">
            <button type="button" onClick={onNavigateHome}>← Startseite</button>
            <span aria-hidden="true">/</span>
            <span className="current">Impressum</span>
          </nav>

          {/* Clean standard legal nav tabs */}
          <div className="legal-tabs-bar">
            <span className="legal-tab active">Impressum</span>
            <button type="button" className="legal-tab" onClick={() => onNavigateRoute('/datenschutz')}>
              Datenschutz
            </button>
            <button type="button" className="legal-tab" onClick={() => onNavigateRoute('/agb')}>
              AGB
            </button>
          </div>

          <article className="legal-standard-document">
            <h1 className="legal-standard-title">Impressum</h1>

            <section className="legal-standard-section">
              <h2>Angaben gemäß § 5 DDG</h2>
              <p>
                <strong>Margin Webdesign</strong><br />
                Geschäftsinhaberin: [Vollständiger Vor- und Nachname deiner Mutter]<br />
                Zschopauer Str. 142<br />
                09126 Chemnitz<br />
                Deutschland
              </p>
            </section>

            <section className="legal-standard-section">
              <h2>Kontakt</h2>
              <p>
                Telefon: <a href="tel:015679681426" className="legal-text-link">015679 681426</a><br />
                E-Mail: <a href="mailto:info@marginwebdesign.online" className="legal-text-link">info@marginwebdesign.online</a><br />
                Webseite: <a href="https://marginwebdesign.online" target="_blank" rel="noopener noreferrer" className="legal-text-link">marginwebdesign.online</a>
              </p>
            </section>

            <section className="legal-standard-section">
              <h2>Geschäftsbezeichnung</h2>
              <p>
                Margin Webdesign ist die Geschäftsbezeichnung des von <strong>[Vollständiger Vor- und Nachname deiner Mutter]</strong> betriebenen Einzelunternehmens.
              </p>
              <p>
                Es besteht keine Eintragung in das Handelsregister.
              </p>
            </section>

            <section className="legal-standard-section">
              <h2>Umsatzsteuer-Identifikationsnummer</h2>
              <p>
                Eine Umsatzsteuer-Identifikationsnummer oder Wirtschafts-Identifikationsnummer wird nur angegeben, sofern eine solche für das Unternehmen erteilt wurde und eine gesetzliche Angabepflicht besteht.
              </p>
            </section>

            <section className="legal-standard-section">
              <h2>Verbraucherstreitbeilegung</h2>
              <p>
                Das Leistungsangebot von Margin Webdesign richtet sich ausschließlich an Unternehmer im Sinne des § 14 BGB.
              </p>
              <p>
                Soweit eine entsprechende Informationspflicht Anwendung findet, sind wir nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>
          </article>
        </div>
      </main>

      <Footer
        onOpenLegal={(tab) => {
          if (tab === 'impressum') onNavigateRoute('/impressum');
          else if (tab === 'datenschutz') onNavigateRoute('/datenschutz');
          else if (tab === 'agb') onNavigateRoute('/agb');
        }}
        onOpenInquiry={onNavigateInquiry}
      />
    </div>
  );
}

export default ImpressumPage;
