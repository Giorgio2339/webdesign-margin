# MARGIN Webdesign

React and Vite source for the MARGIN website.

## Run locally

```sh
npm ci
npm run dev
```

`npm run build` generates the static HTML entrypoints and writes the production site to `dist/`. `npm run lint` checks the source. The build is suitable for a Cloudflare Pages project with build command `npm run build` and output directory `dist`.

## Languages and routes

- `/` reads the saved manual choice first, then the browser's primary language; English is the fallback.
- `/en` and `/de` are direct landing routes. They never redirect based on browser language.
- The language switch preserves the matching subpage or project study and saves the choice under `margin-language` in local storage.
- Route slugs are in `src/i18n/routes.json`. Homepage copy is in `src/i18n/home.ts`. Page metadata is in `src/i18n/metadata.json`; project metadata is in `src/i18n/projectMetadata.json`.
- `scripts/generate-entrypoints.mjs` creates localised HTML files and the sitemap before each build. Generated `en.html`, `de.html`, `en/` and `de/` entrypoints are ignored by Git.

## Before public launch

The German imprint still contains a placeholder for the business owner's full legal name. Replace it with the verified name and review all legal texts before publishing. The English legal pages link to the complete German originals until verified English versions are provided. The project brief prepares an email in the visitor's own mail application; there is no server-side submission.
