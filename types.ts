export type AppMode = 'STUDY' | 'EXECUTION' | 'LODGING';

export interface ModuleCard {
  id: string;
  title: string;
  objective: string;
  checklist: string[];
  mistakes: string[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  description: string;
  content: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  context: string;
}

export interface PropFirm {
  id: string;
  name: string;
  marketType: 'CFD' | 'FUTURES';
  accountSize: string;
  profitSplit: string;
  payoutCap: string;
  maxAllocation: string;
  coupon?: string;
  url?: string;
  isRecommended?: boolean;
}

export enum SectionID {
  Hero = 'hero',
  About = 'about',
  Logic = 'logic',
  Edge = 'edge',
  Join = 'join',
  Testimonials = 'testimonials',
  FAQ = 'faq',
  Preview = 'preview',
  Coupons = 'coupons'
}