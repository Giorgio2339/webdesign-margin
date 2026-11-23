import { useState, useEffect, useCallback } from 'react';
import { localeFromPath, routePath, type RouteName } from '../i18n/locale';

export type AppRoute = RouteName;
export function parseRoute(pathname: string): AppRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const parts = clean.split('/').filter(Boolean);
  const slug = parts[0] === 'en' || parts[0] === 'de' ? parts.slice(1).join('/') : parts.join('/');
  if (['inquiry', 'anfrage', 'projekt-starten', 'kontakt'].includes(slug)) return 'inquiry';
  if (['imprint', 'impressum'].includes(slug)) return 'impressum';
  if (['privacy', 'datenschutz'].includes(slug)) return 'datenschutz';
  if (['terms', 'agb', 'konditionen'].includes(slug)) return 'agb';
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
    let target = to;
    if (!/^\/(en|de)(\/|$)/.test(to)) {
      const routeName = parseRoute(to);
      target = routePath(routeName, localeFromPath());
    }
    if (window.location.pathname === target) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.history.pushState({}, '', target);
    setRoute(parseRoute(target));
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  return { route, navigate };
}
