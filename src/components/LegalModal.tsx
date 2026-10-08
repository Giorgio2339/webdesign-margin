import { useState, useEffect } from 'react';
import { useDialog } from '../hooks/useDialog';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL } from '../data/media';

export type LegalTab = 'impressum' | 'datenschutz' | 'agb' | 'cookies';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: LegalTab;
  onClose: () => void;
}

export function LegalModal({ isOpen, initialTab = 'impressum', onClose }: LegalModalProps) {
  const [tabOverride, setTabOverride] = useState<LegalTab | null>(null);
  const activeTab = tabOverride ?? initialTab;

  const handleClose = () => {
    onClose();
    setTimeout(() => setTabOverride(null), 300);
  };

  const ref = useDialog(isOpen, handleClose, activeTab);

  useEffect(() => {
    ref.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab, ref]);

  return (
    <dialog
      ref={ref}
      className="legal-modal inquiry-drawer"
      aria-labelledby="legal-modal-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const rect = event.currentTarget.getBoundingClientRect();
          if (event.clientX < rect.left) handleClose();
        }
      }}
    >
      <div className="dialog-toolbar">
        <span className="eyebrow">MARGIN / Rechtliches & Compliance</span>
        <button className="text-action" type="button" onClick={handleClose} aria-label="Rechtliche Hinweise schließen">
          Schließen <span aria-hidden="true">×</span>
        </button>
      </div>

      <div className="legal-content inquiry-content">
        {/* Tab Switcher */}
        <div className="legal-tabs-nav" role="tablist" aria-label="Rechtliche Rubriken">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'impressum'}
            className={`legal-tab-btn ${activeTab === 'impressum' ? 'active' : ''}`}
            onClick={() => setTabOverride('impressum')}
          >
            Impressum
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'datenschutz'}
            className={`legal-tab-btn ${activeTab === 'datenschutz' ? 'active' : ''}`}
            onClick={() => setTabOverride('datenschutz')}
          >
            Datenschutz
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'agb'}
            className={`legal-tab-btn ${activeTab === 'agb' ? 'active' : ''}`}
            onClick={() => setTabOverride('agb')}
          >
            AGB & Konditionen
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'cookies'}
            className={`legal-tab-btn ${activeTab === 'cookies' ? 'active' : ''}`}
            onClick={() => setTabOverride('cookies')}
          >
            Cookies & Privacy
          </button>
        </div>

        {/* Tab 1: Impressum */}
        {activeTab === 'impressum' && (
          <article className="legal-article" tabIndex={0} aria-label="Impressum">
            <p className="eyebrow section-label">Rechtliche Anbieterkennzeichnung (§ 5 DDG)</p>
            <h2 id="legal-modal-title">
              Impressum &<br />
              <em>Angaben zum Atelier</em>
            </h2>

            <div className="legal-section-block">
              <h3>Dienstanbieter</h3>
              <p>
                <strong>MARGIN — Webdesign & Digitale Art Direction</strong>
                <br />
                Unabhängiges Atelier für Konzeption, Design und Webentwicklung
                <br />
                Deutschland
              </p>
            </div>

            <div className="legal-section-block">
              <h3>Direkter Kontakt</h3>
              <p>
                Telefon:{' '}
                <a href={`tel:${CONTACT_PHONE_TEL}`} className="legal-link">
                  {CONTACT_PHONE}
                </a>
                <br />
                E-Mail:{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="legal-link">
                  {CONTACT_EMAIL}
                </a>
                <br />
                Web: <span className="legal-highlight">https://marginwebdesign.online</span>
              </p>
            </div>

            <div className="legal-section-block">
              <h3>Vertretungsberechtigte Person & Redaktion</h3>
              <p>
                Inhaber / Atelierleitung: Gianluca O.
                <br />
                Verantwortlich für redaktionelle Inhalte gemäß § 18 Abs. 2 MStV: Gianluca O.
              </p>
            </div>

            <div className="legal-section-block">
              <h3>Umsatzsteuer-Hinweis</h3>
              <p>
                Umsatzsteuer-Identifikationsnummer bzw. steuerliche Erfassung erfolgt nach den gesetzlichen Bestimmungen
                des deutschen Steuerrechts.
              </p>
            </div>

            <div className="legal-section-block">
              <h3>Urheberrecht & geistiges Eigentum</h3>
              <p>
                Die auf dieser Website veröffentlichten Inhalte, Gestaltungen, Typografien, Quelltexte, Videoaufnahmen
                und visuellen Arbeiten unterliegen dem deutschen Urheberrecht. Jede Vervielfältigung, Bearbeitung oder
                Verbreitung außerhalb der Grenzen des Urheberrechts bedarf der vorherigen schriftlichen Zustimmung des
                Urhebers.
              </p>
            </div>

            <div className="legal-section-block">
              <h3>Verbraucherstreitbeilegung</h3>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="legal-link"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
                . Wir sind weder verpflichtet noch bereit, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </article>
        )}

        {/* Tab 2: Datenschutz */}
        {activeTab === 'datenschutz' && (
          <article className="legal-article" tabIndex={0} aria-label="Datenschutzerklärung">
            <p className="eyebrow section-label">Datenschutz nach EU-DSGVO</p>
            <h2 id="legal-modal-title">
              Datenschutz &<br />
              <em>Privatsphäre</em>
            </h2>

            <div className="legal-highlight-box">
              <span className="highlight-tag">PRIVACY FIRST · ZERO TRACKING</span>
              <p>
                Diese Website respektiert Ihre Privatsphäre: Wir setzen <strong>keine Tracking-Cookies</strong>, keine
                Werbepixel (wie Meta Pixel) und keine externen Statistik-Tracker (wie Google Analytics) ein. Alle
                Schriften und Medien werden ausschließlich lokal über unsere Server bereitgestellt.
              </p>
            </div>

            <div className="legal-section-block">
              <h3>1. Verantwortliche Stelle</h3>
              <p>
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:
                <br />
                <strong>MARGIN Atelier</strong>
                <br />
                E-Mail:{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="legal-link">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>

            <div className="legal-section-block">
              <h3>2. Hosting & Bereitstellung der Website</h3>
              <p>
                Beim Aufrufen unserer Website werden durch den Webserver technisch notwendige Zugriffsdaten in
                sogenannten Server-Logfiles verarbeitet (z. B. IP-Adresse in anonymisierter Form, Browsertyp, Uhrzeit des
                Zugriffs). Dies erfolgt auf Grundlage unseres berechtigten Interesses an einer sicheren und stabilen
                Bereitstellung der Website gemäß Art. 6 Abs. 1 lit. f DSGVO.
              </p>
            </div>

            <div className="legal-section-block">
              <h3>3. Projektanfragen & Kontaktaufnahme</h3>
              <p>
                Wenn Sie unser Projekt-Briefing oder die E-Mail-Funktion nutzen, verarbeiten wir Ihre freiwillig
                übermittelten Angaben (Name, E-Mail-Adresse, Unternehmensname, Projektbeschreibungen) ausschließlich zur
                Beantwortung Ihrer Anfrage und zur Anbahnung eines Vertragsverhältnisses gemäß Art. 6 Abs. 1 lit. b DSGVO.
                Ihre Daten werden vertraulich behandelt und keinesfalls an unbefugte Dritte weitergegeben.
              </p>
            </div>

            <div className="legal-section-block">
              <h3>4. Schriften & Medien (Kein Drittanbieter-Tracking)</h3>
              <p>
                Unsere Schriftarten (Inter, Newsreader) sind selbst gehostet und werden direkt von unserem Webserver
                geladen. Es findet keine Verbindung zu Servern von Drittanbietern (z. B. Google Fonts) statt, wodurch
                Ihre IP-Adresse vor einer Weiterleitung an Dritte geschützt bleibt.
              </p>
            </div>

            <div className="legal-section-block">
              <h3>5. Ihre Rechte als betroffene Person</h3>
              <p>
                Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten
                (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung
                (Art. 18 DSGVO) sowie das Recht auf Datenübertragbarkeit (Art. 20 DSGVO) und Widerspruch (Art. 21 DSGVO).
                Hierzu genügt eine formlose Nachricht an{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="legal-link">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </div>
          </article>
        )}

        {/* Tab 3: AGB */}
        {activeTab === 'agb' && (
          <article className="legal-article" tabIndex={0} aria-label="AGB & Konditionen">
            <p className="eyebrow section-label">Konditionen & Zusammenarbeit</p>
            <h2 id="legal-modal-title">
              Allgemeine<br />
              <em>Geschäftsbedingungen</em>
            </h2>

            <div className="legal-section-block">
              <h3>§ 1 Geltungsbereich</h3>
              <p>
                Diese Geschäftsbedingungen gelten für alle Verträge, Konzeptionen, Design- und Entwicklungsleistungen
                zwischen MARGIN und dem Auftraggeber (Kunden), soweit nicht schriftlich etwas anderes vereinbart wurde.
              </p>
            </div>

            <div className="legal-section-block">
              <h3>§ 2 Projektphasen & Abnahme</h3>
              <p>
                Projekte werden in klar definierten Meilensteinen umgesetzt:
                <br />
                <strong>01. Entdeckung & Strategie:</strong> Festlegung von Zielen, Tonalität und Informationsarchitektur.
                <br />
                <strong>02. Art Direction & Interface Design:</strong> Gestaltung von interaktiven Prototypen und Freigabe
                der visuellen Richtung.
                <br />
                <strong>03. Creative Development:</strong> Maßgeschneiderte technische Umsetzung, Performance- und
                Responsive-Optimierung.
                <br />
                <strong>04. Deployment & Launch:</strong> Finale Übergabe und Bereitstellung im Live-Betrieb.
              </p>
            </div>

            <div className="legal-section-block">
              <h3>§ 3 Urheber- und Nutzungsrechte</h3>
              <p>
                Mit vollständiger Begleichung der Vergütung erhält der Auftraggeber das ausschließliche Nutzungsrecht an
                den für ihn individuell erstellten finalen Entwürfen und Code-Artefakten. MARGIN behält sich das Recht
                vor, erstellte Arbeiten im Rahmen des eigenen Portfolios als Referenz zu präsentieren.
              </p>
            </div>

            <div className="legal-section-block">
              <h3>§ 4 Vergütung & Zahlungsmodalitäten</h3>
              <p>
                Soweit nicht anders im individuellen Angebot vereinbart, erfolgt die Abrechnung meilensteinbasiert
                (typischerweise 50 % Anzahlung bei Projektstart und 50 % bei finaler Abnahme und Freischaltung).
              </p>
            </div>
          </article>
        )}

        {/* Tab 4: Cookies & Einstellungen */}
        {activeTab === 'cookies' && (
          <article className="legal-article" tabIndex={0} aria-label="Cookie Einstellungen">
            <p className="eyebrow section-label">Transparenz & Einstellungen</p>
            <h2 id="legal-modal-title">
              Cookie &<br />
              <em>Präferenzen</em>
            </h2>

            <div className="legal-highlight-box">
              <span className="highlight-tag">STATUS: OPTIMAL GESCHÜTZT</span>
              <p>
                <strong>0 Cookies im Einsatz:</strong> Diese Website speichert keine Drittanbieter- oder
                Marketing-Cookies auf Ihrem Gerät.
              </p>
            </div>

            <div className="cookie-policy-breakdown">
              <div className="cookie-group-card active">
                <div className="cookie-group-header">
                  <div>
                    <h4>Technisch notwendige Funktionen</h4>
                    <span className="cookie-status-badge">Immer Aktiv</span>
                  </div>
                </div>
                <p>
                  Sichert grundlegende Website-Funktionen wie Session-Handling, Navigation, Barrierefreiheit und die
                  korrekte Darstellung des Projekt-Dialogs. Hierbei werden keine personenbezogenen Verhaltensprofile
                  erstellt.
                </p>
              </div>

              <div className="cookie-group-card">
                <div className="cookie-group-header">
                  <div>
                    <h4>Analyse & Reichweitenmessung</h4>
                    <span className="cookie-status-badge neutral">Keine aktiv</span>
                  </div>
                </div>
                <p>
                  Wir verzichten bewusst auf externe Tracking-Dienste wie Google Analytics oder Hotjar, um Ihre
                  Ladezeiten maximal schnell und Ihre Daten privat zu halten.
                </p>
              </div>

              <div className="cookie-group-card">
                <div className="cookie-group-header">
                  <div>
                    <h4>Marketing & Retargeting</h4>
                    <span className="cookie-status-badge neutral">Keine aktiv</span>
                  </div>
                </div>
                <p>
                  Es werden keinerlei Werbenetzwerke oder Social-Media-Pixel eingebunden. Sie surfen vollständig
                  werbefrei.
                </p>
              </div>
            </div>

            <div className="legal-actions-row">
              <button
                type="button"
                className="text-action"
                onClick={handleClose}
              >
                Einstellungen bestätigen & schließen <span aria-hidden="true">✓</span>
              </button>
            </div>
          </article>
        )}
      </div>
    </dialog>
  );
}
