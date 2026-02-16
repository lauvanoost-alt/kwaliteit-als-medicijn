import type { Metadata } from 'next';
import Link from 'next/link';
import {
  HeartPulse,
  Lightbulb,
  Target,
  Users,
  Shield,
  ArrowRight,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Building2,
  Handshake,
  Brain,
  BookOpen,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kwaliteit als Medicijn — Filosofie & Aanpak',
  description:
    'Een diepgaande toelichting op het Kwaliteit als Medicijn-gedachtegoed: de vier pijlers, het vuist-op-vuist principe, en de vertaling naar jeugd-GGZ in Zuid-Holland Zuid.',
};

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const pillars = [
  {
    number: 1,
    title: 'Normaliseren & De-medicaliseren',
    icon: HeartPulse,
    color: 'from-rose-500 to-pink-600',
    bgLight: 'bg-rose-50',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-700',
    description:
      'Niet elk probleem is een diagnose. Veel klachten horen bij het opgroeien. Door te normaliseren en het zelfoplossend vermogen van jongeren en gezinnen te versterken, voorkomen we onnodige instroom in de GGZ. Dit vereist een cultuuromslag bij verwijzers, professionals \u00e9n ouders.',
  },
  {
    number: 2,
    title: 'Passende Zorg op het Juiste Moment',
    icon: Target,
    color: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    description:
      'De juiste zorg, door de juiste professional, op het juiste moment. Door brede intake, vroegtijdige screening en goede triage zorgen we dat jongeren niet onnodig in zware trajecten terechtkomen. Overbruggingszorg tijdens de wachttijd voorkomt verergering en biedt direct perspectief.',
  },
  {
    number: 3,
    title: 'Kortdurend en Doelgericht Behandelen',
    icon: Sparkles,
    color: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    description:
      'Behandeltrajecten die helder zijn in doel, duur en verwachting. De Kracht van Kort laat zien dat kortere, intensievere behandelingen minstens zo effectief zijn als langdurige trajecten \u2014 met meer tevredenheid bij jongeren \u00e9n professionals.',
  },
  {
    number: 4,
    title: 'Samenwerking & Integraal Werken',
    icon: Users,
    color: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
    description:
      'Geen enkele partij kan het alleen. Aanbieders, gemeenten, huisartsen, wijkteams, scholen en gezinnen moeten samenwerken in een integraal systeem. De gezinsgerichte aanpak en het integraal zorgaanbod laten zien dat afstemming leidt tot minder fragmentatie en betere uitkomsten.',
  },
];

const vuistOpVuist = [
  {
    role: 'Serviceorganisatie Jeugd (SoJ) / Inkoper',
    icon: Building2,
    color: 'bg-primary-600',
    items: [
      'Cre\u00ebert ruimte in contracten voor innovatie',
      'Stelt data en spiegelinformatie beschikbaar',
      'Faciliteert de kopgroep-structuur',
      'Investeert in regionale infrastructuur',
    ],
  },
  {
    role: 'Aanbieders (alle 90+ in de regio)',
    icon: HeartPulse,
    color: 'bg-accent-600',
    items: [
      'Implementeren de 5 initiatieven in hun praktijk',
      'Delen kennis en resultaten met collega-aanbieders',
      'Investeren in opleiding en cultuurverandering',
      'Werken mee aan transparantie en spiegelinformatie',
    ],
  },
  {
    role: 'Kopgroep (8 voorlopers)',
    icon: Sparkles,
    color: 'bg-emerald-600',
    items: [
      'Ontwikkelen en testen innovatieve aanpakken',
      'Bewijzen dat het werkt met data en resultaten',
      'Inspireren en ondersteunen andere aanbieders',
      'Vormen de brug tussen idee en brede implementatie',
    ],
  },
];

const bewijzen = [
  {
    label: 'Bernhoven ziekenhuis',
    result: '7-13% volumereductie binnen 2 jaar',
    icon: Building2,
  },
  {
    label: 'Rivas ziekenhuis',
    result: 'Vergelijkbare volumereductie',
    icon: Building2,
  },
  {
    label: 'Gemeente Veendam',
    result: 'Van 220 naar 6 aanbieders, 13% kostendaling, wachtlijsten verdwenen',
    icon: TrendingDown,
  },
  {
    label: 'Zuid-Holland Zuid',
    result: 'De 5 initiatieven van de kopgroep vertalen dit naar jeugd-GGZ',
    icon: Sparkles,
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function KwaliteitAlsMedicijnPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* ============================================================ */}
      {/*  1. HERO                                                      */}
      {/* ============================================================ */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 p-8 sm:p-12 lg:p-16 text-white">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-primary-100 backdrop-blur-sm">
            <Brain className="h-4 w-4" />
            Het gedachtegoed
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Kwaliteit als Medicijn
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-primary-100 sm:text-xl">
            Het gedachtegoed achter de transformatie van jeugd-GGZ in Zuid-Holland Zuid
          </p>
        </div>
        {/* Decorative blobs */}
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-600 opacity-30 blur-3xl" />
        <div className="absolute -bottom-10 right-1/4 h-56 w-56 rounded-full bg-accent-500 opacity-15 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-primary-400 opacity-20 blur-2xl" />
      </div>

      {/* ============================================================ */}
      {/*  2. DE KERNGEDACHTE                                           */}
      {/* ============================================================ */}
      <section className="mt-16">
        <div className="flex items-start gap-3">
          <Lightbulb className="mt-1 h-6 w-6 shrink-0 text-primary-600" />
          <h2 className="text-2xl font-bold text-foreground">De Kerngedachte</h2>
        </div>
        <div className="mt-6 rounded-xl border-l-4 border-primary-500 bg-primary-50/60 p-6 sm:p-8">
          <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
            <strong className="text-foreground">Kwaliteit als Medicijn</strong> is gebaseerd op een
            simpel maar krachtig inzicht: wanneer je de kwaliteit van zorg verhoogt, dalen volumes en
            kosten vanzelf. Niet door te bezuinigen, niet door te rantsoeneren, maar door betere zorg
            te leveren. Het concept is bewezen in de ziekenhuiszorg (Bernhoven, Rivas: 7-13%
            volumereductie) en wordt nu vertaald naar de jeugd-GGZ in Zuid-Holland Zuid.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  3. DE VIER PIJLERS                                           */}
      {/* ============================================================ */}
      <section className="mt-16">
        <div className="flex items-start gap-3">
          <Shield className="mt-1 h-6 w-6 shrink-0 text-primary-600" />
          <h2 className="text-2xl font-bold text-foreground">De Vier Pijlers</h2>
        </div>
        <p className="mt-3 text-gray-600">
          Het Kwaliteit als Medicijn-gedachtegoed voor jeugd-GGZ rust op vier dragende pijlers.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                className={`relative overflow-hidden rounded-2xl border ${pillar.borderColor} ${pillar.bgLight} p-6`}
              >
                {/* Number badge */}
                <div
                  className={`absolute -right-3 -top-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${pillar.color} text-2xl font-extrabold text-white opacity-15`}
                >
                  {pillar.number}
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${pillar.color} text-white`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{pillar.title}</h3>
                  </div>
                  <p className={`mt-4 text-sm leading-relaxed ${pillar.textColor}`}>
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. HET 'VUIST OP VUIST' PRINCIPE                            */}
      {/* ============================================================ */}
      <section className="mt-16">
        <div className="flex items-start gap-3">
          <Handshake className="mt-1 h-6 w-6 shrink-0 text-primary-600" />
          <h2 className="text-2xl font-bold text-foreground">
            Het &lsquo;Vuist op Vuist&rsquo; Principe
          </h2>
        </div>
        <p className="mt-4 text-gray-600 leading-relaxed">
          De transformatie van jeugd-GGZ kan alleen slagen als drie partijen tegelijk bewegen — als
          tandwielen die in elkaar grijpen:
        </p>

        {/* Visual zigzag timeline */}
        <div className="relative mt-10">
          {/* Connecting line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 via-accent-300 to-emerald-300 sm:left-1/2 sm:-translate-x-px" />

          {vuistOpVuist.map((party, idx) => {
            const Icon = party.icon;
            const isEven = idx % 2 === 0;
            return (
              <div key={party.role} className="relative mb-8 last:mb-0">
                {/* Connector dot */}
                <div
                  className={`absolute left-6 top-6 z-10 h-4 w-4 -translate-x-1/2 rounded-full ${party.color} ring-4 ring-white sm:left-1/2`}
                />

                {/* Card */}
                <div
                  className={`ml-12 sm:ml-0 sm:w-[calc(50%-2rem)] ${
                    isEven ? 'sm:mr-auto sm:pr-0' : 'sm:ml-auto sm:pl-0'
                  }`}
                >
                  <div className="rounded-xl border border-surface-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${party.color} text-white`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-bold text-foreground">{party.role}</h3>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {party.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Arrow between parties */}
                  {idx < vuistOpVuist.length - 1 && (
                    <div className="mt-2 flex justify-center">
                      <div className="flex flex-col items-center text-primary-300">
                        <ChevronRight className="h-5 w-5 rotate-90" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Reinforcing nature callout */}
        <div className="mt-8 rounded-xl bg-gradient-to-r from-primary-50 to-accent-50 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
            <p className="text-sm leading-relaxed text-gray-700">
              <strong className="text-foreground">Wederzijdse versterking:</strong> De drie partijen
              versterken elkaar continu. De SoJ schept de voorwaarden, de Kopgroep bewijst wat werkt,
              en alle aanbieders implementeren de bewezen aanpakken. Stilstand bij een van de drie
              remt het geheel.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  5. VAN BEWIJS NAAR PRAKTIJK                                  */}
      {/* ============================================================ */}
      <section className="mt-16">
        <div className="flex items-start gap-3">
          <BookOpen className="mt-1 h-6 w-6 shrink-0 text-primary-600" />
          <h2 className="text-2xl font-bold text-foreground">Van Bewijs naar Praktijk</h2>
        </div>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Het Kwaliteit als Medicijn-gedachtegoed is geen theoretisch model — het is bewezen in de
          praktijk:
        </p>

        <div className="mt-6 space-y-4">
          {bewijzen.map((bewijs) => {
            const Icon = bewijs.icon;
            return (
              <div
                key={bewijs.label}
                className="flex items-start gap-4 rounded-xl border border-surface-200 bg-white p-5 transition-colors hover:border-primary-200 hover:bg-primary-50/30"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{bewijs.label}</h3>
                  <p className="mt-1 text-sm text-gray-600">{bewijs.result}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  6. WAAROM DIT ANDERS IS DAN 'GEWOON BEZUINIGEN'              */}
      {/* ============================================================ */}
      <section className="mt-16">
        <div className="flex items-start gap-3">
          <Brain className="mt-1 h-6 w-6 shrink-0 text-primary-600" />
          <h2 className="text-2xl font-bold text-foreground">
            Waarom dit Anders is dan &lsquo;Gewoon Bezuinigen&rsquo;
          </h2>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {/* Bezuinigen */}
          <div className="rounded-2xl border-2 border-red-200 bg-red-50/50 p-6">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-red-500" />
              <h3 className="text-lg font-bold text-red-800">Bezuinigen</h3>
            </div>
            <div className="mt-5 space-y-3">
              <div className="flex items-start gap-2">
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-red-400" />
                <p className="text-sm text-red-700">Minder geld</p>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-red-400" />
                <p className="text-sm text-red-700">Minder zorg</p>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-red-400" />
                <p className="text-sm text-red-700">Langere wachtlijsten</p>
              </div>
            </div>
            <div className="mt-5 rounded-lg bg-red-100 p-3">
              <p className="text-xs font-medium text-red-800">
                Resultaat: dezelfde problemen, minder middelen
              </p>
            </div>
          </div>

          {/* Kwaliteit als Medicijn */}
          <div className="rounded-2xl border-2 border-green-200 bg-green-50/50 p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-bold text-green-800">Kwaliteit als Medicijn</h3>
            </div>
            <div className="mt-5 space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                <p className="text-sm text-green-700">Betere zorg</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                <p className="text-sm text-green-700">Minder onnodige zorg</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                <p className="text-sm text-green-700">
                  Lagere kosten + kortere wachtlijsten + hogere tevredenheid
                </p>
              </div>
            </div>
            <div className="mt-5 rounded-lg bg-green-100 p-3">
              <p className="text-xs font-medium text-green-800">
                Resultaat: betere uitkomsten, duurzaam lagere kosten
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  7. CALL TO ACTION                                            */}
      {/* ============================================================ */}
      <section className="mt-16 rounded-2xl bg-gradient-to-br from-primary-50 via-white to-accent-50 p-8 sm:p-10">
        <h2 className="text-xl font-bold text-primary-900 sm:text-2xl">
          Ontdek hoe dit werkt in de praktijk
        </h2>
        <p className="mt-3 max-w-2xl text-gray-600 leading-relaxed">
          Bekijk de data achter de transformatie, verdiep je in de 5 initiatieven, test je kennis of
          sluit je aan bij de community van professionals in Zuid-Holland Zuid.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/dashboard"
            className="group flex items-center gap-3 rounded-xl border border-surface-200 bg-white p-4 transition-all hover:border-primary-300 hover:shadow-md"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-700 transition-colors group-hover:bg-primary-600 group-hover:text-white">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Dashboard</p>
              <p className="text-xs text-gray-500">Data &amp; voortgang</p>
            </div>
          </Link>

          <Link
            href="/projecten"
            className="group flex items-center gap-3 rounded-xl border border-surface-200 bg-white p-4 transition-all hover:border-primary-300 hover:shadow-md"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-700 transition-colors group-hover:bg-primary-600 group-hover:text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Initiatieven</p>
              <p className="text-xs text-gray-500">De 5 projecten</p>
            </div>
          </Link>

          <Link
            href="/quiz"
            className="group flex items-center gap-3 rounded-xl border border-surface-200 bg-white p-4 transition-all hover:border-primary-300 hover:shadow-md"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-700 transition-colors group-hover:bg-primary-600 group-hover:text-white">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Quiz</p>
              <p className="text-xs text-gray-500">Test je kennis</p>
            </div>
          </Link>

          <Link
            href="/community"
            className="group flex items-center gap-3 rounded-xl border border-surface-200 bg-white p-4 transition-all hover:border-primary-300 hover:shadow-md"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-700 transition-colors group-hover:bg-primary-600 group-hover:text-white">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Community</p>
              <p className="text-xs text-gray-500">Sluit je aan</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
