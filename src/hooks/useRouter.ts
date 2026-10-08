import { useState, useEffect, useCallback } from 'react';

export type AppRoute = 'home' | 'inquiry' | 'impressum' | 'datenschutz' | 'agb';

export function parseRoute(pathname: string): AppRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/anfrage' || clean === '/projekt-starten' || clean === '/kontakt') {
    return 'inquiry';
  }
  if (clean === '/impressum') {
    return 'impressum';
  }
  if (clean === '/datenschutz') {
    return 'datenschutz';
  }
  if (clean === '/agb' || clean === '/konditionen') {
    return 'agb';
  }
  return 'home';
}

export function useRouter() {
  const [route, setRoute] = useState<AppRoute>(() => parseRoute(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseRoute(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string) => {
    if (window.location.pathname === to) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.history.pushState({}, '', to);
    setRoute(parseRoute(to));
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return { route, navigate };
}
