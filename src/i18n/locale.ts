import routes from './routes.json';

export type Locale = 'en' | 'de';
export const LOCALE_KEY = 'margin-language';
export const DOMAIN = 'https://marginwebdesign.online';

export const routeSlugs = routes;
export type RouteName = keyof typeof routeSlugs;

export function localeFromPath(path = window.location.pathname): Locale {
  return path === '/de' || path.startsWith('/de/') ? 'de' : 'en';
}
export function routePath(route: RouteName, locale: Locale) {
  const slug = routeSlugs[route][locale];
  return `/${locale}${slug ? `/${slug}` : ''}`;
}
export function equivalentPath(locale: Locale, path = window.location.pathname) {
  const segments = path.split('/').filter(Boolean);
  const slug = segments[0] === 'en' || segments[0] === 'de' ? segments.slice(1).join('/') : segments.join('/');
  for (const [route, values] of Object.entries(routeSlugs) as [RouteName, { en: string; de: string }][]) {
    if (slug === values.en || slug === values.de) return routePath(route, locale);
  }
  if (slug.startsWith('work/')) return `/${locale}/${slug}`;
  return routePath('home', locale);
}
export function saveLocale(locale: Locale) {
  try { localStorage.setItem(LOCALE_KEY, locale); } catch { /* private browsing */ }
}
