import { useMemo, type ReactNode } from 'react';
import { localeFromPath } from './locale';
import { LocaleContext } from './localeContext';
export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useMemo(() => localeFromPath(), []);
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}
