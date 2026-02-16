import { Theme } from '@/lib/types';

export const themes: Theme[] = [
  {
    slug: 'vroegsignalering',
    label: 'Vroegsignalering',
    description: 'Vroeg signaleren van problemen bij jeugdigen om escalatie te voorkomen',
    icon: 'Search',
    color: 'emerald',
  },
  {
    slug: 'overbruggingszorg',
    label: 'Overbruggingszorg',
    description: 'Ondersteuning bieden tijdens wachttijden voor specialistische zorg',
    icon: 'HeartHandshake',
    color: 'sky',
  },
  {
    slug: 'reablement',
    label: 'Reablement',
    description: 'Herstelgericht werken en bevorderen van zelfredzaamheid',
    icon: 'TrendingUp',
    color: 'amber',
  },
  {
    slug: 'normaliseren',
    label: 'Normaliseren',
    description: 'Niet alles is een stoornis — normaliseren van ontwikkeling',
    icon: 'Heart',
    color: 'rose',
  },
  {
    slug: 'digitale-zorg',
    label: 'Digitale Zorg',
    description: 'E-health en digitale interventies inzetten voor effectievere hulp',
    icon: 'Laptop',
    color: 'violet',
  },
  {
    slug: 'samenwerking-onderwijs',
    label: 'Samenwerking Onderwijs',
    description: 'GGZ en onderwijs verbinden voor vroegtijdige signalering en hulp',
    icon: 'GraduationCap',
    color: 'orange',
  },
  {
    slug: 'gezinsaanpak',
    label: 'Gezinsaanpak',
    description: 'Systeemgericht werken met het hele gezin voor duurzaam resultaat',
    icon: 'Users',
    color: 'teal',
  },
  {
    slug: 'wachtlijstbeheer',
    label: 'Wachtlijstbeheer',
    description: 'Actief managen en reduceren van wachtlijsten',
    icon: 'Clock',
    color: 'slate',
  },
];

export function getThemeBySlug(slug: string): Theme | undefined {
  return themes.find((t) => t.slug === slug);
}
