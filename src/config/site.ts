export const siteConfig = {
  naam: 'Kwaliteit-Als-Medicijn-ZHZ',
  beschrijving: 'Platform voor passende jeugdzorg in Zuid-Holland Zuid — van elkaar leren, informatie delen, initiatieven opschalen',
  regio: 'Zuid-Holland Zuid',
  tagline: 'Samen werken aan passende jeugdzorg',
  missie:
    'Van elkaar leren, informatie delen, initiatieven die werken opschalen — en met elkaar in contact komen. Dit platform brengt zorgaanbieders, gemeenten en professionals samen rondom het Kwaliteit als Medicijn-gedachtegoed voor de jeugdzorg.',

  // Main navigation: direct links + one dropdown for Impact
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Aanpak', href: '/kwaliteit-als-medicijn' },
    { label: 'Kennisbank', href: '/kennisbank' },
    { label: 'Blog', href: '/blog' },
    { label: 'Community', href: '/community' },
    { label: 'Organisaties', href: '/organisaties' },
    { label: 'Initiatieven', href: '/initiatieven' },
    { label: 'Over Ons', href: '/over-ons' },
  ],

  // Grouped navigation: only Impact has sub-items
  navigationGroups: [
    {
      label: 'Impact',
      items: [
        { label: 'Dashboard', href: '/dashboard', description: 'Regionale cijfers en voortgang' },
        { label: 'Impact Simulator', href: '/impact-simulator', description: 'Bereken je eigen besparingspotentieel' },
        { label: 'Gemeentekaart', href: '/gemeentekaart', description: 'Kaart met alle gemeenten in ZHZ' },
      ],
    },
  ],

  // CTA button in nav
  navCta: { label: 'Doe Mee', href: '/#doe-mee' },

  // All pages for the footer
  allPages: [
    { label: 'Home', href: '/' },
    { label: 'Aanpak', href: '/kwaliteit-als-medicijn' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Impact Simulator', href: '/impact-simulator' },
    { label: 'Gemeentekaart', href: '/gemeentekaart' },
    { label: 'Kennisbank', href: '/kennisbank' },
    { label: 'Blog', href: '/blog' },
    { label: 'Quiz', href: '/quiz' },
    { label: 'Community', href: '/community' },
    { label: 'Organisaties', href: '/organisaties' },
    { label: 'Initiatieven', href: '/initiatieven' },
    { label: 'Projecten', href: '/projecten' },
    { label: 'Over Ons', href: '/over-ons' },
  ],
} as const;
