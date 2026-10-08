interface HeaderProps {
  onOpenInquiry: () => void;
  onOpenMenu: () => void;
  isMenuOpen: boolean;
}

export function Header({ onOpenInquiry, onOpenMenu, isMenuOpen }: HeaderProps) {
  return (
    <header className="site-header theme-dark" data-header-theme="dark" data-scrolled="false">
      <a href="#hero" className="brand-anchor" aria-label="MARGIN — Startseite">
        <img className="brand-dark" src="/assets/margin_logo_dark.png" alt="MARGIN" width="200" height="46" />
        <img className="brand-light" src="/assets/margin_logo_light.png" alt="" aria-hidden="true" width="200" height="46" />
      </a>
      <nav className="desktop-nav" aria-label="Hauptnavigation">
        <a href="#work" className="text-action">Arbeiten</a>
        <a href="#studio" className="text-action">Studio</a>
        <a href="#approach" className="text-action">Methodik</a>
        <button className="text-action header-project" onClick={onOpenInquiry}>
          Projekt starten <span aria-hidden="true">↗</span>
        </button>
      </nav>
      <button
        className="mobile-menu-trigger text-action"
        onClick={onOpenMenu}
        aria-expanded={isMenuOpen}
        aria-controls="navigation-menu"
        aria-haspopup="dialog"
      >
        Menü <span aria-hidden="true">＋</span>
      </button>
    </header>
  );
}
