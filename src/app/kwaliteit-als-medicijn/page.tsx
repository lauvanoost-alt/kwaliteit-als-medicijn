import type { Metadata } from 'next';
import Link from 'next/link';
import {
  HeartPulse,
  Lightbulb,
  Users,
  Shield,
  ArrowRight,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Sparkles,
  Building2,
  Handshake,
  Brain,
  BookOpen,
  Eye,
  Clock,
  ChevronDown,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kwaliteit als Medicijn — Filosofie & Aanpak',
  description:
    'Een diepgaande toelichting op het Kwaliteit als Medicijn-gedachtegoed: de drie pijlers, de vertaling naar jeugdzorg in Zuid-Holland Zuid, en het vuist-op-vuist tijdlijn.',
};

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const pillars = [
  {
    number: 1,
    title: 'Verminderen overbehandeling en praktijkvariatie',
    subtitle: 'Evidence-based behandelen',
    icon: HeartPulse,
    color: 'from-rose-500 to-pink-600',
    bgLight: 'bg-rose-50',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-700',
    description:
      'Er wordt in Nederland meer zorg geleverd dan medisch noodzakelijk is — dit geldt zowel in de curatieve zorg als in de GGZ. Door meer evidence-based te behandelen, praktijkvariatie terug te dringen en spiegelinformatie in te zetten, kan het volume omlaag zonder dat de kwaliteit daalt. Transparantie over uitkomsten en variatie drijft verbetering van binnenuit.',
    bullets: [
      'Meer evidence-based behandelen: richtlijnen volgen, bewezen effectieve interventies inzetten',
      'Praktijkvariatie terugdringen: ongewenste variatie in verwijzingen, behandelduur en intensiteit zichtbaar maken',
      'Transparantie & spiegelinformatie: zorgverleners inzicht geven in hun eigen patronen ten opzichte van collega\'s',
    ],
  },
  {
    number: 2,
    title: 'Vergroten patiëntbetrokkenheid',
    subtitle: 'Samen beslissen',
    icon: Handshake,
    color: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    description:
      'Wanneer patiënten eerlijke en volledige informatie krijgen over behandelopties — inclusief de optie om niets te doen — kiezen zij vaak voor minder intensieve zorg. Samen beslissen (shared decision making) met keuzehulpen leidt tot zorg die beter past bij de werkelijke behoeften en voorkeuren van de patiënt. Daarnaast speelt het sociale netwerk een cruciale rol bij herstel.',
    bullets: [
      'Samen beslissen: arts en patiënt kiezen samen de behandeling, ondersteund door keuzehulpen',
      'Patiëntvoorkeuren zijn vaak conservatiever: bij volledige informatie kiest men vaker voor minder intensief',
      'Sociale netwerken betrekken: het netwerk rondom de patiënt activeren als onderdeel van herstel',
    ],
  },
  {
    number: 3,
    title: 'Verbeteren organisatorische inrichting',
    subtitle: 'Zorgorganisatie transformeren',
    icon: Building2,
    color: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
    description:
      'De manier waarop zorg is georganiseerd beïnvloedt het volume direct. Door de organisatorische inrichting te verbeteren op vier gebieden kan zorg efficiënter en effectiever worden geleverd, met minder onnodige verwijzingen en betere uitkomsten.',
    bullets: [
      'Integrale diagnostiek: eenmalige, brede diagnostiek in plaats van versnipperde deelonderzoeken',
      'Integrale begeleiding chronisch zieken: gecoördineerde, langdurige zorg in plaats van herhaalde episodische behandelingen',
      'Versterking eerste lijn: huisartsen en POH-GGZ beter toerusten zodat minder doorverwijzing naar specialistische zorg nodig is',
      'Spreiding en concentratie: complexe zorg concentreren op plekken met de juiste expertise, eenvoudige zorg dichtbij huis',
    ],
  },
];

const zhzPillars = [
  {
    title: 'Minder overbehandeling',
    icon: HeartPulse,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    description:
      'Niet elk jeugdprobleem vraagt om specialistische GGZ. Door evidence-based te werken en praktijkvariatie zichtbaar te maken, verminderen we onnodige instroom en behandelduur. Initiatieven: Kracht van Kort, Brede Intake.',
  },
  {
    title: 'Jongeren & gezinnen betrekken',
    icon: Handshake,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    description:
      'Samen beslissen met jongeren en ouders over de juiste zorg. Keuzehulpen inzetten, het sociale netwerk activeren en overbruggingszorg bieden. Initiatieven: Overbruggingszorg, Gezinsgerichte Aanpak.',
  },
  {
    title: 'Organisatie verbeteren',
    icon: Building2,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    description:
      'Integrale diagnostiek, versterking eerste lijn (huisarts/POH-GGZ), concentratie van complexe zorg en gecoördineerde begeleiding. Initiatief: Integraal Zorgaanbod.',
  },
];

const timelineSteps = [
  {
    actor: 'SOJ',
    label: 'Serviceorganisatie Jeugd',
    timing: 'Q4 2025',
    description:
      'SoJ start KAM en geeft status aan kopgroep door steun toe te zeggen',
    colorClasses: {
      dot: 'bg-blue-600',
      card: 'border-blue-200 bg-blue-50/60',
      badge: 'bg-blue-100 text-blue-800',
      text: 'text-blue-900',
      line: 'text-blue-300',
    },
  },
  {
    actor: 'Aanbieders',
    label: 'Alle aanbieders',
    timing: 'Q1 2026',
    description:
      'Aanbieders realiseren zich dat er iets op gang gebracht wordt, maar wachten nog af',
    colorClasses: {
      dot: 'bg-amber-500',
      card: 'border-amber-200 bg-amber-50/60',
      badge: 'bg-amber-100 text-amber-800',
      text: 'text-amber-900',
      line: 'text-amber-300',
    },
  },
  {
    actor: 'Kopgroep',
    label: 'Kopgroep (8 voorlopers)',
    timing: 'Q1-Q2 2026',
    description: 'Kopgroep komt met eerste ideeën en impact-inschatting',
    colorClasses: {
      dot: 'bg-emerald-600',
      card: 'border-emerald-200 bg-emerald-50/60',
      badge: 'bg-emerald-100 text-emerald-800',
      text: 'text-emerald-900',
      line: 'text-emerald-300',
    },
  },
  {
    actor: 'SOJ',
    label: 'Serviceorganisatie Jeugd',
    timing: 'Q2 2026',
    description:
      'SoJ faciliteert de kopgroep (bijv. door financiële steun, toezeggingen voor toekomst)',
    colorClasses: {
      dot: 'bg-blue-600',
      card: 'border-blue-200 bg-blue-50/60',
      badge: 'bg-blue-100 text-blue-800',
      text: 'text-blue-900',
      line: 'text-blue-300',
    },
  },
  {
    actor: 'Kopgroep',
    label: 'Kopgroep (8 voorlopers)',
    timing: 'Q3-Q4 2026',
    description: 'Kopgroep toont impact in de praktijk aan',
    colorClasses: {
      dot: 'bg-emerald-600',
      card: 'border-emerald-200 bg-emerald-50/60',
      badge: 'bg-emerald-100 text-emerald-800',
      text: 'text-emerald-900',
      line: 'text-emerald-300',
    },
  },
  {
    actor: 'SOJ',
    label: 'Serviceorganisatie Jeugd',
    timing: 'Q1 2027',
    description:
      'SoJ communiceert dat transparantie op \u2018kwaliteit als medicijn\u2019 als criterium wordt opgenomen in contractering',
    colorClasses: {
      dot: 'bg-blue-600',
      card: 'border-blue-200 bg-blue-50/60',
      badge: 'bg-blue-100 text-blue-800',
      text: 'text-blue-900',
      line: 'text-blue-300',
    },
  },
  {
    actor: 'Kopgroep',
    label: 'Kopgroep (8 voorlopers)',
    timing: 'Q2 2027',
    description:
      'Kopgroep merkt dat hun rol in de beweging serieus is en zet door met nieuwe initiatieven',
    colorClasses: {
      dot: 'bg-emerald-600',
      card: 'border-emerald-200 bg-emerald-50/60',
      badge: 'bg-emerald-100 text-emerald-800',
      text: 'text-emerald-900',
      line: 'text-emerald-300',
    },
  },
  {
    actor: 'SOJ',
    label: 'Serviceorganisatie Jeugd',
    timing: 'Q3-Q4 2027',
    description:
      'SoJ past de contracten/voorwaarden aan in de nieuwe contracteringsronde',
    colorClasses: {
      dot: 'bg-blue-600',
      card: 'border-blue-200 bg-blue-50/60',
      badge: 'bg-blue-100 text-blue-800',
      text: 'text-blue-900',
      line: 'text-blue-300',
    },
  },
  {
    actor: 'Alle aanbieders',
    label: 'Alle aanbieders',
    timing: '2028',
    description:
      'Alle aanbieders moeten zo werken, anders geen contract',
    colorClasses: {
      dot: 'bg-amber-500',
      card: 'border-amber-200 bg-amber-50/60',
      badge: 'bg-amber-100 text-amber-800',
      text: 'text-amber-900',
      line: 'text-amber-300',
    },
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
      {/*  SECTION A: KWALITEIT ALS MEDICIJN — HET GEDACHTEGOED         */}
      {/* ============================================================ */}
      <section className="mt-16">
        <div className="flex items-start gap-3">
          <Lightbulb className="mt-1 h-6 w-6 shrink-0 text-primary-600" />
          <h2 className="text-2xl font-bold text-foreground">
            Kwaliteit als Medicijn — Het Gedachtegoed
          </h2>
        </div>
        <div className="mt-6 rounded-xl border-l-4 border-primary-500 bg-primary-50/60 p-6 sm:p-8">
          <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
            <strong className="text-foreground">Kwaliteit als Medicijn</strong> is gebaseerd op een
            simpel maar krachtig inzicht: wanneer je de kwaliteit van zorg verhoogt, dalen volumes en
            kosten vanzelf. Niet door te bezuinigen, niet door te rantsoeneren, maar door betere zorg
            te leveren. Het concept is ontwikkeld door Frederick Latour bij het Bernhoven ziekenhuis
            en bewezen in de curatieve zorg (Bernhoven, Rivas: 7-13% volumereductie).
          </p>
        </div>

        {/* De Drie Pijlers */}
        <div className="mt-10">
          <div className="flex items-start gap-3">
            <Shield className="mt-1 h-6 w-6 shrink-0 text-primary-600" />
            <h3 className="text-xl font-bold text-foreground">De Drie Pijlers</h3>
          </div>
          <p className="mt-3 text-gray-600">
            Het Kwaliteit als Medicijn-gedachtegoed rust op drie dragende pijlers.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
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
                      <div>
                        <h4 className="text-lg font-bold text-foreground">{pillar.title}</h4>
                        <p className="text-xs font-medium text-gray-500">{pillar.subtitle}</p>
                      </div>
                    </div>
                    <p className={`mt-4 text-sm leading-relaxed ${pillar.textColor}`}>
                      {pillar.description}
                    </p>
                    {pillar.bullets && (
                      <ul className="mt-3 space-y-1.5">
                        {pillar.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs leading-relaxed text-gray-600">
                            <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-gray-400" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  VAN BEWIJS NAAR PRAKTIJK                                     */}
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
      {/*  SECTION B: VERTALING NAAR JEUGDZORG ZUID-HOLLAND ZUID        */}
      {/* ============================================================ */}
      <section className="mt-16">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-1 h-6 w-6 shrink-0 text-accent-600" />
          <h2 className="text-2xl font-bold text-foreground">
            Vertaling naar Jeugdzorg Zuid-Holland Zuid
          </h2>
        </div>
        <div className="mt-6 rounded-xl border-l-4 border-accent-500 bg-accent-50/60 p-6 sm:p-8">
          <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
            Het algemene Kwaliteit als Medicijn-gedachtegoed wordt nu specifiek vertaald naar de
            jeugd-GGZ in de regio Zuid-Holland Zuid. De drie pijlers krijgen een eigen invulling
            voor de jeugdzorgcontext, gedragen door een{' '}
            <strong className="text-foreground">kopgroep van 8 voorloper-aanbieders</strong> die
            met 5 concrete initiatieven het verschil bewijzen.
          </p>
        </div>

        {/* ZHZ Drie Pijlers */}
        <div className="mt-10">
          <h3 className="text-lg font-bold text-foreground">
            De drie pijlers vertaald naar jeugdzorg
          </h3>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {zhzPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className={`rounded-xl border ${pillar.borderColor} ${pillar.bgColor} p-5`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`h-5 w-5 ${pillar.color}`} />
                    <h4 className="font-bold text-foreground">{pillar.title}</h4>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5 Initiatieven & Kopgroep */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-surface-200 bg-white p-6">
            <h4 className="font-bold text-foreground">De 5 Initiatieven</h4>
            <ul className="mt-4 space-y-3">
              {[
                'Overbruggingszorg',
                'Brede Intake',
                'Kracht van Kort',
                'Gezinsgerichte Aanpak',
                'Integraal Zorgaanbod',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-surface-200 bg-white p-6">
            <h4 className="font-bold text-foreground">De Kopgroep</h4>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Een groep van <strong>8 voorloper-aanbieders</strong> die als eersten de
              KAM-principes in de praktijk brengen. Zij ontwikkelen, testen en bewijzen dat het
              werkt — en inspireren daarmee de overige aanbieders in de regio om te volgen.
            </p>
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
              <Users className="h-4 w-4 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-800">
                8 frontrunner-aanbieders in Zuid-Holland Zuid
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  VUIST OP VUIST — INTERACTIEVE TIJDLIJN                      */}
      {/* ============================================================ */}
      <section className="mt-16">
        <div className="flex items-start gap-3">
          <Clock className="mt-1 h-6 w-6 shrink-0 text-primary-600" />
          <h2 className="text-2xl font-bold text-foreground">
            Het &lsquo;Vuist op Vuist&rsquo; Principe — Tijdlijn
          </h2>
        </div>
        <p className="mt-4 text-gray-600 leading-relaxed">
          De transformatie van jeugd-GGZ kan alleen slagen als drie partijen stap voor stap
          samen bewegen. Hieronder de tijdlijn van eind 2025 tot 2028:
        </p>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-blue-600" />
            <span className="text-sm font-medium text-gray-700">SOJ (Inkoper)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-emerald-600" />
            <span className="text-sm font-medium text-gray-700">Kopgroep (8 voorlopers)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-amber-500" />
            <span className="text-sm font-medium text-gray-700">Aanbieders</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative mt-10">
          {/* Startpunt label */}
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-white">
              <ChevronDown className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold uppercase tracking-wider text-gray-500">
              Startpunt — eind 2025
            </span>
          </div>

          {/* Vertical connecting line */}
          <div className="absolute left-4 top-14 bottom-24 w-0.5 bg-gradient-to-b from-blue-300 via-emerald-300 to-amber-300" />

          {/* Timeline steps */}
          <div className="space-y-0">
            {timelineSteps.map((step, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className="relative pb-8 last:pb-0"
                  style={{
                    animation: `fadeSlideIn 0.5s ease-out ${idx * 0.1}s both`,
                  }}
                >
                  {/* Dot on the line */}
                  <div
                    className={`absolute left-4 top-5 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full ${step.colorClasses.dot} ring-4 ring-white`}
                    style={{
                      left: '1.0625rem',
                    }}
                  />

                  {/* Card — zigzag with offset */}
                  <div
                    className={`ml-12 ${
                      isLeft ? 'sm:mr-[25%]' : 'sm:ml-[25%]'
                    }`}
                  >
                    <div
                      className={`rounded-xl border ${step.colorClasses.card} p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5`}
                    >
                      {/* Header: badge + timing */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${step.colorClasses.badge}`}
                        >
                          {step.actor}
                        </span>
                        <span className="text-xs font-medium text-gray-400">{step.timing}</span>
                      </div>

                      {/* Description */}
                      <p className={`mt-2 text-sm font-medium leading-relaxed ${step.colorClasses.text}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Eindpunt label */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-white">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold uppercase tracking-wider text-gray-500">
              Eindpunt — 2028
            </span>
          </div>
        </div>

        {/* Side annotation */}
        <div className="mt-8 rounded-xl bg-gradient-to-r from-primary-50 to-amber-50 p-5 sm:p-6 border border-primary-100">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
            <p className="text-sm leading-relaxed text-gray-700">
              <strong className="text-foreground">Rode draad door het hele traject:</strong>{' '}
              Door te anticiperen op de nieuwe opzet van contractering ontstaan nu al prikkels om
              te werken aan passende zorg. Elke stap bouwt voort op de vorige — de cascade van
              actie en reactie tussen SOJ, kopgroep en aanbieders creëert een onomkeerbare
              beweging richting kwaliteitsgedreven jeugdzorg.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WAAROM DIT ANDERS IS DAN 'GEWOON BEZUINIGEN'                 */}
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
      {/*  CALL TO ACTION                                               */}
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

      {/* CSS-only animations for server component compatibility */}
      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
