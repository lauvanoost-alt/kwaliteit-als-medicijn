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
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Initiatieven',
  description:
    'Overzicht van de vijf initiatieven gericht op volume-reductie en passendere jeugd-GGZ in Zuid-Holland Zuid.',
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Initiatief {
  titel: string;
  aanbieder: string;
  color: string; // Tailwind color key (sky, violet, amber, teal, orange)
  besparing: string;
  probleem: string;
  aanpak: string;
  resultaat: string;
  randvoorwaarden: string;
  businessCase: string;
}

const initiatieven: Initiatief[] = [
  {
    titel: 'Overbruggingszorg in de SGGZ',
    aanbieder: 'De Hoop',
    color: 'sky',
    besparing: '~11% volumereductie, ca. \u20AC2,0 mln besparing',
    probleem:
      'Jongeren die doorverwezen worden naar de GGZ staan lang op de wachtlijst. Gedurende die periode \u201Cwachten\u201D jongeren letterlijk: er vindt geen begeleiding plaats bij de klachten waarvoor verwezen is en de verwachting van de behandeling neemt toe.',
    aanpak:
      'Inzet van een overbruggingstraject gedurende de wachttijd bestaande uit triage, e-health modules (Life Skills), groepssessies, en een eindgesprek. Doel is om jongeren zelf al aan de slag te laten gaan, gedrag te normaliseren en ouders te ondersteunen.',
    resultaat:
      '20% ziet volledig af van SGGZ, 40% verschuift naar lichtere BGGZ. Jongeren krijgen sneller en passendere zorg.',
    randvoorwaarden:
      'Ruimte nodig vanuit contractering voor innovatieve producten. Voorkomen dat het traject tot meer volume leidt.',
    businessCase:
      '\u20AC3.000 per SGGZ-traject, 20% stroomt uit, 40% naar BGGZ (\u20AC1.800). Per 100 jongeren: 20 \u00D7 \u20AC3.000 + 40 \u00D7 \u20AC1.200 besparing = ca. \u20AC108.000. Regionaal ~\u20AC2,0 mln per jaar.',
  },
  {
    titel: 'Brede Intake',
    aanbieder: 'Parnassia',
    color: 'violet',
    besparing: '~14% volumereductie, ca. \u20AC2,5 mln besparing',
    probleem:
      'Verwijzers moeten in zeer beperkte tijd complexe casu\u00EFstiek beoordelen, zonder goed zicht op de aard van het probleem. Jeugdigen komen bij niet-passende aanbieders terecht.',
    aanpak:
      'De intake wordt direct uitgevoerd door een gespecialiseerde professional \u00E9n een ervaringsdeskundige, evt. ondersteund met hulpmiddelen zoals de zelfredzaamheidsmatrix.',
    resultaat:
      'Ca. 40% verschuift naar BGGZ of wijkteam. Alle jongeren krijgen sneller toegang tot passendere zorg.',
    randvoorwaarden:
      'Structureel financi\u00EBle ruimte voor vroege inzet van experts. Contractueel borgen dat koplopers niet benadeeld worden.',
    businessCase:
      'Bij vroege expertise-inzet: 40% van SGGZ-verwezen jongeren naar BGGZ/wijkteam. Per jongere: \u20AC3.000 - \u20AC1.800 = \u20AC1.200 besparing. Regionaal ~\u20AC2,5 mln per jaar.',
  },
  {
    titel: 'De Kracht van Kort',
    aanbieder: 'Perspectief & Eleos',
    color: 'amber',
    besparing: '~10-20% volumereductie, ca. \u20AC1,8 \u2013 3,6 mln besparing',
    probleem:
      'Significant deel van SGGZ-trajecten overschrijdt de indicatieve looptijd van 1 jaar. Forse praktijkvariatie tussen aanbieders.',
    aanpak:
      'Zorgprofessionals opleiden in kortdurende, doelgerichte behandeling: vooraf duidelijke afspraken over behandelduur, concrete behandeldoelen, tussentijdse evaluaties.',
    resultaat:
      '10-20% verkorting van behandeltrajecten. Heldere verwachtingen scheppen.',
    randvoorwaarden:
      'Transparantie m.b.t. behandelduur en herinstroom. Financi\u00EBle incentives verkennen.',
    businessCase:
      '10-20% kortere trajecten bij gemiddeld \u20AC3.000/traject. Per 100 trajecten: \u20AC30.000-\u20AC60.000. Regionaal: \u20AC1,8 - \u20AC3,6 mln per jaar.',
  },
  {
    titel: 'Gezinsgerichte Aanpak',
    aanbieder: 'FamilySupporters',
    color: 'teal',
    besparing: 'Nog te kwantificeren',
    probleem:
      'Zorg wordt op de jongere georganiseerd terwijl problemen in het gezinssysteem zitten. Meerdere aanbieders bij \u00E9\u00E9n gezin, beperkte afstemming.',
    aanpak:
      'Gezinsgerichte aanpak gericht op de hele context, werken met een gezinsplan, mentaal gezinscentrum in de wijk.',
    resultaat:
      'Passende zorg, minder medicalisering en fragmentatie.',
    randvoorwaarden:
      'Laagdrempelige afstemming, inzicht in verwijsgeschiedenis, communicatie richting huisartsen.',
    businessCase:
      'In ontwikkeling. Verwachte impact: minder herverwijzingen, minder parallelle trajecten binnen gezinnen. Potentieel \u20AC0,5 - 1,0 mln regionaal.',
  },
  {
    titel: 'Integraal Zorgaanbod met Groepsbegeleiding',
    aanbieder: 'CareHouse',
    color: 'orange',
    besparing: 'Nog te kwantificeren',
    probleem:
      'Behandeling en begeleiding worden separaat en sequentieel aangeboden. Begeleiding uitsluitend individueel.',
    aanpak:
      'Integraal zorgaanbod met parallelle behandeling en begeleiding, groepsbegeleiding (ca. 1 op 4).',
    resultaat:
      'Beter afgestemde zorg, minder herhaaltrajecten, kostenreductie door groepsaanbod.',
    randvoorwaarden:
      'Laagdrempelige afstemming behandelaar-begeleider, mogelijkheden groepsbegeleiding als product.',
    businessCase:
      'In ontwikkeling. Groepsbegeleiding (1:4) vs individueel (1:1): ~75% kostenreductie per uur begeleiding. Potentieel \u20AC0,3 - 0,8 mln regionaal.',
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
                key={idx}
                className={`overflow-hidden rounded-2xl border bg-white shadow-sm ${colors.border}`}
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
                </div>
              </article>
            );
          })}
        </div>

        {/* ---- Summary ---- */}
        <div className="mt-14 rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 to-white p-8 text-center shadow-sm">
          <h3 className="text-xl font-bold text-primary-800 sm:text-2xl">
            Totale potenti&euml;le besparing
          </h3>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-primary-700 sm:text-5xl">
            ca. &euro;7 &ndash; 10 mln
          </p>
          <p className="mt-1 text-lg text-primary-600">regionaal per jaar</p>
          <p className="mx-auto mt-4 max-w-xl text-sm text-gray-500">
            Alle bedragen zijn schattingen op basis van regionale data en dienen
            ter indicatie.
          </p>
        </div>
      </div>
    </div>
  );
}
