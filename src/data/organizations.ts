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
  // --- Kopgroep-organisaties Kwaliteit als Medicijn ZHZ ---
  {
    slug: 'de-hoop',
    naam: 'De Hoop',
    type: 'ggz-instelling',
    beschrijving:
      'Brede, christelijke GGZ-instelling met een bovenregionaal werkgebied en 10+ locaties. Circa 6.300 cliënten, waarvan 5% jeugd GGZ in ZHZ. Kopgroep-lid Kwaliteit als Medicijn. Aangesloten bij Mentiek (volwassenzorg).',
    regio: 'Zuid-Holland Zuid (bovenregionaal)',
    projectSlugs: [],
    contactPersonen: [],
  },
  {
    slug: 'perspectief',
    naam: 'Perspectief',
    type: 'ggz-instelling',
    beschrijving:
      'Generalistisch ambulante GGZ-instelling met 4 regionale locaties. Circa 2.200 cliënten, waarvan 13% jeugd GGZ in ZHZ. Kopgroep-lid en initiatiefnemer van De Kracht van Kort. Aangesloten bij Mentiek (volwassenzorg).',
    regio: 'Zuid-Holland Zuid',
    projectSlugs: ['kracht-van-kort'],
    contactPersonen: [],
  },
  {
    slug: 'parnassia-groep',
    naam: 'Parnassia Groep',
    type: 'ggz-instelling',
    beschrijving:
      'Grootschalige GGZ-instelling gespecialiseerd in complexe casuïstiek, bovenregionaal met 500+ locaties. Circa 180.000 cliënten, waarvan 1% jeugd GGZ in ZHZ. Kopgroep-lid Kwaliteit als Medicijn.',
    regio: 'Zuid-Holland Zuid (bovenregionaal)',
    projectSlugs: [],
    contactPersonen: [],
  },
  {
    slug: 'neuroscan',
    naam: 'NeuroScan',
    type: 'ggz-instelling',
    beschrijving:
      'Specialistisch wetenschappelijke GGZ-instelling met 1 lokale locatie. Klein cliëntenbestand waarvan 70% jeugd GGZ in ZHZ. Kopgroep-lid Kwaliteit als Medicijn.',
    regio: 'Zuid-Holland Zuid',
    projectSlugs: [],
    contactPersonen: [],
  },
  {
    slug: 'eleos',
    naam: 'Eleos',
    type: 'ggz-instelling',
    beschrijving:
      'Brede christelijke GGZ-instelling met een bovenregionaal werkgebied en 20+ locaties. Circa 10.000 cliënten, waarvan 2% jeugd GGZ in ZHZ. Kopgroep-lid en actief met Kracht van Kort-implementatie. Aangesloten bij Mentiek (volwassenzorg).',
    regio: 'Zuid-Holland Zuid (bovenregionaal)',
    projectSlugs: ['kracht-van-kort'],
    contactPersonen: [],
  },
  {
    slug: 'familysupporters',
    naam: 'FamilySupporters',
    type: 'ggz-instelling',
    beschrijving:
      'Systeem- en contextgerichte GGZ-instelling met een bovenregionaal werkgebied en 20+ locaties. Circa 7.500 cliënten, waarvan 6% jeugd GGZ in ZHZ. Kopgroep-lid en initiatiefnemer van de Gezinsgerichte Aanpak.',
    regio: 'Zuid-Holland Zuid (bovenregionaal)',
    projectSlugs: ['gezinsgerichte-aanpak'],
    contactPersonen: [],
  },
  {
    slug: 'mentaal-beter',
    naam: 'Mentaal Beter',
    type: 'ggz-instelling',
    beschrijving:
      'Brede GGZ-instelling met een bovenregionaal werkgebied en 100+ locaties. Groot cliëntenbestand waarvan 1% jeugd GGZ in ZHZ. Kopgroep-lid Kwaliteit als Medicijn.',
    regio: 'Zuid-Holland Zuid (bovenregionaal)',
    projectSlugs: [],
    contactPersonen: [],
  },
  {
    slug: 'carehouse',
    naam: 'CareHouse',
    type: 'ggz-instelling',
    beschrijving:
      'GGZ-instelling gespecialiseerd in jeugdigen met een beperking. Bovenregionaal met 15+ locaties. Circa 1.500 cliënten, waarvan 3% jeugd GGZ in ZHZ. Kopgroep-lid Kwaliteit als Medicijn.',
    regio: 'Zuid-Holland Zuid (bovenregionaal)',
    projectSlugs: [],
    contactPersonen: [],
  },
];

export function getOrganizationBySlug(slug: string): Organization | undefined {
  return organizations.find((o) => o.slug === slug);
}
