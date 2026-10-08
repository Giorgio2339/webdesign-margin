// Renditions of existing local assets. Original JPGs remain as fallbacks.
const renditions: Record<string, { srcSet: string; width: number; height: number }> = {
  "/assets/editorial_typography_spread.jpg": {
    "srcSet": "/assets/editorial_typography_spread.jpg 1024w",
    "width": 1024,
    "height": 768
  },
  "/assets/motion_night_facade.png": {
    "srcSet": "/assets/motion_night_facade.png 1024w",
    "width": 1024,
    "height": 681
  },
  "/assets/project_bloomvae.png": {
    "srcSet": "/assets/project_bloomvae.png 1024w",
    "width": 1024,
    "height": 582
  },
  "/assets/project_maharadscha.png": {
    "srcSet": "/assets/project_maharadscha.png 1024w",
    "width": 1024,
    "height": 640
  },
  "/assets/project_jtsmash.png": {
    "srcSet": "/assets/project_jtsmash.png 1024w",
    "width": 1024,
    "height": 602
  },
  "/assets/cover_bloomvae.jpg": {
    "srcSet": "/assets/cover_bloomvae.jpg 1024w",
    "width": 1024,
    "height": 768
  },
  "/assets/cover_maharadscha.jpg": {
    "srcSet": "/assets/cover_maharadscha.jpg 1024w",
    "width": 1024,
    "height": 768
  },
  "/assets/cover_jtsmash.jpg": {
    "srcSet": "/assets/cover_jtsmash.jpg 1024w",
    "width": 1024,
    "height": 768
  },
  "/assets/project_sillage.jpg": {
    "srcSet": "/assets/project_sillage.jpg 1024w",
    "width": 1024,
    "height": 768
  },
  "/assets/project_mori.jpg": {
    "srcSet": "/assets/project_mori.jpg 1024w",
    "width": 1024,
    "height": 768
  },
  "/assets/project_rove.jpg": {
    "srcSet": "/assets/project_rove.jpg 1024w",
    "width": 1024,
    "height": 768
  },
  "/assets/project_sillage_ui.jpg": {
    "srcSet": "/assets/project_sillage_ui.jpg 1024w",
    "width": 1024,
    "height": 640
  },
  "/assets/project_mori_ui.jpg": {
    "srcSet": "/assets/project_mori_ui.jpg 1024w",
    "width": 1024,
    "height": 640
  },
  "/assets/project_rove_ui.jpg": {
    "srcSet": "/assets/project_rove_ui.jpg 1024w",
    "width": 1024,
    "height": 640
  },
  "/assets/hero_frame_1006.jpg": {
    "srcSet": "/assets/hero_frame_1006.jpg 1920w",
    "width": 1920,
    "height": 1080
  },
  "/assets/capability_art_direction.png": {
    "srcSet": "/assets/capability_art_direction.png 682w",
    "width": 682,
    "height": 1024
  },
  "/assets/capability_responsive.png": {
    "srcSet": "/assets/capability_responsive.png 1024w",
    "width": 1024,
    "height": 696
  },
  "/assets/capability_interaction.png": {
    "srcSet": "/assets/capability_interaction.png 1024w",
    "width": 1024,
    "height": 819
  },
  "/assets/capability_development.png": {
    "srcSet": "/assets/capability_development.png 1024w",
    "width": 1024,
    "height": 682
  },
  "/assets/hero_frame.jpg": {
    "srcSet": "/assets/hero_frame-800.webp 800w, /assets/hero_frame-1600.webp 1600w, /assets/hero_frame-2400.webp 2400w",
    "width": 4096,
    "height": 2160
  },
  "/assets/cover_aurelia.jpg": {
    "srcSet": "/assets/cover_aurelia-800.webp 800w, /assets/cover_aurelia-1600.webp 1376w",
    "width": 1376,
    "height": 768
  },
  "/assets/cover_kronos.jpg": {
    "srcSet": "/assets/cover_kronos-800.webp 800w, /assets/cover_kronos-1600.webp 896w",
    "width": 896,
    "height": 1200
  },
  "/assets/cover_valt.jpg": {
    "srcSet": "/assets/cover_valt-800.webp 800w, /assets/cover_valt-1600.webp 1376w",
    "width": 1376,
    "height": 768
  },
  "/assets/project_aurelia.jpg": {
    "srcSet": "/assets/project_aurelia-800.webp 800w, /assets/project_aurelia-1600.webp 1376w",
    "width": 1376,
    "height": 768
  },
  "/assets/project_kronos.jpg": {
    "srcSet": "/assets/project_kronos-800.webp 800w, /assets/project_kronos-1600.webp 896w",
    "width": 896,
    "height": 1200
  },
  "/assets/project_valt.jpg": {
    "srcSet": "/assets/project_valt-800.webp 800w, /assets/project_valt-1600.webp 1376w",
    "width": 1376,
    "height": 768
  }
};

export function imageAttributes(src: string, sizes: string) {
  return { ...renditions[src], sizes };
}
