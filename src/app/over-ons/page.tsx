import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Target, Eye, Users, Lightbulb, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Over ons',
  description: 'Over Kwaliteit-Als-Medicijn-ZHZ: het platform voor jeugd GGZ initiatieven in Zuid-Holland Zuid.',
};

const principles = [
  {
    icon: Eye,
    title: 'Transparantie',
    text: 'Alle initiatieven open en zichtbaar maken zodat iedereen kan leren van wat er al gebeurt in de regio.',
  },
  {
    icon: Users,
    title: 'Samenwerking',
    text: 'Kennis delen en samen optrekken in plaats van elk voor zich het wiel uitvinden.',
  },
  {
    icon: Target,
    title: 'Impact',
    text: 'Focussen op wat werkt en dat opschalen. Resultaten en geleerde lessen delen.',
  },
  {
    icon: Lightbulb,
    title: 'Innovatie',
    text: 'Ruimte voor experimenten en pilots. Durven te proberen en leren van wat niet werkt.',
  },
];

const kopgroepLeden = [
  { naam: 'De Hoop', profiel: 'Breed, christelijk', bereik: 'Bovenregionaal, 10+ locaties', slug: 'de-hoop' },
  { naam: 'Perspectief', profiel: 'Generalistisch ambulant', bereik: 'Regionaal, 4 locaties', slug: 'perspectief' },
  { naam: 'Parnassia Groep', profiel: 'Complexe casuïstiek', bereik: 'Bovenregionaal, 500+ locaties', slug: 'parnassia-groep' },
  { naam: 'NeuroScan', profiel: 'Specialistisch wetenschappelijk', bereik: 'Lokaal, 1 locatie', slug: 'neuroscan' },
  { naam: 'Eleos', profiel: 'Breed, christelijk', bereik: 'Bovenregionaal, 20+ locaties', slug: 'eleos' },
  { naam: 'FamilySupporters', profiel: 'Systeem- en contextgericht', bereik: 'Bovenregionaal, 20+ locaties', slug: 'familysupporters' },
  { naam: 'Mentaal Beter', profiel: 'Breed', bereik: 'Bovenregionaal, 100+ locaties', slug: 'mentaal-beter' },
  { naam: 'CareHouse', profiel: 'Jeugdigen met beperking', bereik: 'Bovenregionaal, 15+ locaties', slug: 'carehouse' },
];

export default function OverOnsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Over Kwaliteit-Als-Medicijn-ZHZ</h1>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-foreground">Onze missie</h2>
        <p className="mt-3 text-gray-600 leading-relaxed">
          Kwaliteit-Als-Medicijn-ZHZ maakt alle lopende en afgeronde initiatieven rondom volume-reductie en Kwaliteit
          als Medicijn in de jeugd GGZ van Zuid-Holland Zuid zichtbaar, vindbaar en deelbaar. Zo
          kunnen zorgaanbieders en professionals leren van elkaar, kennis kopiëren en
          doorontwikkelen, en samen werken aan betere zorg met minder volumes.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-foreground">Context: Kwaliteit als Medicijn in ZHZ</h2>
        <div className="mt-4 space-y-3 text-gray-600 leading-relaxed">
          <p>
            De regio Zuid-Holland Zuid werkt aan een regionale transformatie van de jeugd GGZ, aangestuurd
            vanuit het IZA-beleid. Het doel: betere zorg met minder volumes. Onder de noemer{' '}
            <strong>Kwaliteit als Medicijn</strong> worden initiatieven verzameld die bijdragen aan het
            verkorten van trajecten, het verminderen van instroom, het normaliseren van hulpvragen en het
            verhogen van effectiviteit.
          </p>
          <p>
            Om dit concreet te maken, is er een <strong>kopgroep</strong> gevormd van acht diverse
            jeugd GGZ aanbieders in de regio. Deze kopgroep fungeert als voorhoede: ze ontwikkelen,
            testen en delen initiatieven waarvan de hele regio kan leren.
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-foreground">De Kopgroep: 8 aanbieders</h2>
        <p className="mt-2 text-gray-500 text-sm">
          Alle segment 4-aanbieders in ZHZ zijn uitgenodigd voor de kopgroep. Acht diverse organisaties
          hebben zich aangemeld en voeren verdiepende gesprekken over hun initiatieven en ervaringen.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {kopgroepLeden.map((lid) => (
            <Link
              key={lid.slug}
              href={`/organisaties/${lid.slug}`}
              className="group flex items-start gap-3 rounded-xl border border-surface-200 bg-white p-4 transition-all hover:border-primary-200 hover:shadow-sm"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                <Building2 className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary-700">{lid.naam}</h3>
                <p className="text-xs text-gray-500">{lid.profiel}</p>
                <p className="text-xs text-gray-400">{lid.bereik}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-surface-50 p-4">
          <h3 className="text-sm font-semibold text-foreground">Hoe is de kopgroep tot stand gekomen?</h3>
          <ol className="mt-2 space-y-1.5 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">1</span>
              Aanbieders geïnformeerd via memo en toelichting tijdens de ontwikkeltafel
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">2</span>
              Alle segment 4-aanbieders in ZHZ uitgenodigd voor deelname aan de kopgroep
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">3</span>
              8 diverse aanbieders aangemeld bij de Serviceorganisatie Jeugd (SoJ)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">4</span>
              2-3 verdiepende gesprekken gevoerd per aanbieder
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">5</span>
              Volgende stap: werksessie met kopgroepleden en wethouders
            </li>
          </ol>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-foreground">Waarom dit platform?</h2>
        <div className="mt-4 space-y-3 text-gray-600 leading-relaxed">
          <p>
            Jeugd GGZ aanbieders voeren steeds vaker pilots uit gericht op het verminderen van
            instroom, het verkorten van trajecten, het normaliseren van hulpvragen en het verhogen
            van effectiviteit. Deze initiatieven zijn versnipperd en worden zelden gedeeld.
          </p>
          <p>
            Organisaties kennen elkaars pilots niet, waardoor kennis verloren gaat, opschaling
            uitblijft en elke aanbieder zelf weer het wiel moet uitvinden. Het regionale IZA-beleid
            vraagt juist om samenwerking en volume-reductie.
          </p>
          <p>
            Dit platform is de gedeelde bron voor projecten, inzichten, resultaten, geleerde lessen
            en contactpersonen. Hierdoor kunnen zorgaanbieders sneller en doelgerichter werken aan
            het verlagen van volumes.
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-foreground">Onze principes</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="rounded-xl border border-surface-200 bg-white p-5">
              <p.icon className="h-6 w-6 text-primary-500" />
              <h3 className="mt-2 font-semibold text-foreground">{p.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-foreground">Voor wie?</h2>
        <ul className="mt-3 space-y-2 text-gray-600">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
            Jeugd GGZ instellingen in de regio Zuid-Holland Zuid
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
            Zorgprofessionals: orthopedagogen, psychologen, behandelaren, intakers
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
            Beleidsadviseurs van gemeenten in ZHZ
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
            Projectleiders Kwaliteit als Medicijn en transformatie
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
            Coördinatoren van pilots, programma leads en regioteams
          </li>
        </ul>
      </section>

      <section className="mt-10 rounded-2xl bg-primary-50 p-8">
        <h2 className="text-lg font-semibold text-primary-800">Doe mee</h2>
        <p className="mt-2 text-primary-700">
          Heeft jouw organisatie een pilot of initiatief rondom volume-reductie? Deel het op dit
          platform zodat anderen ervan kunnen leren.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/projecten"
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
          >
            Bekijk projecten
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/community"
            className="inline-flex items-center gap-2 rounded-lg border border-primary-300 bg-white px-5 py-2.5 text-sm font-semibold text-primary-700 hover:bg-primary-50"
          >
            Vind professionals
          </Link>
        </div>
      </section>
    </div>
  );
}
