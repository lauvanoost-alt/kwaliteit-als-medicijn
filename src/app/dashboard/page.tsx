'use client';

import { useState, useEffect } from 'react';
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Target,
  Award,
  Star,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  Building2,
  Zap,
  DollarSign,
  Users,
  Heart,
  Activity,
  Shield,
  Handshake,
  ArrowRightLeft,
  FileCheck2,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

interface Provider {
  name: string;
  initiatives: number;
  volumeReduction: number;
  efficiencyGain: number;
  revenueImpact: number;
  score: number;
  trend: 'up' | 'down' | 'stable';
}

const providers: Provider[] = [
  { name: 'De Hoop', initiatives: 3, volumeReduction: 17.2, efficiencyGain: 24, revenueImpact: 12.5, score: 5, trend: 'up' },
  { name: 'Perspectief', initiatives: 3, volumeReduction: 15.8, efficiencyGain: 21, revenueImpact: 11.0, score: 5, trend: 'up' },
  { name: 'Parnassia Groep', initiatives: 2, volumeReduction: 13.4, efficiencyGain: 18, revenueImpact: 9.2, score: 4, trend: 'up' },
  { name: 'NeuroScan', initiatives: 2, volumeReduction: 11.6, efficiencyGain: 15, revenueImpact: 7.8, score: 4, trend: 'stable' },
  { name: 'Eleos', initiatives: 2, volumeReduction: 9.8, efficiencyGain: 13, revenueImpact: 6.4, score: 3, trend: 'down' },
  { name: 'FamilySupporters', initiatives: 1, volumeReduction: 7.2, efficiencyGain: 10, revenueImpact: 5.1, score: 3, trend: 'up' },
  { name: 'Mentaal Beter', initiatives: 1, volumeReduction: 5.4, efficiencyGain: 7, revenueImpact: 3.6, score: 2, trend: 'down' },
  { name: 'CareHouse', initiatives: 1, volumeReduction: 3.1, efficiencyGain: 4, revenueImpact: 2.2, score: 2, trend: 'stable' },
];

/* ------------------------------------------------------------------ */
/*  HELPER COMPONENTS                                                  */
/* ------------------------------------------------------------------ */

function AnimatedCounter({ target, prefix = '', suffix = '', duration = 1200 }: { target: number; prefix?: string; suffix?: string; duration?: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  const display = Number.isInteger(target) ? Math.round(value) : value.toFixed(1);
  return <span>{prefix}{display}{suffix}</span>;
}

function StarRating({ count }: { count: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < count ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
        />
      ))}
    </span>
  );
}

function MedalIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Trophy size={22} className="text-amber-500 fill-amber-100" />;
  if (rank === 2) return <Award size={22} className="text-gray-400" />;
  if (rank === 3) return <Award size={22} className="text-amber-700" />;
  return <span className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-full bg-gray-100 text-xs font-bold text-gray-500">{rank}</span>;
}

function TrendArrow({ trend }: { trend: 'up' | 'down' | 'stable' }) {
  if (trend === 'up') return <span className="inline-flex items-center gap-0.5 text-emerald-600 font-semibold text-sm"><ArrowUp size={14} /> Stijgend</span>;
  if (trend === 'down') return <span className="inline-flex items-center gap-0.5 text-red-500 font-semibold text-sm"><ArrowDown size={14} /> Dalend</span>;
  return <span className="inline-flex items-center gap-0.5 text-gray-400 font-semibold text-sm">— Stabiel</span>;
}

function ProgressBar({ value, max, color, animated = true }: { value: number; max: number; color: string; animated?: boolean }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth((value / max) * 100), 50);
    return () => clearTimeout(t);
  }, [value, max]);

  return (
    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{
          width: `${animated ? width : (value / max) * 100}%`,
          backgroundColor: color,
          transition: animated ? 'width 0.8s cubic-bezier(0.4,0,0.2,1)' : 'none',
        }}
      />
    </div>
  );
}

function CSSBarChart({ data, maxValue }: { data: { label: string; value: number; color: string }[]; maxValue: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex items-end gap-3 h-44">
      {data.map((d) => (
        <div key={d.label} className="flex flex-col items-center flex-1 gap-1">
          <span className="text-xs font-bold text-gray-700">{d.value}%</span>
          <div className="w-full flex items-end justify-center" style={{ height: '120px' }}>
            <div
              className="w-full max-w-[48px] rounded-t-lg"
              style={{
                height: show ? `${(d.value / maxValue) * 100}%` : '0%',
                backgroundColor: d.color,
                transition: 'height 1s cubic-bezier(0.4,0,0.2,1)',
              }}
            />
          </div>
          <span className="text-[10px] text-gray-500 text-center leading-tight mt-1 w-full truncate">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TOOLTIP                                                            */
/* ------------------------------------------------------------------ */

function Tooltip({ children, text }: { children: React.ReactNode; text: string }) {
  return (
    <span className="relative group cursor-help">
      {children}
      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs rounded-lg bg-gray-900 text-white text-xs px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 shadow-lg">
        {text}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE                                                          */
/* ------------------------------------------------------------------ */

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Region totals
  const totalVolumeReduction = providers.reduce((s, p) => s + p.volumeReduction, 0) / providers.length;
  const totalEfficiency = providers.reduce((s, p) => s + p.efficiencyGain, 0) / providers.length;
  const totalRevenue = providers.reduce((s, p) => s + p.revenueImpact, 0);

  // Row colour helper
  const rowBg = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-500';
    if (rank === 2) return 'bg-gradient-to-r from-emerald-50/60 to-transparent border-l-4 border-emerald-400';
    if (rank === 3) return 'bg-gradient-to-r from-emerald-50/30 to-transparent border-l-4 border-emerald-300';
    return 'border-l-4 border-transparent hover:bg-gray-50/80';
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* ============================================================ */}
      {/*  HEADER                                                       */}
      {/* ============================================================ */}
      <header className="relative overflow-hidden bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-700 text-white">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-2">
            <Activity size={28} className="text-fuchsia-300" />
            <span className="text-sm font-semibold uppercase tracking-widest text-indigo-200">Zuid-Holland Zuid</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Kwaliteit als Medicijn
          </h1>
          <p className="mt-3 text-lg text-indigo-100 max-w-2xl">
            Impact dashboard — volg de voortgang van aanbieders, vergelijk prestaties en bekijk de impact van initiatieven op volume en kwaliteit.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium"><Building2 size={16} /> 8 Kopgroep Aanbieders</span>
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium"><Target size={16} /> 5 Initiatieven</span>
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium"><TrendingUp size={16} /> Gemiddeld {totalVolumeReduction.toFixed(1)}% volumereductie</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-14">
        {/* ============================================================ */}
        {/*  SECTION 3 — REGIO OVERZICHT (summary cards on top)         */}
        {/* ============================================================ */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 size={24} className="text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-900">Regio Overzicht</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1 */}
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-md shadow-indigo-100 border border-indigo-100 p-6 group hover:shadow-lg transition-shadow">
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-indigo-50 group-hover:bg-indigo-100 transition-colors" />
              <div className="relative">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 mb-3"><TrendingDown size={20} /></span>
                <p className="text-sm text-gray-500 font-medium">Gem. Volumereductie</p>
                <p className="text-3xl font-extrabold text-gray-900 mt-1"><AnimatedCounter target={parseFloat(totalVolumeReduction.toFixed(1))} suffix="%" /></p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-md shadow-purple-100 border border-purple-100 p-6 group hover:shadow-lg transition-shadow">
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-purple-50 group-hover:bg-purple-100 transition-colors" />
              <div className="relative">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-purple-100 text-purple-600 mb-3"><Zap size={20} /></span>
                <p className="text-sm text-gray-500 font-medium">Gem. Efficiencywinst</p>
                <p className="text-3xl font-extrabold text-gray-900 mt-1"><AnimatedCounter target={parseFloat(totalEfficiency.toFixed(0))} suffix="%" /></p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-md shadow-emerald-100 border border-emerald-100 p-6 group hover:shadow-lg transition-shadow">
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-emerald-50 group-hover:bg-emerald-100 transition-colors" />
              <div className="relative">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 mb-3"><DollarSign size={20} /></span>
                <p className="text-sm text-gray-500 font-medium">Totale Omzetimpact</p>
                <p className="text-3xl font-extrabold text-gray-900 mt-1">+<AnimatedCounter target={parseFloat(totalRevenue.toFixed(1))} suffix="%" /></p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-md shadow-pink-100 border border-pink-100 p-6 group hover:shadow-lg transition-shadow">
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-pink-50 group-hover:bg-pink-100 transition-colors" />
              <div className="relative">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-pink-100 text-pink-600 mb-3"><Users size={20} /></span>
                <p className="text-sm text-gray-500 font-medium">Actieve Aanbieders</p>
                <p className="text-3xl font-extrabold text-gray-900 mt-1"><AnimatedCounter target={8} /></p>
                <p className="text-xs text-gray-400 mt-1">van 8 in kopgroep</p>
              </div>
            </div>
          </div>

          {/* Mini bar chart row */}
          <div className="mt-8 rounded-2xl bg-white shadow-md border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2"><BarChart3 size={16} className="text-indigo-500" /> Volumereductie per Aanbieder</h3>
            <CSSBarChart
              data={providers.map((p, i) => ({
                label: p.name,
                value: p.volumeReduction,
                color: ['#6366f1', '#7c3aed', '#8b5cf6', '#a855f7', '#c084fc', '#d8b4fe', '#e9d5ff', '#f3e8ff'][i],
              }))}
              maxValue={20}
            />
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 1 — KOPGROEP RANKING                                */}
        {/* ============================================================ */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Trophy size={24} className="text-amber-500" />
            <h2 className="text-2xl font-bold text-gray-900">Kopgroep Ranking</h2>
          </div>

          <div className="rounded-2xl bg-white shadow-md border border-gray-100 overflow-hidden">
            {/* Table header */}
            <div className="hidden lg:grid grid-cols-[48px_1fr_100px_130px_120px_130px_140px_120px] gap-2 px-6 py-3 bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b">
              <span>#</span>
              <span>Aanbieder</span>
              <span className="text-center">Initiatieven</span>
              <Tooltip text="Percentage minder verwijzingen / behandelingen"><span className="text-center">Volumereductie</span></Tooltip>
              <Tooltip text="Verbetering in doorlooptijd en capaciteit"><span className="text-center">Efficiency</span></Tooltip>
              <Tooltip text="Stijging omzet per cliënt door kwaliteit"><span className="text-center">Omzetimpact</span></Tooltip>
              <span className="text-center">Score</span>
              <span className="text-center">Trend</span>
            </div>

            {/* Rows */}
            {providers.map((p, i) => {
              const rank = i + 1;
              return (
                <div
                  key={p.name}
                  className={`grid grid-cols-1 lg:grid-cols-[48px_1fr_100px_130px_120px_130px_140px_120px] gap-2 px-6 py-4 items-center border-b border-gray-100 last:border-none transition-colors ${rowBg(rank)}`}
                >
                  {/* Rank */}
                  <div className="flex items-center gap-2">
                    <MedalIcon rank={rank} />
                  </div>

                  {/* Name */}
                  <div className="flex items-center gap-2">
                    <Building2 size={16} className="text-gray-400 shrink-0" />
                    <span className="font-semibold text-gray-900">{p.name}</span>
                  </div>

                  {/* Initiatives */}
                  <div className="flex items-center justify-center gap-1">
                    {Array.from({ length: p.initiatives }).map((_, j) => (
                      <CheckCircle2 key={j} size={16} className="text-indigo-500" />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">{p.initiatives}</span>
                  </div>

                  {/* Volume */}
                  <div className="text-center">
                    <span className="font-bold text-indigo-700">{p.volumeReduction}%</span>
                    <ProgressBar value={p.volumeReduction} max={20} color="#6366f1" />
                  </div>

                  {/* Efficiency */}
                  <div className="text-center">
                    <span className="font-bold text-purple-700">{p.efficiencyGain}%</span>
                    <ProgressBar value={p.efficiencyGain} max={30} color="#8b5cf6" />
                  </div>

                  {/* Revenue */}
                  <div className="text-center">
                    <span className="font-bold text-emerald-700">+{p.revenueImpact}%</span>
                    <ProgressBar value={p.revenueImpact} max={15} color="#10b981" />
                  </div>

                  {/* Score */}
                  <div className="flex justify-center">
                    <StarRating count={p.score} />
                  </div>

                  {/* Trend */}
                  <div className="flex justify-center">
                    <TrendArrow trend={p.trend} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION — OMZETBESCHERMING                                  */}
        {/* ============================================================ */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Shield size={24} className="text-emerald-600" />
            <h2 className="text-2xl font-bold text-gray-900">Omzetbescherming voor Aanbieders</h2>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-teal-50 shadow-md border border-emerald-100 overflow-hidden">
            {/* Header banner */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 text-white">
              <p className="text-sm font-medium text-emerald-100">Wachtlijstbemiddeling &amp; Volumeherverdeling</p>
              <p className="mt-1 text-lg font-bold">Efficienter werken zonder omzetverlies</p>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-sm text-gray-600 leading-relaxed max-w-3xl mb-8">
                Aanbieders die vooroplopen in kwaliteitsverbetering mogen daar niet financieel voor gestraft worden.
                Via wachtlijstbemiddeling en volumeherverdeling wordt ervoor gezorgd dat koplopers hun omzet behouden
                of zelfs versterken terwijl zij bijdragen aan passendere, kortere en effectievere zorg.
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Card 1 */}
                <div className="rounded-xl bg-white border border-emerald-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 shrink-0">
                      <Handshake size={20} />
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Wachtlijstbemiddeling &amp; Extra Volume</h4>
                      <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                        Door wachtlijstbemiddeling en het toewijzen van extra volume wordt ervoor gezorgd dat de omzet
                        van aanbieders niet wordt geraakt wanneer trajecten korter worden.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="rounded-xl bg-white border border-emerald-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-teal-100 text-teal-600 shrink-0">
                      <Zap size={20} />
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Geen Negatief Effect op Aanbieders</h4>
                      <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                        Efficienter en sneller volumes afwerken heeft geen negatief effect op de aanbieders. Wie sneller
                        en beter werkt, wordt beloond met meer volume, niet minder omzet.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="rounded-xl bg-white border border-emerald-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-sky-100 text-sky-600 shrink-0">
                      <FileCheck2 size={20} />
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Contractuele Borging</h4>
                      <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                        Contractueel borgen dat aanbieders die koploper zijn niet worden benadeeld wanneer trajecten
                        korter en doelmatiger worden. Koplopers krijgen zekerheid.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="rounded-xl bg-white border border-emerald-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-purple-100 text-purple-600 shrink-0">
                      <ArrowRightLeft size={20} />
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Aangepaste Toewijzing &amp; Herverdeling</h4>
                      <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                        Dit gebeurt via aangepaste toewijzingsafspraken of volumeherverdeling, zodat vrijgekomen
                        capaciteit direct wordt benut voor wachtende jeugdigen.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary callout */}
              <div className="mt-6 rounded-xl bg-emerald-50 border border-emerald-200 p-4 flex items-start gap-3">
                <Shield size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-800 leading-relaxed">
                  <strong>Kernprincipe:</strong> Aanbieders die investeren in kwaliteit en efficiency worden beschermd
                  via volumeherverdeling. Kortere trajecten leiden niet tot minder omzet maar tot meer ruimte voor
                  wachtende jeugdigen &mdash; een win-win voor aanbieder en regio.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  FOOTER                                                      */}
        {/* ============================================================ */}
        <footer className="text-center text-sm text-gray-400 pt-8 pb-12 border-t border-gray-100">
          <p className="flex items-center justify-center gap-1.5">
            <Heart size={14} className="text-pink-400" />
            Kwaliteit als Medicijn &mdash; Zuid-Holland Zuid &mdash; Kopgroep Dashboard
          </p>
          <p className="mt-1 text-xs text-gray-300">Alle cijfers zijn fictief en dienen ter illustratie van het competitief effect tussen aanbieders.</p>
        </footer>
      </main>
    </div>
  );
}
