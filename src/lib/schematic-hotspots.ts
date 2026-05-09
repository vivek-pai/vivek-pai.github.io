import type { Hotspot } from './types';

export const hotspots: Hotspot[] = [
  {
    id: 'hci',
    label: 'Bridge',
    sublabel: 'HCI & Work',
    href: '/work',
    active: true,
  },
  {
    id: 'research',
    label: 'Science Bay',
    sublabel: 'Research',
    href: '/research',
    active: true,
  },
  {
    id: 'fabrication',
    label: 'Engineering Deck',
    sublabel: 'Fabrication',
    href: '/fabrication',
    active: true,
  },
  {
    id: 'music',
    label: 'Recreation Deck',
    sublabel: 'Performance',
    href: '/music',
    active: true,
  },
  {
    id: 'about',
    label: "Captain's Quarters",
    sublabel: 'About',
    href: '/about',
    active: true,
  },
  {
    id: 'commerce',
    label: 'Trade Deck',
    sublabel: '',
    href: '',
    active: false,
  },
  {
    id: 'craft',
    label: 'Atelier',
    sublabel: '',
    href: '',
    active: false,
  },
];
