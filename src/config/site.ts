export const siteConfig = {
  naam: 'Kwaliteit-Als-Medicijn-ZHZ',
  beschrijving: 'Platform voor passende jeugdzorg in Zuid-Holland Zuid — van elkaar leren, informatie delen, initiatieven opschalen',
  regio: 'Zuid-Holland Zuid',
  tagline: 'Samen werken aan passende jeugdzorg',
  missie:
    'Van elkaar leren, informatie delen, initiatieven die werken opschalen — en met elkaar in contact komen. Dit platform brengt zorgaanbieders, gemeenten en professionals samen rondom het Kwaliteit als Medicijn-gedachtegoed voor de jeugdzorg.',
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Aanpak', href: '/kwaliteit-als-medicijn' },
    { label: 'Impact', href: '/dashboard' },
    { label: 'Simulator', href: '/impact-simulator' },
    { label: 'Kennisbank', href: '/kennisbank' },
    { label: 'Doe Mee', href: '/community' },
  ],
  // All pages remain accessible via internal links, but only these 5 appear in the main nav
  allPages: [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Initiatieven', href: '/initiatieven' },
    { label: 'Impact Simulator', href: '/impact-simulator' },
    { label: 'Gemeentekaart', href: '/gemeentekaart' },
    { label: 'Kwaliteit als Medicijn', href: '/kwaliteit-als-medicijn' },
    { label: 'Community', href: '/community' },
    { label: 'Blog', href: '/blog' },
    { label: 'Quiz', href: '/quiz' },
    { label: 'Organisaties', href: '/organisaties' },
    { label: 'Kennisbank', href: '/kennisbank' },
  ],
} as const;
