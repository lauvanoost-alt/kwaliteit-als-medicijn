export type ProjectStatus = 'idee' | 'lopend' | 'afgerond' | 'opgeschaald';

export type ThemeSlug =
  | 'vroegsignalering'
  | 'overbruggingszorg'
  | 'reablement'
  | 'normaliseren'
  | 'digitale-zorg'
  | 'samenwerking-onderwijs'
  | 'gezinsaanpak'
  | 'wachtlijstbeheer';

export type KnowledgeType = 'framework' | 'instrument' | 'beslisboom' | 'richtlijn' | 'publicatie';

export type AccessLevel = 'free' | 'extended';

export interface Theme {
  slug: ThemeSlug;
  label: string;
  description: string;
  icon: string;
  color: string;
}

export interface ContactPerson {
  id: string;
  naam: string;
  functie: string;
  organisatie: string;
  email: string;
  telefoon?: string;
}

export interface ProjectImpact {
  wachtlijstReductie?: string;
  clientTevredenheid?: string;
  kostenBesparing?: string;
  bereik?: string;
  samenvatting: string;
}

export interface Document {
  titel: string;
  type: 'pdf' | 'link' | 'presentatie';
  url: string;
  accessLevel: AccessLevel;
}

export interface Project {
  slug: string;
  titel: string;
  subtitel: string;
  status: ProjectStatus;
  themas: ThemeSlug[];
  organisaties: string[];
  doelgroep: string;
  regio: string;
  aanleiding: string;
  doel: string;
  aanpak: string;
  resultaten?: string;
  impact?: ProjectImpact;
  gelpierdeLessen?: string;
  startDatum: string;
  eindDatum?: string;
  contactPersonen: string[];
  tags: string[];
  documenten?: Document[];
  accessLevel: AccessLevel;
  featured: boolean;
}

export interface Organization {
  slug: string;
  naam: string;
  type: 'ggz-instelling' | 'gemeente' | 'huisartsenpraktijk' | 'onderwijs' | 'overig';
  beschrijving: string;
  website?: string;
  regio: string;
  projectSlugs: string[];
  contactPersonen: string[];
}

export interface KnowledgeItem {
  slug: string;
  titel: string;
  beschrijving: string;
  type: KnowledgeType;
  themas: ThemeSlug[];
  inhoud: string;
  bronnen?: string[];
  laatstBijgewerkt: string;
  accessLevel: AccessLevel;
}

export interface CommunityMember {
  id: string;
  naam: string;
  functie: string;
  organisatie: string;
  expertise: ThemeSlug[];
  bio: string;
  beschikbaarVoor: string[];
}
