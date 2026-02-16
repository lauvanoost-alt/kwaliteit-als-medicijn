export const siteConfig = {
  naam: 'MyCareTeam',
  beschrijving: 'Platform voor jeugd GGZ initiatieven in Zuid-Holland Zuid',
  regio: 'Zuid-Holland Zuid',
  tagline: 'Samen werken aan minder volumes, betere kwaliteit',
  missie:
    'Alle lopende en afgeronde initiatieven rondom volume-reductie en Kwaliteit als Medicijn zichtbaar, vindbaar en deelbaar maken voor zorgaanbieders en zorgprofessionals in de jeugd GGZ.',
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Projecten', href: '/projecten' },
    { label: 'Organisaties', href: '/organisaties' },
    { label: 'Kennisbank', href: '/kennisbank' },
    { label: 'Community', href: '/community' },
    { label: 'Over ons', href: '/over-ons' },
  ],
} as const;
