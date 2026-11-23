(() => {
  if (location.pathname !== '/') return;
  let saved;
  try { saved = localStorage.getItem('margin-language'); } catch { /* private browsing */ }
  const preferred = saved === 'en' || saved === 'de'
    ? saved
    : /^de(?:-|$)/i.test(navigator.languages?.[0] || navigator.language || '') ? 'de' : 'en';
  location.replace(`/${preferred}${location.search}${location.hash}`);
})();
