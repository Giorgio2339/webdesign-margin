import { useEffect } from 'react';
import { SubpageHeader } from '../components/SubpageHeader';
import { Footer } from '../components/Footer';

interface AgbPageProps {
  onNavigateHome: () => void;
  onNavigateInquiry: () => void;
  onNavigateRoute: (route: string) => void;
}

export function AgbPage({ onNavigateHome, onNavigateInquiry, onNavigateRoute }: AgbPageProps) {
  useEffect(() => {
    document.title = 'AGB — MARGIN Webdesign & digitale Art Direction';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="subpage-shell" data-theme="dark">
      <SubpageHeader
        onNavigateHome={onNavigateHome}
        onNavigateInquiry={onNavigateInquiry}
        currentTitle="AGB & Konditionen"
      />

      <main className="subpage-main">
        <div className="page-container">
          {/* Breadcrumb */}
          <nav className="subpage-breadcrumb" aria-label="Breadcrumb">
            <button type="button" onClick={onNavigateHome}>Startseite</button>
            <span aria-hidden="true">/</span>
            <span className="current">AGB</span>
          </nav>

          {/* Hero */}
          <div className="subpage-hero">
            <span className="eyebrow subpage-hero-eyebrow">VERTRAGSBEDINGUNGEN & KONDITIONEN</span>
            <h1 className="subpage-hero-title">
              Allgemeine<br />
              <em>Geschäftsbedingungen.</em>
            </h1>
            <p className="subpage-hero-lead">
              Vertragsbedingungen für sämtliche Verträge über Webdesign- und damit unmittelbar zusammenhängende Leistungen von Margin Webdesign.
            </p>
          </div>

          {/* Editorial Content Layout */}
          <div className="subpage-editorial-grid">
            <div className="subpage-content-column">
              
              <section className="editorial-section-block">
                <span className="editorial-num">§ 01 //</span>
                <h2>1. Geltungsbereich</h2>
                <div className="editorial-body">
                  <p>
                    Diese Allgemeinen Geschäftsbedingungen gelten für sämtliche Verträge über Webdesign- und damit unmittelbar zusammenhängende Leistungen zwischen
                  </p>
                  <p className="editorial-lead-strong">
                    Giorgi Bantsadze, handelnd unter Margin Webdesign<br />
                    – nachfolgend „Margin“ –
                  </p>
                  <p>
                    und dem jeweiligen Auftraggeber.
                  </p>
                  <p>
                    Das Leistungsangebot von Margin richtet sich ausschließlich an Unternehmer im Sinne des § 14 BGB, also an natürliche oder juristische Personen oder rechtsfähige Personengesellschaften, die bei Abschluss des Vertrags in Ausübung ihrer gewerblichen oder selbständigen beruflichen Tätigkeit handeln.
                  </p>
                  <p>
                    Verträge mit Verbrauchern werden auf Grundlage dieser AGB nicht geschlossen.
                  </p>
                  <p>
                    Abweichende Bedingungen des Auftraggebers gelten nur, wenn Margin ihrer Geltung ausdrücklich zugestimmt hat.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">§ 02 //</span>
                <h2>2. Vertragsschluss</h2>
                <div className="editorial-body">
                  <p>
                    Die Darstellung von Leistungen auf der Website von Margin stellt kein verbindliches Vertragsangebot dar.
                  </p>
                  <p>
                    Kontaktanfragen, Projektanfragen und Terminbuchungen durch einen Interessenten sind ebenfalls noch keine verbindliche Beauftragung.
                  </p>
                  <p>
                    Nach Abstimmung des Projekts erhält der Auftraggeber grundsätzlich ein individuelles Angebot oder eine vergleichbare Leistungsbeschreibung.
                  </p>
                  <p>
                    Ein Vertrag kommt erst zustande, wenn der Auftraggeber das Angebot annimmt oder die Parteien auf andere eindeutige Weise eine Beauftragung vereinbaren.
                  </p>
                  <p>
                    Der konkrete Leistungsumfang ergibt sich vorrangig aus dem jeweiligen Angebot beziehungsweise der individuell vereinbarten Leistungsbeschreibung.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">§ 03 //</span>
                <h2>3. Leistungen</h2>
                <div className="editorial-body">
                  <p>
                    Margin erbringt insbesondere Leistungen im Bereich Konzeption, Gestaltung und technische Umsetzung von Websites.
                  </p>
                  <p>
                    Der genaue Umfang eines Projekts richtet sich nach der jeweiligen individuellen Vereinbarung.
                  </p>
                  <p>
                    Nicht ausdrücklich vereinbarte Leistungen sind nicht Bestandteil des vereinbarten Projektpreises. Hierzu können insbesondere gehören:
                  </p>
                  <ul className="editorial-bullet-list">
                    <li>laufende Pflege der Website,</li>
                    <li>dauerhafte technische Betreuung,</li>
                    <li>Hosting,</li>
                    <li>Domains,</li>
                    <li>kostenpflichtige Drittanbieter-Dienste,</li>
                    <li>kostenpflichtige Plugins,</li>
                    <li>Shopify- oder sonstige Plattformgebühren,</li>
                    <li>externe Schriftarten oder Lizenzen,</li>
                    <li>Stockmaterial,</li>
                    <li>umfangreiche nachträgliche Erweiterungen,</li>
                    <li>zusätzliche Seiten oder Funktionen außerhalb des vereinbarten Umfangs.</li>
                  </ul>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">§ 04 //</span>
                <h2>4. Projektablauf und Mitwirkung des Auftraggebers</h2>
                <div className="editorial-body">
                  <p>
                    Der Auftraggeber stellt Margin alle für die Durchführung des Projekts erforderlichen Informationen, Inhalte und Zugänge rechtzeitig zur Verfügung. Hierzu können insbesondere gehören:
                  </p>
                  <ul className="editorial-bullet-list">
                    <li>Texte,</li>
                    <li>Bilder und Videos,</li>
                    <li>Logos und Markenmaterial,</li>
                    <li>Produktinformationen,</li>
                    <li>Kontaktdaten,</li>
                    <li>rechtliche Angaben,</li>
                    <li>Zugangsdaten,</li>
                    <li>Feedback und Freigaben.</li>
                  </ul>
                  <p>
                    Verzögerungen, die dadurch entstehen, dass erforderliche Inhalte, Informationen, Entscheidungen oder Freigaben nicht rechtzeitig bereitgestellt werden, verlängern vereinbarte oder in Aussicht gestellte Projektzeiträume entsprechend.
                  </p>
                  <p>
                    Margin ist nicht für Verzögerungen verantwortlich, die ausschließlich aus der fehlenden oder verspäteten Mitwirkung des Auftraggebers entstehen.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">§ 05 //</span>
                <h2>5. Projektzeiten</h2>
                <div className="editorial-body">
                  <p>
                    Von Margin genannte Fertigstellungszeiträume, beispielsweise eine Projektzeit von ungefähr einer Woche, stellen grundsätzlich eine Planung beziehungsweise Schätzung dar, sofern nicht ausdrücklich ein verbindlicher Fertigstellungstermin vereinbart wurde.
                  </p>
                  <p>
                    Der tatsächliche Zeitaufwand kann insbesondere vom Umfang des Projekts, der Geschwindigkeit der Abstimmung, den Änderungswünschen des Auftraggebers und der Bereitstellung der erforderlichen Inhalte abhängen.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">§ 06 //</span>
                <h2>6. Änderungen und Korrekturen</h2>
                <div className="editorial-body">
                  <p>
                    Korrekturen und Anpassungen innerhalb des ursprünglich vereinbarten Projektumfangs sind Bestandteil des Entwicklungsprozesses.
                  </p>
                  <p>
                    Der Auftraggeber kann während des Projekts angemessene Korrekturen verlangen, soweit diese der Umsetzung des ursprünglich vereinbarten Konzepts dienen.
                  </p>
                  <p>
                    Nicht als bloße Korrektur gelten insbesondere:
                  </p>
                  <ul className="editorial-bullet-list">
                    <li>eine grundlegende Änderung der bereits abgestimmten Designrichtung,</li>
                    <li>vollständig neue Seiten oder Seitentypen,</li>
                    <li>neue umfangreiche Funktionen,</li>
                    <li>eine erhebliche Erweiterung des vereinbarten Leistungsumfangs,</li>
                    <li>nachträgliche Anforderungen, die im ursprünglichen Briefing oder Angebot nicht vorgesehen waren.</li>
                  </ul>
                  <p>
                    Solche Leistungen können nach vorheriger Abstimmung gesondert vergütet werden.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">§ 07 //</span>
                <h2>7. Vergütung und Zahlungsbedingungen</h2>
                <div className="editorial-body">
                  <p>
                    Sofern im individuellen Angebot nichts anderes vereinbart wird, sind
                  </p>
                  <p className="editorial-lead-strong">
                    50 % der vereinbarten Vergütung bei Beauftragung als Anzahlung und<br />
                    50 % nach Fertigstellung beziehungsweise Abnahme des Projekts
                  </p>
                  <p>
                    fällig.
                  </p>
                  <p>
                    Margin ist berechtigt, mit der eigentlichen Projektumsetzung erst nach Eingang der vereinbarten Anzahlung zu beginnen.
                  </p>
                  <p>
                    Rechnungen sind innerhalb der auf der jeweiligen Rechnung angegebenen Zahlungsfrist zu begleichen.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">§ 08 //</span>
                <h2>8. Abnahme</h2>
                <div className="editorial-body">
                  <p>
                    Nach Fertigstellung stellt Margin dem Auftraggeber das vereinbarte Arbeitsergebnis zur Prüfung zur Verfügung.
                  </p>
                  <p>
                    Der Auftraggeber prüft die Website innerhalb angemessener Zeit und teilt vorhandene konkrete Mängel mit.
                  </p>
                  <p>
                    Unwesentliche Mängel, die die vertragsgemäße Nutzung der Website nicht wesentlich beeinträchtigen, berechtigen nicht zur Verweigerung der Abnahme.
                  </p>
                  <p>
                    Gesetzliche Regelungen zur Abnahme bleiben unberührt.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">§ 09 //</span>
                <h2>9. Nutzungsrechte</h2>
                <div className="editorial-body">
                  <p>
                    Nach vollständiger Zahlung der vereinbarten Vergütung erhält der Auftraggeber die für die vereinbarte Nutzung der individuell für ihn erstellten Website erforderlichen Nutzungsrechte.
                  </p>
                  <p>
                    Die Einräumung der Nutzungsrechte erfolgt erst nach vollständiger Bezahlung des Projekts.
                  </p>
                  <p>
                    Rechte an Bestandteilen, die von Dritten stammen, insbesondere Schriftarten, Softwarebibliotheken, Plugins, Stockmedien oder sonstigen lizenzierten Inhalten, richten sich nach den jeweiligen Lizenzbedingungen der Rechteinhaber.
                  </p>
                  <p>
                    Allgemeine Arbeitsmethoden, technisches Know-how, nicht kundenspezifische Komponenten, wiederverwendbare Entwicklungsbestandteile und unabhängig vom Kundenprojekt entwickelte Werkzeuge verbleiben bei Margin, soweit keine abweichende Vereinbarung getroffen wird.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">§ 10 //</span>
                <h2>10. Vom Auftraggeber bereitgestellte Inhalte</h2>
                <div className="editorial-body">
                  <p>
                    Der Auftraggeber versichert, dass er berechtigt ist, die von ihm bereitgestellten Inhalte für das jeweilige Projekt zu verwenden und Margin deren Verwendung im Rahmen der Vertragserfüllung zu gestatten. Dies betrifft insbesondere:
                  </p>
                  <ul className="editorial-bullet-list">
                    <li>Bilder,</li>
                    <li>Videos,</li>
                    <li>Logos,</li>
                    <li>Markenzeichen,</li>
                    <li>Texte,</li>
                    <li>Schriftarten,</li>
                    <li>Musik,</li>
                    <li>Grafiken und</li>
                    <li>sonstiges urheberrechtlich oder markenrechtlich geschütztes Material.</li>
                  </ul>
                  <p>
                    Der Auftraggeber ist dafür verantwortlich, dass durch von ihm bereitgestellte Inhalte keine Rechte Dritter verletzt werden.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">§ 11 //</span>
                <h2>11. Rechtstexte und rechtliche Prüfung der Kundenwebsite</h2>
                <div className="editorial-body">
                  <p>
                    Soweit nicht ausdrücklich anders vereinbart, umfasst die Webdesignleistung von Margin keine individuelle Rechts- oder Steuerberatung.
                  </p>
                  <p>
                    Der Auftraggeber ist insbesondere selbst dafür verantwortlich, die für seinen Geschäftsbetrieb erforderlichen rechtlichen Informationen, Pflichtangaben, Datenschutztexte, AGB, Widerrufsbelehrungen oder sonstigen Rechtstexte bereitzustellen beziehungsweise fachkundig prüfen zu lassen.
                  </p>
                  <p>
                    Margin darf vom Auftraggeber bereitgestellte Rechtstexte technisch in die Website integrieren, ohne deren rechtliche Richtigkeit zu gewährleisten.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">§ 12 //</span>
                <h2>12. Drittanbieter und externe Kosten</h2>
                <div className="editorial-body">
                  <p>
                    Für den Betrieb einer Website können Leistungen und Kosten von Drittanbietern erforderlich sein.
                  </p>
                  <p>
                    Hierzu können beispielsweise Domains, Hosting, Shopsysteme, Zahlungsanbieter, Plugins, APIs, Stockmedien und sonstige externe Dienste gehören.
                  </p>
                  <p>
                    Soweit nicht ausdrücklich anders vereinbart, trägt der Auftraggeber diese Kosten selbst.
                  </p>
                  <p>
                    Margin übernimmt keine Verantwortung für spätere Preisänderungen, Änderungen des Leistungsumfangs oder die Verfügbarkeit solcher Drittanbieter.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">§ 13 //</span>
                <h2>13. Veröffentlichung und Übergabe</h2>
                <div className="editorial-body">
                  <p>
                    Die Veröffentlichung beziehungsweise Übergabe einer Website erfolgt nach Maßgabe des jeweiligen Projekts und der vereinbarten technischen Umgebung.
                  </p>
                  <p>
                    Soweit die abschließende Veröffentlichung die Mitwirkung des Auftraggebers oder Zugang zu Systemen des Auftraggebers voraussetzt, hat der Auftraggeber die hierfür erforderlichen Informationen rechtzeitig bereitzustellen.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">§ 14 //</span>
                <h2>14. Referenznutzung</h2>
                <div className="editorial-body">
                  <p>
                    Margin verwendet Kundenprojekte, Namen, Logos oder Screenshots nicht ohne entsprechende Berechtigung für eigene Werbe- oder Referenzzwecke.
                  </p>
                  <p>
                    Hat der Auftraggeber einer Referenznutzung zugestimmt, darf Margin das jeweilige Projekt im vereinbarten Umfang insbesondere auf der eigenen Website, in Präsentationen oder auf geschäftlichen Social-Media-Kanälen präsentieren.
                  </p>
                  <p>
                    Eine erteilte Zustimmung kann für zukünftige Verwendungen widerrufen werden, soweit keine entgegenstehenden Vereinbarungen oder bereits rechtmäßig erfolgten Veröffentlichungen betroffen sind.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">§ 15 //</span>
                <h2>15. Kündigung eines Projekts</h2>
                <div className="editorial-body">
                  <p>
                    Für die Kündigung des Vertrags gelten die gesetzlichen Bestimmungen.
                  </p>
                  <p>
                    Soweit der Auftraggeber einen als Werkvertrag einzuordnenden Vertrag vor Fertigstellung kündigt, bleiben insbesondere die gesetzlichen Vergütungsansprüche von Margin für bereits erbrachte und – soweit gesetzlich vorgesehen – noch nicht erbrachte Leistungen unberührt.
                  </p>
                  <p>
                    Bereits geleistete Zahlungen werden mit den bei Vertragsbeendigung bestehenden Vergütungsansprüchen verrechnet.
                  </p>
                  <p>
                    Das Recht beider Parteien zur Kündigung aus wichtigem Grund bleibt unberührt.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">§ 16 //</span>
                <h2>16. Haftung</h2>
                <div className="editorial-body">
                  <p>
                    Margin haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie in Fällen, in denen eine gesetzliche Haftungsbeschränkung ausgeschlossen ist.
                  </p>
                  <p>
                    Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung auf den vertragstypischen und bei Vertragsschluss vorhersehbaren Schaden begrenzt, soweit gesetzlich zulässig.
                  </p>
                  <p>
                    Margin haftet nicht für Störungen oder Ausfälle, die ausschließlich durch Drittanbieter, Hostinganbieter, Domainanbieter, Plattformen oder sonstige externe technische Dienste verursacht werden und außerhalb des Einflussbereichs von Margin liegen.
                  </p>
                  <p>
                    Gesetzlich zwingende Haftungsregelungen bleiben unberührt.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">§ 17 //</span>
                <h2>17. Gewährleistung</h2>
                <div className="editorial-body">
                  <p>
                    Für Mängel der von Margin geschuldeten Leistungen gelten die gesetzlichen Vorschriften, soweit nicht wirksam etwas anderes vereinbart wurde.
                  </p>
                  <p>
                    Keine Mängel stellen insbesondere Probleme dar, die nach Übergabe ausschließlich durch eigenständige Änderungen des Auftraggebers oder durch Änderungen, Ausfälle oder Inkompatibilitäten externer Dienste entstehen, die Margin nicht zu vertreten hat.
                  </p>
                </div>
              </section>

              <section className="editorial-section-block">
                <span className="editorial-num">§ 18 //</span>
                <h2>18. Schlussbestimmungen</h2>
                <div className="editorial-body">
                  <p>
                    Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
                  </p>
                  <p>
                    Erfüllungsort und Gerichtsstand für alle Streitigkeiten aus diesem Vertrag ist, soweit gesetzlich zulässig, der Sitz von Margin.
                  </p>
                </div>
              </section>

            </div>

            {/* Sidebar Overview */}
            <aside className="subpage-sidebar">
              <div className="sidebar-sticky-panel">
                <span className="eyebrow sidebar-eyebrow">RECHTS-DOSSIER</span>
                <p className="sidebar-desc">
                  Transparente Rahmenbedingungen für kreative und technische Zusammenarbeit mit Margin Webdesign.
                </p>

                <div className="sidebar-nav-links">
                  <button type="button" className="sidebar-link" onClick={() => onNavigateRoute('/impressum')}>Impressum (§ 5 DDG) →</button>
                  <button type="button" className="sidebar-link" onClick={() => onNavigateRoute('/datenschutz')}>Datenschutzerklärung (DSGVO) →</button>
                  <button type="button" className="sidebar-link active">AGB & Konditionen</button>
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

export default AgbPage;
