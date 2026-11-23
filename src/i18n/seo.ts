import { DOMAIN, routePath, type Locale, type RouteName } from './locale';

import metadata from './metadata.json';
import projectMetadata from './projectMetadata.json';

export const SEO = metadata;

function setMeta(selector: string, attrs: Record<string, string>, content: string) {
  let node = document.querySelector<HTMLMetaElement>(selector);
  if (!node) {
    node = document.createElement('meta');
    Object.entries(attrs).forEach(([key, value]) => node!.setAttribute(key, value));
    document.head.append(node);
  }
  node.content = content;
}
function setLink(selector: string, attrs: Record<string, string>) {
  let node = document.querySelector<HTMLLinkElement>(selector);
  if (!node) { node = document.createElement('link'); document.head.append(node); }
  Object.entries(attrs).forEach(([key, value]) => node!.setAttribute(key, value));
}
export function updateSeo(route: RouteName, locale: Locale) {
  const value = SEO[route][locale];
  const url = DOMAIN + routePath(route, locale);
  document.documentElement.lang = locale === 'de' ? 'de-DE' : 'en-GB';
  document.title = value.title;
  setMeta('meta[name="robots"]', { name: 'robots' }, route === 'home' ? 'index, follow, max-image-preview:large' : 'noindex, follow');
  setMeta('meta[name="description"]', { name: 'description' }, value.description);
  setMeta('meta[property="og:locale"]', { property: 'og:locale' }, locale === 'de' ? 'de_DE' : 'en_GB');
  setMeta('meta[property="og:title"]', { property: 'og:title' }, value.title);
  setMeta('meta[property="og:description"]', { property: 'og:description' }, value.description);
  setMeta('meta[property="og:url"]', { property: 'og:url' }, url);
  setMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, value.title);
  setMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, value.description);
  setLink('link[rel="canonical"]', { rel: 'canonical', href: url });
  for (const lang of ['en', 'de', 'x-default'] as const) {
    const href = lang === 'x-default' ? DOMAIN + '/' : DOMAIN + routePath(route, lang);
    setLink(`link[rel="alternate"][hreflang="${lang}"]`, { rel: 'alternate', hreflang: lang, href });
  }
}

export function updateProjectSeo(projectId: string, locale: Locale) {
  const project = projectMetadata.find(item => item.id === projectId);
  if (!project) return;
  const title = `${project.name} — ${locale === 'de' ? 'Konzeptstudie' : 'Concept Study'} | MARGIN`;
  const description = project[locale];
  const path = `/${locale}/work/${projectId}`;
  const url = DOMAIN + path;
  document.documentElement.lang = locale === 'de' ? 'de-DE' : 'en-GB';
  document.title = title;
  setMeta('meta[name="description"]', { name: 'description' }, description);
  setMeta('meta[name="robots"]', { name: 'robots' }, 'index, follow, max-image-preview:large');
  setMeta('meta[property="og:title"]', { property: 'og:title' }, title);
  setMeta('meta[property="og:description"]', { property: 'og:description' }, description);
  setMeta('meta[property="og:url"]', { property: 'og:url' }, url);
  setMeta('meta[property="og:locale"]', { property: 'og:locale' }, locale === 'de' ? 'de_DE' : 'en_GB');
  setMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, title);
  setMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, description);
  setLink('link[rel="canonical"]', { rel: 'canonical', href: url });
  for (const lang of ['en', 'de', 'x-default'] as const) {
    const href = lang === 'x-default' ? DOMAIN + '/' : `${DOMAIN}/${lang}/work/${projectId}`;
    setLink(`link[rel="alternate"][hreflang="${lang}"]`, { rel: 'alternate', hreflang: lang, href });
  }
}
