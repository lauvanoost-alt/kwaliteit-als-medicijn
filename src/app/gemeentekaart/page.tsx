'use client';

import { useState, useMemo } from 'react';
import {
  MapPin,
  Building2,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Info,
  ChevronRight,
  ArrowRight,
  Filter,
  SortAsc,
  X,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Municipality {
  id: number;
  name: string;
  population: number;
  costs: number; // per 1000 inhabitants, in k EUR
  score: number;
  factors: { label: string; impact: number }[]; // impact -2..+2 (negative = cost driver)
}

const municipalities: Municipality[] = [
  {
    id: 1,
    name: 'Dordrecht',
    population: 120_000,
    costs: 380,
    score: 6.2,
    factors: [
      { label: 'Verwijsgedrag huisartsen', impact: -1.4 },
      { label: 'Contractafspraken', impact: -0.6 },
      { label: 'Preventiebeleid', impact: 0.3 },
      { label: 'Beschikbaarheid wijkteams', impact: -0.8 },
    ],
  },
  {
    id: 2,
    name: 'Zwijndrecht',
    population: 45_000,
    costs: 340,
    score: 6.8,
    factors: [
      { label: 'Verwijsgedrag huisartsen', impact: -0.5 },
      { label: 'Contractafspraken', impact: -0.8 },
      { label: 'Preventiebeleid', impact: 0.6 },
      { label: 'Beschikbaarheid wijkteams', impact: 0.2 },
    ],
  },
  {
    id: 3,
    name: 'Hendrik-Ido-Ambacht',
    population: 32_000,
    costs: 290,
    score: 7.4,
    factors: [
      { label: 'Verwijsgedrag huisartsen', impact: 0.8 },
      { label: 'Contractafspraken', impact: 0.4 },
      { label: 'Preventiebeleid', impact: 1.2 },
      { label: 'Beschikbaarheid wijkteams', impact: 0.9 },
    ],
  },
  {
    id: 4,
    name: 'Papendrecht',
    population: 32_000,
    costs: 310,
    score: 7.1,
    factors: [
      { label: 'Verwijsgedrag huisartsen', impact: 0.3 },
      { label: 'Contractafspraken', impact: -0.2 },
      { label: 'Preventiebeleid', impact: 0.9 },
      { label: 'Beschikbaarheid wijkteams', impact: 0.6 },
    ],
  },
  {
    id: 5,
    name: 'Sliedrecht',
    population: 25_000,
    costs: 350,
    score: 6.5,
    factors: [
      { label: 'Verwijsgedrag huisartsen', impact: -0.9 },
      { label: 'Contractafspraken', impact: -0.4 },
      { label: 'Preventiebeleid', impact: 0.2 },
      { label: 'Beschikbaarheid wijkteams', impact: -0.3 },
    ],
  },
  {
    id: 6,
    name: 'Alblasserdam',
    population: 20_000,
    costs: 455,
    score: 5.3,
    factors: [
      { label: 'Verwijsgedrag huisartsen', impact: -1.8 },
      { label: 'Contractafspraken', impact: -1.2 },
      { label: 'Preventiebeleid', impact: -0.5 },
      { label: 'Beschikbaarheid wijkteams', impact: -1.0 },
    ],
  },
  {
    id: 7,
    name: 'Gorinchem',
    population: 38_000,
    costs: 395,
    score: 5.9,
    factors: [
      { label: 'Verwijsgedrag huisartsen', impact: -1.1 },
      { label: 'Contractafspraken', impact: -0.7 },
      { label: 'Preventiebeleid', impact: 0.1 },
      { label: 'Beschikbaarheid wijkteams', impact: -0.6 },
    ],
  },
  {
    id: 8,
    name: 'Molenlanden',
    population: 44_000,
    costs: 265,
    score: 7.8,
    factors: [
      { label: 'Verwijsgedrag huisartsen', impact: 1.2 },
      { label: 'Contractafspraken', impact: 0.9 },
      { label: 'Preventiebeleid', impact: 1.4 },
      { label: 'Beschikbaarheid wijkteams', impact: 1.1 },
    ],
  },
  {
    id: 9,
    name: 'Hardinxveld-Giessendam',
    population: 18_000,
    costs: 280,
    score: 7.5,
    factors: [
      { label: 'Verwijsgedrag huisartsen', impact: 1.0 },
      { label: 'Contractafspraken', impact: 0.6 },
      { label: 'Preventiebeleid', impact: 1.1 },
      { label: 'Beschikbaarheid wijkteams', impact: 0.8 },
    ],
  },
  {
    id: 10,
    name: 'Hoeksche Waard',
    population: 88_000,
    costs: 222,
    score: 8.1,
    factors: [
      { label: 'Verwijsgedrag huisartsen', impact: 1.6 },
      { label: 'Contractafspraken', impact: 1.3 },
      { label: 'Preventiebeleid', impact: 1.8 },
      { label: 'Beschikbaarheid wijkteams', impact: 1.5 },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

type SortKey = 'costs' | 'score' | 'name';

const avgCosts = Math.round(
  municipalities.reduce((s, m) => s + m.costs, 0) / municipalities.length
);
const avgScore = +(
  municipalities.reduce((s, m) => s + m.score, 0) / municipalities.length
).toFixed(1);
const minCosts = Math.min(...municipalities.map((m) => m.costs));
const maxCosts = Math.max(...municipalities.map((m) => m.costs));

function costColor(cost: number): string {
  const ratio = (cost - minCosts) / (maxCosts - minCosts);
  if (ratio < 0.33) return '#22c55e'; // green-500
  if (ratio < 0.66) return '#eab308'; // yellow-500
  return '#ef4444'; // red-500
}

function costBg(cost: number): string {
  const ratio = (cost - minCosts) / (maxCosts - minCosts);
  if (ratio < 0.33) return 'bg-green-50 border-green-200';
  if (ratio < 0.66) return 'bg-yellow-50 border-yellow-200';
  return 'bg-red-50 border-red-200';
}

function costLabel(cost: number): string {
  const ratio = (cost - minCosts) / (maxCosts - minCosts);
  if (ratio < 0.33) return 'Laag';
  if (ratio < 0.66) return 'Gemiddeld';
  return 'Hoog';
}

function formatK(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(0)}k` : n.toLocaleString('nl-NL');
}

function potentialSavings(m: Municipality): number {
  if (m.costs <= avgCosts) return 0;
  const perInhabitant = (m.costs - avgCosts) * 1000; // EUR per 1000 inh difference -> per inh in EUR
  return Math.round((perInhabitant * m.population) / 1_000_000); // in M EUR (but it's per 1000 already)
}

function savingsEuro(m: Municipality): string {
  if (m.costs <= avgCosts) return '-';
  // costs is "per 1000 inhabitants" in k EUR
  // difference in k EUR per 1000 inh
  const diffPerThousand = m.costs - avgCosts;
  // total extra cost = diffPerThousand * 1000 * (population / 1000) = diffPerThousand * population
  // but costs is in k EUR, so diffPerThousand is in k EUR per 1000 inh
  // total = diffPerThousand * 1000 * (population / 1000) = diffPerThousand * population  (in EUR)
  const totalEur = diffPerThousand * 1000 * (m.population / 1000);
  if (totalEur >= 1_000_000) return `${(totalEur / 1_000_000).toFixed(1)} mln`;
  if (totalEur >= 1_000) return `${(totalEur / 1_000).toFixed(0)}k`;
  return `${totalEur.toFixed(0)}`;
}

/* ------------------------------------------------------------------ */
/*  Geographic shapes & label positions                                */
/* ------------------------------------------------------------------ */

// Geographically accurate polygon paths for each municipality (viewBox 0 0 800 600)
// Hoeksche Waard = large island SW; Drechtsteden cluster in center; Molenlanden = large area north.
// Rivers (not drawn) separate the island clusters.
const municipalityShapes: Record<number, string> = {
  // Hoeksche Waard (id 10) - Very large broad island, southwest quadrant
  // center ~(144,432), width ~256px, height ~144px, neck toward Dordrecht upper-right
  10: 'M 22,396 C 30,378 52,364 82,356 C 110,348 136,346 164,350 C 190,354 214,350 238,344 C 258,338 276,336 292,340 C 308,346 318,356 322,372 C 326,388 322,406 314,422 C 304,438 290,452 272,464 C 256,474 238,482 218,488 C 196,494 174,498 152,498 C 128,496 106,490 86,480 C 66,468 48,454 36,438 C 26,424 20,412 20,400 C 20,396 20,394 22,396 Z',

  // Dordrecht (id 1) - Large compact pear/teardrop, wider at bottom
  // center ~(384,372), south of Zwijndrecht, connects east
  1: 'M 348,340 C 358,332 370,328 384,326 C 400,324 414,328 426,336 C 436,346 440,360 440,376 C 440,392 436,406 428,416 C 418,426 406,432 392,434 C 378,436 364,432 352,424 C 342,414 336,402 332,388 C 328,374 332,358 340,346 C 344,342 346,340 348,340 Z',

  // Zwijndrecht (id 2) - Small-medium, rounded triangular/droplet
  // center ~(352,288), between HIA (northwest) and Dordrecht (south)
  2: 'M 322,276 C 330,264 342,258 356,256 C 370,256 384,262 392,272 C 398,282 398,294 394,306 C 388,316 378,324 366,326 C 354,328 342,326 332,318 C 324,310 320,298 320,290 C 320,284 320,280 322,276 Z',

  // Hendrik-Ido-Ambacht (id 3) - Small, short horizontal rounded rectangle
  // center ~(320,240)
  3: 'M 290,230 C 298,222 312,218 326,218 C 340,218 354,222 362,230 C 368,238 368,246 364,254 C 358,262 348,268 336,270 C 324,272 310,270 300,264 C 290,258 284,248 284,240 C 284,236 286,232 290,230 Z',

  // Alblasserdam (id 6) - Very small, narrow horizontal strip
  // center ~(368,204)
  6: 'M 342,196 C 350,190 360,188 372,188 C 384,188 394,190 402,196 C 408,202 408,210 404,216 C 398,222 388,226 376,226 C 364,226 352,222 346,216 C 340,210 338,202 342,196 Z',

  // Papendrecht (id 4) - Medium, broad horizontal block
  // center ~(440,240), connects toward Sliedrecht east
  4: 'M 402,226 C 412,218 426,214 442,212 C 458,212 474,216 484,224 C 492,232 494,244 490,254 C 486,264 478,272 466,276 C 454,280 440,280 428,278 C 416,274 406,266 402,256 C 398,246 398,236 402,226 Z',

  // Sliedrecht (id 5) - Medium, elongated horizontal segment
  // center ~(536,246)
  5: 'M 496,234 C 506,226 522,222 540,220 C 558,220 574,224 584,234 C 590,242 590,252 586,260 C 580,268 570,274 556,276 C 542,278 526,278 512,274 C 500,270 492,262 490,254 C 488,246 490,238 496,234 Z',

  // Hardinxveld-Giessendam (id 9) - Medium, narrow curved horizontal ribbon
  // center ~(632,252)
  9: 'M 592,242 C 602,234 618,230 636,228 C 654,228 670,232 680,240 C 688,248 688,258 684,266 C 678,274 668,280 654,282 C 640,284 624,284 610,280 C 598,276 590,268 588,260 C 586,252 588,246 592,242 Z',

  // Gorinchem (id 7) - Small-medium, compact rounded polygon at eastern end
  // center ~(736,258)
  7: 'M 712,242 C 720,232 732,226 744,226 C 756,226 766,232 772,242 C 778,252 780,264 776,276 C 772,286 764,294 752,298 C 740,300 728,296 720,288 C 712,278 708,266 710,254 C 710,248 712,244 712,242 Z',

  // Molenlanden (id 8) - LARGEST municipality, broad region above central chain
  // spans x=360..784, y=48..192, undulating top border, diagonal lower border
  8: 'M 362,186 C 368,172 380,160 396,150 C 414,140 434,130 458,122 C 482,114 508,104 536,94 C 562,84 588,74 614,66 C 640,58 666,52 692,50 C 716,48 738,50 758,56 C 774,62 786,72 790,86 C 794,100 792,116 788,134 C 784,150 778,166 770,180 C 762,192 752,202 740,210 C 728,218 714,222 698,226 C 682,230 666,232 648,232 C 630,232 612,230 596,228 C 578,226 562,224 546,224 C 530,226 514,230 498,236 C 482,242 466,248 450,254 C 436,260 422,264 410,264 C 398,262 388,256 380,244 C 372,232 366,216 364,200 C 362,194 362,190 362,186 Z',
};

// Approximate label centers for each municipality shape
const labelPositions: Record<number, { x: number; y: number }> = {
  10: { x: 168, y: 432 }, // Hoeksche Waard
  1: { x: 384, y: 378 },  // Dordrecht
  2: { x: 356, y: 290 },  // Zwijndrecht
  3: { x: 324, y: 244 },  // Hendrik-Ido-Ambacht
  6: { x: 372, y: 207 },  // Alblasserdam
  4: { x: 444, y: 246 },  // Papendrecht
  5: { x: 538, y: 250 },  // Sliedrecht
  9: { x: 636, y: 256 },  // Hardinxveld-Giessendam
  7: { x: 742, y: 262 },  // Gorinchem
  8: { x: 580, y: 140 },  // Molenlanden
};

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

function DetailPanel({
  municipality,
  onClose,
  onSelectMunicipality,
}: {
  municipality: Municipality;
  onClose: () => void;
  onSelectMunicipality: (m: Municipality) => void;
}) {
  const m = municipality;
  const diffCosts = m.costs - avgCosts;
  const diffScore = +(m.score - avgScore).toFixed(1);
  const sorted = [...municipalities].sort((a, b) => a.costs - b.costs);
  const maxBarCost = maxCosts;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/30 backdrop-blur-sm">
      <div
        className="h-full w-full max-w-lg overflow-y-auto bg-white shadow-2xl animate-in slide-in-from-right"
        style={{ animation: 'slideIn 0.25s ease-out' }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4"
          style={{ backgroundColor: costColor(m.costs) + '18' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: costColor(m.costs) + '30' }}
            >
              <Building2 className="h-5 w-5" style={{ color: costColor(m.costs) }} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{m.name}</h2>
              <p className="text-sm text-slate-500">
                <MapPin className="mr-1 inline h-3 w-3" />
                Zuid-Holland Zuid
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 p-6">
          {/* Key metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <p className="text-xs font-medium text-slate-500">Inwoners</p>
              <p className="mt-1 text-lg font-bold text-slate-800">
                {formatK(m.population)}
              </p>
            </div>
            <div
              className={`rounded-xl p-3 text-center border ${costBg(m.costs)}`}
            >
              <p className="text-xs font-medium text-slate-500">
                Kosten /1000 inw.
              </p>
              <p className="mt-1 text-lg font-bold text-slate-800">
                {'\u20AC'}{m.costs}k
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <p className="text-xs font-medium text-slate-500">Score</p>
              <p className="mt-1 text-lg font-bold text-slate-800">{m.score}</p>
            </div>
          </div>

          {/* Comparison to average */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <BarChart3 className="h-4 w-4" />
              Vergelijking met regionaal gemiddelde
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Kosten</span>
                <span
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    diffCosts > 0 ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {diffCosts > 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {diffCosts > 0 ? '+' : ''}
                  {'\u20AC'}{diffCosts}k vs. gem. {'\u20AC'}{avgCosts}k
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Score</span>
                <span
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    diffScore >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {diffScore >= 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {diffScore >= 0 ? '+' : ''}
                  {diffScore} vs. gem. {avgScore}
                </span>
              </div>
            </div>
          </div>

          {/* Bar chart: costs compared */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <BarChart3 className="h-4 w-4" />
              Kosten per 1000 inwoners - alle gemeenten
            </h3>
            <div className="space-y-1">
              {sorted.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectMunicipality(item)}
                  className={`flex w-full items-center gap-2 rounded-lg px-1 py-1 text-left transition-colors cursor-pointer ${
                    item.id === m.id
                      ? 'bg-slate-100'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`w-36 truncate text-right text-xs ${
                      item.id === m.id
                        ? 'font-bold text-slate-900'
                        : 'text-slate-500 group-hover:text-slate-700'
                    }`}
                  >
                    {item.name}
                  </span>
                  <div className="relative h-5 flex-1 rounded bg-slate-100">
                    <div
                      className="absolute left-0 top-0 h-5 rounded transition-all"
                      style={{
                        width: `${(item.costs / maxBarCost) * 100}%`,
                        backgroundColor:
                          item.id === m.id
                            ? costColor(item.costs)
                            : costColor(item.costs) + '80',
                      }}
                    />
                    {/* average line */}
                    <div
                      className="absolute top-0 h-5 w-0.5 bg-slate-800"
                      style={{ left: `${(avgCosts / maxBarCost) * 100}%` }}
                      title={`Gemiddelde: \u20AC${avgCosts}k`}
                    />
                  </div>
                  <span
                    className={`w-12 text-right text-xs ${
                      item.id === m.id
                        ? 'font-bold text-slate-900'
                        : 'text-slate-500'
                    }`}
                  >
                    {'\u20AC'}{item.costs}k
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-center text-[10px] text-slate-400">
              Zwarte lijn = regionaal gemiddelde ({'\u20AC'}{avgCosts}k)
            </p>
          </div>

          {/* Factors */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Info className="h-4 w-4" />
              Verklarende factoren
            </h3>
            <div className="space-y-2">
              {m.factors.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-3 rounded-lg border border-slate-100 bg-white p-3"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700">
                      {f.label}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* mini bar from center */}
                    <div className="flex h-4 w-24 items-center">
                      <div className="relative h-2 w-full rounded bg-slate-100">
                        {/* center mark */}
                        <div className="absolute left-1/2 top-0 h-2 w-px bg-slate-400" />
                        <div
                          className={`absolute top-0 h-2 rounded ${
                            f.impact >= 0 ? 'bg-green-400' : 'bg-red-400'
                          }`}
                          style={
                            f.impact >= 0
                              ? {
                                  left: '50%',
                                  width: `${Math.min(Math.abs(f.impact) / 2, 1) * 50}%`,
                                }
                              : {
                                  right: '50%',
                                  width: `${Math.min(Math.abs(f.impact) / 2, 1) * 50}%`,
                                }
                          }
                        />
                      </div>
                    </div>
                    <span
                      className={`min-w-[3rem] text-right text-xs font-semibold ${
                        f.impact >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {f.impact >= 0 ? '+' : ''}
                      {f.impact.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Positief = kostendrukkend effect, negatief = kostenverhogend effect
            </p>
          </div>

          {/* Potential savings */}
          {m.costs > avgCosts && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <h3 className="mb-1 flex items-center gap-2 text-sm font-semibold text-amber-800">
                <TrendingDown className="h-4 w-4" />
                Besparingspotentieel
              </h3>
              <p className="text-sm text-amber-700">
                Als {m.name} naar het regionaal gemiddelde zou bewegen, is de
                geschatte besparing{' '}
                <span className="font-bold">{'\u20AC'}{savingsEuro(m)}</span> per
                jaar.
              </p>
              <p className="mt-2 text-xs text-amber-600">
                <ArrowRight className="mr-1 inline h-3 w-3" />
                Be\u00efnvloedbaar via lokaal beleid \u00e9n implementatie van initiatieven door aanbieders (~22% van de variatie)
              </p>
            </div>
          )}

          {m.costs <= avgCosts && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <h3 className="mb-1 flex items-center gap-2 text-sm font-semibold text-green-800">
                <TrendingDown className="h-4 w-4" />
                Onder het gemiddelde
              </h3>
              <p className="text-sm text-green-700">
                {m.name} presteert beter dan het regionaal gemiddelde. De kosten
                liggen{' '}
                <span className="font-bold">
                  {'\u20AC'}{Math.abs(m.costs - avgCosts)}k
                </span>{' '}
                per 1000 inwoners lager. Een voorbeeld voor de regio.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

export default function GemeentekaartPage() {
  const [selected, setSelected] = useState<Municipality | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>('costs');

  const sortedList = useMemo(() => {
    const copy = [...municipalities];
    if (sortKey === 'costs') copy.sort((a, b) => b.costs - a.costs);
    else if (sortKey === 'score') copy.sort((a, b) => b.score - a.score);
    else copy.sort((a, b) => a.name.localeCompare(b.name));
    return copy;
  }, [sortKey]);

  const spread = maxCosts - minCosts;

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section className="bg-gradient-to-b from-slate-50 to-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page heading */}
          <div className="mb-8">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-sky-600">
              <MapPin className="h-4 w-4" />
              Interactieve Gemeentekaart
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Zuid-Holland Zuid in kaart
            </h1>
            <p className="mt-2 max-w-2xl text-base text-slate-600">
              Bekijk de kosten en kwaliteitsscores van alle 10 gemeenten in de
              regio. Klik op een gemeente voor een gedetailleerde analyse.
            </p>
          </div>

          {/* Insight banner */}
          <div className="mb-8 rounded-2xl border border-sky-200 bg-sky-50 p-5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100">
                <Info className="h-4 w-4 text-sky-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-sky-900">
                  Waarom vergelijken? ~22% van de kostenvariatie is beleidsgestuurd
                </p>
                <p className="mt-1 text-sm text-sky-700">
                  Circa <span className="font-bold">78% van de kostenverschillen</span>{' '}
                  tussen gemeenten wordt verklaard door sociaaleconomische en
                  demografische factoren (bevolkingssamenstelling, inkomensniveaus,
                  etc.) die gemeenten niet direct kunnen beinvloeden. Maar de
                  overige{' '}
                  <span className="font-bold">~22% wordt bepaald door lokaal beleid en de werkwijze van aanbieders</span>:{' '}
                  verwijsgedrag van huisartsen, contractafspraken, preventie-investeringen,
                  inzet van wijkteams en de mate waarin aanbieders innovatieve initiatieven
                  implementeren (zoals overbruggingszorg, brede intake en kortdurende behandeling).
                  Dat is een substantieel aandeel. Als gemeenten met hoge kosten hun
                  beleidsgestuurde kosten richting het gemiddelde verschuiven en aanbieders
                  bewezen initiatieven omarmen, zijn aanzienlijke besparingen mogelijk.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-5">
            {/* Map - takes 3 cols */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <MapPin className="h-4 w-4 text-sky-500" />
                  Geografische kaart
                </h2>
                <svg
                  viewBox="0 0 800 600"
                  className="w-full"
                  style={{ maxHeight: '600px' }}
                >
                  {/* Background */}
                  <rect width="800" height="600" fill="#f8fafc" rx="8" />

                  {/* Municipality polygons */}
                  {municipalities.map((m) => {
                    const shapePath = municipalityShapes[m.id];
                    const label = labelPositions[m.id];
                    if (!shapePath || !label) return null;

                    const isHovered = hovered === m.id;
                    const isSelected = selected?.id === m.id;
                    const fill = costColor(m.costs);

                    return (
                      <g
                        key={m.id}
                        className="cursor-pointer"
                        onClick={() => setSelected(m)}
                        onMouseEnter={() => setHovered(m.id)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        {/* Main shape */}
                        <path
                          d={shapePath}
                          fill={
                            isSelected
                              ? fill + '40'
                              : isHovered
                              ? fill + '30'
                              : fill + '20'
                          }
                          stroke={isSelected ? fill : isHovered ? fill : fill + '80'}
                          strokeWidth={isSelected ? 3 : isHovered ? 2.5 : 1.5}
                          strokeDasharray={isHovered && !isSelected ? '6 3' : 'none'}
                          style={{ transition: 'all 0.15s ease' }}
                        />

                        {/* Municipality name */}
                        <text
                          x={label.x}
                          y={label.y - 14}
                          textAnchor="middle"
                          className="fill-slate-800 text-[11px] font-bold"
                          style={{ pointerEvents: 'none' }}
                        >
                          {m.name.length > 16
                            ? m.name.slice(0, 14) + '...'
                            : m.name}
                        </text>

                        {/* Cost */}
                        <text
                          x={label.x}
                          y={label.y + 2}
                          textAnchor="middle"
                          className="text-[12px] font-semibold"
                          style={{ fill, pointerEvents: 'none' }}
                        >
                          {'\u20AC'}{m.costs}k
                        </text>

                        {/* Score */}
                        <text
                          x={label.x}
                          y={label.y + 16}
                          textAnchor="middle"
                          className="fill-slate-500 text-[10px]"
                          style={{ pointerEvents: 'none' }}
                        >
                          score: {m.score}
                        </text>
                      </g>
                    );
                  })}

                </svg>
              </div>

              {/* Legend */}
              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Legenda - kosten per 1000 inwoners
                </h3>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-sm bg-green-500" />
                    <span className="text-sm text-slate-600">
                      Laag (&lt; {'\u20AC'}{Math.round(minCosts + spread * 0.33)}k)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-sm bg-yellow-500" />
                    <span className="text-sm text-slate-600">
                      Gemiddeld ({'\u20AC'}{Math.round(minCosts + spread * 0.33)}k -{' '}
                      {'\u20AC'}{Math.round(minCosts + spread * 0.66)}k)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-sm bg-red-500" />
                    <span className="text-sm text-slate-600">
                      Hoog (&gt; {'\u20AC'}{Math.round(minCosts + spread * 0.66)}k)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - takes 2 cols */}
            <div className="space-y-4 lg:col-span-2">
              {/* Regional summary */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <BarChart3 className="h-4 w-4 text-sky-500" />
                  Regionaal overzicht
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      Gem. kosten
                    </p>
                    <p className="mt-1 text-xl font-bold text-slate-800">
                      {'\u20AC'}{avgCosts}k
                    </p>
                    <p className="text-xs text-slate-500">per 1000 inwoners</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      Gem. score
                    </p>
                    <p className="mt-1 text-xl font-bold text-slate-800">
                      {avgScore}
                    </p>
                    <p className="text-xs text-slate-500">van de 10</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      Spreiding kosten
                    </p>
                    <p className="mt-1 text-xl font-bold text-slate-800">
                      {'\u20AC'}{spread}k
                    </p>
                    <p className="text-xs text-slate-500">
                      {'\u20AC'}{minCosts}k - {'\u20AC'}{maxCosts}k
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      Beleidsgestuurd
                    </p>
                    <p className="mt-1 text-xl font-bold text-sky-600">~22%</p>
                    <p className="text-xs text-slate-500">via beleid &amp; initiatieven</p>
                  </div>
                </div>
              </div>

              {/* Sort/filter */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <SortAsc className="h-3.5 w-3.5" />
                  Sorteer:
                </div>
                {(
                  [
                    ['costs', 'Kosten'],
                    ['score', 'Score'],
                    ['name', 'A-Z'],
                  ] as [SortKey, string][]
                ).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setSortKey(key)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                      sortKey === key
                        ? 'bg-sky-100 text-sky-700'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Municipality list */}
              <div className="space-y-2">
                {sortedList.map((m, i) => {
                  const diff = m.costs - avgCosts;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setSelected(m)}
                      className={`group flex w-full items-center gap-3 rounded-xl border bg-white p-3 text-left shadow-sm transition hover:shadow-md ${
                        selected?.id === m.id
                          ? 'border-sky-300 ring-2 ring-sky-100'
                          : 'border-slate-200'
                      }`}
                      style={{
                        animation: `fadeIn 0.2s ease-out ${i * 0.04}s both`,
                      }}
                    >
                      {/* Color dot */}
                      <div
                        className="h-8 w-8 shrink-0 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: costColor(m.costs) }}
                      >
                        {i + 1}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="truncate text-sm font-semibold text-slate-800">
                            {m.name}
                          </p>
                          <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-sky-500" />
                        </div>
                        <div className="mt-0.5 flex items-center gap-3 text-xs text-slate-500">
                          <span>{'\u20AC'}{m.costs}k /1000 inw.</span>
                          <span className="text-slate-300">|</span>
                          <span>score {m.score}</span>
                          <span className="text-slate-300">|</span>
                          <span
                            className={
                              diff > 0 ? 'text-red-500' : 'text-green-500'
                            }
                          >
                            {diff > 0 ? '+' : ''}
                            {diff} vs gem.
                          </span>
                        </div>
                        {/* Mini bar */}
                        <div className="mt-1.5 h-1 w-full rounded bg-slate-100">
                          <div
                            className="h-1 rounded transition-all"
                            style={{
                              width: `${(m.costs / maxCosts) * 100}%`,
                              backgroundColor: costColor(m.costs),
                            }}
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail panel overlay */}
      {selected && (
        <DetailPanel
          municipality={selected}
          onClose={() => setSelected(null)}
          onSelectMunicipality={(m) => setSelected(m)}
        />
      )}
    </>
  );
}
