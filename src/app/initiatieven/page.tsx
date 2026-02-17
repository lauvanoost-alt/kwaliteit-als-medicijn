import type { Metadata } from 'next';
import Link from 'next/link';
import {
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  Shield,
  Calculator,
  ArrowLeft,
  Sparkles,
  BookOpen,
  ExternalLink,
  Footprints,
} from 'lucide-react';
import { CumulativeSavingsChart } from '@/components/CumulativeSavingsChart';

export const metadata: Metadata = {
  title: 'Initiatieven',
  description:
    'Overzicht van de vijf initiatieven gericht op volume-reductie en passendere jeugd-GGZ in Zuid-Holland Zuid.',
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface LiteratuurRef {
  tekst: string;
  bron: string;
  url?: string;
}

interface Initiatief {
  titel: string;
  aanbieder: string;
  color: string;
  besparing: string;
  probleem: string;
  aanpak: string;
  resultaat: string;
  randvoorwaarden: string;
  businessCase: string;
  clientPadFase: string;
  literatuur?: LiteratuurRef[];
}

const initiatieven: Initiatief[] = [
  {
    titel: 'Overbruggingszorg in de SGGZ',
    aanbieder: 'De Hoop',
    color: 'sky',
    besparing: '~11% volumereductie, ca. \u20AC2,0 mln besparing',
    probleem:
      'Jongeren die doorverwezen worden naar de GGZ staan lang op de wachtlijst. Gedurende die periode \u201Cwachten\u201D jongeren letterlijk: er vindt geen begeleiding plaats bij de klachten waarvoor verwezen is en de verwachting van de behandeling neemt toe. Dit leidt tot verergering van klachten, toenemende zorgbehoefte en hogere kosten wanneer de behandeling uiteindelijk start. Ouders en gezinnen voelen zich in deze periode vaak machteloos.',
    aanpak:
      'Inzet van een overbruggingstraject gedurende de wachttijd bestaande uit triage, e-health modules (Life Skills), groepssessies, en een eindgesprek. Het doel is drieledig: (1) jongeren zelf al aan de slag laten gaan met hun klachten, (2) gedrag normaliseren en het zelfoplossend vermogen versterken, en (3) ouders ondersteunen in hun rol. Door actief te werken tijdens de wachtperiode wordt voorkomen dat klachten escaleren en ontstaat er een realistischer beeld van de daadwerkelijke zorgbehoefte.',
    resultaat:
      '20% van de jongeren ziet na het overbruggingstraject volledig af van SGGZ-behandeling. Nog eens 40% verschuift naar lichtere BGGZ-zorg. Dit betekent dat 60% van de jongeren geen specialistische GGZ meer nodig heeft. Jongeren ervaren sneller perspectief en worden beter voorbereid op een eventuele behandeling.',
    randvoorwaarden:
      'Ruimte nodig vanuit contractering voor innovatieve producten. Voorkomen dat het traject tot meer volume leidt doordat het als extra aanbod wordt gezien in plaats van als vervanging. Goede afstemming met verwijzers (huisartsen, wijkteams) is essentieel.',
    businessCase:
      'Overbruggingstrajectkosten bedragen \u20AC1.277 per jeugdige. 20% stroomt volledig uit, 40% verschuift naar lichtere BGGZ (SGGZ-kosten: \u20AC3.800, BGGZ-kosten: \u20AC1.300 per jeugdige). De verwachte regionale netto besparing is ~\u20AC2,0 mln per jaar. Gebruik de Impact Simulator om het effect met uw eigen cijfers door te rekenen.',
    clientPadFase: 'Tussen verwijzing en intake (wachtlijst)',
    literatuur: [
      {
        tekst: 'Een ruime meerderheid van zorgprofessionals in de GGZ geeft aan dat overbruggingszorg helpt om klachten niet te laten verergeren (75%), het positieve impact heeft op het functioneren (81%), en een positief effect heeft op de resultaten en duur van de toekomstige behandeling (80% en 75%).',
        bron: 'Alliantie Kwaliteit Geestelijke Gezondheidszorg, 2024',
        url: 'https://www.akwaggz.nl/',
      },
      {
        tekst: 'Psycho-educatie, ouder- en gezinsondersteuning of kortdurende coaching tijdens de wachtlijst hebben in een kleine studie geleid tot verbeterde mentale gezondheid van jongeren.',
        bron: 'BMJ Mental Health',
        url: 'https://mentalhealth.bmj.com/',
      },
      {
        tekst: 'POH\u2019s-GGZ geven aan overbruggingszorg als middel te zien om de GGZ te kunnen ontlasten, doordat pati\u00ebnten beter voorbereid zijn op behandeling. Soms werd gezien dat pati\u00ebnten door de overbruggingszorg uiteindelijk geen GGZ-behandeling meer nodig hebben.',
        bron: 'Trimbos/Nivel, 2025',
        url: 'https://www.trimbos.nl/kennis/overbruggingszorg',
      },
      {
        tekst: 'Door een aanpak waarvan overbruggingszorg onderdeel was, waren wachtlijsten van Gemeente Steenwijkerland binnen vijf weken substantieel afgenomen. Uiteindelijk waren de wachtlijsten voor de basis-GGZ volledig verdwenen en voor de specialistische GGZ teruggebracht naar 8 weken.',
        bron: 'Nivel, 2019',
        url: 'https://www.nivel.nl/nl/publicatie/wachttijden-en-wachtlijsten',
      },
      {
        tekst: 'Brits onderzoek laat zien dat een stabilisatiegroep voor traumapati\u00ebnten op de wachtlijst leidde tot sterke symptoomreductie en geen verslechtering van depressie/angststoornissen.',
        bron: 'Behavioural and Cognitive Psychotherapy, 2023',
        url: 'https://doi.org/10.1017/S1352465823000152',
      },
      {
        tekst: 'In Nederland ligt de landelijke participatiegraad (het percentage wachtenden dat deelneemt aan een vorm van overbruggingszorg) op ~40%.',
        bron: 'Trimbos/Nivel, 2025',
        url: 'https://www.trimbos.nl/kennis/overbruggingszorg',
      },
      {
        tekst: 'Nationaal onderzoek laat zien dat (1) pati\u00ebnten wisselende ervaringen hebben met overbruggingszorg, (2) pati\u00ebnten behoefte hebben aan emotionele steun en hulp bij het navigeren door de zorg, en (3) behoeften van naasten tijdens de wachttijd niet altijd worden gezien.',
        bron: 'Trimbos/Nivel, 2025',
        url: 'https://www.trimbos.nl/kennis/overbruggingszorg',
      },
      {
        tekst: 'Bij \u00e9\u00e9n deelnemende POH-GGZ boden ze in de huisartsenpraktijk standaard overbruggingszorg aan, maar zijn ze onlangs als zorggroep gestopt met standaard aanbieden. Nu kijken ze per individuele pati\u00ebnt of overbruggingszorg naar verwachting meerwaarde heeft.',
        bron: 'Trimbos/Nivel, 2025',
        url: 'https://www.trimbos.nl/kennis/overbruggingszorg',
      },
    ],
  },
  {
    titel: 'Brede Intake',
    aanbieder: 'Parnassia',
    color: 'violet',
    besparing: '~14% volumereductie, ca. \u20AC2,5 mln besparing',
    probleem:
      'Verwijzers (huisartsen, POH-GGZ, wijkteams) moeten in zeer beperkte tijd complexe casu\u00EFstiek beoordelen, vaak zonder goed zicht op de aard van het probleem. Het gevolg: jeugdigen komen terecht bij niet-passende aanbieders, starten verkeerde trajecten, en worden soms onnodig doorverwezen naar specialistische GGZ terwijl een lichtere interventie passender zou zijn. Dit leidt tot hogere kosten, langere trajecten en frustratie bij jongeren en ouders.',
    aanpak:
      'De intake wordt direct uitgevoerd door een gespecialiseerde professional \u00E9n een ervaringsdeskundige, eventueel ondersteund met hulpmiddelen zoals de zelfredzaamheidsmatrix. Door de expertise meteen aan de voorkant in te zetten, wordt een veel nauwkeuriger beeld gevormd van de werkelijke zorgbehoefte. De jongere en het gezin worden actief betrokken in het besluitvormingsproces (samen beslissen).',
    resultaat:
      'Ca. 40% van de jongeren die normaal naar SGGZ zouden gaan, verschuift naar BGGZ of het wijkteam. Alle jongeren krijgen sneller toegang tot passendere zorg. De match tussen zorgvraag en zorgaanbod verbetert aanzienlijk.',
    randvoorwaarden:
      'Structureel financi\u00EBle ruimte voor vroege inzet van experts bij de intake. Contractueel borgen dat koplopers niet financi\u00EBel benadeeld worden wanneer zij jongeren naar lichtere zorg verwijzen (en dus minder SGGZ-omzet genereren).',
    businessCase:
      'Extra intake-kosten bedragen \u20AC250 (2 uur inzet \u00E0 \u20AC125/u). Op basis van documentatie/praktijkervaring in GGZ NHN ligt de reductie in SGGZ-behandelingen tussen ~30-40%; wij gaan uit van de onderkant van deze bandbreedte. We veronderstellen dat deze reductie ook toepasbaar is op de 18- populatie, omdat de brede intake hetzelfde probleem adresseert. De verdeling van deze verschuiving over niet-GGZ ondersteuning en BGGZ is gebaseerd op eigen inschattingen. Ca. 40% verschuift naar BGGZ (\u20AC1.300/traject) of wijkteam. Netto besparing: ~\u20AC2,5 mln per jaar.',
    clientPadFase: 'Intake & plan van aanpak',
  },
  {
    titel: 'De Kracht van Kort',
    aanbieder: 'Perspectief & Eleos',
    color: 'amber',
    besparing: '~10-20% volumereductie, ca. \u20AC1,8 \u2013 3,6 mln besparing',
    probleem:
      'Een significant deel van de SGGZ-trajecten overschrijdt de indicatieve looptijd van 1 jaar. Er is forse praktijkvariatie tussen aanbieders: vergelijkbare casu\u00EFstiek leidt tot sterk verschillende behandelduren. Dit duidt op het ontbreken van gestandaardiseerde afspraken over behandelduur en het uitblijven van tussentijdse evaluaties. Langere trajecten zijn niet per definitie betere trajecten.',
    aanpak:
      'Zorgprofessionals worden opgeleid in kortdurende, doelgerichte behandelmethoden. Vooraf worden duidelijke afspraken gemaakt over behandelduur en concrete behandeldoelen. Tussentijdse evaluaties zorgen ervoor dat de voortgang continu wordt gemonitord. Als een behandeling niet het gewenste effect heeft, wordt eerder bijgestuurd of afgeschaald. De focus verschuift van \u201Cbehandelen tot het klaar is\u201D naar \u201Cgericht werken aan haalbare doelen binnen een afgesproken tijdskader\u201D.',
    resultaat:
      '10-20% verkorting van behandeltrajecten. Heldere verwachtingen voor zowel behandelaar als cli\u00ebnt. Minder praktijkvariatie en meer transparantie over wat een behandeling oplevert.',
    randvoorwaarden:
      'Transparantie m.b.t. behandelduur en herinstroom is essentieel. Financi\u00EBle incentives verkennen voor aanbieders die aantoonbaar kortere, effectieve trajecten realiseren.',
    businessCase:
      '10-20% kortere behandeltrajecten levert regionaal naar schatting \u20AC1,8 \u2013 \u20AC3,6 mln per jaar op. Gebruik de Impact Simulator om het effect met uw eigen cijfers door te rekenen.',
    clientPadFase: 'Behandeltraject',
  },
  {
    titel: 'Gezinsgerichte Aanpak',
    aanbieder: 'FamilySupporters',
    color: 'teal',
    besparing: 'Nog te kwantificeren',
    probleem:
      'De zorg is nu primair georganiseerd rondom de individuele jongere, terwijl de problemen vaak in het gezinssysteem zitten. Het gevolg: meerdere aanbieders zijn betrokken bij \u00E9\u00E9n gezin zonder onderlinge afstemming. Ouders en broers/zussen worden niet of onvoldoende betrokken. Dit leidt tot fragmentatie, herverwijzingen en het in stand houden van de onderliggende problematiek.',
    aanpak:
      'Een gezinsgerichte aanpak die de hele context betrekt. Werken met een integraal gezinsplan waarin alle gezinsleden een plek hebben. Opzetten van een mentaal gezinscentrum in de wijk waar gezinnen laagdrempelig terecht kunnen. De behandelaar kijkt niet alleen naar de jongere, maar naar het systeem eromheen.',
    resultaat:
      'Passendere zorg doordat de werkelijke oorzaak wordt aangepakt. Minder medicalisering van normale gezinsproblematiek. Minder fragmentatie door betere afstemming. Minder herverwijzingen doordat het gezinssysteem duurzaam wordt versterkt.',
    randvoorwaarden:
      'Laagdrempelige afstemming tussen aanbieders die bij hetzelfde gezin betrokken zijn. Inzicht in verwijsgeschiedenis van het hele gezin. Goede communicatie richting huisartsen over de gezinsgerichte aanpak.',
    businessCase:
      'In ontwikkeling. Verwachte impact: minder herverwijzingen en minder parallelle trajecten binnen gezinnen. Potentieel \u20AC0,5 \u2013 1,0 mln regionaal per jaar.',
    clientPadFase: 'Behandeltraject',
  },
  {
    titel: 'Integraal Zorgaanbod met Groepsbegeleiding',
    aanbieder: 'CareHouse',
    color: 'orange',
    besparing: 'Nog te kwantificeren',
    probleem:
      'Behandeling en begeleiding worden nu separaat en sequentieel aangeboden: eerst behandelen, dan begeleiden. Dit verlengt het totale traject onnodig. Daarnaast is begeleiding vrijwel uitsluitend individueel (1-op-1), wat duur is en geen gebruik maakt van de kracht van groepsdynamiek. Jongeren missen de herkenning en steun van lotgenoten.',
    aanpak:
      'Een integraal zorgaanbod waarbij behandeling en begeleiding parallel lopen in plaats van achter elkaar. Groepsbegeleiding (ca. 1 begeleider op 4 jongeren) wordt ingezet naast individuele behandeling. Behandelaar en begeleider stemmen continu af, zodat de jongere \u00e9\u00e9n samenhangend traject ervaart.',
    resultaat:
      'Beter afgestemde zorg doordat behandeling en begeleiding hand in hand gaan. Minder herhaaltrajecten. Significante kostenreductie door groepsaanbod. Jongeren ervaren meer steun door lotgenotencontact.',
    randvoorwaarden:
      'Laagdrempelige afstemming tussen behandelaar en begeleider. Contractuele mogelijkheden voor groepsbegeleiding als apart product. Fysieke ruimte voor groepssessies.',
    businessCase:
      'In ontwikkeling. Groepsbegeleiding versus individueel biedt aanzienlijke effici\u00ebntiewinst. Potentieel \u20AC0,3 \u2013 0,8 mln regionaal per jaar.',
    clientPadFase: 'Behandeltraject',
  },
];

/* ------------------------------------------------------------------ */
/*  Color helpers                                                      */
/* ------------------------------------------------------------------ */

const colorMap: Record<
  string,
  {
    gradient: string;
    badge: string;
    iconBg: string;
    iconText: string;
    border: string;
    heading: string;
    sectionBg: string;
  }
> = {
  sky: {
    gradient: 'from-sky-500 to-sky-600',
    badge: 'bg-sky-100 text-sky-700',
    iconBg: 'bg-sky-50',
    iconText: 'text-sky-600',
    border: 'border-sky-200',
    heading: 'text-sky-700',
    sectionBg: 'bg-sky-50/50',
  },
  violet: {
    gradient: 'from-violet-500 to-violet-600',
    badge: 'bg-violet-100 text-violet-700',
    iconBg: 'bg-violet-50',
    iconText: 'text-violet-600',
    border: 'border-violet-200',
    heading: 'text-violet-700',
    sectionBg: 'bg-violet-50/50',
  },
  amber: {
    gradient: 'from-amber-500 to-amber-600',
    badge: 'bg-amber-100 text-amber-700',
    iconBg: 'bg-amber-50',
    iconText: 'text-amber-600',
    border: 'border-amber-200',
    heading: 'text-amber-700',
    sectionBg: 'bg-amber-50/50',
  },
  teal: {
    gradient: 'from-teal-500 to-teal-600',
    badge: 'bg-teal-100 text-teal-700',
    iconBg: 'bg-teal-50',
    iconText: 'text-teal-600',
    border: 'border-teal-200',
    heading: 'text-teal-700',
    sectionBg: 'bg-teal-50/50',
  },
  orange: {
    gradient: 'from-orange-500 to-orange-600',
    badge: 'bg-orange-100 text-orange-700',
    iconBg: 'bg-orange-50',
    iconText: 'text-orange-600',
    border: 'border-orange-200',
    heading: 'text-orange-700',
    sectionBg: 'bg-orange-50/50',
  },
};

/* ------------------------------------------------------------------ */
/*  Section component                                                  */
/* ------------------------------------------------------------------ */

function Section({
  icon: Icon,
  label,
  text,
  colors,
}: {
  icon: typeof AlertTriangle;
  label: string;
  text: string;
  colors: (typeof colorMap)[string];
}) {
  return (
    <div className={`rounded-lg ${colors.sectionBg} p-4`}>
      <div className="mb-2 flex items-center gap-2">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${colors.iconBg} ${colors.iconText}`}
        >
          <Icon className="h-4 w-4" />
        </div>
        <h4 className={`text-sm font-semibold ${colors.heading}`}>{label}</h4>
      </div>
      <p className="text-sm leading-relaxed text-gray-700">{text}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function InitiatievenPage() {
  return (
    <div className="min-h-screen bg-surface-50">
      {/* ---- Header ---- */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/70 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Terug naar overzicht
          </Link>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Initiatieven
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/80">
            Vijf concrete initiatieven gericht op volume-reductie en passendere
            jeugd-GGZ in de regio Zuid-Holland Zuid.
          </p>
        </div>
      </div>

      {/* ---- Initiative cards ---- */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {initiatieven.map((item, idx) => {
            const colors = colorMap[item.color];

            return (
              <article
                id={`initiatief-${idx + 1}`}
                key={idx}
                className={`scroll-mt-24 overflow-hidden rounded-2xl border bg-white shadow-sm ${colors.border}`}
              >
                {/* Card header */}
                <div
                  className={`bg-gradient-to-r ${colors.gradient} px-6 py-5 text-white`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-white/70">
                        Initiatief {idx + 1} &middot; {item.aanbieder}
                      </p>
                      <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                        {item.titel}
                      </h2>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1.5 text-sm font-semibold backdrop-blur-sm">
                      <Sparkles className="h-4 w-4" />
                      {item.besparing}
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                      <Footprints className="h-3.5 w-3.5" />
                      {item.clientPadFase}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="grid gap-4 p-6 md:grid-cols-2">
                  <Section
                    icon={AlertTriangle}
                    label="Probleem"
                    text={item.probleem}
                    colors={colors}
                  />
                  <Section
                    icon={Lightbulb}
                    label="Aanpak"
                    text={item.aanpak}
                    colors={colors}
                  />
                  <Section
                    icon={TrendingUp}
                    label="Resultaat / Impact"
                    text={item.resultaat}
                    colors={colors}
                  />
                  <Section
                    icon={Shield}
                    label="Randvoorwaarden"
                    text={item.randvoorwaarden}
                    colors={colors}
                  />
                  <div className="md:col-span-2">
                    <Section
                      icon={Calculator}
                      label="Maatschappelijke Business Case"
                      text={item.businessCase}
                      colors={colors}
                    />
                  </div>

                  {/* Literature section */}
                  {item.literatuur && item.literatuur.length > 0 && (
                    <div className="md:col-span-2 mt-2">
                      <div className={`rounded-lg ${colors.sectionBg} p-5`}>
                        <div className="mb-3 flex items-center gap-2">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-lg ${colors.iconBg} ${colors.iconText}`}
                          >
                            <BookOpen className="h-4 w-4" />
                          </div>
                          <h4 className={`text-sm font-semibold ${colors.heading}`}>
                            Meer weten? Bekijk de literatuur
                          </h4>
                        </div>
                        <ul className="space-y-3">
                          {item.literatuur.map((ref, refIdx) => (
                            <li
                              key={refIdx}
                              className="flex items-start gap-2 rounded-lg bg-white/60 p-3 border border-gray-100"
                            >
                              <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                              <div>
                                <p className="text-sm leading-relaxed text-gray-700">
                                  {ref.tekst}
                                </p>
                                <p className="mt-1 text-xs font-medium text-gray-500 italic">
                                  {ref.url ? (
                                    <a
                                      href={ref.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="underline hover:text-gray-700 transition"
                                    >
                                      {ref.bron}
                                    </a>
                                  ) : (
                                    ref.bron
                                  )}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* ---- Cumulative savings chart ---- */}
        <div className="mt-14">
          <CumulativeSavingsChart />
        </div>

        {/* ---- Summary ---- */}
        <div className="mt-8 rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 to-white p-8 text-center shadow-sm">
          <h3 className="text-xl font-bold text-primary-800 sm:text-2xl">
            Totale potenti&euml;le besparing
          </h3>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-primary-700 sm:text-5xl">
            &euro;2,9 &ndash; 3,8 mln
          </p>
          <p className="mt-1 text-lg text-primary-600">regionaal per jaar (gecorrigeerd voor overlappende effecten)</p>
          <p className="mx-auto mt-4 max-w-xl text-sm text-gray-500">
            (1) De doelgroepen en impactdrijvers voor de verschillende interventies overlappen, waardoor de individuele besparingen niet optelbaar zijn. De totale besparing is ontdubbeld. (2) In het besparingspotentieel zijn de meerkosten van elke aanpak al verdisconteerd &mdash; dit betreft netto besparingspotentieel. Noot: Afwachtende input van Mentaal Beter.
          </p>
        </div>
      </div>
    </div>
  );
}
