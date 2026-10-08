export interface FilmAsset {
  desktopSource?: string;
  mobileSource?: string;
  poster: string;
  mobilePoster?: string;
  label: string;
  eyebrow?: string;
  posterAlt?: string;
  hasAudio?: boolean;
  loop: boolean;
  temporary: boolean;
  /** Enable only for a short-GOP, fast-start MP4 verified for seeking. */
  scrubSafe?: boolean;
}

// Replacement boundary: optimized versions of the approved temporary light study.
// Supply a 6–10s interface film here; no component changes are needed.
export const HERO_FILM: FilmAsset = {
  desktopSource: '/assets/margin_hero_web_desktop.mp4',
  mobileSource: '/assets/margin_hero_web_mobile.mp4',
  poster: '/assets/hero_frame_1006.jpg',
  label: 'MARGIN Atelierfilm',
  eyebrow: 'Film / 01',
  posterAlt: 'Farbig beleuchteter Arbeitsplatz im MARGIN Atelier',
  hasAudio: false,
  loop: true,
  temporary: false
};

export const CONTACT_EMAIL = 'info@marginwebdesign.online';
export const CONTACT_PHONE = '015679 681426';
export const CONTACT_PHONE_TEL = '+4915679681426';
