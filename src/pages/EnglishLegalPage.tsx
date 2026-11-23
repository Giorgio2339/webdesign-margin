import { SubpageHeader } from '../components/SubpageHeader';
import { Footer } from '../components/Footer';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL } from '../data/media';
import { routePath, type RouteName } from '../i18n/locale';

const labels = { impressum: 'Imprint', datenschutz: 'Privacy', agb: 'Terms' } as const;
interface Props { route: 'impressum' | 'datenschutz' | 'agb'; onNavigateHome: () => void; onNavigateInquiry: () => void; onNavigateRoute: (to: string) => void }
export function EnglishLegalPage({ route, onNavigateHome, onNavigateInquiry, onNavigateRoute }: Props) {
  const label = labels[route];
  return <div className="subpage-shell english-legal" data-theme="dark">
    <SubpageHeader onNavigateHome={onNavigateHome} onNavigateInquiry={onNavigateInquiry} currentTitle={label} />
    <main className="page-container english-legal-main">
      <p className="eyebrow">MARGIN / Legal</p>
      <h1>{label}</h1>
      {route === 'impressum' && <div className="english-legal-details">
        <p>Margin Webdesign<br />Zschopauer Str. 142<br />09126 Chemnitz<br />Germany</p>
        <p><a href={`tel:${CONTACT_PHONE_TEL}`}>{CONTACT_PHONE}</a><br /><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
      </div>}
      <p className="english-legal-note">The full {label.toLowerCase()} is currently available in German. Please consult the original document for the complete information.</p>
      <a className="english-legal-original" href={routePath(route, 'de')} lang="de">Read the German {label.toLowerCase()} <span aria-hidden="true">↗</span></a>
      <nav className="english-legal-links" aria-label="Legal pages">
        {(Object.keys(labels) as (keyof typeof labels)[]).filter(key => key !== route).map(key =>
          <button key={key} type="button" onClick={() => onNavigateRoute(routePath(key as RouteName, 'en'))}>{labels[key]} ↗</button>
        )}
      </nav>
    </main>
    <Footer onOpenLegal={tab => onNavigateRoute(routePath(tab === 'cookies' ? 'datenschutz' : tab, 'en'))} onOpenInquiry={onNavigateInquiry} />
  </div>;
}
