'use client';

import { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  ExternalLink,
  Filter,
  Globe,
  Scale,
  Eye,
  BarChart3,
  Microscope,
  FileCheck2,
  MapPin,
  X,
  ChevronDown,
  ChevronUp,
  Tag as TagIcon,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  TYPES                                                              */
/* ------------------------------------------------------------------ */

interface Bron {
  naam: string;
  type: string;
  land: string;
  beschrijving: string;
  datum: string;
  url: string;
  tags: string[];
  categorie: string;
}

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const categorieen = [
  { id: 'stelsel', label: 'Stelsel, wet & beleid', icon: Scale, color: 'text-indigo-600 bg-indigo-50' },
  { id: 'toezicht', label: 'Toezicht & verantwoording', icon: Eye, color: 'text-amber-600 bg-amber-50' },
  { id: 'data', label: 'Data & dashboards', icon: BarChart3, color: 'text-emerald-600 bg-emerald-50' },
  { id: 'kennis', label: 'Kennis & onderzoek', icon: Microscope, color: 'text-sky-600 bg-sky-50' },
  { id: 'richtlijnen', label: 'Richtlijnen & kwaliteit', icon: FileCheck2, color: 'text-violet-600 bg-violet-50' },
  { id: 'regio', label: 'Regio Zuid-Holland Zuid', icon: MapPin, color: 'text-rose-600 bg-rose-50' },
  { id: 'internationaal', label: 'Internationaal', icon: Globe, color: 'text-teal-600 bg-teal-50' },
] as const;

const bronnen: Bron[] = [
  // ── Stelsel, wet & beleid ──────────────────────────────────────────
  { naam: 'Jeugdwet (BWBR0034925)', type: 'Wetgeving', land: 'NL', beschrijving: 'De wettelijke basis voor jeugdhulp, jeugdbescherming en jeugdreclassering, inclusief rollen en plichten van gemeenten en aanbieders.', datum: '2015-01-01', url: 'https://wetten.overheid.nl/BWBR0034925/2015-01-01/0/informatie', tags: ['beleid', 'wetgeving', 'jeugdhulp', 'jeugdbescherming'], categorie: 'stelsel' },
  { naam: 'Jeugdhulp bij gemeenten', type: 'Overheidspagina', land: 'NL', beschrijving: 'Overzicht van gemeentelijke verantwoordelijkheid (jeugdhulpplicht), taken en samenwerking in de uitvoering van jeugdhulp, inclusief psychische en gedragsproblemen.', datum: '', url: 'https://www.rijksoverheid.nl/onderwerpen/jeugdhulp/jeugdhulp-bij-gemeenten', tags: ['beleid', 'toegang', 'gemeente', 'jeugd-GGZ'], categorie: 'stelsel' },
  { naam: 'Decentralisatie van overheidstaken naar gemeenten', type: 'Overheidspagina', land: 'NL', beschrijving: 'Contextpagina over decentralisaties in het sociaal domein, waaronder jeugdzorg sinds 2015 bij gemeenten is belegd.', datum: '', url: 'https://www.rijksoverheid.nl/onderwerpen/gemeenten/decentralisatie-van-overheidstaken-naar-gemeenten', tags: ['beleid', 'stelsel', 'decentralisatie'], categorie: 'stelsel' },
  { naam: 'Jeugdzorg (beleidsthema Ministerie van VWS)', type: 'Overheidspagina', land: 'NL', beschrijving: 'Thematische beleidsinformatie over maatregelen en afspraken rond betere en betaalbare jeugdzorg, in samenhang met partijen in het veld.', datum: '', url: 'https://www.rijksoverheid.nl/ministeries/ministerie-van-volksgezondheid-welzijn-en-sport/samen-gezond-fit-en-veerkrachtig/jeugdzorg', tags: ['beleid', 'stelsel', 'betaalbaarheid'], categorie: 'stelsel' },
  { naam: 'Hervormingsagenda Jeugd 2023-2028', type: 'Overheidsrapport', land: 'NL', beschrijving: 'Landelijke agenda met afspraken om knelpunten in de jeugdzorg structureel aan te pakken en het stelsel financieel houdbaar te maken.', datum: '2023-06-20', url: 'https://www.rijksoverheid.nl/documenten/rapporten/2023/06/20/hervormingsagenda-jeugd-2023-2028', tags: ['beleid', 'hervorming', 'financiën', 'evaluatie'], categorie: 'stelsel' },
  { naam: 'Over de Hervormingsagenda Jeugd', type: 'Organisatiepagina', land: 'NL', beschrijving: 'Praktische duiding van de Hervormingsagenda vanuit gemeentelijk perspectief en de bestuurlijke afspraken eromheen.', datum: '2024-03-25', url: 'https://vng.nl/artikelen/over-de-hervormingsagenda-jeugd', tags: ['beleid', 'gemeente', 'uitvoering'], categorie: 'stelsel' },
  { naam: 'Programma Zorg voor de Jeugd', type: 'Overheidsrapport', land: 'NL', beschrijving: 'Actieprogramma met doelen en actielijnen om jeugdhulp, jeugdbescherming en jeugdreclassering merkbaar te verbeteren, inclusief betere toegang en "zo thuis mogelijk".', datum: '2018-04-01', url: 'https://www.rijksoverheid.nl/documenten/rapporten/2018/04/01/actieprogramma-zorg-voor-de-jeugd', tags: ['beleid', 'praktijk', 'transformatie'], categorie: 'stelsel' },
  { naam: 'Programma Toekomstscenario kind- en gezinsbescherming', type: 'Overheidsrapport', land: 'NL', beschrijving: 'Voortgangsrapportage over herinrichting van de kind- en gezinsbescherming en verbeteringen in de jeugd- en veiligheidsketen.', datum: '2026-01-27', url: 'https://www.rijksoverheid.nl/documenten/rapporten/2026/01/27/programma-toekomstscenario-kind-en-gezinsbescherming', tags: ['jeugdbescherming', 'keten', 'beleid'], categorie: 'stelsel' },
  { naam: 'Wetsvoorstel Reikwijdte Jeugdwet in internetconsultatie', type: 'Overheidsnieuws', land: 'NL', beschrijving: 'Aankondiging van consultatie over aanscherping/afbakening van jeugdhulp, gericht op zo passend mogelijke inzet.', datum: '2026-02-13', url: 'https://www.rijksoverheid.nl/actueel/nieuws/2026/02/13/wetsvoorstel-reikwijdte-jeugdwet-in-internetconsultatie', tags: ['beleid', 'wetgeving', 'afbakening'], categorie: 'stelsel' },

  // ── Toezicht & verantwoording ──────────────────────────────────────
  { naam: 'Jeugd (toezichtthema IGJ)', type: 'Toezichtpagina', land: 'NL', beschrijving: 'Centrale ingang voor toezicht op uitvoering van de Jeugdwet, met toetsingskaders, meldingen, publicaties en actuele thema\u2019s in het jeugddomein.', datum: '', url: 'https://www.igj.nl/zorgsectoren/jeugd', tags: ['toezicht', 'kwaliteit', 'jeugdhulp', 'jeugdbescherming'], categorie: 'toezicht' },
  { naam: 'Hoe verloopt het toezicht?', type: 'Toezichtpagina', land: 'NL', beschrijving: 'Uitleg van toezichtproces op jeugdhulp, jeugdbescherming en jeugdreclassering, inclusief samenwerking met andere inspecties.', datum: '', url: 'https://www.igj.nl/zorgsectoren/jeugd/toezicht-en-toetsingskaders/hoe-verloopt-het-toezicht', tags: ['toezicht', 'toetsingskader', 'praktijk'], categorie: 'toezicht' },
  { naam: 'Jeugdbeschermingsketen', type: 'Toezichtpagina', land: 'NL', beschrijving: 'Thema rond kwaliteit en werkwijze in jeugdbescherming en jeugdreclassering, inclusief vervolgtoezicht en rapportage over wachten op bescherming.', datum: '', url: 'https://www.igj.nl/zorgsectoren/jeugd/jeugdbeschermingsketen', tags: ['jeugdbescherming', 'wachttijden', 'toezicht'], categorie: 'toezicht' },
  { naam: 'Ombouw JeugdzorgPlus (gesloten jeugdzorg)', type: 'Toezichtpagina', land: 'NL', beschrijving: 'Informatie over toezicht op gesloten jeugdhulp en verplicht registreren/aanleveren van vrijheidsbeperkende maatregelen vanaf 2024.', datum: '', url: 'https://www.igj.nl/zorgsectoren/jeugd/ombouw-jeugdzorgplus', tags: ['gesloten jeugdhulp', 'rechtspositie', 'toezicht'], categorie: 'toezicht' },
  { naam: 'Rapporten van inspectiebezoeken', type: 'Portal', land: 'NL', beschrijving: 'Zoeksysteem voor toezichtdocumenten, waaronder inspectierapporten en bezoekverslagen die openbaar zijn gemaakt.', datum: '', url: 'https://toezichtdocumenten.igj.nl/', tags: ['toezicht', 'inspectierapport', 'transparantie'], categorie: 'toezicht' },
  { naam: 'Jeugd (Inspectie JenV)', type: 'Toezichtpagina', land: 'NL', beschrijving: 'Overzicht van toezicht door Inspectie Justitie en Veiligheid op onderdelen van het jeugddomein, inclusief meldplichten en ketenbrede samenhang.', datum: '', url: 'https://www.inspectie-jenv.nl/toezichtgebieden/j/jeugd', tags: ['toezicht', 'veiligheid', 'meldplicht', 'keten'], categorie: 'toezicht' },
  { naam: 'Jeugdzorg (NZa)', type: 'Reguleringpagina', land: 'NL', beschrijving: 'Uitleg van NZa-rol in beschikbaarheid jeugdzorg, inclusief nieuwe taken per 2026 en verwijzing naar publicaties over continu\u00efteit en toezicht.', datum: '', url: 'https://www.nza.nl/zorgsectoren/jeugdzorg', tags: ['toezicht', 'beschikbaarheid', 'financiën', 'continuïteit'], categorie: 'toezicht' },
  { naam: 'Jaarverantwoording Jeugd en Zorg (IGJ)', type: 'Toezichtpagina', land: 'NL', beschrijving: 'Beschrijft verantwoordingsverplichtingen en wie handhaaft/toezicht houdt op openbare jaarverantwoording in zorg en jeugdhulp.', datum: '', url: 'https://www.igj.nl/onderwerpen/klachten-en-melden/jaarverantwoording-zorg', tags: ['verantwoording', 'toezicht', 'financiën'], categorie: 'toezicht' },
  { naam: 'Jaarverantwoording zorg: Jeugdhulpaanbieders', type: 'Informatiepagina', land: 'NL', beschrijving: 'Praktische ingang voor wie verantwoordingsplichtig is, wat openbaar moet worden gemaakt en waar formats en jaardocumenten staan.', datum: '', url: 'https://www.jaarverantwoordingzorg.nl/jeugdhulpaanbieders', tags: ['verantwoording', 'financiën', 'transparantie'], categorie: 'toezicht' },

  // ── Data & dashboards ──────────────────────────────────────────────
  { naam: 'Dashboard Jeugdzorg (CBS)', type: 'Dashboard', land: 'NL', beschrijving: 'Interactief overzicht van jeugdzorggebruik per jeugdregio en gemeente, bedoeld als gesprekstool tussen regio\u2019s en landelijke partijen.', datum: '', url: 'https://www.cbs.nl/nl-nl/visualisaties/dashboard-jeugdzorg', tags: ['data', 'dashboard', 'jeugdzorggebruik', 'regionaal'], categorie: 'data' },
  { naam: 'Jeugdhulp 2024 (CBS-rapportage)', type: 'Rapport', land: 'NL', beschrijving: 'Landelijke rapportage met voorlopige cijfers over jeugdhulp in 2024, inclusief uitsplitsingen naar leeftijd en type jeugdzorg.', datum: '2025-04-30', url: 'https://www.cbs.nl/nl-nl/longread/rapportages/2025/jeugdhulp-2024', tags: ['data', 'evaluatie', 'jeugdhulp', 'regionaal'], categorie: 'data' },
  { naam: 'Jeugdbescherming en jeugdreclassering 2024 (CBS)', type: 'Rapport', land: 'NL', beschrijving: 'Provisionele cijfers over maatregelen jeugdbescherming en jeugdreclassering in 2024, inclusief aantallen en duur.', datum: '2025-04-30', url: 'https://www.cbs.nl/nl-nl/longread/rapportages/2025/jeugdbescherming-en-jeugdreclassering-2024', tags: ['data', 'jeugdbescherming', 'jeugdreclassering', 'evaluatie'], categorie: 'data' },
  { naam: 'Jeugdmonitor (CBS)', type: 'Dataportaal', land: 'NL', beschrijving: 'Cijferportal met thema\u2019s rond jeugd (gezondheid, welzijn, veiligheid, onderwijs) en regionale vergelijkingen voor gemeenten.', datum: '', url: 'https://jeugdmonitor.cbs.nl/', tags: ['data', 'monitoring', 'gemeente', 'welzijn'], categorie: 'data' },
  { naam: 'Opendata: Kerncijfers jeugdzorg (CBS)', type: 'Dataset', land: 'NL', beschrijving: 'Open dataset met kerncijfers over jeugdhulp/jeugdbescherming/jeugdreclassering, bruikbaar voor eigen analyses.', datum: '2025-10-31', url: 'https://opendata.cbs.nl/', tags: ['data', 'open data', 'monitoring'], categorie: 'data' },
  { naam: 'Monitor Aansluiting Onderwijs Jeugdhulp (NJi)', type: 'Monitor', land: 'NL', beschrijving: 'Monitor met cijfers en instrumenten om samenwerking tussen onderwijs en jeugdhulp regionaal te beoordelen en te verbeteren.', datum: '', url: 'https://www.nji.nl/kennis/verbinding-onderwijs-en-jeugdhulp/monitor-aansluiting-onderwijs-jeugdhulp', tags: ['onderwijs', 'jeugdhulp', 'samenwerking', 'monitoring'], categorie: 'data' },
  { naam: 'Wachttijden GGZ (VZinfo)', type: 'Datapagina', land: 'NL', beschrijving: 'Indicatorpagina met uitleg en visualisaties rond wachttijden en Treeknormen in de ggz, bruikbaar voor context bij jeugd-GGZ-discussies.', datum: '', url: 'https://www.vzinfo.nl/wachttijden/geestelijke-gezondheidszorg', tags: ['GGZ', 'wachttijden', 'toegankelijkheid', 'data'], categorie: 'data' },

  // ── Kennis & onderzoek ─────────────────────────────────────────────
  { naam: 'Kennis (NJi)', type: 'Kennisplatform', land: 'NL', beschrijving: 'Startpunt met kennisdossiers, duiding en praktijkinformatie over opgroeien, opvoeden en jeugdhulp, inclusief verdieping op stelselthema\u2019s.', datum: '', url: 'https://www.nji.nl/kennis', tags: ['praktijk', 'beleid', 'kennis'], categorie: 'kennis' },
  { naam: 'Databank Effectieve jeugdinterventies (NJi)', type: 'Databank', land: 'NL', beschrijving: 'Overzicht van interventies die door een onafhankelijke commissie zijn beoordeeld, met focus op "wat werkt" in preventie en jeugdhulp.', datum: '', url: 'https://www.nji.nl/databanken/interventies', tags: ['praktijk', 'effectiviteit', 'interventies'], categorie: 'kennis' },
  { naam: 'Eerste evaluatie Jeugdwet (ZonMw dossier)', type: 'Dossierpagina', land: 'NL', beschrijving: 'Samenvatting en toegang tot de eerste evaluatie van de Jeugdwet, inclusief duiding van transformatie en agenda voor vervolg.', datum: '2018-01-30', url: 'https://www.zonmw.nl/nl/artikel/eerste-evaluatie-jeugdwet', tags: ['evaluatie', 'beleid', 'onderzoek'], categorie: 'kennis' },
  { naam: 'Eerste evaluatie Jeugdwet (rapport PDF)', type: 'Rapport (PDF)', land: 'NL', beschrijving: 'Integrale eerste evaluatie van de Jeugdwet met analyse van werking, transformatie en aanbevelingen voor stelselverbetering.', datum: '2018', url: 'https://www.nji.nl/uploads/2021-06/Rapport-Eerste-evaluatie-Jeugdwet.pdf', tags: ['evaluatie', 'beleid', 'stelsel'], categorie: 'kennis' },
  { naam: 'Jeugdhulp in de wijk (SCP)', type: 'Rapportpagina', land: 'NL', beschrijving: 'Onderzoek naar verschillen in jeugdhulpgebruik en wijkkenmerken, bruikbaar voor lokaal beleid en preventie.', datum: '2020-03-05', url: 'https://www.scp.nl/documenten/2020/03/05/jeugdhulp-in-de-wijk', tags: ['onderzoek', 'gemeente', 'preventie', 'evaluatie'], categorie: 'kennis' },
  { naam: 'Evaluatie Jeugdwet onder ouders (EJOO)', type: 'Onderzoeksbeschrijving', land: 'NL', beschrijving: 'Onderzoeksbeschrijving van een enqu\u00eate naar ervaringen van ouders met toegang en uitvoering van jeugdhulp onder de Jeugdwet.', datum: '', url: 'https://www.scp.nl/over-het-scp/onderzoeksbeschrijvingen/evaluatie-jeugdwet-onder-ouders-ejoo', tags: ['evaluatie', 'ervaringen', 'toegang'], categorie: 'kennis' },
  { naam: 'De jeugd-GGZ na de Jeugdwet (Nivel)', type: 'Onderzoeksrapport', land: 'NL', beschrijving: 'Studie naar knelpunten en kansen in de jeugd-GGZ sinds decentralisatie, met thema\u2019s als toegang, triage, samenwerking en hoogspecialistische zorg.', datum: '2019-07-01', url: 'https://www.nivel.nl/nl/publicatie/de-jeugd-ggz-na-de-jeugdwet-een-onderzoek-naar-knelpunten-en-kansen', tags: ['GGZ', 'jeugd', 'toegang', 'samenwerking'], categorie: 'kennis' },
  { naam: 'In de wachtstand: impact van wachttijden in de ggz', type: 'Rapport (PDF)', land: 'NL', beschrijving: 'Literatuurinventarisatie naar impact van wachttijden in de ggz op pati\u00ebnten, naasten en zorgverleners en oorzaken in organisatie/financiering.', datum: '2024-06-17', url: 'https://www.trimbos.nl/wp-content/uploads/2025/10/TRIAF2172-Rapport-Impact-van-de-wachttijden-in-de-ggz.pdf', tags: ['GGZ', 'wachttijden', 'evaluatie', 'financiering'], categorie: 'kennis' },
  { naam: 'De Stand van de Jeugdzorg', type: 'Overheidsrapport', land: 'NL', beschrijving: 'Periodieke rapportage over continu\u00efteit en beschikbaarheid van jeugdzorg, als signaalinstrument richting beleid en uitvoering.', datum: '2023-06-20', url: 'https://www.rijksoverheid.nl/documenten/rapporten/2023/06/20/de-stand-van-de-jeugdzorg', tags: ['continuïteit', 'beschikbaarheid', 'beleid'], categorie: 'kennis' },

  // ── Richtlijnen & kwaliteit ────────────────────────────────────────
  { naam: 'Richtlijnen Jeugdhulp en Jeugdbescherming', type: 'Richtlijnplatform', land: 'NL', beschrijving: 'Centrale set beroepsrichtlijnen die professionals ondersteunt bij beslissen over passende hulp, plus implementatiehulpmiddelen en nieuws over herzieningen.', datum: '', url: 'https://www.richtlijnenjeugdhulp.nl/node/1', tags: ['richtlijnen', 'kwaliteit', 'jeugdhulp', 'jeugdbescherming'], categorie: 'richtlijnen' },
  { naam: 'Werken met richtlijnen bij professionalisering (NJi)', type: 'Kennispagina', land: 'NL', beschrijving: 'Toelichting op rol van richtlijnen binnen professionele standaard, inclusief verwijzing naar autoriserende beroepsverenigingen.', datum: '', url: 'https://www.nji.nl/kennis/professionalisering/werken-met-richtlijnen-bij-professionalisering', tags: ['professionalisering', 'richtlijnen', 'kwaliteit'], categorie: 'richtlijnen' },
  { naam: 'Stichting Kwaliteitsregister Jeugd', type: 'Beroepsregister', land: 'NL', beschrijving: 'Beroepsregister voor jeugdprofessionals, met informatie over (her)registratie, kwaliteitscriteria en professioneel toezicht.', datum: '', url: 'https://skjeugd.nl/', tags: ['professionalisering', 'kwaliteit', 'registratie'], categorie: 'richtlijnen' },
  { naam: 'Jeugdhulp en persoonsgegevens (AP)', type: 'Overheidspagina', land: 'NL', beschrijving: 'Uitleg voor gemeenten over verwerking van persoonsgegevens bij jeugdhulp, met aandacht voor wettelijke grondslagen en zorgvuldigheid.', datum: '2025-01-06', url: 'https://www.autoriteitpersoonsgegevens.nl/themas/overheid/gemeenten/jeugdhulp', tags: ['AVG', 'privacy', 'beleid', 'gemeente'], categorie: 'richtlijnen' },
  { naam: 'Handreiking persoonsgegevens verstrekken aan gemeenten', type: 'Handreiking', land: 'NL', beschrijving: 'Praktische ondersteuning voor jeugdhulpaanbieders bij gegevensverstrekking aan gemeenten wanneer dit nodig is in uitvoering van jeugdhulp.', datum: '2023-07-14', url: 'https://www.nvo.nl/actueel/handreiking-zorgvuldig-verstrekken-van-persoonsgegevens-aan-gemeenten-bij-jeugdhulp', tags: ['AVG', 'privacy', 'praktijk', 'samenwerking'], categorie: 'richtlijnen' },
  { naam: 'JGZ-richtlijnen (overzicht)', type: 'Richtlijnplatform', land: 'NL', beschrijving: 'Overzicht van evidence-based richtlijnen voor jeugdgezondheidszorg, nuttig voor preventie en vroegsignalering.', datum: '', url: 'https://www.jgzrichtlijnen.nl/richtlijnen/', tags: ['preventie', 'vroegsignalering', 'praktijk'], categorie: 'richtlijnen' },
  { naam: 'GGZ Landelijke samenwerkingsafspraken jeugd', type: 'Kwaliteitsstandaard', land: 'NL', beschrijving: 'Kwaliteitsstandaard met aanbevelingen voor samenwerking, verwijsbrief en terugrapportage in de jeugd(ggz)-keten.', datum: '', url: 'https://www.zorginzicht.nl/kwaliteitsstandaarden/ggz-landelijke-samenwerkingsafspraken-jeugd', tags: ['GGZ', 'jeugd', 'samenwerking', 'kwaliteit'], categorie: 'richtlijnen' },
  { naam: 'GGZ Organisatie van zorg voor kind en jongere', type: 'Kwaliteitsstandaard', land: 'NL', beschrijving: 'Kwaliteitsstandaard over organisatie van hulp aan kinderen en jongeren, met focus op netwerkafspraken, kwaliteit en monitoring.', datum: '', url: 'https://www.zorginzicht.nl/kwaliteitsstandaarden/ggz-organisatie-van-zorg-voor-kind-en-jongere', tags: ['GGZ', 'jeugd', 'organisatie', 'kwaliteit'], categorie: 'richtlijnen' },
  { naam: 'Akwa GGZ', type: 'Kwaliteitsorganisatie', land: 'NL', beschrijving: 'Organisatie die kwaliteitsontwikkeling in de ggz ondersteunt, relevant voor jeugd-GGZ kwaliteitsagenda.', datum: '', url: 'https://akwaggz.nl/', tags: ['GGZ', 'kwaliteit', 'praktijk', 'netwerken'], categorie: 'richtlijnen' },
  { naam: 'Zorgstandaard Integrale crisisjeugdzorg', type: 'Kwaliteitsstandaard', land: 'NL', beschrijving: 'Zorgstandaard met organisatorische samenwerkingsafspraken voor crisiszorg jeugd, inclusief integrale crisisdienst en duale beoordeling.', datum: '2025-09-23', url: 'https://akwaggz.nl/nieuw-zorgstandaard-integrale-crisisjeugdzorg/', tags: ['jeugd-GGZ', 'crisis', 'samenwerking', 'praktijk'], categorie: 'richtlijnen' },

  // ── Regio Zuid-Holland Zuid ─────────────────────────────────────────
  { naam: 'Serviceorganisatie Jeugd ZHZ', type: 'Regionale organisatie', land: 'NL', beschrijving: 'Regionale ingang voor informatie over gecontracteerde aanbieders, klachten/bezwaar en processen rond beschikkingen en toewijzingen.', datum: '', url: 'https://www.jeugdzhz.nl/', tags: ['regio', 'inkoop', 'toegang', 'praktijk'], categorie: 'regio' },
  { naam: 'Over SOJ', type: 'Regiopagina', land: 'NL', beschrijving: 'Uitleg over waarom de serviceorganisatie is opgericht en welke taken zij namens gemeenten uitvoert (inkoop, contractmanagement, informatievoorziening).', datum: '', url: 'https://www.jeugdzhz.nl/over-soj', tags: ['regio', 'governance', 'inkoop'], categorie: 'regio' },
  { naam: 'DGJ: SOJ ZHZ', type: 'Regiopagina', land: 'NL', beschrijving: 'Contextpagina binnen de Dienst Gezondheid en Jeugd over samenwerking van gemeenten in ZHZ en de regieorganisatie voor jeugdhulp.', datum: '', url: 'https://www.dienstgezondheidjeugd.nl/onze-diensten/soj-zhz', tags: ['regio', 'organisatie', 'beleid'], categorie: 'regio' },
  { naam: 'Gecontracteerde jeugdhulpaanbieders', type: 'Regiopagina', land: 'NL', beschrijving: 'Actuele lijst met regionaal gecontracteerde jeugdhulpaanbieders, nuttig als voorbeeld voor transparantie in contractering.', datum: '', url: 'https://www.jeugdzhz.nl/inkoop-2022-e-v/gecontracteerde-jeugdhulpaanbieders', tags: ['contractering', 'regio', 'markt'], categorie: 'regio' },
  { naam: 'Jeugdteams ZHZ', type: 'Toegang/uitvoering', land: 'NL', beschrijving: 'Overzicht van ondersteuning en hulp in de regio, als voorbeeld van de toegang en uitvoering dichtbij gezinnen.', datum: '', url: 'https://jeugdteamszhz.nl/dienstverlening/', tags: ['toegang', 'wijkteam', 'praktijk'], categorie: 'regio' },
  { naam: 'Veilig Thuis Zuid-Holland Zuid', type: 'Regionaal meldpunt', land: 'NL', beschrijving: 'Regionale variant van het advies- en meldpunt huiselijk geweld en kindermishandeling, met werkwijze en contactmogelijkheden.', datum: '', url: 'https://www.veiligthuiszuidhollandzuid.nl/over-ons/wie-zijn-wij', tags: ['veiligheid', 'kindermishandeling', 'regio'], categorie: 'regio' },
  { naam: 'Transformatieplan jeugdhulpregio ZHZ 2018-2020', type: 'Plan (PDF)', land: 'NL', beschrijving: 'Regionaal transformatieplan dat inzicht geeft in prioriteiten, werkwijzen en ontwikkelagenda in de jeugdhulpregio.', datum: '2018-09-27', url: 'https://vng.nl/sites/default/files/zuid_holland_zuid.pdf', tags: ['regio', 'transformatie', 'beleid'], categorie: 'regio' },
  { naam: 'Inkoopkader Jeugdhulp ZHZ 2018-2021', type: 'Beleidsdocument (PDF)', land: 'NL', beschrijving: 'Inkoopkader met uitgangspunten en inrichting van regionale inkoop en contractering (referentie voor inkoopmodellen).', datum: '2018', url: 'https://raad.dordrecht.nl/Documenten/Bijlage-Inkoopkader-SO-Jeugd-ZHZ-2018-2021.pdf', tags: ['inkoop', 'financiering', 'regio'], categorie: 'regio' },

  // ── Internationaal ─────────────────────────────────────────────────
  { naam: 'Adolescent mental health (WHO factsheet)', type: 'Factsheet', land: 'INT', beschrijving: 'Feitenkader over mentale gezondheid bij adolescenten, met kerncijfers, risico\u2019s en beschermende factoren voor beleid en preventie.', datum: '2025-09-01', url: 'https://www.who.int/news-room/fact-sheets/detail/adolescent-mental-health', tags: ['mentale gezondheid', 'preventie', 'internationaal'], categorie: 'internationaal' },
  { naam: 'Addressing child and adolescent mental health (WHO/Europe)', type: 'Programmapagina', land: 'INT', beschrijving: 'Activiteitenoverzicht van regionale ondersteuning aan landen om mentale gezondheid en welzijn van kinderen en jongeren te verbeteren.', datum: '', url: 'https://www.who.int/europe/activities/addressing-child-and-adolescent-mental-health', tags: ['beleid', 'preventie', 'internationaal'], categorie: 'internationaal' },
  { naam: 'Child and adolescent mental health policies and plans (WHO)', type: 'Handboek (PDF)', land: 'INT', beschrijving: 'Praktisch handboek over opstellen/actualiseren van jeugd-mentale-gezondheidsbeleid en implementatie via plannen.', datum: '', url: 'https://iris.who.int/bitstreams/f0d7d94f-42d5-4fcd-8cec-77b9295531a3/download', tags: ['beleid', 'implementatie', 'mentale gezondheid'], categorie: 'internationaal' },
  { naam: 'Convention on the Rights of the Child (UNICEF)', type: 'Verdragstekst', land: 'INT', beschrijving: 'Online tekst van het Kinderrechtenverdrag als normatief kader voor rechten, bescherming en participatie van kinderen.', datum: '', url: 'https://www.unicef.org/child-rights-convention/convention-text', tags: ['kinderrechten', 'internationaal', 'rechtskader'], categorie: 'internationaal' },
  { naam: 'Child Well-Being in an Unpredictable World (UNICEF Innocenti)', type: 'Rapportpagina', land: 'INT', beschrijving: 'Rapportage over kindwelzijn (o.a. mentale gezondheid) in hooginkomenslanden, bruikbaar voor internationale vergelijking.', datum: '2025-05-14', url: 'https://www.unicef.org/innocenti/reports/child-well-being-unpredictable-world', tags: ['evaluatie', 'welzijn', 'internationaal'], categorie: 'internationaal' },
  { naam: 'EU Strategy on the Rights of the Child', type: 'Beleidskader', land: 'EU', beschrijving: 'EU-brede beleidskaders en acties voor kinderrechten en toegang tot basisdiensten voor kwetsbare kinderen.', datum: '2021', url: 'https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/rights-child/eu-strategy-rights-child-and-european-child-guarantee_en', tags: ['kinderrechten', 'beleid', 'EU'], categorie: 'internationaal' },
  { naam: 'EU Strategy on the Rights of the Child (EUR-Lex)', type: 'Beleidsdocument', land: 'EU', beschrijving: 'Juridische publicatie van de Commissiecommunicatie als primaire bron voor doelstellingen en actielijnen.', datum: '2021', url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A52021DC0142', tags: ['kinderrechten', 'EU', 'beleid'], categorie: 'internationaal' },
  { naam: 'Child-friendly justice (Council of Europe)', type: 'Richtlijnpagina', land: 'EU', beschrijving: 'Overzicht van uitgangspunten en materialen rond kindvriendelijke rechtspraak en behandeling van kinderen in procedures.', datum: '', url: 'https://www.coe.int/en/web/children/child-friendly-justice', tags: ['kinderrechten', 'jeugdbescherming', 'recht'], categorie: 'internationaal' },
  { naam: 'Guidelines on child-friendly justice (PDF)', type: 'Richtlijn (PDF)', land: 'EU', beschrijving: 'Integrale richtlijnen (adoptie 2010) met principes als toegankelijkheid, leeftijdsadequaat en respect voor waardigheid.', datum: '2010-11-17', url: 'https://www.coe.int/t/dg3/children/pdf/CFJ_Guidelines_en.pdf', tags: ['recht', 'kinderrechten', 'EU'], categorie: 'internationaal' },
  { naam: 'OECD Child Well-being Dashboard', type: 'Dashboard', land: 'INT', beschrijving: 'Dashboard met internationaal vergelijkbare indicatoren voor kindwelzijn, inclusief contextindicatoren voor beleid.', datum: '', url: 'https://www.oecd.org/en/data/dashboards/oecd-child-well-being-dashboard.html', tags: ['data', 'internationaal', 'welzijn'], categorie: 'internationaal' },
  { naam: 'Promoting good mental health in children and young adults (OECD)', type: 'Rapport (PDF)', land: 'INT', beschrijving: 'Beleidsrapport met best practices om mentale gezondheid te bevorderen en problemen te voorkomen, gericht op jeugd.', datum: '2025', url: 'https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/04/promoting-good-mental-health-in-children-and-young-adults_5da8fc0f/ebb8aa47-en.pdf', tags: ['preventie', 'beleid', 'internationaal'], categorie: 'internationaal' },
  { naam: 'Depression in children and young people (NICE NG134)', type: 'Klinische richtlijn', land: 'UK', beschrijving: 'Evidence-based richtlijn voor signalering en behandeling van depressie bij kinderen en jongeren.', datum: '2019-06-25', url: 'https://www.nice.org.uk/guidance/ng134', tags: ['GGZ', 'richtlijn', 'jeugd'], categorie: 'internationaal' },
  { naam: 'Self-harm: assessment, management and preventing recurrence (NICE NG225)', type: 'Klinische richtlijn', land: 'UK', beschrijving: 'Richtlijn over beoordeling en behandeling van zelfbeschadiging, toepasbaar in zorg en sociale sectoren.', datum: '2022-09-07', url: 'https://www.nice.org.uk/guidance/ng225', tags: ['GGZ', 'crisis', 'richtlijn'], categorie: 'internationaal' },
  { naam: 'Children and young people\u2019s mental health care (CQC State of Care)', type: 'Toezichtrapportage', land: 'UK', beschrijving: 'Toezichtsduiding over toegang en kwaliteit van mentale zorg voor kinderen en jongeren als voorbeeld van publieke verantwoording.', datum: '2024', url: 'https://www.cqc.org.uk/publications/major-report/state-care/2023-2024/areas-of-concern/cyp', tags: ['toezicht', 'GGZ', 'evaluatie'], categorie: 'internationaal' },
  { naam: 'Child protection (AIHW reports)', type: 'Dataportaal', land: 'AU', beschrijving: 'Portaal met rapportages en indicatoren over child protection en out-of-home care, nuttig voor benchmarking.', datum: '2025-06-25', url: 'https://www.aihw.gov.au/reports-data/health-welfare-services/child-protection/reports', tags: ['jeugdbescherming', 'data', 'internationaal'], categorie: 'internationaal' },
  { naam: 'Find resources (Child Welfare Information Gateway)', type: 'Portal', land: 'US', beschrijving: 'Zoekportaal met betrouwbare publicaties, tools en trainingsmaterialen over child welfare, preventie en youth well-being.', datum: '', url: 'https://www.childwelfare.gov/find-resources/', tags: ['jeugdbescherming', 'praktijk', 'internationaal'], categorie: 'internationaal' },
  { naam: 'Mental health: children and families (SAMHSA)', type: 'Resourcepagina', land: 'US', beschrijving: 'Ingang met programma\u2019s en evidence-informed resources voor jeugd en gezinnen als voorbeeld van publieke bundeling van hulpbronnen.', datum: '', url: 'https://www.samhsa.gov/mental-health/children-and-families', tags: ['GGZ', 'preventie', 'resources'], categorie: 'internationaal' },
  { naam: 'Social care common inspection framework (SCCIF)', type: 'Inspectiekader', land: 'UK', beschrijving: 'Overheidsdocument over hoe sociale zorgvoorzieningen voor kinderen worden ge\u00efnspecteerd, met focus op impact op leven en ontwikkeling.', datum: '2025-04-04', url: 'https://www.gov.uk/government/publications/social-care-common-inspection-framework-sccif-childrens-homes/social-care-common-inspection-framework-sccif-childrens-homes', tags: ['toezicht', 'kwaliteit', 'jeugdzorg'], categorie: 'internationaal' },
];

// Collect all unique tags
const allTags = Array.from(new Set(bronnen.flatMap((b) => b.tags))).sort();

// Land labels
const landLabels: Record<string, string> = {
  NL: 'Nederland',
  INT: 'Internationaal',
  EU: 'Europese Unie',
  UK: 'Verenigd Koninkrijk',
  US: 'Verenigde Staten',
  AU: 'Australi\u00eb',
};

/* ------------------------------------------------------------------ */
/*  DATE FORMAT HELPER                                                 */
/* ------------------------------------------------------------------ */

function formatDatum(d: string): string {
  if (!d) return '';
  // Full ISO date: YYYY-MM-DD → DD-MM-YYYY
  const iso = d.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) return `${iso[3]}-${iso[2]}-${iso[1]}`;
  // Year only: keep as-is
  return d;
}

/* ------------------------------------------------------------------ */
/*  TAG COLOR HELPER                                                   */
/* ------------------------------------------------------------------ */

const tagColorMap: Record<string, string> = {
  beleid: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
  wetgeving: 'bg-slate-50 text-slate-700 ring-slate-200',
  toezicht: 'bg-amber-50 text-amber-700 ring-amber-200',
  kwaliteit: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  GGZ: 'bg-sky-50 text-sky-700 ring-sky-200',
  'jeugd-GGZ': 'bg-sky-50 text-sky-700 ring-sky-200',
  data: 'bg-teal-50 text-teal-700 ring-teal-200',
  evaluatie: 'bg-violet-50 text-violet-700 ring-violet-200',
  regio: 'bg-rose-50 text-rose-700 ring-rose-200',
  internationaal: 'bg-cyan-50 text-cyan-700 ring-cyan-200',
  praktijk: 'bg-orange-50 text-orange-700 ring-orange-200',
  preventie: 'bg-lime-50 text-lime-700 ring-lime-200',
  samenwerking: 'bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200',
  richtlijnen: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  kinderrechten: 'bg-pink-50 text-pink-700 ring-pink-200',
};

function tagColor(tag: string) {
  return tagColorMap[tag] || 'bg-gray-50 text-gray-600 ring-gray-200';
}

/* ------------------------------------------------------------------ */
/*  PAGE COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function BronnenPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategorie, setActiveCategorie] = useState<string>('all');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(categorieen.map((c) => c.id))
  );

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    return bronnen.filter((b) => {
      const matchesCat = activeCategorie === 'all' || b.categorie === activeCategorie;
      const matchesTags =
        activeTags.length === 0 || activeTags.some((t) => b.tags.includes(t));
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        q === '' ||
        b.naam.toLowerCase().includes(q) ||
        b.beschrijving.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q)) ||
        b.type.toLowerCase().includes(q);
      return matchesCat && matchesTags && matchesSearch;
    });
  }, [searchQuery, activeCategorie, activeTags]);

  const groupedByCategorie = useMemo(() => {
    const map = new Map<string, Bron[]>();
    for (const c of categorieen) map.set(c.id, []);
    for (const b of filtered) {
      const arr = map.get(b.categorie);
      if (arr) arr.push(b);
    }
    return map;
  }, [filtered]);

  const totalShown = filtered.length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 p-8 sm:p-10 text-white mb-8">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary-600 opacity-30 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-6 w-6 text-primary-200" />
            <span className="text-sm font-semibold uppercase tracking-widest text-primary-200">
              Kwaliteit als Medicijn
            </span>
          </div>
          <h1 className="text-2xl font-bold sm:text-3xl">Bronnenwijzer</h1>
          <p className="mt-2 text-primary-100 max-w-2xl">
            Overzicht van wet- en regelgeving, toezichtkaders, data, onderzoek,
            richtlijnen en internationale inspiratie rond jeugdzorg en jeugd-GGZ.
            Zoek, filter op categorie of klik op een tag om verwante bronnen te vinden.
          </p>
          <div className="flex flex-wrap gap-3 mt-5 text-sm">
            <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 font-medium">
              <BookOpen size={14} /> {bronnen.length} bronnen
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 font-medium">
              <TagIcon size={14} /> {allTags.length} tags
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 font-medium">
              <Filter size={14} /> {categorieen.length} categorie&euml;n
            </span>
          </div>
        </div>
      </div>

      {/* ── Search + filters ───────────────────────────────────────── */}
      <div className="space-y-4 mb-8">
        {/* Search */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Zoek op titel, beschrijving, tag of type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-12 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setActiveCategorie('all')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activeCategorie === 'all'
                ? 'bg-primary-700 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-primary-700'
            }`}
          >
            Alle categorie&euml;n
          </button>
          {categorieen.map((c) => {
            const Icon = c.icon;
            const count = bronnen.filter((b) => b.categorie === c.id).length;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCategorie(activeCategorie === c.id ? 'all' : c.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCategorie === c.id
                    ? 'bg-primary-700 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-primary-700'
                }`}
              >
                <Icon size={14} />
                {c.label}
                <span className={`ml-0.5 text-xs ${activeCategorie === c.id ? 'text-primary-200' : 'text-gray-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tag pills */}
        {activeTags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Actieve tags:</span>
            {activeTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium bg-primary-100 text-primary-700 ring-1 ring-inset ring-primary-200 hover:bg-primary-200 transition-colors"
              >
                {tag}
                <X size={12} />
              </button>
            ))}
            <button
              type="button"
              onClick={() => setActiveTags([])}
              className="text-xs text-gray-400 hover:text-gray-600 underline"
            >
              Wis alles
            </button>
          </div>
        )}

        {/* Results count */}
        <p className="text-sm text-gray-500">
          {totalShown} van {bronnen.length} bronnen
          {searchQuery && <> voor &ldquo;{searchQuery}&rdquo;</>}
        </p>
      </div>

      {/* ── Grouped results ────────────────────────────────────────── */}
      <div className="space-y-6">
        {categorieen.map((cat) => {
          const items = groupedByCategorie.get(cat.id) || [];
          if (items.length === 0 && activeCategorie !== 'all' && activeCategorie !== cat.id) return null;
          if (items.length === 0 && activeCategorie === cat.id) {
            return (
              <div key={cat.id} className="rounded-2xl border border-gray-100 bg-white shadow-sm p-8 text-center">
                <p className="text-gray-400 text-sm">Geen bronnen gevonden in deze categorie voor de huidige zoekopdracht.</p>
              </div>
            );
          }
          if (items.length === 0) return null;

          const Icon = cat.icon;
          const isExpanded = expandedCategories.has(cat.id);

          return (
            <div key={cat.id} className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              {/* Category header */}
              <button
                type="button"
                onClick={() => toggleCategory(cat.id)}
                className="w-full flex items-center justify-between px-6 py-4 bg-gray-50/80 hover:bg-gray-100/80 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${cat.color}`}>
                    <Icon size={18} />
                  </span>
                  <div>
                    <h2 className="font-bold text-gray-900">{cat.label}</h2>
                    <p className="text-xs text-gray-500">{items.length} bron{items.length !== 1 ? 'nen' : ''}</p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp size={18} className="text-gray-400" />
                ) : (
                  <ChevronDown size={18} className="text-gray-400" />
                )}
              </button>

              {/* Items */}
              {isExpanded && (
                <div className="divide-y divide-gray-100">
                  {items.map((b, idx) => (
                    <div
                      key={`${b.categorie}-${idx}`}
                      className="px-6 py-4 hover:bg-gray-50/50 transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <a
                              href={b.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-gray-900 hover:text-primary-700 transition-colors inline-flex items-center gap-1.5 group/link"
                            >
                              {b.naam}
                              <ExternalLink size={13} className="text-gray-300 group-hover/link:text-primary-500 transition-colors shrink-0" />
                            </a>
                            <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500">
                              {b.type}
                            </span>
                            <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500">
                              {landLabels[b.land] || b.land}
                            </span>
                            {b.datum && (
                              <span className="text-[11px] text-gray-400">{formatDatum(b.datum)}</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed mb-2">{b.beschrijving}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {b.tags.map((tag) => (
                              <button
                                key={tag}
                                type="button"
                                onClick={() => toggleTag(tag)}
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ring-inset cursor-pointer hover:opacity-80 transition-opacity ${
                                  activeTags.includes(tag)
                                    ? 'bg-primary-100 text-primary-700 ring-primary-300'
                                    : tagColor(tag)
                                }`}
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {totalShown === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
            <Search size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">Geen bronnen gevonden</p>
            <p className="text-sm text-gray-400 mt-1">Probeer een andere zoekterm of pas je filters aan.</p>
          </div>
        )}
      </div>

      {/* ── Footer note ────────────────────────────────────────────── */}
      <div className="mt-12 rounded-xl bg-gray-50 border border-gray-100 p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Over deze bronnenwijzer</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          Deze bronnenwijzer bundelt primaire, goed vindbare verwijzingen voor jeugdzorg
          en jeugd-GGZ. De kernbronnen komen uit Rijksoverheid en Wetten.nl (wet- en beleidskaders),
          IGJ en NZa (toezicht en regulering), CBS (cijfers en dashboards), en NJi, ZonMw en SCP
          (kennis en evaluaties). Opvallende recente aanknopingspunten zijn de Hervormingsagenda
          Jeugd 2023-2028, ontwikkelingen rond gesloten jeugdhulp, en de verschuiving van taken
          rond beschikbaarheid richting de NZa per 2026.
        </p>
      </div>
    </div>
  );
}
