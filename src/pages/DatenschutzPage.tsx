import { useEffect } from 'react';
import { SubpageHeader } from '../components/SubpageHeader';
import { Footer } from '../components/Footer';

interface DatenschutzPageProps {
  onNavigateHome: () => void;
  onNavigateInquiry: () => void;
  onNavigateRoute: (route: string) => void;
}

export function DatenschutzPage({ onNavigateHome, onNavigateInquiry, onNavigateRoute }: DatenschutzPageProps) {
  useEffect(() => {
    document.title = 'Datenschutzerklärung — MARGIN Webdesign & digitale Art Direction';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="subpage-shell" data-theme="dark">
      <SubpageHeader
        onNavigateHome={onNavigateHome}
        onNavigateInquiry={onNavigateInquiry}
        currentTitle="Datenschutz"
      />

      <main className="subpage-main">
        <div className="page-container">
          {/* Breadcrumb */}
          <nav className="subpage-breadcrumb" aria-label="Breadcrumb">
            <button type="button" onClick={onNavigateHome}>Startseite</button>
            <span aria-hidden="true">/</span>
            <span className="current">Datenschutz</span>
          </nav>

          {/* Hero */}
          <div className="subpage-hero">
            <span className="eyebrow subpage-hero-eyebrow">DATENSCHUTZERKLÄRUNG (EU-DSGVO)</span>
            <h1 className="subpage-hero-title">
              Datenschutz &<br />
              <em>Privatsphäre.</em>
            </h1>
            <p className="subpage-hero-lead">
              Informationen über die Art, den Umfang und den Zweck der Verarbeitung personenbezogener Daten auf unserer Website.
            </p>
          </div>

          {/* Highlight Privacy Badge */}
          <div className="editorial-privacy-callout">
            <div className="callout-badge-row">
              <span className="capsule-live-dot" />
              <span className="callout-tag">ZERO TRACKING POLICY · DATENSPARSAMKEIT</span>
            </div>
            <h3>Der Schutz Ihrer Daten steht an erster Stelle.</h3>
            <p>
              Wir setzen derzeit keine Analyse-, Werbe- oder Marketingcookies ein. Alle Schriften werden lokal ausgeliefert.
            </p>
          </div>

          {/* Editorial Content Layout */}
          <div className="subpage-editorial-grid">
            <div className="subpage-content-column">
              <section className="editorial-section-block">
                <span className="editorial-num">01 //</span>
                <h2>1. Verantwortlicher</h2>
                <div className="editorial-body">
                  <p>
                    Verantwortlicher für die Verarbeitung personenbezogener Daten auf dieser Website ist:
                  </p>
                  <p className="editorial-lead-strong">
                    Giorgi Bantsadze<br />
                    Margin Webdesign<br />
                    Zschopauer Str. 142<br />
                    09126 Chemnitz<br />
                    Deutschland
                  </p>
                  <p>
                    Telefon: 015679 681426<br />
                    E-Mail:{' '}
                    <a href="mailto:info@marginwebdesign.online" className="editorial-link">
                      info@marginwebdesign.online
                    </a>
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">02 //</span>
                <h2>2. Allgemeine Hinweise</h2>
                <div className="editorial-body">
                  <p>
                    Der Schutz personenbezogener Daten ist uns wichtig. Personenbezogene Daten werden auf dieser Website nur verarbeitet, soweit dies für den Betrieb der Website, die Kommunikation mit Interessenten und Kunden sowie die Anbahnung und Durchführung geschäftlicher Beziehungen erforderlich ist.
                  </p>
                  <p>
                    Die Verarbeitung erfolgt auf Grundlage der Datenschutz-Grundverordnung (DSGVO) sowie der jeweils anwendbaren nationalen Datenschutzvorschriften.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">03 //</span>
                <h2>3. Bereitstellung und Hosting der Website</h2>
                <div className="editorial-body">
                  <p>
                    Für die technische Bereitstellung, Auslieferung und Absicherung dieser Website werden Dienste von Cloudflare eingesetzt.
                  </p>
                  <p>
                    Anbieter ist, abhängig von der jeweils einschlägigen Vertragsbeziehung:<br />
                    <strong>Cloudflare, Inc.</strong><br />
                    101 Townsend St.<br />
                    San Francisco, CA 94107<br />
                    USA
                  </p>
                  <p>
                    Beim Aufruf der Website können technisch erforderliche Informationen verarbeitet werden. Dazu können insbesondere gehören:
                  </p>
                  <ul className="editorial-bullet-list">
                    <li>IP-Adresse</li>
                    <li>Datum und Uhrzeit des Zugriffs</li>
                    <li>aufgerufene Seite oder Datei</li>
                    <li>Referrer-URL</li>
                    <li>Browsertyp und Browserversion</li>
                    <li>Betriebssystem</li>
                    <li>Geräte- und Verbindungsinformationen</li>
                    <li>sicherheitsrelevante Informationen</li>
                  </ul>
                  <p>
                    Die Verarbeitung erfolgt zur zuverlässigen und sicheren Bereitstellung unserer Website, zur Abwehr missbräuchlicher Zugriffe sowie zur Gewährleistung der technischen Stabilität.
                  </p>
                  <p>
                    Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse besteht in einem sicheren, stabilen und leistungsfähigen Internetauftritt.
                  </p>
                  <p>
                    Soweit Cloudflare personenbezogene Daten in unserem Auftrag verarbeitet, erfolgt die Verarbeitung auf Grundlage eines entsprechenden Auftragsverarbeitungsverhältnisses.
                  </p>
                  <p>
                    Im Zusammenhang mit der Nutzung von Cloudflare kann eine Verarbeitung personenbezogener Daten auch außerhalb der Europäischen Union beziehungsweise des Europäischen Wirtschaftsraums stattfinden. Für entsprechende Datenübermittlungen werden die nach den datenschutzrechtlichen Vorschriften vorgesehenen Schutzmechanismen eingesetzt.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">04 //</span>
                <h2>4. Kontaktaufnahme</h2>
                <div className="editorial-body">
                  <p>
                    Wenn Sie uns per E-Mail, Telefon oder über eine andere angebotene Kontaktmöglichkeit kontaktieren, verarbeiten wir die von Ihnen übermittelten Angaben zur Bearbeitung Ihrer Anfrage.
                  </p>
                  <p>Hierzu können insbesondere gehören:</p>
                  <ul className="editorial-bullet-list">
                    <li>Name</li>
                    <li>Unternehmen</li>
                    <li>E-Mail-Adresse</li>
                    <li>Telefonnummer</li>
                    <li>Inhalt Ihrer Nachricht</li>
                    <li>Angaben zum geplanten Projekt</li>
                    <li>sonstige freiwillig übermittelte Informationen</li>
                  </ul>
                  <p>
                    Dient die Kontaktaufnahme der Anbahnung oder Durchführung eines Vertrags, erfolgt die Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO.
                  </p>
                  <p>
                    Bei sonstigen geschäftlichen Anfragen erfolgt die Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der Bearbeitung und Beantwortung geschäftlicher Anfragen.
                  </p>
                  <p>
                    Die Daten werden gelöscht, sobald sie für die Bearbeitung der jeweiligen Anfrage nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungs-, Nachweis- oder berechtigten Aufbewahrungsinteressen entgegenstehen.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">05 //</span>
                <h2>5. Kontaktformular über Web3Forms</h2>
                <div className="editorial-body">
                  <p>
                    Für die technische Verarbeitung von Anfragen über das Kontaktformular setzen wir Web3Forms ein. Der Dienst wird von Web3Creative betrieben.
                  </p>
                  <p>
                    Wenn Sie das Kontaktformular verwenden, werden die von Ihnen eingegebenen Informationen an Web3Forms übertragen und dort in unserem Auftrag verarbeitet, damit die Anfrage an uns übermittelt werden kann.
                  </p>
                  <p>Je nach Formular können insbesondere folgende Daten verarbeitet werden:</p>
                  <ul className="editorial-bullet-list">
                    <li>Name</li>
                    <li>E-Mail-Adresse</li>
                    <li>Telefonnummer, sofern angegeben</li>
                    <li>Unternehmen</li>
                    <li>Projektinformationen</li>
                    <li>Nachrichteninhalt</li>
                    <li>technische Verbindungsdaten</li>
                  </ul>
                  <p>
                    Rechtsgrundlage für die Verarbeitung ist Art. 6 Abs. 1 lit. b DSGVO, wenn Ihre Anfrage der Anbahnung oder Durchführung eines Vertrags dient. Im Übrigen erfolgt die Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO aufgrund unseres berechtigten Interesses an einer zuverlässigen und sicheren Bearbeitung von Kontaktanfragen.
                  </p>
                  <p>
                    Web3Forms kann für die Bereitstellung seines Dienstes weitere Infrastruktur- und Unterauftragsverarbeiter einsetzen. Hierbei kann es auch zu einer Verarbeitung personenbezogener Daten außerhalb der Europäischen Union beziehungsweise des Europäischen Wirtschaftsraums kommen. Nach Angaben des Anbieters werden für entsprechende Übermittlungen geeignete datenschutzrechtliche Garantien, insbesondere Standardvertragsklauseln, eingesetzt.
                  </p>
                  <p>
                    Wir empfehlen, über das Kontaktformular keine besonders sensiblen oder für die jeweilige Anfrage nicht erforderlichen personenbezogenen Informationen zu übermitteln.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">06 //</span>
                <h2>6. Schutz vor Spam und Missbrauch</h2>
                <div className="editorial-body">
                  <p>
                    Zum Schutz unserer Formulare und technischen Systeme können Sicherheitsmechanismen eingesetzt werden, um automatisierte, missbräuchliche oder schädliche Anfragen zu erkennen und zu verhindern.
                  </p>
                  <p>
                    Dabei können insbesondere IP-Adresse, technische Verbindungsinformationen und formularbezogene Informationen verarbeitet werden.
                  </p>
                  <p>
                    Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im Schutz unserer Website, unserer Kommunikationssysteme und unserer Infrastruktur vor Spam und Missbrauch.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">07 //</span>
                <h2>7. Cookies und ähnliche Technologien</h2>
                <div className="editorial-body">
                  <p>
                    Wir setzen derzeit keine Analyse-, Werbe- oder Marketingcookies ein.
                  </p>
                  <p>
                    Soweit technisch notwendige Informationen auf dem Endgerät gespeichert oder von diesem abgerufen werden, erfolgt dies ausschließlich, soweit dies für die Bereitstellung einer ausdrücklich gewünschten Funktion oder für den sicheren technischen Betrieb erforderlich ist.
                  </p>
                  <p>
                    Sollten zukünftig Analyse-, Marketing- oder sonstige nicht technisch notwendige Technologien eingesetzt werden, werden diese – soweit gesetzlich erforderlich – erst nach entsprechender Einwilligung aktiviert.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">08 //</span>
                <h2>8. Schriftarten</h2>
                <div className="editorial-body">
                  <p>
                    Auf dieser Website verwendete Schriftarten werden nach Möglichkeit lokal vom eigenen Webauftritt bereitgestellt. Dadurch wird beim Laden der Schriftarten keine Verbindung zu externen Schriftartdiensten wie Google Fonts benötigt.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">09 //</span>
                <h2>9. Empfänger personenbezogener Daten</h2>
                <div className="editorial-body">
                  <p>
                    Personenbezogene Daten werden grundsätzlich nur solchen Empfängern zugänglich gemacht, deren Einbindung für den Betrieb dieser Website, die Kommunikation oder die Durchführung unserer Leistungen erforderlich ist.
                  </p>
                  <p>
                    Hierzu können insbesondere technische Dienstleister, Hosting- und Infrastrukturprovider sowie Dienstleister für die Verarbeitung von Kontaktanfragen gehören.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">10 //</span>
                <h2>10. Speicherdauer</h2>
                <div className="editorial-body">
                  <p>
                    Wir speichern personenbezogene Daten nur so lange, wie dies für den jeweiligen Verarbeitungszweck erforderlich ist.
                  </p>
                  <p>
                    Anschließend werden die Daten gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten, Nachweiserfordernisse oder sonstigen rechtlich zulässigen Gründe einer Löschung entgegenstehen.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">11 //</span>
                <h2>11. Ihre Rechte</h2>
                <div className="editorial-body">
                  <p>
                    Ihnen stehen nach Maßgabe der gesetzlichen Voraussetzungen insbesondere folgende Rechte zu:
                  </p>
                  <ul className="editorial-bullet-list">
                    <li>Recht auf Auskunft über Ihre personenbezogenen Daten</li>
                    <li>Recht auf Berichtigung unrichtiger Daten</li>
                    <li>Recht auf Löschung</li>
                    <li>Recht auf Einschränkung der Verarbeitung</li>
                    <li>Recht auf Datenübertragbarkeit</li>
                    <li>Recht auf Widerspruch gegen bestimmte Verarbeitungen</li>
                    <li>Recht auf Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft</li>
                  </ul>
                  <p>
                    Zur Ausübung Ihrer Rechte können Sie sich unter den oben genannten Kontaktdaten an uns wenden.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">12 //</span>
                <h2>12. Widerspruch gegen Verarbeitung auf Grundlage berechtigter Interessen</h2>
                <div className="editorial-body">
                  <p>
                    Soweit wir personenbezogene Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO verarbeiten, haben Sie nach Maßgabe von Art. 21 DSGVO das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, Widerspruch gegen diese Verarbeitung einzulegen.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">13 //</span>
                <h2>13. Beschwerderecht bei einer Aufsichtsbehörde</h2>
                <div className="editorial-body">
                  <p>
                    Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren.
                  </p>
                  <p>
                    Für Verantwortliche mit Sitz in Sachsen kommt insbesondere folgende Behörde in Betracht:<br />
                    <strong>Sächsische Datenschutz- und Transparenzbeauftragte</strong><br />
                    Maternistraße 17<br />
                    01067 Dresden
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">14 //</span>
                <h2>14. Sicherheit</h2>
                <div className="editorial-body">
                  <p>
                    Wir treffen angemessene technische und organisatorische Maßnahmen, um personenbezogene Daten gegen Verlust, Manipulation, unbefugten Zugriff und sonstige unzulässige Verarbeitung zu schützen.
                  </p>
                  <p>
                    Die Website wird verschlüsselt über HTTPS übertragen.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">15 //</span>
                <h2>15. Aktualisierung dieser Datenschutzerklärung</h2>
                <div className="editorial-body">
                  <p>
                    Wir behalten uns vor, diese Datenschutzerklärung anzupassen, wenn sich die Website, eingesetzte Dienste oder gesetzliche Anforderungen ändern.
                  </p>
                  <p className="editorial-note">
                    Stand: <strong>Oktober 2026</strong>
                  </p>
                </div>
              </section>
            </div>

            {/* Sidebar Overview */}
            <aside className="subpage-sidebar">
              <div className="sidebar-sticky-panel">
                <span className="eyebrow sidebar-eyebrow">RECHTS-DOSSIER</span>
                <p className="sidebar-desc">
                  Transparente Datenschutzerklärung nach Vorgaben der europäischen DSGVO.
                </p>

                <div className="sidebar-nav-links">
                  <button type="button" className="sidebar-link" onClick={() => onNavigateRoute('/impressum')}>Impressum (§ 5 DDG) →</button>
                  <button type="button" className="sidebar-link active">Datenschutzerklärung (DSGVO)</button>
                  <button type="button" className="sidebar-link" onClick={() => onNavigateRoute('/agb')}>AGB & Konditionen →</button>
                </div>
              </div>
            </aside>
          </div>
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

export default DatenschutzPage;
