export interface Hotspot {
  id: string;
  label: string;
  sublabel: string;
  href: string;
  active: boolean;
}

export type Domain = 'hci' | 'research' | 'fabrication' | 'music' | 'about';

export interface SectionMeta {
  id: Domain;
  title: string;
  shortTitle: string;
  description: string;
  route: string;
}
