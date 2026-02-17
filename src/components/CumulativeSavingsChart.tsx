'use client';

import { useState, useMemo } from 'react';
import { TrendingUp } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const START_YEAR = 2025;
const MIN_END_YEAR = 2029;
const MAX_END_YEAR = 2035;
const DEFAULT_END_YEAR = 2029;

/** Net savings per year (in millions) — already corrected for overlap */
const LOW_PER_YEAR = 2.9;
const HIGH_PER_YEAR = 3.8;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatMillions(v: number): string {
  return `€${v.toFixed(1)} mln`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function CumulativeSavingsChart() {
  const [endYear, setEndYear] = useState(DEFAULT_END_YEAR);

  const data = useMemo(() => {
    const points: { year: number; low: number; high: number }[] = [];
    for (let y = START_YEAR; y <= endYear; y++) {
      const idx = y - START_YEAR + 1;
      points.push({ year: y, low: LOW_PER_YEAR * idx, high: HIGH_PER_YEAR * idx });
    }
    return points;
  }, [endYear]);

  const maxValue = data[data.length - 1]?.high ?? 0;
  // Round up to next nice ceiling for the Y axis
  const yCeil = Math.ceil(maxValue / 5) * 5;
  const yTicks = Array.from({ length: 5 }, (_, i) => ((i + 1) / 5) * yCeil);

  // Chart dimensions
  const chartH = 280;
  const chartW = 100; // percentage width (we'll use viewBox)
  const padL = 0;
  const padR = 0;

  // Map data point to SVG coordinates (0-100 x, 0-chartH y)
  const toX = (i: number) => padL + (i / (data.length - 1)) * (chartW - padL - padR);
  const toY = (v: number) => chartH - (v / yCeil) * chartH;

  // Build SVG path strings
  const lowLine = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(2)},${toY(d.low).toFixed(2)}`).join(' ');
  const highLine = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(2)},${toY(d.high).toFixed(2)}`).join(' ');

  // Area between low and high
  const areaPath = [
    ...data.map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(2)},${toY(d.high).toFixed(2)}`),
    ...data.slice().reverse().map((d, i) => `L${toX(data.length - 1 - i).toFixed(2)},${toY(d.low).toFixed(2)}`),
    'Z',
  ].join(' ');

  const lastPoint = data[data.length - 1];

  return (
    <div className="rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 to-white p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-5 w-5 text-primary-600" />
            <h3 className="text-lg font-bold text-primary-800 sm:text-xl">
              Cumulatief Besparingspotentieel
            </h3>
          </div>
          <p className="text-sm text-gray-500">
            Regionaal netto besparingspotentieel ZHZ (gecorrigeerd voor overlap)
          </p>
        </div>

        {/* Slider */}
        <div className="flex items-center gap-3 shrink-0">
          <label htmlFor="end-year-slider" className="text-sm font-medium text-gray-600 whitespace-nowrap">
            Projectie t/m
          </label>
          <input
            id="end-year-slider"
            type="range"
            min={MIN_END_YEAR}
            max={MAX_END_YEAR}
            value={endYear}
            onChange={(e) => setEndYear(Number(e.target.value))}
            className="w-28 sm:w-36 h-2 rounded-full appearance-none bg-primary-200 accent-primary-600"
          />
          <span className="text-sm font-bold text-primary-700 tabular-nums w-10 text-center">
            {endYear}
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 w-16 flex flex-col justify-between pointer-events-none">
          {yTicks.slice().reverse().map((t) => (
            <span key={t} className="text-[10px] sm:text-xs text-gray-400 tabular-nums leading-none">
              €{t}m
            </span>
          ))}
        </div>

        {/* SVG chart area */}
        <div className="ml-16">
          <svg
            viewBox={`0 0 ${chartW} ${chartH}`}
            preserveAspectRatio="none"
            className="w-full"
            style={{ height: `${chartH}px` }}
          >
            {/* Horizontal grid lines */}
            {yTicks.map((t) => (
              <line
                key={t}
                x1="0"
                y1={toY(t)}
                x2={chartW}
                y2={toY(t)}
                stroke="#e5e7eb"
                strokeWidth="0.3"
              />
            ))}
            <line x1="0" y1={chartH} x2={chartW} y2={chartH} stroke="#d1d5db" strokeWidth="0.3" />

            {/* Filled area between lines */}
            <path d={areaPath} fill="url(#areaGradient)" opacity="0.35" />

            {/* High line */}
            <path d={highLine} fill="none" stroke="#6d28d9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />

            {/* Low line */}
            <path d={lowLine} fill="none" stroke="#2563eb" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />

            {/* Data points */}
            {data.map((d, i) => (
              <g key={d.year}>
                <circle cx={toX(i)} cy={toY(d.high)} r="1.5" fill="#6d28d9" />
                <circle cx={toX(i)} cy={toY(d.low)} r="1.5" fill="#2563eb" />
              </g>
            ))}

            {/* Gradient definition */}
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>

          {/* X-axis labels */}
          <div className="flex justify-between mt-2">
            {data.map((d) => (
              <span
                key={d.year}
                className="text-[10px] sm:text-xs text-gray-400 tabular-nums"
              >
                {d.year}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Legend + end value callout */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
            <span className="inline-block w-3 h-0.5 rounded-full bg-[#6d28d9]" /> Hoge schatting (€{HIGH_PER_YEAR} mln/jr)
          </span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
            <span className="inline-block w-3 h-0.5 rounded-full bg-[#2563eb]" /> Lage schatting (€{LOW_PER_YEAR} mln/jr)
          </span>
        </div>

        {lastPoint && (
          <div className="rounded-xl bg-primary-100/60 border border-primary-200 px-4 py-2.5 text-center">
            <p className="text-xs text-primary-600 font-medium">Cumulatief t/m {lastPoint.year}</p>
            <p className="text-lg sm:text-xl font-extrabold text-primary-800 tracking-tight">
              {formatMillions(lastPoint.low)} – {formatMillions(lastPoint.high)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
