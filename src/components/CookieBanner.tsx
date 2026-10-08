import { useState, useEffect } from 'react';

interface CookieBannerProps {
  onOpenDetails: () => void;
}

const STORAGE_KEY = 'margin_cookie_consent_choice';

export function CookieBanner({ onOpenDetails }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Subtle delay to not interrupt initial page entry / intro animations
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
          setIsVisible(true);
        }
      } catch {
        setIsVisible(true);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleChoice = (choice: 'all' | 'essential') => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Ignore storage errors in restricted contexts
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      className="cookie-banner-surface"
      role="region"
      aria-label="Datenschutz und Cookie Hinweise"
    >
      <div className="cookie-banner-content">
        <div className="cookie-banner-badge">
          <span className="cookie-dot" aria-hidden="true" />
          <span className="eyebrow">PRIVACY BY DESIGN</span>
        </div>

        <p className="cookie-banner-text">
          Wir schätzen Ihren Fokus: Diese Website verzichtet vollständig auf Tracking- und Marketing-Cookies.
          Wir nutzen lediglich essenzielle Basisfunktionen für eine reibungslose Bereitstellung.
        </p>

        <div className="cookie-banner-actions">
          <button
            type="button"
            className="cookie-btn cookie-btn-accept"
            onClick={() => handleChoice('essential')}
          >
            Verstanden
          </button>
          <button
            type="button"
            className="cookie-btn cookie-btn-details"
            onClick={onOpenDetails}
          >
            Details & Einstellungen ↗
          </button>
        </div>
      </div>
    </aside>
  );
}
