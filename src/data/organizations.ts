import { Organization } from '@/lib/types';

export const organizations: Organization[] = [
  {
    slug: 'yulius',
    naam: 'Yulius',
    type: 'ggz-instelling',
    beschrijving:
      'Yulius biedt geestelijke gezondheidszorg in de regio Zuid-Holland Zuid. Gespecialiseerd in kinder- en jeugdpsychiatrie, volwassenenpsychiatrie en ouderenpsychiatrie. Actief betrokken bij meerdere pilots rondom Kwaliteit als Medicijn.',
    website: 'https://www.yulius.nl',
    regio: 'Zuid-Holland Zuid',
    projectSlugs: ['overbruggingszorg-dordrecht', 'reablement-jeugd-zhz', 'consultatie-huisartsen-zhz'],
    contactPersonen: ['marieke-de-vries', 'ahmed-hassan'],
  },
  {
    slug: 'de-fjord',
    naam: 'De Fjord',
    type: 'ggz-instelling',
    beschrijving:
      'De Fjord is een GGZ-instelling in Zuid-Holland Zuid met een focus op jeugd en jongvolwassenen. Pioniert met digitale interventies en reablement-aanpakken in de regio.',
    website: 'https://www.defjord.nl',
    regio: 'Hoeksche Waard',
    projectSlugs: ['reablement-jeugd-zhz', 'digitale-interventies-angst'],
    contactPersonen: ['sophie-jansen'],
  },
  {
    slug: 'gemeente-dordrecht',
    naam: 'Gemeente Dordrecht',
    type: 'gemeente',
    beschrijving:
      'Verantwoordelijk voor de inkoop en regie op Jeugd GGZ in de regio Dordrecht. Actief betrokken bij de regionale transformatie-agenda en meerdere pilots gericht op volume-reductie.',
    website: 'https://www.dordrecht.nl',
    regio: 'Dordrecht',
    projectSlugs: ['overbruggingszorg-dordrecht', 'gezinsaanpak-crisis-preventie'],
    contactPersonen: ['jan-bakker', 'linda-van-dijk'],
  },
  {
    slug: 'compass-ggz',
    naam: 'Compass GGZ',
    type: 'ggz-instelling',
    beschrijving:
      'Compass GGZ biedt ambulante jeugd-GGZ in Zuid-Holland Zuid. Gespecialiseerd in gezinstherapie, crisisinterventie en samenwerking met het sociaal domein.',
    regio: 'Zuid-Holland Zuid',
    projectSlugs: ['consultatie-huisartsen-zhz', 'gezinsaanpak-crisis-preventie'],
    contactPersonen: ['peter-smit'],
  },
];

export function getOrganizationBySlug(slug: string): Organization | undefined {
  return organizations.find((o) => o.slug === slug);
}
