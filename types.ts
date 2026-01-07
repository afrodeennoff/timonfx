
export type AppMode = 'STUDY' | 'EXECUTION';

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
  rank: number;
  name: string;
  type: 'FUTURES' | 'CFD';
  platforms: string[];
  drawdownType: 'TRAILING' | 'STAT' | 'END-OF-DAY';
  maxLeverage: string;
  profitTarget: string;
  maxDrawdown: string;
  maxAllocation: string;
  accountType: string;
  payoutSpeed: string;
  payoutPolicy: string;
  yearsInOperation: string;
  assets: string[];
  firmRules: string[];
  startingPrice: string;
  couponCode: string;
  discount: string;
  link: string;
  description: string;
  isRecommended?: boolean;
}

export enum SectionID {
  Hero = 'hero',
  Founder = 'founder',
  Framework = 'framework',
  Education = 'education',
  Pricing = 'pricing',
  Testimonials = 'testimonials',
  FAQ = 'faq',
  Preview = 'preview',
  Coupons = 'coupons'
}