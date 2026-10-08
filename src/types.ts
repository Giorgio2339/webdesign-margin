export interface CaseStudyData {
  client: string;
  services: string[];
  overview: string;
  challenge: string;
  direction: string;
  result: string;
}

export interface Project {
  id: string;
  index: string;
  name: string;
  shortName: string;
  descriptor: string;
  discipline: string;
  statement: string;
  image: string;
  coverImage?: string;
  interfaceVideo?: string;
  poster?: string;
  alignment: 'center' | 'left' | 'right';
  aspectRatio?: string;
  liveUrl?: string;
  status: string;
  caseStudy: CaseStudyData;
}
export interface Capability {
  index: string;
  title: string;
  summary: string;
  image: string;
  imageAlt?: string;
}
export interface ProcessPhase { number: string; title: string; description: string }
