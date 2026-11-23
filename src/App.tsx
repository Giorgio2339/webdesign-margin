import { useCallback, useRef, useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MenuOverlay } from './components/MenuOverlay';
import { Hero } from './components/Hero';
import { StudioPOV } from './components/StudioPOV';
import { EditorialAssembly } from './components/EditorialAssembly';
import { EditorialPhoto } from './components/EditorialPhoto';
import { SelectedWork } from './components/SelectedWork';
import { MotionComposition } from './components/MotionComposition';
import { Capabilities } from './components/Capabilities';
import { Process } from './components/Process';
import { Faq } from './components/Faq';
import { ConversionCTA } from './components/ConversionCTA';
import { Footer } from './components/Footer';
import { lazy, Suspense } from 'react';
import { CaseStudyModal } from './components/CaseStudyModal';
import { useRouter } from './hooks/useRouter';
import { useProjectNavigation } from './hooks/useProjectNavigation';
import { useMotionSystem } from './motion/useMotionSystem';
import './motion/motion.css';
import './App.css';
import './rescue.css';
import './polish.css';
import { routePath } from './i18n/locale';
import { useLocale } from './i18n/useLocale';
import { updateSeo, updateProjectSeo } from './i18n/seo';

const EnglishInquiryPage = lazy(() => import('./pages/EnglishInquiryPage').then(m => ({ default: m.EnglishInquiryPage })));
const EnglishLegalPage = lazy(() => import('./pages/EnglishLegalPage').then(m => ({ default: m.EnglishLegalPage })));
const InquiryPage = lazy(() => import('./pages/InquiryPage').then(m => ({ default: m.InquiryPage })));
const ImpressumPage = lazy(() => import('./pages/ImpressumPage').then(m => ({ default: m.ImpressumPage })));
const DatenschutzPage = lazy(() => import('./pages/DatenschutzPage').then(m => ({ default: m.DatenschutzPage })));
const AgbPage = lazy(() => import('./pages/AgbPage').then(m => ({ default: m.AgbPage })));

export function App() {
  const { route, navigate } = useRouter();
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scope = useRef<HTMLDivElement>(null);
  const cases = useProjectNavigation();
  const { isOpen: isCaseOpen, close: closeCase } = cases;
  useMotionSystem(scope, route === 'home');

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const openInquiry = useCallback(() => {
    setIsMenuOpen(false);
    if (isCaseOpen) closeCase();
    navigate('/anfrage');
  }, [isCaseOpen, closeCase, navigate]);

  const openLegal = useCallback((tab: string) => {
    setIsMenuOpen(false);
    if (isCaseOpen) closeCase();
    if (tab === 'impressum') navigate('/impressum');
    else if (tab === 'datenschutz' || tab === 'cookies') navigate('/datenschutz');
    else if (tab === 'agb') navigate('/agb');
  }, [isCaseOpen, closeCase, navigate]);

  useEffect(() => {
    if (route === 'home' && isCaseOpen && cases.project) updateProjectSeo(cases.project.id, locale);
    else updateSeo(route, locale);
  }, [route, locale, isCaseOpen, cases.project]);

  // Dedicated Route: Dedicated Inquiry Page
  if (route === 'inquiry' && locale === 'en') {
    return <div className="margin-experience"><Suspense fallback={<div className="route-loading-fallback" />}><EnglishInquiryPage onNavigateHome={() => navigate(routePath('home', locale))} onNavigateRoute={navigate} /></Suspense></div>;
  }
  if (route === 'inquiry') {
    return (
      <div className="margin-experience">
        <Suspense fallback={<div className="route-loading-fallback" />}>
          <InquiryPage
            onNavigateHome={() => navigate(routePath('home', locale))}
            onNavigateRoute={navigate}
          />
        </Suspense>
      </div>
    );
  }

  if (locale === 'en' && (route === 'impressum' || route === 'datenschutz' || route === 'agb')) {
    return <div className="margin-experience"><Suspense fallback={<div className="route-loading-fallback" />}><EnglishLegalPage route={route} onNavigateHome={() => navigate(routePath('home', locale))} onNavigateInquiry={openInquiry} onNavigateRoute={navigate} /></Suspense></div>;
  }

  // Dedicated Route: Impressum
  if (route === 'impressum') {
    return (
      <div className="margin-experience">
        <Suspense fallback={<div className="route-loading-fallback" />}>
          <ImpressumPage
            onNavigateHome={() => navigate(routePath('home', locale))}
            onNavigateInquiry={openInquiry}
            onNavigateRoute={navigate}
          />
        </Suspense>
      </div>
    );
  }

  // Dedicated Route: Datenschutz
  if (route === 'datenschutz') {
    return (
      <div className="margin-experience">
        <Suspense fallback={<div className="route-loading-fallback" />}>
          <DatenschutzPage
            onNavigateHome={() => navigate(routePath('home', locale))}
            onNavigateInquiry={openInquiry}
            onNavigateRoute={navigate}
          />
        </Suspense>
      </div>
    );
  }

  // Dedicated Route: AGB
  if (route === 'agb') {
    return (
      <div className="margin-experience">
        <Suspense fallback={<div className="route-loading-fallback" />}>
          <AgbPage
            onNavigateHome={() => navigate(routePath('home', locale))}
            onNavigateInquiry={openInquiry}
            onNavigateRoute={navigate}
          />
        </Suspense>
      </div>
    );
  }

  // Default Route: Homepage
  return (
    <div ref={scope} className="margin-experience" data-motion-phase="static">
      <a className="skip-link" href="#main-content">{locale === 'de' ? 'Zum Inhalt springen' : 'Skip to content'}</a>
      <Header onOpenInquiry={openInquiry} onOpenMenu={() => setIsMenuOpen(true)} isMenuOpen={isMenuOpen} />
      <main id="main-content" tabIndex={-1}>
        <Hero onOpenInquiry={openInquiry} />
        <StudioPOV />
        <EditorialAssembly />
        <SelectedWork onSelectProject={cases.open} />
        <EditorialPhoto />
        <MotionComposition />
        <Capabilities />
        <Process onOpenInquiry={openInquiry} />
        <Faq onOpenInquiry={openInquiry} />
        <ConversionCTA onOpenInquiry={openInquiry} />
      </main>
      <Footer onOpenLegal={openLegal} onOpenInquiry={openInquiry} />
      <MenuOverlay isOpen={isMenuOpen} onClose={closeMenu} onOpenInquiry={openInquiry} onOpenLegal={openLegal} />
      <CaseStudyModal
        project={cases.project}
        isOpen={cases.isOpen}
        onClose={cases.close}
        onClosed={cases.closed}
        onSelectProject={cases.open}
        onOpenInquiry={openInquiry}
      />
    </div>
  );
}

export default App;
