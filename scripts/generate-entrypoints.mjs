import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const metadata = JSON.parse(readFileSync(new URL('../src/i18n/metadata.json', import.meta.url), 'utf8'));
const projects = JSON.parse(readFileSync(new URL('../src/i18n/projectMetadata.json', import.meta.url), 'utf8'));
const base = 'https://marginwebdesign.online';
const slugs = JSON.parse(readFileSync(new URL('../src/i18n/routes.json', import.meta.url), 'utf8'));
const escape = text => text.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const path = (route, lang) => `/${lang}${slugs[route][lang] ? '/' + slugs[route][lang] : ''}`;
const entries = [];
const pages = [
  ...Object.keys(slugs).flatMap(route => ['en', 'de'].map(lang => ({ route, lang, target: path(route, lang), title: metadata[route][lang].title, description: metadata[route][lang].description, alternate: code => path(route, code) }))),
  ...projects.flatMap(project => ['en', 'de'].map(lang => ({ route: 'project', lang, target: `/${lang}/work/${project.id}`, title: `${project.name} — ${lang === 'de' ? 'Konzeptstudie' : 'Concept Study'} | MARGIN`, description: project[lang], alternate: code => `/${code}/work/${project.id}` })))
];
for (const page of pages) {
    const { route, lang, target, title, description } = page;
    const url = base + target;
    const alternate = ['en', 'de'].map(code => `<link rel="alternate" hreflang="${code}" href="${base + page.alternate(code)}" />`).join('\n    ');
    const html = `<!doctype html>
<html lang="${lang === 'en' ? 'en-GB' : 'de-DE'}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>${escape(title)}</title>
    <meta name="description" content="${escape(description)}" />
    <meta name="robots" content="${route === 'home' || route === 'project' ? 'index, follow, max-image-preview:large' : 'noindex, follow'}" />
    <link rel="canonical" href="${url}" />
    ${alternate}
    <link rel="alternate" hreflang="x-default" href="${base}/" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="MARGIN" />
    <meta property="og:locale" content="${lang === 'en' ? 'en_GB' : 'de_DE'}" />
    <meta property="og:title" content="${escape(title)}" />
    <meta property="og:description" content="${escape(description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${base}/assets/hero_frame_1006.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(title)}" />
    <meta name="twitter:description" content="${escape(description)}" />
    <meta name="twitter:image" content="${base}/assets/hero_frame_1006.jpg" />
    <meta name="theme-color" content="#0C0D10" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preload" href="/fonts/inter-latin-variable.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/newsreader-latin-variable.woff2" as="font" type="font/woff2" crossorigin />
    ${route === 'home' ? '<link rel="preload" as="image" href="/assets/hero_frame_1006.jpg" fetchpriority="high" />' : ''}
  </head>
  <body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body>
</html>`;
    const output = join(process.cwd(), `${target.slice(1)}.html`);
    mkdirSync(dirname(output), { recursive: true });
    writeFileSync(output, html);
    entries.push(output);
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
  pages.filter(page => page.route === 'home' || page.route === 'project').map(page => `  <url><loc>${base + page.target}</loc><xhtml:link rel="alternate" hreflang="en" href="${base + page.alternate('en')}"/><xhtml:link rel="alternate" hreflang="de" href="${base + page.alternate('de')}"/><xhtml:link rel="alternate" hreflang="x-default" href="${base}/"/></url>`).join('\n') + '\n</urlset>\n';
writeFileSync(join(process.cwd(), 'public/sitemap.xml'), sitemap);
writeFileSync(join(process.cwd(), 'public/robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
console.log(`Generated ${entries.length} localised entrypoints`);
