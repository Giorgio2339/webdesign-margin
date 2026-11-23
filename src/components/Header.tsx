import { LocaleSwitcher } from './LocaleSwitcher';
import { HOME } from '../i18n/home';
import { routePath } from '../i18n/locale';
import { useLocale } from '../i18n/useLocale';

interface HeaderProps { onOpenInquiry: () => void; onOpenMenu: () => void; isMenuOpen: boolean }
export function Header({ onOpenInquiry, onOpenMenu, isMenuOpen }: HeaderProps) {
  const locale = useLocale();
  const t = HOME[locale].nav;
  return <header className="site-header theme-dark" data-header-theme="dark" data-scrolled="false">
    <a href={routePath('home', locale)} className="brand-anchor" aria-label={`MARGIN — ${t.home}`}>
      <img className="brand-dark" src="/assets/margin_logo_dark.png" alt="MARGIN" width="200" height="46" />
      <img className="brand-light" src="/assets/margin_logo_light.png" alt="" aria-hidden="true" width="200" height="46" />
    </a>
    <nav className="desktop-nav" aria-label={locale === 'de' ? 'Hauptnavigation' : 'Main navigation'}>
      <a href="#work" className="text-action">{t.work}</a>
      <a href="#studio" className="text-action">{t.studio}</a>
      <a href="#approach" className="text-action">{t.approach}</a>
      <button className="text-action header-project" onClick={onOpenInquiry}>{t.project} <span aria-hidden="true">↗</span></button>
      <LocaleSwitcher />
    </nav>
    <div className="mobile-header-actions">
      <LocaleSwitcher />
      <button className="mobile-menu-trigger text-action" onClick={onOpenMenu} aria-expanded={isMenuOpen} aria-controls="navigation-menu" aria-haspopup="dialog">
        {t.menu} <span aria-hidden="true">＋</span>
      </button>
    </div>
  </header>;
}
