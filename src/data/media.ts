export interface HeroAsset {
  desktopSource?: string;
  mobileSource?: string;
  poster: string;
  mobilePoster?: string;
  posterAlt?: string;
  hasAudio?: boolean;
  loop: boolean;
  temporary: boolean;
  /** Enable only for a short-GOP, fast-start MP4 verified for seeking. */
  scrubSafe?: boolean;
}

// Optimised ambient hero media with a still poster for reduced-motion and slow connections.
export const HERO_MEDIA: HeroAsset = {
  desktopSource: '/assets/margin_hero_web_desktop.mp4',
  mobileSource: '/assets/margin_hero_web_mobile.mp4',
  poster: '/assets/hero_frame_1006.jpg',
  posterAlt: 'Farbig beleuchteter Arbeitsplatz im MARGIN Atelier',
  hasAudio: false,
  loop: true,
  temporary: false
};

export const CONTACT_EMAIL = 'info@marginwebdesign.online';
export const CONTACT_PHONE = '015679 681426';
export const CONTACT_PHONE_TEL = '+4915679681426';
