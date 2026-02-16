import { ContactPerson } from '@/lib/types';

export const contacts: ContactPerson[] = [
  {
    id: 'marieke-de-vries',
    naam: 'Marieke de Vries',
    functie: 'Projectleider Jeugd GGZ',
    organisatie: 'yulius',
    email: 'mvries@yulius.nl',
    telefoon: '078-6123456',
  },
  {
    id: 'jan-bakker',
    naam: 'Jan Bakker',
    functie: 'Beleidsadviseur Jeugd',
    organisatie: 'gemeente-dordrecht',
    email: 'j.bakker@dordrecht.nl',
  },
  {
    id: 'sophie-jansen',
    naam: 'Sophie Jansen',
    functie: 'GZ-psycholoog & Projectcoördinator',
    organisatie: 'de-fjord',
    email: 's.jansen@defjord.nl',
    telefoon: '078-6234567',
  },
  {
    id: 'ahmed-hassan',
    naam: 'Ahmed Hassan',
    functie: 'Manager Zorgvernieuwing',
    organisatie: 'yulius',
    email: 'a.hassan@yulius.nl',
  },
  {
    id: 'linda-van-dijk',
    naam: 'Linda van Dijk',
    functie: 'Programmaleider Transformatie Jeugd',
    organisatie: 'gemeente-dordrecht',
    email: 'l.vandijk@dordrecht.nl',
    telefoon: '078-6345678',
  },
  {
    id: 'peter-smit',
    naam: 'Peter Smit',
    functie: 'Orthopedagoog-Generalist',
    organisatie: 'compass-ggz',
    email: 'p.smit@compassggz.nl',
  },
];

export function getContactById(id: string): ContactPerson | undefined {
  return contacts.find((c) => c.id === id);
}
