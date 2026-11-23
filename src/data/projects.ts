import type { Project, Capability, ProcessPhase } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'bloomvae',
    index: '01',
    name: 'Bloomvae Daily Gut Support',
    shortName: 'Bloomvae',
    descriptor: 'D2C Health — digitale Markenstudie',
    discipline: 'D2C E-Commerce / Konzeptstudie',
    statement: 'Eine ruhige Produktgeschichte für eine Gesundheitsmarke: klare Information, präzise Typografie und ein fokussierter Weg zum Angebot.',
    image: '/assets/project_bloomvae.png',
    coverImage: '/assets/cover_bloomvae.jpg',
    alignment: 'center',
    aspectRatio: '1024 / 582',
    status: 'Konzeptstudie',
    caseStudy: {
      client: 'Bloomvae · unabhängige Konzeptstudie',
      services: ['Markenarchitektur', 'D2C-Seitenkonzept', 'Produktinformation', 'Designsystem'],
      overview: 'Diese unabhängige Studie zeigt eine mögliche digitale Markenwelt für Bloomvae. Sie ordnet Produktinformationen in einer ruhigen, typografisch geführten Oberfläche.',
      challenge: 'Gesundheitsthemen verlangen verständliche Information und eine klare visuelle Hierarchie. Das Konzept untersucht, wie sich beides in einem D2C-Auftritt verbinden lässt.',
      direction: 'Warme Erdtöne, botanische Akzente und eine zurückhaltende Produktgeschichte bilden die visuelle Richtung der Studie.',
      result: 'Eine klare Informationsarchitektur führt von der Markenidee zu Produktdetails und nächsten Schritten.'
    }
  },
  {
    id: 'maharadscha',
    index: '02',
    name: 'Maharadscha Palast',
    shortName: 'Maharadscha',
    descriptor: 'Gastronomie — digitale Markenstudie',
    discipline: 'Gastronomie / Konzeptstudie',
    statement: 'Ein digitaler Auftritt, der Atmosphäre, Speisekarte und den Weg zur Reservierung in den Mittelpunkt stellt.',
    image: '/assets/project_maharadscha.png',
    coverImage: '/assets/cover_maharadscha.jpg',
    alignment: 'left',
    aspectRatio: '1024 / 640',
    status: 'Konzeptstudie',
    caseStudy: {
      client: 'Maharadscha Palast · unabhängige Konzeptstudie',
      services: ['Visuelle Richtung', 'Reservierungsführung', 'Speisekarten-Konzept', 'Art Direction'],
      overview: 'Diese unabhängige Studie entwirft eine atmosphärische Website für den Maharadscha Palast. Im Mittelpunkt stehen Restaurantbesuch, Speisekarte und Reservierung.',
      challenge: 'Ein Restaurantauftritt soll Stimmung vermitteln und zugleich praktische Fragen schnell beantworten. Das Konzept verbindet beide Aufgaben.',
      direction: 'Tiefe, warme Lichttöne und serifenbetonte Typografie erzeugen eine einladende Abendstimmung.',
      result: 'Die Studie führt vom ersten Eindruck direkt zu den Informationen für einen Besuch.'
    }
  },
  {
    id: 'jtsmash',
    index: '03',
    name: 'JT Smash Burger',
    shortName: 'JT Burger',
    descriptor: 'Fast Casual — digitale Markenstudie',
    discipline: 'Food & Beverage / Konzeptstudie',
    statement: 'Ein direktes mobiles Konzept für Speisekarte, Markencharakter und den Weg zur Bestellung.',
    image: '/assets/project_jtsmash.png',
    coverImage: '/assets/cover_jtsmash.jpg',
    alignment: 'right',
    aspectRatio: '1024 / 602',
    status: 'Konzeptstudie',
    caseStudy: {
      client: 'JT Smash Burger · unabhängige Konzeptstudie',
      services: ['Markencharakter', 'Bestellführung', 'Mobile Oberfläche', 'Mikrointeraktionen'],
      overview: 'Diese unabhängige Studie entwickelt einen mobilen Auftritt für JT Smash Burger. Klare Navigation und plakative Gestaltung sollen den Weg zum Angebot verkürzen.',
      challenge: 'Fast-Casual-Angebote müssen auf kleinen Bildschirmen schnell erfassbar bleiben. Das Konzept priorisiert Speisekarte, Orientierung und Kontakt.',
      direction: 'Plakative Typografie, kontrastreiche Food-Bildwelten und ein deutlicher Signalton prägen die visuelle Richtung.',
      result: 'Die Studie zeigt, wie Markencharakter und eine schnelle mobile Orientierung zusammenspielen können.'
    }
  }
];

export const CAPABILITIES_DATA: Capability[] = [
  {
    index: '01',
    title: 'Digitale Art Direction',
    summary: 'Ein unverwechselbares visuelles System, maßgeschneidert auf Ihr Geschäftsmodell und Ihre Markenidentität.',
    image: '/assets/capability_art_direction.png',
    imageAlt: 'Digitale Art Direction — Porträt und Lichtstudie'
  },
  {
    index: '02',
    title: 'Responsive Architektur',
    summary: 'Präzise durchdacht für Desktop, Tablet und Smartphone – ohne Brüche, mit architektonischer Klarheit.',
    image: '/assets/capability_responsive.png',
    imageAlt: 'Responsive Architektur — Multi-Device Komposition über alle Viewports'
  },
  {
    index: '03',
    title: 'Interaktion & Konversion',
    summary: 'Choreografierte Bewegung und subtile Kinetik führen die Aufmerksamkeit intuitiv zur Handlung.',
    image: '/assets/capability_interaction.png',
    imageAlt: 'Interaktion & Konversion — Taktile Interaktion und Haptik'
  },
  {
    index: '04',
    title: 'Creative Development',
    summary: 'Gestaltung direkt in klar strukturierten Code übersetzt – mit Blick auf Tempo, Zugänglichkeit und Wartbarkeit.',
    image: '/assets/capability_development.png',
    imageAlt: 'Creative Development — Präzise Softwarearchitektur und Code'
  }
];

export const PROCESS_DATA: ProcessPhase[] = [
  { number: '01', title: 'Diagnose', description: 'Geschäftsmodell, Zielgruppen-Denkmuster und Marktpotenziale dekonstruieren.' },
  { number: '02', title: 'Richtung', description: 'Struktur, Positionierung, typografische Hierarchie und visuelle Identität definieren.' },
  { number: '03', title: 'Design & Code', description: 'Gleichzeitiges Gestalten und Entwickeln im Browser über alle Viewports hinweg.' },
  { number: '04', title: 'Feinschliff & Launch', description: 'Härtung, Performance-Optimierung, Barrierefreiheit und weltweiter Edge-Release.' }
];

const EN_PROJECTS = [
  {
    descriptor: 'D2C wellbeing — digital concept study', discipline: 'D2C commerce / independent concept',
    statement: 'A calm product story for a wellbeing brand, with clear information, refined typography and a focused path to the product.', status: 'Concept study',
    caseStudy: {
      client: 'Bloomvae · independent concept study', services: ['Brand architecture', 'D2C page concept', 'Product information', 'Design system'],
      overview: 'An independent concept exploring a possible digital world for Bloomvae. Product information is organised through a calm, typographic interface.',
      challenge: 'Wellbeing products need clear, accessible information. This concept explores how to combine that clarity with a distinctive direct-to-consumer experience.',
      direction: 'Warm earth tones, botanical details and restrained product storytelling shape the visual direction.',
      result: 'A clear information structure leads from the brand idea to product details and the next step.'
    }
  },
  {
    descriptor: 'Hospitality — digital concept study', discipline: 'Hospitality / independent concept',
    statement: 'A digital presence that brings atmosphere, the menu and the path to a reservation into focus.', status: 'Concept study',
    caseStudy: {
      client: 'Maharadscha Palast · independent concept study', services: ['Visual direction', 'Reservation journey', 'Menu concept', 'Art direction'],
      overview: 'An independent study of an atmospheric restaurant website for Maharadscha Palast, centred on the visit, the menu and reservations.',
      challenge: 'A restaurant website should create a sense of place while answering practical questions quickly. This concept brings both together.',
      direction: 'Deep, warm lighting and expressive serif typography create an inviting evening atmosphere.',
      result: 'The study leads from first impression to the information needed to plan a visit.'
    }
  },
  {
    descriptor: 'Fast casual — digital concept study', discipline: 'Food & beverage / independent concept',
    statement: 'A direct, mobile-focused concept for the menu, brand character and the path to ordering.', status: 'Concept study',
    caseStudy: {
      client: 'JT Smash Burger · independent concept study', services: ['Brand character', 'Ordering journey', 'Mobile interface', 'Micro-interactions'],
      overview: 'An independent mobile-first study for JT Smash Burger. Clear navigation and confident visuals make the offer easy to explore.',
      challenge: 'Fast casual menus must be easy to scan on a small screen. The concept prioritises the menu, orientation and contact.',
      direction: 'Bold typography, high-contrast food imagery and a strong accent colour define the visual direction.',
      result: 'The study shows how brand character and quick mobile navigation can work together.'
    }
  }
] as const;

const EN_CAPABILITIES = [
  { title: 'Digital art direction', summary: 'A distinctive visual system tailored to your business and brand identity.', imageAlt: 'Art direction — portrait and light study' },
  { title: 'Responsive design', summary: 'Carefully composed for desktop, tablet and mobile, with clarity at every size.', imageAlt: 'Responsive design across several screens' },
  { title: 'Interaction & conversion', summary: 'Purposeful motion and subtle interactions guide attention towards action.', imageAlt: 'Interaction design study' },
  { title: 'Creative development', summary: 'Design translated into clear, maintainable code with performance and accessibility in mind.', imageAlt: 'Creative development and code' }
] as const;

export function getProjects(locale: import('../i18n/locale').Locale): Project[] {
  if (locale === 'de') return PROJECTS_DATA;
  return PROJECTS_DATA.map((project, index) => ({ ...project, ...EN_PROJECTS[index], caseStudy: { ...EN_PROJECTS[index].caseStudy, services: [...EN_PROJECTS[index].caseStudy.services] } }));
}
export function getCapabilities(locale: import('../i18n/locale').Locale): Capability[] {
  if (locale === 'de') return CAPABILITIES_DATA;
  return CAPABILITIES_DATA.map((capability, index) => ({ ...capability, ...EN_CAPABILITIES[index] }));
}
