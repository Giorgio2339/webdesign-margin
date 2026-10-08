import { useCallback, useEffect, useRef, useState } from 'react';
import { PROJECTS_DATA } from '../data/projects';
import type { Project } from '../types';
import { captureMedia, restoreScroll } from '../motion/runtime';
const resolveProject = () => PROJECTS_DATA.find(p => window.location.pathname === `/work/${p.id}` || window.location.pathname === `/work/${p.id}/`) ?? null;
interface CaseHistory { marginCase?: boolean; home?: string; depth?: number; scroll?: number }
export function useProjectNavigation() {
  const initial = resolveProject();
  const [project, setProject] = useState<Project | null>(initial);
  const [isOpen, setIsOpen] = useState(Boolean(initial));
  const savedScroll = useRef(0);
  const leaving = useRef(false);
  useEffect(() => {
    const pop = () => {
      const next = resolveProject(); leaving.current = !next;
      if (next) { setProject(next); setIsOpen(true); } else setIsOpen(false);
    };
    window.addEventListener('popstate', pop);
    return () => window.removeEventListener('popstate', pop);
  }, []);
  const open = useCallback((next: Project, source?: HTMLElement | null) => {
    const previous = window.history.state as CaseHistory | null;
    const currentCase = resolveProject();
    if (!currentCase) savedScroll.current = window.scrollY;
    captureMedia(source ?? document.querySelector<HTMLElement>(`#project-${next.id} .project-media`));
    const state: CaseHistory = {
      marginCase: true,
      home: currentCase ? previous?.home : window.location.pathname + window.location.hash,
      depth: currentCase ? (previous?.depth ?? 0) + 1 : 1,
      scroll: currentCase ? previous?.scroll : savedScroll.current
    };
    window.history.pushState(state, '', `/work/${next.id}`);
    leaving.current = false; setProject(next); setIsOpen(true);
  }, []);
  const close = useCallback(() => {
    if (leaving.current) return;
    leaving.current = true;
    const state = window.history.state as CaseHistory | null;
    savedScroll.current = state?.scroll ?? savedScroll.current;
    if (state?.marginCase && state.home && state.depth) window.history.go(-state.depth);
    else { window.history.replaceState(null, '', '/'); setIsOpen(false); }
  }, []);
  const closed = useCallback(() => { setProject(null); leaving.current = false; restoreScroll(savedScroll.current); }, []);
  return { project, isOpen, open, close, closed };
}
