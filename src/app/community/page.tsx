'use client';

import { useState } from 'react';
import {
  Mail,
  User,
  MessageSquare,
  ThumbsUp,
  Clock,
  ChevronDown,
  ChevronUp,
  Users,
  Tag,
  MessageCircle,
  Eye,
  Pin,
} from 'lucide-react';
import { communityMembers } from '@/data/community';
import { themes } from '@/data/themes';
import { Tag as TagComponent } from '@/components/ui/Tag';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const forumTopics = [
  {
    id: 1,
    titel: 'Ervaringen met overbruggingszorg tijdens wachtlijst?',
    auteur: { naam: 'Demo-gebruiker: Marieke V.', organisatie: 'GGZ-instelling regio Utrecht', isDemo: true },
    categorie: 'Initiatieven',
    datum: '14 feb 2026',
    reacties: 7,
    views: 42,
    pinned: true,
    laatsteReactie: 'Demo-gebruiker: Sophie J.',
    preview:
      'Wij overwegen om een overbruggingstraject op te zetten vergelijkbaar met wat De Hoop doet. Heeft iemand ervaring met het opzetten hiervan? Met name benieuwd naar de participatiegraad en hoe jullie omgaan met...',
    antwoorden: [
      {
        auteur: { naam: 'Demo-gebruiker: Ahmed H.', organisatie: 'Jeugdzorginstelling ZHZ', isDemo: true },
        datum: '14 feb 2026',
        tekst: 'Wij zijn hier vorig jaar mee gestart. De participatiegraad was aanvankelijk rond de 60%, maar door het voorwaardelijk te maken voor de intake is dat gestegen naar ~85%. Belangrijk is om de e-modules niet te zwaar te maken.',
        likes: 5,
      },
      {
        auteur: { naam: 'Demo-gebruiker: Linda D.', organisatie: 'Gemeente', isDemo: true },
        datum: '14 feb 2026',
        tekst: 'Vanuit de gemeente zien wij hier veel potentie in. Belangrijk aandachtspunt is wel de contractering: zorg dat het overbruggingsproduct goed in het productenboek past. Wij liepen daar aanvankelijk tegenaan.',
        likes: 3,
      },
      {
        auteur: { naam: 'Demo-gebruiker: Sophie J.', organisatie: 'De Fjord', isDemo: true },
        datum: '14 feb 2026',
        tekst: 'Bij ons draaien we nu een pilot met een online psycho-educatiemodule van 6 weken. De feedback van gezinnen is overwegend positief: ze voelen zich al gehoord en hebben al handvatten voordat de behandeling start.',
        likes: 7,
      },
      {
        auteur: { naam: 'Demo-gebruiker: Peter S.', organisatie: 'Compass GGZ', isDemo: true },
        datum: '15 feb 2026',
        tekst: 'Wij combineren overbruggingszorg met groepsbegeleiding. Twee vliegen in een klap: jongeren wachten niet passief en ze leren al van elkaars ervaringen. Gemiddeld 4 sessies voordat de individuele behandeling start.',
        likes: 4,
      },
      {
        auteur: { naam: 'Demo-gebruiker: Fatima K.', organisatie: 'Praktijk Herstelweg', isDemo: true },
        datum: '15 feb 2026',
        tekst: 'Belangrijk om ook de ouders mee te nemen in het overbruggingstraject. Wij bieden een aparte oudermodule aan met praktische opvoedtips. Dat verlaagt de druk op het gezin en voorkomt escalatie tijdens de wachtperiode.',
        likes: 6,
      },
      {
        auteur: { naam: 'Demo-gebruiker: Joris M.', organisatie: 'Huisartsenpraktijk Centraal', isDemo: true },
        datum: '15 feb 2026',
        tekst: 'Als huisarts merk ik dat overbruggingszorg het aantal "tussentijdse" consulten flink vermindert. Gezinnen voelen zich minder verloren en bellen minder vaak met de vraag "wanneer begint het nu eindelijk?".',
        likes: 3,
      },
      {
        auteur: { naam: 'Demo-gebruiker: Marieke V.', organisatie: 'GGZ-instelling regio Utrecht', isDemo: true },
        datum: '16 feb 2026',
        tekst: 'Bedankt voor alle reacties! Heel waardevol. We gaan de pilot vormgeven met een combinatie van e-modules en groepsbijeenkomsten. De tip over de oudermodule nemen we zeker mee. Ik hou jullie op de hoogte van de resultaten.',
        likes: 8,
      },
    ],
  },
  {
    id: 2,
    titel: 'Kracht van Kort: hoe institutionaliseer je dit bij je organisatie?',
    auteur: { naam: 'Demo-gebruiker: Peter S.', organisatie: 'GGZ-aanbieder Drechtsteden', isDemo: true },
    categorie: 'Werkwijzen',
    datum: '12 feb 2026',
    reacties: 6,
    views: 31,
    pinned: false,
    laatsteReactie: 'Demo-gebruiker: Marieke V.',
    preview:
      'We hebben onze behandelaren opgeleid in Kracht van Kort, maar merken dat het in de praktijk lastig is om de werkwijze vast te houden. Hoe pakken andere organisaties dit aan? Gebruiken jullie spiegelinformatie?',
    antwoorden: [
      {
        auteur: { naam: 'Demo-gebruiker: Sophie J.', organisatie: 'GGZ-instelling ZHZ', isDemo: true },
        datum: '13 feb 2026',
        tekst: 'Bij ons heeft het geholpen om in het MDO (multidisciplinair overleg) structureel een "client review" te doen: voor elke client boven de 9 maanden behandelduur bespreken we of afronding passend is. Dit vergt discipline maar werkt goed.',
        likes: 8,
      },
      {
        auteur: { naam: 'Demo-gebruiker: Ahmed H.', organisatie: 'Jeugdzorginstelling ZHZ', isDemo: true },
        datum: '13 feb 2026',
        tekst: 'Spiegelinformatie is cruciaal. Wij delen maandelijks een dashboard met per behandelaar de gemiddelde behandelduur, uitstroom en ROM-scores. Niet om af te rekenen, maar om bewustwording te creeren.',
        likes: 5,
      },
      {
        auteur: { naam: 'Demo-gebruiker: Linda D.', organisatie: 'Gemeente Dordrecht', isDemo: true },
        datum: '13 feb 2026',
        tekst: 'Vanuit de gemeente stimuleren we dit door in de contractering een "bonus" op te nemen voor aanbieders die aantoonbaar korter behandelen zonder kwaliteitsverlies. Dat geeft een financiele prikkel.',
        likes: 4,
      },
      {
        auteur: { naam: 'Demo-gebruiker: Marieke V.', organisatie: 'GGZ-instelling regio Utrecht', isDemo: true },
        datum: '14 feb 2026',
        tekst: 'Wij hebben een "Kracht van Kort-ambassadeur" per team aangesteld. Die houdt het onderwerp levend in de waan van de dag en organiseert intervisie rond casuistiek waar de behandeling langer duurt dan gepland.',
        likes: 6,
      },
      {
        auteur: { naam: 'Demo-gebruiker: Fatima K.', organisatie: 'Praktijk Herstelweg', isDemo: true },
        datum: '14 feb 2026',
        tekst: 'Een concreet hulpmiddel: wij werken met een "behandelcontract" waarin samen met de client het verwachte aantal sessies wordt afgesproken. Dat helpt zowel de behandelaar als de client om gefocust te blijven.',
        likes: 3,
      },
      {
        auteur: { naam: 'Demo-gebruiker: Peter S.', organisatie: 'GGZ-aanbieder Drechtsteden', isDemo: true },
        datum: '15 feb 2026',
        tekst: 'Geweldige suggesties, dank jullie wel! Het dashboard-idee en de ambassadeursrol gaan we zeker oppakken. We plannen een implementatiesessie volgende maand.',
        likes: 2,
      },
    ],
  },
  {
    id: 3,
    titel: 'Gezinsgerichte aanpak: hoe betrek je huisartsen?',
    auteur: { naam: 'Demo-gebruiker: Linda D.', organisatie: 'Gemeente Dordrecht', isDemo: true },
    categorie: 'Samenwerking',
    datum: '10 feb 2026',
    reacties: 5,
    views: 28,
    pinned: false,
    laatsteReactie: 'Demo-gebruiker: Ahmed H.',
    preview:
      'Vanuit de FamilySupporters-aanpak willen we de huisartsen meenemen in het gezinsgerichte denken. Maar huisartsen hebben beperkt tijd en overzicht. Hoe communiceren jullie met de eerste lijn over dit soort initiatieven?',
    antwoorden: [
      {
        auteur: { naam: 'Demo-gebruiker: Peter S.', organisatie: 'GGZ-aanbieder', isDemo: true },
        datum: '11 feb 2026',
        tekst: 'Wij hebben een "verwijskaart" gemaakt voor huisartsen met per type problematiek de aanbevolen route. Korte, visuele kaart die ze in hun spreekkamer kunnen ophangen. Is goed ontvangen bij de huisartsengroep in onze regio.',
        likes: 6,
      },
      {
        auteur: { naam: 'Demo-gebruiker: Sophie J.', organisatie: 'De Fjord', isDemo: true },
        datum: '11 feb 2026',
        tekst: 'Wij hebben een maandelijks consultatie-uur ingericht waar huisartsen laagdrempelig kunnen bellen met vragen over jeugd-GGZ. Kost ons 4 uur per maand maar scheelt enorm veel onnodige verwijzingen.',
        likes: 7,
      },
      {
        auteur: { naam: 'Demo-gebruiker: Ahmed H.', organisatie: 'Jeugdzorginstelling ZHZ', isDemo: true },
        datum: '12 feb 2026',
        tekst: 'Tip: sluit aan bij de bestaande scholingsbijeenkomsten van huisartsengroepen (HAGRO). Dan hoef je geen apart moment te organiseren en bereik je ze in hun vertrouwde setting.',
        likes: 5,
      },
      {
        auteur: { naam: 'Demo-gebruiker: Joris M.', organisatie: 'Huisartsenpraktijk Centraal', isDemo: true },
        datum: '12 feb 2026',
        tekst: 'Als huisarts waardeer ik het enorm als GGZ-instellingen proactief contact zoeken. Een kort telefoontje na een verwijzing maakt al veel verschil. De verwijskaart-suggestie is ook top, dat gebruiken we al voor somatiek.',
        likes: 4,
      },
      {
        auteur: { naam: 'Demo-gebruiker: Linda D.', organisatie: 'Gemeente Dordrecht', isDemo: true },
        datum: '13 feb 2026',
        tekst: 'Super input allemaal! We gaan de verwijskaart ontwikkelen samen met de huisartsenkoepel en het consultatie-uur voorstellen bij onze gecontracteerde aanbieders. Dit is precies de samenwerking die we zoeken.',
        likes: 3,
      },
    ],
  },
  {
    id: 4,
    titel: 'Brede intake: ervaringen met ervaringsdeskundigen in het intakeproces?',
    auteur: { naam: 'Demo-gebruiker: Sophie J.', organisatie: 'Parnassia-achtig model', isDemo: true },
    categorie: 'Initiatieven',
    datum: '8 feb 2026',
    reacties: 6,
    views: 37,
    pinned: false,
    laatsteReactie: 'Demo-gebruiker: Marieke V.',
    preview:
      'We zijn bezig met het opzetten van een brede intake waarbij we naast een GGZ-professional ook een ervaringsdeskundige inzetten. Hoe selecteren jullie ervaringsdeskundigen en hoe borgen jullie de kwaliteit?',
    antwoorden: [
      {
        auteur: { naam: 'Demo-gebruiker: Ahmed H.', organisatie: 'Jeugdzorginstelling', isDemo: true },
        datum: '9 feb 2026',
        tekst: 'Bij Mentiek (GGZ 18+) doen ze dit al: een verkennend gesprek met een GGZ-professional, welzijnsmedewerker EN ervaringsdeskundige. De ervaringsdeskundigen zijn opgeleid via een geaccrediteerd programma. Het helpt enorm bij het normaliseren van de hulpvraag.',
        likes: 4,
      },
      {
        auteur: { naam: 'Demo-gebruiker: Marieke V.', organisatie: 'GGZ-instelling regio Utrecht', isDemo: true },
        datum: '9 feb 2026',
        tekst: 'Wij werken sinds kort met ervaringsdeskundigen in de intake. Belangrijk leerpunt: investeer in goede intervisie voor de ervaringsdeskundigen. Ze komen soms dicht bij hun eigen verhaal en dat vraagt begeleiding.',
        likes: 6,
      },
      {
        auteur: { naam: 'Demo-gebruiker: Peter S.', organisatie: 'Compass GGZ', isDemo: true },
        datum: '10 feb 2026',
        tekst: 'De meerwaarde zit hem vooral in het eerste contact. Jongeren en ouders voelen zich sneller begrepen als iemand "het zelf heeft meegemaakt". Dat verlaagt de drempel en verhoogt de motivatie voor behandeling.',
        likes: 5,
      },
      {
        auteur: { naam: 'Demo-gebruiker: Fatima K.', organisatie: 'Praktijk Herstelweg', isDemo: true },
        datum: '10 feb 2026',
        tekst: 'Let op de juridische kant: ervaringsdeskundigen moeten werken binnen de kaders van de Wkkgz. Zorg dat je een goed protocol hebt voor dossiervorming en informatiedeling. We hebben hier een template voor, DM me als je interesse hebt.',
        likes: 3,
      },
      {
        auteur: { naam: 'Demo-gebruiker: Linda D.', organisatie: 'Gemeente Dordrecht', isDemo: true },
        datum: '11 feb 2026',
        tekst: 'Vanuit de gemeente juichen we dit toe. Het past helemaal in de transformatiegedachte. We overwegen om een apart tarief op te nemen in het productenboek voor intakes met ervaringsdeskundigen.',
        likes: 4,
      },
      {
        auteur: { naam: 'Demo-gebruiker: Sophie J.', organisatie: 'Parnassia-achtig model', isDemo: true },
        datum: '12 feb 2026',
        tekst: 'Dank voor alle waardevolle reacties! Het template van Fatima ga ik zeker opvragen. We starten volgende maand met een pilot van 3 maanden en evalueren dan de ervaringen.',
        likes: 2,
      },
    ],
  },
  {
    id: 5,
    titel: 'Wie kent goede voorbeelden van groepsbegeleiding voor jeugdigen?',
    auteur: { naam: 'Demo-gebruiker: Ahmed H.', organisatie: 'Jeugdzorginstelling ZHZ', isDemo: true },
    categorie: 'Kennisdeling',
    datum: '5 feb 2026',
    reacties: 5,
    views: 19,
    pinned: false,
    laatsteReactie: 'Demo-gebruiker: Peter S.',
    preview:
      'CareHouse werkt met groepsbegeleiding (1 op 4) als aanvulling op individuele behandeling. Zijn er meer organisaties die hiermee werken? Benieuwd naar ervaringen met het samenstellen van groepen.',
    antwoorden: [
      {
        auteur: { naam: 'Demo-gebruiker: Linda D.', organisatie: 'Gemeente', isDemo: true },
        datum: '6 feb 2026',
        tekst: 'In Veendam wordt dit ook gedaan via het Jeugdexpertise Punt (JEP). Daar worden groepen samengesteld op basis van leeftijd en problematiek. Het mooie is dat jongeren van elkaar leren en het minder "medisch" voelt.',
        likes: 3,
      },
      {
        auteur: { naam: 'Demo-gebruiker: Sophie J.', organisatie: 'De Fjord', isDemo: true },
        datum: '6 feb 2026',
        tekst: 'Wij draaien groepen van maximaal 6 jongeren met vergelijkbare thematiek. De groepsdynamiek is krachtig: jongeren herkennen zich in elkaars verhaal en durven meer te delen dan in individuele sessies.',
        likes: 5,
      },
      {
        auteur: { naam: 'Demo-gebruiker: Marieke V.', organisatie: 'GGZ-instelling regio Utrecht', isDemo: true },
        datum: '7 feb 2026',
        tekst: 'Praktische tip: begin met een "kennismakingsbijeenkomst" voordat de groep echt start. Dan kunnen jongeren alvast wennen aan de groepssetting en kun je zien of de samenstelling klopt. Scheelt dropouts later.',
        likes: 4,
      },
      {
        auteur: { naam: 'Demo-gebruiker: Fatima K.', organisatie: 'Praktijk Herstelweg', isDemo: true },
        datum: '7 feb 2026',
        tekst: 'Wij combineren groepsbegeleiding met creatieve therapie. Jongeren maken samen een podcast of video over hun ervaringen. Het geeft ze een stem en de output helpt weer bij het normaliseren voor andere jongeren.',
        likes: 6,
      },
      {
        auteur: { naam: 'Demo-gebruiker: Peter S.', organisatie: 'Compass GGZ', isDemo: true },
        datum: '8 feb 2026',
        tekst: 'Kosteneffectiviteit is ook een argument richting financiers: groepsbegeleiding kost per jongere significant minder dan individueel, terwijl de uitkomsten vergelijkbaar of soms zelfs beter zijn. Win-win.',
        likes: 4,
      },
    ],
  },
];

const categorieKleuren: Record<string, string> = {
  Initiatieven: 'bg-sky-100 text-sky-700',
  Werkwijzen: 'bg-amber-100 text-amber-700',
  Samenwerking: 'bg-teal-100 text-teal-700',
  Kennisdeling: 'bg-violet-100 text-violet-700',
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CommunityPage() {
  const [expandedTopics, setExpandedTopics] = useState<Record<number, boolean>>({});

  const toggleTopic = (id: number) => {
    setExpandedTopics((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const PREVIEW_COUNT = 2;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Community &amp; Forum</h1>
          <p className="mt-2 text-gray-500 max-w-2xl">
            Stel vragen aan collega-professionals, deel je ervaringen met initiatieven, en leer van
            wat er in andere regio&apos;s gebeurt. Samen bouwen we aan passende jeugdzorg.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition shrink-0">
          <MessageSquare className="h-4 w-4" />
          Nieuwe vraag stellen
        </button>
      </div>

      {/* Demo notice */}
      <div className="mt-8 rounded-xl bg-amber-50 border border-amber-200 p-4">
        <p className="text-sm text-amber-800">
          <strong>Let op:</strong> Dit forum bevat momenteel demonstratie-inhoud met fictieve gebruikers.
          Alle namen en berichten zijn ter illustratie van de beoogde functionaliteit. In de definitieve versie
          kunnen echte professionals hier vragen stellen en ervaringen delen.
        </p>
      </div>

      {/* Stats bar */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Onderwerpen', value: forumTopics.length, icon: MessageSquare },
          { label: 'Reacties totaal', value: forumTopics.reduce((sum, t) => sum + t.reacties, 0), icon: MessageCircle },
          { label: 'Categorieen', value: Object.keys(categorieKleuren).length, icon: Tag },
          { label: 'Demo-deelnemers', value: 7, icon: Users },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl bg-surface-50 border border-surface-200 p-4 text-center">
            <stat.icon className="mx-auto h-5 w-5 text-primary-500" />
            <p className="mt-1 text-xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ============================================================ */}
      {/*  Forum topics                                                 */}
      {/* ============================================================ */}
      <div className="mt-10">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary-600" />
          Recente discussies
        </h2>

        <div className="mt-4 space-y-4">
          {forumTopics.map((topic) => {
            const isExpanded = !!expandedTopics[topic.id];
            const visibleAntwoorden = isExpanded
              ? topic.antwoorden
              : topic.antwoorden.slice(0, PREVIEW_COUNT);
            const hasMore = topic.antwoorden.length > PREVIEW_COUNT;

            return (
              <div
                key={topic.id}
                className="rounded-xl border border-surface-200 bg-white hover:border-primary-200 transition-colors"
              >
                {/* Topic header - clickable */}
                <button
                  type="button"
                  onClick={() => toggleTopic(topic.id)}
                  className="w-full text-left p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset rounded-t-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        {topic.pinned && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-semibold text-primary-700">
                            <Pin className="h-3 w-3" /> Vastgezet
                          </span>
                        )}
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${categorieKleuren[topic.categorie] || 'bg-gray-100 text-gray-700'}`}
                        >
                          {topic.categorie}
                        </span>
                      </div>
                      <h3 className="mt-1 text-base font-semibold text-foreground group-hover:text-primary-700 flex items-center gap-2">
                        {topic.titel}
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 shrink-0 text-primary-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />
                        )}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">{topic.preview}</p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
                        <span>{topic.auteur.naam}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {topic.datum}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" /> {topic.antwoorden.length} reacties
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" /> {topic.views} views
                        </span>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Answers */}
                {visibleAntwoorden.length > 0 && (
                  <div className="border-t border-surface-100 bg-surface-50/50 p-5 space-y-4 rounded-b-xl">
                    {visibleAntwoorden.map((antwoord, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 animate-in fade-in"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-200 text-gray-500">
                          <User className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span className="font-medium text-gray-600">{antwoord.auteur.naam}</span>
                            <span>&middot;</span>
                            <span>{antwoord.auteur.organisatie}</span>
                            <span>&middot;</span>
                            <span>{antwoord.datum}</span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600 leading-relaxed">{antwoord.tekst}</p>
                          <div className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                            <ThumbsUp className="h-3 w-3" /> {antwoord.likes}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Toggle button */}
                    {hasMore && (
                      <button
                        type="button"
                        onClick={() => toggleTopic(topic.id)}
                        className="inline-flex items-center gap-1.5 text-xs text-primary-600 font-medium hover:text-primary-700 hover:underline transition-colors cursor-pointer pt-1"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="h-3.5 w-3.5" />
                            Toon minder reacties
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3.5 w-3.5" />
                            Bekijk alle {topic.antwoorden.length} reacties
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Professionals directory                                      */}
      {/* ============================================================ */}
      <div id="professionals" className="mt-16 scroll-mt-20">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Users className="h-5 w-5 text-primary-600" />
          Professionals in de regio
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Vind collega-professionals, deel kennis en werk samen aan nieuwe initiatieven.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {communityMembers.map((member) => {
            const memberThemes = member.expertise
              .map((s) => themes.find((t) => t.slug === s))
              .filter(Boolean);

            return (
              <div
                key={member.id}
                className="flex flex-col rounded-xl border border-surface-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{member.naam}</h3>
                    <p className="text-sm text-gray-500">{member.functie}</p>
                    <p className="text-xs text-gray-400">{member.organisatie}</p>
                  </div>
                </div>

                <p className="mt-3 text-sm text-gray-600 line-clamp-3">{member.bio}</p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {memberThemes.map((theme) =>
                    theme ? <TagComponent key={theme.slug} label={theme.label} color={theme.color} /> : null
                  )}
                </div>

                <div className="mt-3">
                  <p className="text-xs text-gray-400">Beschikbaar voor:</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {member.beschikbaarVoor.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-surface-100 px-2 py-0.5 text-xs text-gray-600"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-surface-100">
                  <a
                    href={`mailto:${member.id}@mycareteam.nl`}
                    className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Neem contact op
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
