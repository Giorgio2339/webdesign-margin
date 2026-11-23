import { equivalentPath, saveLocale, type Locale } from '../i18n/locale';
import { useLocale } from '../i18n/useLocale';

export function LocaleSwitcher({ className = '' }: { className?: string }) {
  const locale = useLocale();
  const link = (target: Locale) => (
    <a
      href={equivalentPath(target) + window.location.hash}
      lang={target === 'de' ? 'de' : 'en'}
      hrefLang={target}
      aria-current={locale === target ? 'page' : undefined}
      onClick={() => saveLocale(target)}
    >{target.toUpperCase()}</a>
  );
  return <nav className={`locale-switch ${className}`} aria-label={locale === 'de' ? 'Sprache wählen' : 'Choose language'}>
    {link('en')}<span aria-hidden="true">/</span>{link('de')}
  </nav>;
}
