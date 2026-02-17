'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Users,
  Clock,
  Heart,
  Building2,
  MessageSquare,
  Mail,
  CalendarDays,
  Upload,
  Award,
  Lightbulb,
  CheckCircle2,
  MapPin,
  BarChart3,
  ChevronRight,
  Footprints,
  Stethoscope,
  Landmark,
  Sparkles,
  AlertTriangle,
  Target,
  Zap,
  GripVertical,
  User,
  Briefcase,
  Send,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  INITIATIVE SUMMARY DATA (slim version for home page)               */
/* ------------------------------------------------------------------ */

const initiatievenSummary = [
  {
    id: 1,
    titel: 'Overbruggingszorg',
    aanbieder: 'De Hoop',
    oneLiner: 'Actieve begeleiding tijdens de wachtlijst voorkomt escalatie en onnodige GGZ-instroom.',
    besparing: '~11%',
    color: 'sky',
  },
  {
    id: 2,
    titel: 'Brede Intake',
    aanbieder: 'Parnassia',
    oneLiner: 'Expert + ervaringsdeskundige bij de intake zorgt dat 40% naar lichtere zorg verschuift.',
    besparing: '~14%',
    color: 'violet',
  },
  {
    id: 3,
    titel: 'De Kracht van Kort',
    aanbieder: 'Perspectief & Eleos',
    oneLiner: 'Doelgerichte, kortdurende behandeling met heldere afspraken over duur en doelen.',
    besparing: '~10-20%',
    color: 'amber',
  },
  {
    id: 4,
    titel: 'Gezinsgerichte Aanpak',
    aanbieder: 'FamilySupporters',
    oneLiner: 'Het hele gezinssysteem betrekken in plaats van alleen het kind met een label.',
    besparing: 'In ontwikkeling',
    color: 'teal',
  },
  {
    id: 5,
    titel: 'Integraal Zorgaanbod',
    aanbieder: 'CareHouse',
    oneLiner: 'Behandeling en begeleiding parallel aanbieden met groepsbegeleiding.',
    besparing: 'In ontwikkeling',
    color: 'orange',
  },
];

const summaryColorMap: Record<string, { bg: string; border: string; text: string; badge: string; dot: string }> = {
  sky: { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-800', badge: 'bg-sky-100 text-sky-700', dot: 'bg-sky-400' },
  violet: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-800', badge: 'bg-violet-100 text-violet-700', dot: 'bg-violet-400' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', badge: 'bg-amber-100 text-amber-700', dot: 'bg-amber-400' },
  teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-800', badge: 'bg-teal-100 text-teal-700', dot: 'bg-teal-400' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', badge: 'bg-orange-100 text-orange-700', dot: 'bg-orange-400' },
};

/* ------------------------------------------------------------------ */
/*  CLIENT JOURNEY SECTION                                             */
/* ------------------------------------------------------------------ */

const journeyStages = [
  {
    id: 1,
    label: 'Jeugdige nog niet in beeld',
    short: 'Nog niet in beeld',
    initiatives: [] as { num: number; title: string; provider: string; effect: string; saving: string; color: string }[],
  },
  {
    id: 2,
    label: 'Tussen verwijzing en intake (wachtlijst)',
    short: 'Wachtlijst',
    initiatives: [
      {
        num: 1,
        title: 'The Bridge / Overbruggingszorg',
        provider: 'De Hoop',
        effect: '20% ziet af SGGZ, 40% naar BGGZ',
        saving: '~\u20AC2,0 mln (~11%)',
        color: 'sky',
      },
    ],
  },
  {
    id: 3,
    label: 'Intake & plan van aanpak',
    short: 'Intake',
    initiatives: [
      {
        num: 2,
        title: 'Brede Intake',
        provider: 'Parnassia',
        effect: '40% naar BGGZ/wijkteam',
        saving: '~\u20AC2,5 mln (~14%)',
        color: 'violet',
      },
    ],
  },
  {
    id: 4,
    label: 'Behandeltraject',
    short: 'Behandeling',
    initiatives: [
      {
        num: 3,
        title: 'Kracht van Kort',
        provider: 'Perspectief & Eleos',
        effect: '10-20% behandelverkorting',
        saving: '~\u20AC1,8-3,6 mln (~10-20%)',
        color: 'amber',
      },
      {
        num: 4,
        title: 'Gezinsgerichte Aanpak',
        provider: 'FamilySupporters & NeuroScan',
        effect: 'Integraal gezinsperspectief',
        saving: 'Niet gekwantificeerd',
        color: 'teal',
      },
      {
        num: 5,
        title: 'Integraal Zorgaanbod',
        provider: 'CareHouse',
        effect: 'Behandeling + begeleiding parallel',
        saving: 'Niet gekwantificeerd',
        color: 'orange',
      },
    ],
  },
  {
    id: 5,
    label: 'Afronding en nazorg',
    short: 'Afronding',
    initiatives: [] as { num: number; title: string; provider: string; effect: string; saving: string; color: string }[],
  },
];

const initiativeColorMap: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  sky:    { bg: 'bg-sky-50',    border: 'border-sky-300',    text: 'text-sky-800',    dot: 'bg-sky-400'    },
  violet: { bg: 'bg-violet-50', border: 'border-violet-300', text: 'text-violet-800', dot: 'bg-violet-400' },
  amber:  { bg: 'bg-amber-50',  border: 'border-amber-300',  text: 'text-amber-800',  dot: 'bg-amber-400'  },
  teal:   { bg: 'bg-teal-50',   border: 'border-teal-300',   text: 'text-teal-800',   dot: 'bg-teal-400'   },
  orange: { bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-800', dot: 'bg-orange-400' },
};

function ClientJourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="clientpad" className="scroll-mt-28 bg-white py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-3">
          <Footprints className="mt-1 h-7 w-7 shrink-0 text-primary-600" />
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Het Cli&euml;ntpad</h2>
            <p className="mt-1 text-gray-500">
              Van eerste signaal tot nazorg &mdash; waar grijpen de initiatieven aan?
            </p>
          </div>
        </div>

        {/* Journey stages - horizontal */}
        <div className="mt-10 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-[38px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200 rounded-full z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {journeyStages.map((stage, idx) => (
              <div
                key={stage.id}
                className="flex flex-col items-center"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `opacity 0.6s ease ${idx * 0.15}s, transform 0.6s ease ${idx * 0.15}s`,
                }}
              >
                {/* Node */}
                <div className="relative flex items-center justify-center w-[76px] h-[76px] rounded-full bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-200">
                  <span className="text-xl font-extrabold">{stage.id}</span>
                  {idx < journeyStages.length - 1 && (
                    <ChevronRight className="hidden lg:block absolute -right-5 h-5 w-5 text-primary-400" />
                  )}
                </div>

                {/* Label */}
                <p className="mt-3 text-center text-sm font-semibold text-gray-800 leading-tight max-w-[160px]">
                  {stage.short}
                </p>
                <p className="text-center text-xs text-gray-400 leading-tight mt-0.5 max-w-[180px]">
                  {stage.label}
                </p>

                {/* Initiative cards popping in */}
                <div className="mt-4 space-y-3 w-full">
                  {stage.initiatives.map((init, iIdx) => {
                    const ic = initiativeColorMap[init.color] || initiativeColorMap.sky;
                    return (
                      <Link
                        key={init.num}
                        href={`/initiatieven#initiatief-${init.num}`}
                        className={`block rounded-xl border-2 ${ic.border} ${ic.bg} p-3 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer`}
                        style={{
                          opacity: visible ? 1 : 0,
                          transform: visible ? 'scale(1)' : 'scale(0.85)',
                          transition: `opacity 0.5s ease ${idx * 0.15 + 0.4 + iIdx * 0.15}s, transform 0.5s ease ${idx * 0.15 + 0.4 + iIdx * 0.15}s`,
                        }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`w-2.5 h-2.5 rounded-full ${ic.dot}`} />
                          <span className={`text-xs font-bold ${ic.text}`}>Initiatief {init.num}</span>
                        </div>
                        <p className={`text-sm font-semibold ${ic.text} leading-tight`}>{init.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{init.provider}</p>
                        <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{init.effect}</p>
                        <p className={`text-xs font-bold ${ic.text} mt-1`}>{init.saving}</p>
                      </Link>
                    );
                  })}
                  {stage.initiatives.length === 0 && (
                    <div
                      className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-3 text-center"
                      style={{
                        opacity: visible ? 1 : 0,
                        transition: `opacity 0.5s ease ${idx * 0.15 + 0.4}s`,
                      }}
                    >
                      <p className="text-xs text-gray-400 italic">Nog geen KAM-interventie in dit stadium</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom summary */}
        <div
          className="mt-10 rounded-2xl bg-gradient-to-r from-primary-700 to-primary-800 p-5 text-white text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease 1.2s, transform 0.6s ease 1.2s',
          }}
        >
          <p className="text-sm text-primary-200">Totaal besparingspotentieel gecorrigeerd voor overlap</p>
          <p className="mt-1 text-2xl sm:text-3xl font-bold">&euro;2,9 - &euro;3,8 mln (~15-20%)</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CUMULATIVE SAVINGS SECTION                                         */
/* ------------------------------------------------------------------ */

const savingsData = {
  years: ['2025', '2026', '2027', '2028', '2029'],
  historicalGrowth: [18.0, 18.9, 19.8, 20.8, 21.8],
  historicalWithKAM: [18.0, 18.1, 17.8, 17.5, 17.4],
  autonomeGroei: [18.0, 18.5, 18.8, 19.0, 19.1],
  autonomeWithKAM: [18.0, 17.8, 17.0, 16.2, 15.3],
  cumulativeSavingsHistorical: [0.0, 0.8, 2.8, 6.1, 10.5],
  cumulativeSavingsAutonome: [0.0, 0.7, 2.5, 5.3, 9.1],
};

function LineChart({
  baseline,
  withKAM,
  cumulative,
  years,
  visible,
  baselineColor,
  baselineLabel,
}: {
  baseline: number[];
  withKAM: number[];
  cumulative: number[];
  years: string[];
  visible: boolean;
  baselineColor: string;
  baselineLabel: string;
}) {
  const allValues = [...baseline, ...withKAM];
  const minVal = Math.floor(Math.min(...allValues) - 1);
  const maxVal = Math.ceil(Math.max(...allValues) + 1);
  const range = maxVal - minVal;

  // SVG dimensions
  const W = 600;
  const H = 300;
  const padL = 50;
  const padR = 30;
  const padT = 30;
  const padB = 40;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const toX = (i: number) => padL + (i / (years.length - 1)) * chartW;
  const toY = (v: number) => padT + ((maxVal - v) / range) * chartH;

  const baselinePath = baseline.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(v)}`).join(' ');
  const kamPath = withKAM.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(v)}`).join(' ');

  // Area between the two lines (from index 1 onward where they diverge)
  const areaPath = [
    `M${toX(1)},${toY(baseline[1])}`,
    ...baseline.slice(2).map((v, i) => `L${toX(i + 2)},${toY(v)}`),
    `L${toX(years.length - 1)},${toY(withKAM[years.length - 1])}`,
    ...[...withKAM].slice(1, -1).reverse().map((v, i) => `L${toX(years.length - 2 - i)},${toY(v)}`),
    'Z',
  ].join(' ');

  // Y-axis grid lines
  const yTicks: number[] = [];
  for (let v = Math.ceil(minVal); v <= Math.floor(maxVal); v += 1) {
    yTicks.push(v);
  }

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ maxHeight: '340px' }}>
        {/* Grid lines */}
        {yTicks.map((v) => (
          <g key={v}>
            <line x1={padL} y1={toY(v)} x2={W - padR} y2={toY(v)} stroke="#e5e7eb" strokeWidth={1} />
            <text x={padL - 8} y={toY(v) + 4} textAnchor="end" fontSize={11} fill="#9ca3af">
              {v}
            </text>
          </g>
        ))}

        {/* Y-axis label */}
        <text x={14} y={padT + chartH / 2} textAnchor="middle" fontSize={11} fill="#6b7280" transform={`rotate(-90, 14, ${padT + chartH / 2})`}>
          &euro; mln
        </text>

        {/* X-axis labels */}
        {years.map((year, i) => (
          <text key={year} x={toX(i)} y={H - 8} textAnchor="middle" fontSize={12} fontWeight={600} fill="#374151">
            {year}
          </text>
        ))}

        {/* Shaded area between lines (besparingspotentieel) */}
        <path
          d={areaPath}
          fill="#10b981"
          opacity={visible ? 0.18 : 0}
          style={{ transition: 'opacity 1s ease 0.5s' }}
        />

        {/* Baseline line */}
        <path
          d={baselinePath}
          fill="none"
          stroke={baselineColor}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={visible ? '0' : '1000'}
          strokeDashoffset={visible ? '0' : '1000'}
          style={{ transition: 'stroke-dashoffset 1.5s ease 0.2s' }}
        />

        {/* KAM line */}
        <path
          d={kamPath}
          fill="none"
          stroke="#10b981"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={visible ? '0' : '1000'}
          strokeDashoffset={visible ? '0' : '1000'}
          style={{ transition: 'stroke-dashoffset 1.5s ease 0.4s' }}
        />

        {/* Data points & labels for baseline */}
        {baseline.map((v, i) => (
          <g key={`b-${i}`}>
            <circle
              cx={toX(i)} cy={toY(v)} r={5}
              fill={baselineColor} stroke="white" strokeWidth={2}
              opacity={visible ? 1 : 0}
              style={{ transition: `opacity 0.4s ease ${0.3 + i * 0.15}s` }}
            />
            <text
              x={toX(i)} y={toY(v) - 12}
              textAnchor="middle" fontSize={11} fontWeight={700}
              fill={baselineColor}
              opacity={visible ? 1 : 0}
              style={{ transition: `opacity 0.4s ease ${0.3 + i * 0.15}s` }}
            >
              {v.toFixed(1)}
            </text>
          </g>
        ))}

        {/* Data points & labels for KAM */}
        {withKAM.map((v, i) => (
          <g key={`k-${i}`}>
            <circle
              cx={toX(i)} cy={toY(v)} r={5}
              fill="#10b981" stroke="white" strokeWidth={2}
              opacity={visible ? 1 : 0}
              style={{ transition: `opacity 0.4s ease ${0.5 + i * 0.15}s` }}
            />
            <text
              x={toX(i)} y={toY(v) + 20}
              textAnchor="middle" fontSize={11} fontWeight={700}
              fill="#059669"
              opacity={visible ? 1 : 0}
              style={{ transition: `opacity 0.4s ease ${0.5 + i * 0.15}s` }}
            >
              {v.toFixed(1)}
            </text>
          </g>
        ))}

        {/* Saving annotations between the lines */}
        {years.map((_, i) => {
          if (i === 0) return null;
          const saving = baseline[i] - withKAM[i];
          const midY = (toY(baseline[i]) + toY(withKAM[i])) / 2;
          return (
            <g key={`s-${i}`}>
              {/* Dashed connector */}
              <line
                x1={toX(i)} y1={toY(baseline[i]) + 6}
                x2={toX(i)} y2={toY(withKAM[i]) - 6}
                stroke="#10b981" strokeWidth={1} strokeDasharray="3,3"
                opacity={visible ? 0.5 : 0}
                style={{ transition: `opacity 0.5s ease ${0.8 + i * 0.1}s` }}
              />
              {/* Saving label in the middle */}
              <rect
                x={toX(i) - 28} y={midY - 10}
                width={56} height={20} rx={10}
                fill="#ecfdf5" stroke="#a7f3d0" strokeWidth={1}
                opacity={visible ? 1 : 0}
                style={{ transition: `opacity 0.5s ease ${0.8 + i * 0.1}s` }}
              />
              <text
                x={toX(i)} y={midY + 4}
                textAnchor="middle" fontSize={10} fontWeight={800}
                fill="#059669"
                opacity={visible ? 1 : 0}
                style={{ transition: `opacity 0.5s ease ${0.8 + i * 0.1}s` }}
              >
                -&euro;{saving.toFixed(1)}M
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-4 h-1 rounded-full" style={{ backgroundColor: baselineColor }} />
          <span className="text-gray-600">{baselineLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-1 rounded-full bg-emerald-500" />
          <span className="text-gray-600">Met KAM-interventies</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-3 rounded-sm bg-emerald-500/20" />
          <span className="text-gray-600">Besparingspotentieel</span>
        </div>
      </div>

      {/* Cumulative savings row */}
      <div className="mt-6 rounded-xl bg-emerald-50 border border-emerald-200 p-4">
        <p className="text-sm font-semibold text-emerald-800 mb-3">Cumulatieve besparing t.o.v. scenario zonder KAM</p>
        <div className="grid grid-cols-5 gap-2">
          {years.map((year, idx) => (
            <div key={year} className="text-center">
              <div
                className="rounded-lg bg-emerald-100 p-2"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(10px)',
                  transition: `opacity 0.5s ease ${0.8 + idx * 0.1}s, transform 0.5s ease ${0.8 + idx * 0.1}s`,
                }}
              >
                <p className="text-lg sm:text-xl font-extrabold text-emerald-700">
                  &euro;{cumulative[idx].toFixed(1)}M
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-1">{year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CumulativeSavingsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeScenario, setActiveScenario] = useState<'historical' | 'autonome'>('historical');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const baseline = activeScenario === 'historical' ? savingsData.historicalGrowth : savingsData.autonomeGroei;
  const withKAM = activeScenario === 'historical' ? savingsData.historicalWithKAM : savingsData.autonomeWithKAM;
  const cumulative = activeScenario === 'historical' ? savingsData.cumulativeSavingsHistorical : savingsData.cumulativeSavingsAutonome;

  return (
    <section ref={sectionRef} id="besparingspotentieel" className="scroll-mt-28 bg-surface-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-3">
          <BarChart3 className="mt-1 h-7 w-7 shrink-0 text-primary-600" />
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Cumulatief Besparingspotentieel</h2>
            <p className="mt-1 text-gray-500">
              Projectie 2025&ndash;2029 &mdash; het groeiende vlak tussen de lijnen toont het besparingspotentieel
            </p>
          </div>
        </div>

        {/* Scenario toggle */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setActiveScenario('historical')}
            className={`flex-1 rounded-xl p-4 border-2 transition-all text-left ${
              activeScenario === 'historical'
                ? 'border-red-400 bg-red-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-red-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <TrendingUp className={`h-5 w-5 ${activeScenario === 'historical' ? 'text-red-500' : 'text-gray-400'}`} />
              <span className={`font-semibold text-sm ${activeScenario === 'historical' ? 'text-red-800' : 'text-gray-700'}`}>
                Scenario 1: Historische groei zet door
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Kosten blijven stijgen met ~5% per jaar</p>
          </button>
          <button
            onClick={() => setActiveScenario('autonome')}
            className={`flex-1 rounded-xl p-4 border-2 transition-all text-left ${
              activeScenario === 'autonome'
                ? 'border-amber-400 bg-amber-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-amber-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <TrendingUp className={`h-5 w-5 ${activeScenario === 'autonome' ? 'text-amber-500' : 'text-gray-400'}`} />
              <span className={`font-semibold text-sm ${activeScenario === 'autonome' ? 'text-amber-800' : 'text-gray-700'}`}>
                Scenario 2: Autonome groei stabiliseert
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Groei vlakt af richting 0%</p>
          </button>
        </div>

        {/* Chart area */}
        <div className="mt-8 rounded-2xl bg-white border border-surface-200 p-6 sm:p-8 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Jeugd-GGZ kosten ZHZ (&euro;mln)
              </h3>
              <p className="text-xs text-gray-400 mt-1">Basis: ~&euro;18 mln huidig, KAM-interventies 15-20% reductie opbouwend over 3 jaar</p>
            </div>
          </div>

          <LineChart
            baseline={baseline}
            withKAM={withKAM}
            cumulative={cumulative}
            years={savingsData.years}
            visible={visible}
            baselineColor={activeScenario === 'historical' ? '#f87171' : '#fbbf24'}
            baselineLabel={activeScenario === 'historical' ? 'Zonder KAM (hist. groei ~5%/j)' : 'Zonder KAM (autonome groei)'}
          />

          <p className="mt-4 text-xs text-gray-400 leading-relaxed">
            * Projectiecijfers zijn indicatief en gebaseerd op het besparingspotentieel van 15-20% bij volledige
            implementatie van de KAM-initiatieven, opbouwend over ~3 jaar. Werkelijke resultaten zijn afhankelijk van
            adoptiegraad, contractering en externe factoren.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SCROLLYTELLING DATA STORY                                          */
/* ------------------------------------------------------------------ */

const storySteps = [
  {
    number: '€1,3 mrd',
    label: 'Totale kosten jeugdzorg Nederland',
    description: 'De uitgaven aan jeugd-GGZ zijn in 10 jaar met 132% gestegen. Gemeenten komen structureel geld tekort.',
    icon: AlertTriangle,
    color: 'from-red-500 to-orange-500',
    bgGlow: 'bg-red-500',
  },
  {
    number: '90%',
    label: 'van gemeenten overschrijdt het jeugdzorgbudget',
    description: 'Vrijwel elke gemeente kampt met tekorten. De huidige aanpak is onhoudbaar — niet voor gemeenten, niet voor aanbieders, niet voor jongeren.',
    icon: Building2,
    color: 'from-orange-500 to-amber-500',
    bgGlow: 'bg-orange-500',
  },
  {
    number: '15-20%',
    label: 'volumereductie is haalbaar',
    description: 'Onderzoek bij Bernhoven en Rivas toont aan: met de juiste aanpak kan 7-13% reductie in 2 jaar. Met 5 gecombineerde initiatieven is 15-20% realistisch.',
    icon: Target,
    color: 'from-emerald-500 to-teal-500',
    bgGlow: 'bg-emerald-500',
  },
  {
    number: '5',
    label: 'bewezen initiatieven, 8 koplopers',
    description: 'De kopgroep van 8 aanbieders in Zuid-Holland Zuid test 5 concrete interventies. Van overbruggingszorg tot kortdurende behandeling — samen goed voor €2,9 tot €3,8 mln besparing.',
    icon: Zap,
    color: 'from-primary-500 to-indigo-500',
    bgGlow: 'bg-primary-500',
  },
];

function DataStorySection() {
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stepRefs.current.forEach((ref, idx) => {
      if (!ref) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSteps((prev) => new Set(prev).add(idx));
            obs.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(ref);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section id="het-probleem" className="scroll-mt-28 relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-indigo-900 py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">Waarom dit ertoe doet</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">De jeugdzorg staat onder druk</h2>
        </div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-red-500/50 via-amber-500/50 to-emerald-500/50" />

          <div className="space-y-12">
            {storySteps.map((step, idx) => {
              const isVisible = visibleSteps.has(idx);
              const StepIcon = step.icon;
              return (
                <div
                  key={idx}
                  ref={(el) => { stepRefs.current[idx] = el; }}
                  className="relative flex gap-6 sm:gap-8"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-40px)',
                    transition: `opacity 0.8s ease ${idx * 0.1}s, transform 0.8s ease ${idx * 0.1}s`,
                  }}
                >
                  {/* Node */}
                  <div className="relative shrink-0">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <StepIcon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                    </div>
                    {/* Glow */}
                    <div className={`absolute inset-0 ${step.bgGlow} rounded-full blur-xl opacity-30`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <p className={`text-3xl sm:text-5xl font-extrabold bg-gradient-to-r ${step.color} bg-clip-text text-transparent leading-tight`}>
                      {step.number}
                    </p>
                    <p className="mt-1 text-lg sm:text-xl font-semibold text-white/90">{step.label}</p>
                    <p className="mt-2 text-sm sm:text-base text-slate-400 leading-relaxed max-w-lg">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA to scroll down */}
        <div className="mt-16 text-center">
          <a
            href="#initiatieven"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-all"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('initiatieven')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Ontdek onze bijdrage aan een oplossing
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  BEFORE/AFTER VEENDAM SLIDER                                        */
/* ------------------------------------------------------------------ */

function VeendamBeforeAfter() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      updatePosition(clientX);
    };
    const handleUp = () => { isDragging.current = false; };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [updatePosition]);

  const beforeItems = [
    { label: 'Aanbieders', value: '220', sub: 'gefragmenteerd veld' },
    { label: 'Wachtlijsten', value: 'Maanden', sub: 'lange wachttijden' },
    { label: 'Kosten', value: 'Stijgend', sub: 'boven budget' },
    { label: 'Verwijzingen', value: '100%', sub: 'naar specialistische zorg' },
  ];

  const afterItems = [
    { label: 'Aanbieders', value: '6', sub: 'in JEP-samenwerkingsverband' },
    { label: 'Wachtlijsten', value: '0', sub: 'volledig verdwenen' },
    { label: 'Kosten', value: '-13%', sub: 'kostenreductie' },
    { label: 'Verwijzingen', value: '43%', sub: '57% voorkomen' },
  ];

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl border border-green-200 bg-white select-none touch-none"
      style={{ height: 320 }}
    >
      {/* VOOR (left) */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-4">Voor</p>
        <div className="space-y-4">
          {beforeItems.map((item) => (
            <div key={item.label}>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-red-600">{item.value}</span>
                <span className="text-sm font-semibold text-red-800">{item.label}</span>
              </div>
              <p className="text-xs text-red-400">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* NA (right) - clipped by position */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-50 p-6 sm:p-8"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">Na (2024)</p>
        <div className="space-y-4">
          {afterItems.map((item) => (
            <div key={item.label}>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-emerald-600">{item.value}</span>
                <span className="text-sm font-semibold text-emerald-800">{item.label}</span>
              </div>
              <p className="text-xs text-emerald-400">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        onMouseDown={() => { isDragging.current = true; }}
        onTouchStart={() => { isDragging.current = true; }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl border-2 border-green-300 flex items-center justify-center">
          <GripVertical className="w-4 h-4 text-green-600" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  STICKY SECTION NAV                                                 */
/* ------------------------------------------------------------------ */

const navSections = [
  { id: 'het-probleem', label: 'Het Probleem' },
  { id: 'initiatieven', label: 'Initiatieven' },
  { id: 'clientpad', label: 'Cli\u00ebntpad' },
  { id: 'besparingspotentieel', label: 'Besparingen' },
  { id: 'succesverhaal', label: 'Succesverhaal' },
  { id: 'roadmap', label: 'Waar staan we' },
  { id: 'wie-ben-jij', label: 'Voor jou' },
  { id: 'doe-mee', label: 'Doe mee' },
];

function StickyNav() {
  const [activeSection, setActiveSection] = useState('initiatieven');
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const handleScroll = useCallback(() => {
    // Determine if nav is sticky
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      setIsSticky(rect.top <= 64);
    }

    // Determine active section
    const scrollY = window.scrollY + 150;
    for (let i = navSections.length - 1; i >= 0; i--) {
      const el = document.getElementById(navSections[i].id);
      if (el && el.offsetTop <= scrollY) {
        setActiveSection(navSections[i].id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <nav
      ref={navRef}
      className={`sticky top-16 z-30 transition-all duration-200 ${
        isSticky
          ? 'bg-white/95 backdrop-blur-md border-b border-surface-200 shadow-sm'
          : 'bg-white'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {navSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeSection === section.id
                  ? 'bg-primary-100 text-primary-800 shadow-sm'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {section.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  SIGNUP FORM                                                        */
/* ------------------------------------------------------------------ */

function SignupForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="mt-10 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 text-center max-w-xl mx-auto">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-400/20 mx-auto mb-4">
          <Sparkles className="h-7 w-7 text-green-300" />
        </div>
        <h3 className="text-lg font-bold text-white">Welkom bij de beweging!</h3>
        <p className="mt-2 text-sm text-white/70 max-w-xs mx-auto">
          Bedankt voor je interesse. In de definitieve versie ontvang je een bevestiging per
          e-mail met volgende stappen.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-4 text-xs text-white/50 underline hover:text-white/70 transition"
        >
          Opnieuw invullen
        </button>
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-white mb-2">Aanmelden</h3>
      <p className="text-sm text-white/70 mb-6 leading-relaxed">
        Enthousiast? Meld je aan om op de hoogte te blijven en mee te doen met de kopgroep.
        Verbind je met andere professionals en draag bij aan passende jeugdzorg.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="signup-naam" className="block text-xs font-medium text-white/70 mb-1">
              Naam
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                id="signup-naam"
                type="text"
                placeholder="Bijv. Jan de Vries"
                className="w-full rounded-lg bg-white/10 border border-white/20 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
          </div>
          <div>
            <label htmlFor="signup-email" className="block text-xs font-medium text-white/70 mb-1">
              E-mailadres
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                id="signup-email"
                type="email"
                placeholder="jan@organisatie.nl"
                className="w-full rounded-lg bg-white/10 border border-white/20 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
          </div>
          <div>
            <label htmlFor="signup-org" className="block text-xs font-medium text-white/70 mb-1">
              Organisatie
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                id="signup-org"
                type="text"
                placeholder="Bijv. GGZ Drechtsteden"
                className="w-full rounded-lg bg-white/10 border border-white/20 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
          </div>
          <div>
            <label htmlFor="signup-rol" className="block text-xs font-medium text-white/70 mb-1">
              Rol / Functie
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                id="signup-rol"
                type="text"
                placeholder="Bijv. GZ-psycholoog, Beleidsadviseur"
                className="w-full rounded-lg bg-white/10 border border-white/20 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-teal-700 shadow-lg hover:bg-white/90 transition"
        >
          <Send className="h-4 w-4" />
          Sluit je aan
        </button>
        <p className="mt-3 text-center text-xs text-white/40">
          Dit is een demo-formulier. Geen gegevens worden opgeslagen.
        </p>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE                                                          */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-16 left-1/4 h-64 w-64 rounded-full bg-primary-300 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-200">
            Kwaliteit als Medicijn &mdash; Jeugdzorg
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Samen werken aan<br />passende jeugdzorg
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-100 leading-relaxed">
            Van elkaar leren, informatie delen, initiatieven die werken opschalen &mdash; en met elkaar in contact
            komen. Dit platform brengt zorgaanbieders, gemeenten en professionals samen rondom het
            Kwaliteit als Medicijn-gedachtegoed voor de jeugdzorg in Zuid-Holland Zuid.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#initiatieven"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-800 shadow-lg hover:bg-primary-50 transition"
            >
              Bekijk de 5 initiatieven
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              <BarChart3 className="h-4 w-4" />
              Impact Dashboard
            </Link>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              <Lightbulb className="h-4 w-4" />
              Test je kennis
            </Link>
            <Link
              href="/community"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-emerald-400 transition"
            >
              <Heart className="h-4 w-4" />
              Doe mee!
            </Link>
          </div>

          {/* Quick stats */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: 'Potenti\u00eble volumereductie', value: '15-20%', icon: TrendingDown },
              { label: 'Kopgroep aanbieders', value: '8', icon: Building2 },
              { label: 'Gemeenten in ZHZ', value: '10', icon: MapPin },
              { label: 'Actieve initiatieven', value: '5', icon: Lightbulb },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-white/10 backdrop-blur-sm p-4 text-center"
              >
                <stat.icon className="mx-auto h-5 w-5 text-primary-200" />
                <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                <p className="mt-1 text-xs text-primary-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DOELGROEP ROUTING ============ */}
      <section className="bg-surface-50 border-b border-surface-200 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">
            Ik ben...
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Link
              href="/gemeentekaart"
              className="group flex flex-col items-center rounded-xl border-2 border-surface-200 bg-white p-4 text-center hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-100 text-primary-700 group-hover:bg-primary-200 transition-colors">
                <Landmark className="h-5 w-5" />
              </div>
              <span className="mt-2 text-sm font-semibold text-gray-800">Wethouder</span>
              <span className="mt-0.5 text-[11px] text-gray-400 leading-tight">Wat kost jeugdzorg in mijn gemeente?</span>
            </Link>

            <Link
              href="/kwaliteit-als-medicijn"
              className="group flex flex-col items-center rounded-xl border-2 border-surface-200 bg-white p-4 text-center hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-100 text-primary-700 group-hover:bg-primary-200 transition-colors">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="mt-2 text-sm font-semibold text-gray-800">Zorgaanbieder</span>
              <span className="mt-0.5 text-[11px] text-gray-400 leading-tight">Wat levert aansluiting mij op?</span>
            </Link>

            <Link
              href="/initiatieven"
              className="group flex flex-col items-center rounded-xl border-2 border-surface-200 bg-white p-4 text-center hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-sky-100 text-sky-700 group-hover:bg-sky-200 transition-colors">
                <Heart className="h-5 w-5" />
              </div>
              <span className="mt-2 text-sm font-semibold text-gray-800">Verwijzer / Huisarts</span>
              <span className="mt-0.5 text-[11px] text-gray-400 leading-tight">Welke trajecten kan ik inzetten?</span>
            </Link>

            <Link
              href="/quiz"
              className="group flex flex-col items-center rounded-xl border-2 border-surface-200 bg-white p-4 text-center hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-100 text-violet-700 group-hover:bg-violet-200 transition-colors">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="mt-2 text-sm font-semibold text-gray-800">Gewoon nieuwsgierig</span>
              <span className="mt-0.5 text-[11px] text-gray-400 leading-tight">Test je kennis in de quiz</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ STICKY SECTION NAV ============ */}
      <StickyNav />

      {/* ============ SCROLLYTELLING DATA STORY ============ */}
      <DataStorySection />

      {/* ============ INITIATIEVEN (SUMMARY CARDS) ============ */}
      <section id="initiatieven" className="scroll-mt-28 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-1 h-7 w-7 shrink-0 text-primary-600" />
            <div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                De 5 Initiatieven
              </h2>
              <p className="mt-1 text-gray-500">
                Kopgroep ZHZ &mdash; totaal besparingspotentieel &euro;2,9 - &euro;3,8 mln (~15-20%)
              </p>
            </div>
          </div>

          {/* Summary cards grid */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {initiatievenSummary.map((init) => {
              const colors = summaryColorMap[init.color] || summaryColorMap.sky;
              return (
                <Link
                  key={init.id}
                  href="/initiatieven"
                  className={`group rounded-xl border-2 ${colors.border} ${colors.bg} p-5 transition-all hover:shadow-md hover:-translate-y-0.5`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${colors.dot}`} />
                      <span className={`text-xs font-bold ${colors.text}`}>Initiatief {init.id}</span>
                    </div>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${colors.badge}`}>
                      {init.besparing}
                    </span>
                  </div>
                  <h3 className={`mt-2 text-lg font-bold ${colors.text}`}>{init.titel}</h3>
                  <p className="mt-0.5 text-xs text-gray-500">{init.aanbieder}</p>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{init.oneLiner}</p>
                  <span className={`mt-3 inline-flex items-center gap-1 text-xs font-medium ${colors.text} group-hover:gap-2 transition-all`}>
                    Lees meer <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              );
            })}

            {/* CTA card to full page */}
            <Link
              href="/initiatieven"
              className="group flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary-300 bg-primary-50/50 p-5 text-center transition-all hover:border-primary-400 hover:bg-primary-50 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600 group-hover:bg-primary-200 transition-colors">
                <ArrowRight className="h-5 w-5" />
              </div>
              <p className="mt-3 text-sm font-semibold text-primary-700">Bekijk alle details</p>
              <p className="mt-1 text-xs text-gray-500">Probleem, aanpak, resultaat &amp; business case</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ HET CLIENTPAD ============ */}
      <ClientJourneySection />

      {/* ============ CUMULATIEF BESPARINGSPOTENTIEEL ============ */}
      <CumulativeSavingsSection />

      {/* ============ SUCCESVERHAAL VEENDAM met Before/After ============ */}
      <section id="succesverhaal" className="scroll-mt-28 bg-gradient-to-br from-green-50 to-emerald-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3">
            <Award className="mt-1 h-7 w-7 shrink-0 text-green-600" />
            <div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Succesverhaal: Gemeente Veendam</h2>
              <p className="mt-1 text-gray-500">
                Sleep de slider om het verschil te zien &mdash; van 220 aanbieders naar 6
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Before/After slider */}
            <VeendamBeforeAfter />

            {/* Story + highlights */}
            <div className="space-y-4">
              <div className="rounded-2xl bg-white border border-green-200 p-6">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Gemeente Veendam reduceerde 220 jeugdhulpaanbieders tot &eacute;&eacute;n samenwerkingsverband van 6 aanbieders
                  (JEP). Jongeren kunnen zonder wachttijd of indicatie terecht bij een professional op school of bij
                  de huisarts. Een wetenschappelijk geschoolde professional analyseert de situatie v&oacute;&oacute;rdat er wordt
                  ingegrepen.
                </p>
                <div className="mt-4 space-y-2">
                  {[
                    'Wachtlijsten in 2,5 jaar volledig verdwenen',
                    'Voor 57% van gezinnen doorverwijzing voorkomen',
                    'Helft van cli\u00ebnten geholpen voor \u20AC600 i.p.v. \u20AC1.500',
                    'Uithuisplaatsingen en crisisopvang afgenomen',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                      <span className="text-sm text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-gray-400">
                  Bronnen: NRC (15/09/2025), Gemeente.nu (22/10/2025), Waarstaatjegemeente.nl (CBS)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ COMPACTE ROADMAP / TIJDLIJN ============ */}
      <section id="roadmap" className="scroll-mt-28 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Waar staan we nu?</h2>
            <p className="mt-2 text-gray-500 max-w-2xl mx-auto">
              De transformatie loopt van eind 2025 tot 2028. Hieronder zie je de voortgang &mdash; en wat de volgende stap is.
            </p>
          </div>

          {/* Horizontal timeline */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden sm:block absolute top-[28px] left-[8%] right-[8%] h-1 bg-gradient-to-r from-blue-300 via-emerald-300 to-gray-200 rounded-full" />

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 relative">
              {[
                {
                  phase: 'Q4 2025',
                  label: 'KAM gestart',
                  detail: 'SoJ geeft kopgroep status en steun',
                  status: 'done' as const,
                  color: 'blue',
                },
                {
                  phase: 'Q1 2026',
                  label: 'Eerste plannen',
                  detail: 'Kopgroep presenteert impact-inschatting',
                  status: 'current' as const,
                  color: 'emerald',
                },
                {
                  phase: 'Q3-Q4 2026',
                  label: 'Eerste resultaten',
                  detail: 'Impact in de praktijk aantonen',
                  status: 'upcoming' as const,
                  color: 'emerald',
                },
                {
                  phase: 'Q1-Q2 2027',
                  label: 'Contractering',
                  detail: 'KAM-criteria in nieuwe contracten',
                  status: 'upcoming' as const,
                  color: 'blue',
                },
                {
                  phase: '2028',
                  label: 'Nieuwe standaard',
                  detail: 'Alle aanbieders werken volgens KAM',
                  status: 'upcoming' as const,
                  color: 'amber',
                },
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  {/* Node */}
                  <div className="relative z-10">
                    {step.status === 'current' && (
                      <span className="absolute -inset-2 rounded-full bg-emerald-400/30 animate-ping" />
                    )}
                    <div
                      className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-md ${
                        step.status === 'done'
                          ? 'bg-blue-600 text-white'
                          : step.status === 'current'
                            ? 'bg-emerald-500 text-white ring-4 ring-emerald-200'
                            : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                      }`}
                    >
                      {step.status === 'done' ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : step.status === 'current' ? (
                        <Zap className="h-6 w-6" />
                      ) : (
                        <Clock className="h-5 w-5" />
                      )}
                    </div>
                  </div>

                  {/* Phase label */}
                  <p className={`mt-3 text-xs font-bold uppercase tracking-wide ${
                    step.status === 'current' ? 'text-emerald-600' : step.status === 'done' ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    {step.phase}
                  </p>
                  {step.status === 'current' && (
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 mt-1">
                      NU
                    </span>
                  )}

                  {/* Description */}
                  <p className={`mt-1 text-sm font-semibold leading-tight ${
                    step.status === 'upcoming' ? 'text-gray-400' : 'text-gray-800'
                  }`}>
                    {step.label}
                  </p>
                  <p className={`mt-0.5 text-xs leading-tight ${
                    step.status === 'upcoming' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Link to full timeline */}
          <div className="mt-8 text-center">
            <Link
              href="/kwaliteit-als-medicijn#vuist-op-vuist"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors"
            >
              Bekijk de volledige roadmap met alle 9 stappen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ WAT BETEKENT DIT VOOR JOU? (compact 2x2) ============ */}
      <section id="wie-ben-jij" className="scroll-mt-28 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Wat betekent dit voor jou?</h2>
            <p className="mt-2 text-gray-500">Ontdek wat dit platform voor jouw rol kan betekenen</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Zorgprofessional */}
            <Link
              href="/initiatieven"
              className="group flex items-start gap-4 rounded-xl border border-surface-200 bg-surface-50 p-4 hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                <Stethoscope className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Zorgprofessional</h3>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                  Ontdek initiatieven die werken en sluit je aan bij collega&apos;s.
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary-600 group-hover:gap-1.5 transition-all">
                  Initiatieven &amp; Community <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>

            {/* Zorgbestuurder (Kopgroeplid) */}
            <Link
              href="/dashboard"
              className="group flex items-start gap-4 rounded-xl border border-surface-200 bg-surface-50 p-4 hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Kopgroeplid</h3>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                  Versterk jullie aanpak met tools, data en inzichten.
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary-600 group-hover:gap-1.5 transition-all">
                  Dashboard <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>

            {/* Zorgbestuurder (nog geen Kopgroeplid) */}
            <Link
              href="/kwaliteit-als-medicijn"
              className="group flex items-start gap-4 rounded-xl border border-surface-200 bg-surface-50 p-4 hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Zorgbestuurder</h3>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                  Ontdek wat aansluiting jouw organisatie kan opleveren.
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary-600 group-hover:gap-1.5 transition-all">
                  KAM-gedachtegoed <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>

            {/* Wethouder */}
            <Link
              href="/gemeentekaart"
              className="group flex items-start gap-4 rounded-xl border border-surface-200 bg-surface-50 p-4 hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Wethouder</h3>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                  Zie wat dit betekent voor jongeren in jouw gemeente.
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary-600 group-hover:gap-1.5 transition-all">
                  Gemeentekaart &amp; Dashboard <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>

            {/* Verwijzer (Huisarts / POH-GGZ) */}
            <Link
              href="/initiatieven"
              className="group flex items-start gap-4 rounded-xl border border-surface-200 bg-surface-50 p-4 hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Verwijzer (Huisarts / POH-GGZ)</h3>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                  Ontdek het aanbod, de trajecten en hoe je gericht kunt verwijzen naar passende zorg.
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary-600 group-hover:gap-1.5 transition-all">
                  Initiatieven &amp; Organisaties <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>

            {/* Overig / Nieuwsgierig */}
            <Link
              href="/quiz"
              className="group flex items-start gap-4 rounded-xl border border-surface-200 bg-surface-50 p-4 hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Overig / Nieuwsgierig</h3>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                  Gewoon benieuwd? Verken het platform vrijblijvend en ontdek wat er speelt in de jeugd-GGZ.
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary-600 group-hover:gap-1.5 transition-all">
                  Quiz &amp; Blog <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ DOE MEE CTA ============ */}
      <section id="doe-mee" className="scroll-mt-28 relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-primary-700 py-20 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-16 top-1/4 h-80 w-80 rounded-full bg-white blur-3xl" />
          <div className="absolute -right-20 -bottom-10 h-64 w-64 rounded-full bg-teal-300 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Live counter strip */}
          <div className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
            {[
              { value: 8, label: 'Kopgroep-aanbieders', suffix: '' },
              { value: 10, label: 'Gemeenten', suffix: '' },
              { value: 25, label: 'Professionals', suffix: '+' },
            ].map((counter) => (
              <div key={counter.label} className="text-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-4">
                <p className="text-3xl sm:text-4xl font-extrabold">
                  {counter.value}{counter.suffix}
                </p>
                <p className="text-xs sm:text-sm text-white/70 mt-1">{counter.label}</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
              <Heart className="h-4 w-4 text-rose-300" />
              Doe mee
            </span>
            <h2 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl">
              Doe Mee &mdash; Samen Volumes Reduceren
            </h2>
            <p className="mt-4 text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
              Meld je aan om je bij deze beweging aan te sluiten. Verbind je met andere professionals,
              deel kennis, en draag bij aan een toekomstbestendige jeugdzorg.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {/* Action 1: Nieuwsbrief */}
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/15 transition-all group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">Maandelijkse voortgang</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Ontvang elke maand een kort overzicht: wat hebben de initiatieven opgeleverd, wat is de volgende stap, welke data zijn er nieuw.
              </p>
              <div className="mt-5">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="naam@organisatie.nl"
                    className="flex-1 rounded-lg bg-white/10 border border-white/20 px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                  <button className="rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-teal-700 hover:bg-teal-50 transition shrink-0">
                    Aanmelden
                  </button>
                </div>
                <p className="text-xs text-white/40 mt-2">Demo &mdash; wordt niet verstuurd</p>
              </div>
            </div>

            {/* Action 2: Kopgroep-overleg */}
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/15 transition-all group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white mb-4">
                <CalendarDays className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">Volgend kopgroep-overleg</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Schuif aan bij het eerstvolgende overleg. Presentatie van eerste resultaten overbruggingszorg en stand van zaken brede intake.
              </p>
              <div className="mt-5 rounded-xl bg-white/10 border border-white/20 p-4">
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <p className="text-2xl font-extrabold">27</p>
                    <p className="text-xs text-white/60 uppercase">Mrt 2026</p>
                  </div>
                  <div className="border-l border-white/20 pl-3">
                    <p className="text-sm font-semibold">Kopgroep-overleg #4</p>
                    <p className="text-xs text-white/60">14:00 &ndash; 16:00 &bull; Dordrecht</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-white/40 mt-2">Demo &mdash; fictieve datum</p>
            </div>

            {/* Action 3: Data bijdragen */}
            <Link
              href="/impact-simulator"
              className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/15 transition-all group block"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white mb-4">
                <Upload className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">Draag je eigen data bij</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Reken met je eigen volumes en kosten in de Impact Simulator. Zie direct wat de initiatieven voor jouw organisatie kunnen betekenen.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-teal-700 group-hover:bg-teal-50 transition">
                Open de simulator
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

          {/* Signup form */}
          <SignupForm />
        </div>
      </section>

      {/* ============ ONTDEK MEER ============ */}
      <section className="bg-surface-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground text-center sm:text-3xl">Ontdek meer</h2>
          <p className="mt-2 text-center text-gray-500">Verdiep je in de data, test je kennis en word actief</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/dashboard" className="group rounded-2xl border border-surface-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-primary-200 transition-all">
              <BarChart3 className="h-8 w-8 text-primary-600" />
              <h3 className="mt-3 text-lg font-semibold text-foreground group-hover:text-primary-700">Impact Dashboard</h3>
              <p className="mt-1 text-sm text-gray-500">Bekijk de voortgang per aanbieder en het competitieve overzicht.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-600">
                Bekijk dashboard <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
            <Link href="/gemeentekaart" className="group rounded-2xl border border-surface-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-primary-200 transition-all">
              <MapPin className="h-8 w-8 text-teal-600" />
              <h3 className="mt-3 text-lg font-semibold text-foreground group-hover:text-primary-700">Gemeentekaart</h3>
              <p className="mt-1 text-sm text-gray-500">Interactieve kaart met scores en kosten per gemeente in ZHZ.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-600">
                Open kaart <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
            <Link href="/quiz" className="group rounded-2xl border border-surface-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-primary-200 transition-all">
              <Lightbulb className="h-8 w-8 text-amber-500" />
              <h3 className="mt-3 text-lg font-semibold text-foreground group-hover:text-primary-700">Kennisquiz</h3>
              <p className="mt-1 text-sm text-gray-500">Test je kennis over de jeugdzorg in 7 vragen. Hoe goed ken jij de feiten?</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-600">
                Start de quiz <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
            <Link href="/community" className="group rounded-2xl border border-surface-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-primary-200 transition-all">
              <MessageSquare className="h-8 w-8 text-violet-500" />
              <h3 className="mt-3 text-lg font-semibold text-foreground group-hover:text-primary-700">Community</h3>
              <p className="mt-1 text-sm text-gray-500">Stel vragen, deel ervaringen en vind collega-professionals.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-600">
                Naar het forum <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
