'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Calculator,
  TrendingDown,
  DollarSign,
  CheckCircle2,
  Target,
  Zap,
  Users,
  Building2,
  ArrowRight,
  Info,
  MapPin,
  Globe,
  Download,
  Share2,
  Presentation,
  UserCheck,
  FileSpreadsheet,
} from 'lucide-react';
import { generateBusinesscaseExcel } from '@/lib/generateBusinesscaseExcel';

/* ------------------------------------------------------------------ */
/*  INITIATIVE DATA                                                    */
/* ------------------------------------------------------------------ */

interface InitiativeOption {
  id: string;
  name: string;
  description: string;
  sggzReductionPct: number;
  bggzReductionPct: number;
  sggzToBggzShiftPct: number;
  /** Variable cost per trajectory for this initiative */
  costPerSggzYouth: number;
  /** Fixed implementation cost at organisatie level */
  fixedCostOrganisatie: number;
  /** Fixed implementation cost at regio level */
  fixedCostRegio: number;
  /** Fixed implementation cost at landelijk level */
  fixedCostLandelijk: number;
  costNote: string;
}

const initiativeOptions: InitiativeOption[] = [
  {
    id: 'overbruggingszorg',
    name: 'Overbruggingszorg',
    description: 'Overbruggingstraject tijdens wachttijd SGGZ',
    sggzReductionPct: 11,
    bggzReductionPct: 0,
    sggzToBggzShiftPct: 40,
    costPerSggzYouth: 1277,
    fixedCostOrganisatie: 25_000,
    fixedCostRegio: 80_000,
    fixedCostLandelijk: 1_500_000,
    costNote: 'Trajectkosten \u20AC1.277 per traject (triage, e-health, groepssessies, eindgesprek)',
  },
  {
    id: 'brede-intake',
    name: 'Brede Intake',
    description: 'Gespecialiseerde intake met ervaringsdeskundige',
    sggzReductionPct: 14,
    bggzReductionPct: 0,
    sggzToBggzShiftPct: 40,
    costPerSggzYouth: 250,
    fixedCostOrganisatie: 30_000,
    fixedCostRegio: 100_000,
    fixedCostLandelijk: 2_000_000,
    costNote: 'Extra intakekosten \u20AC250 per traject (2 uur \u00E0 \u20AC125/u: specialist + ervaringsdeskundige)',
  },
  {
    id: 'kracht-van-kort',
    name: 'De Kracht van Kort',
    description: 'Kortdurende, doelgerichte behandeling',
    sggzReductionPct: 15,
    bggzReductionPct: 10,
    sggzToBggzShiftPct: 0,
    costPerSggzYouth: 0,
    fixedCostOrganisatie: 60_000,
    fixedCostRegio: 200_000,
    fixedCostLandelijk: 4_000_000,
    costNote: 'Trainingskosten behandelaars, methodiek-implementatie, tussentijdse evaluatiesystemen',
  },
  {
    id: 'gezinsgerichte-aanpak',
    name: 'Gezinsgerichte Aanpak',
    description: 'Gezinsplan en integraal werken',
    sggzReductionPct: 5,
    bggzReductionPct: 5,
    sggzToBggzShiftPct: 0,
    costPerSggzYouth: 0,
    fixedCostOrganisatie: 45_000,
    fixedCostRegio: 150_000,
    fixedCostLandelijk: 3_000_000,
    costNote: 'Opzet gezinscentra, training systeemgericht werken, co\u00F6rdinatie meerdere aanbieders',
  },
  {
    id: 'integraal-zorgaanbod',
    name: 'Integraal Zorgaanbod met Groepsbegeleiding',
    description: 'Parallelle behandeling + groepsbegeleiding',
    sggzReductionPct: 8,
    bggzReductionPct: 5,
    sggzToBggzShiftPct: 0,
    costPerSggzYouth: 0,
    fixedCostOrganisatie: 40_000,
    fixedCostRegio: 120_000,
    fixedCostLandelijk: 2_500_000,
    costNote: 'Groepsruimte, co\u00F6rdinatie behandelaar-begeleider, groepsbegeleidingsmethodiek',
  },
];

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

function formatEuro(value: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('nl-NL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/* ------------------------------------------------------------------ */
/*  ANIMATED COUNTER                                                   */
/* ------------------------------------------------------------------ */

function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  duration = 800,
  formatFn,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  formatFn?: (v: number) => string;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    if (target === 0) {
      setValue(0);
      return;
    }
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

  const display = formatFn
    ? formatFn(value)
    : Number.isInteger(target)
      ? Math.round(value).toString()
      : value.toFixed(1);

  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  PROGRESS BAR                                                       */
/* ------------------------------------------------------------------ */

function ProgressBar({
  value,
  max,
  color,
}: {
  value: number;
  max: number;
  color: string;
}) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(Math.min((value / max) * 100, 100)), 50);
    return () => clearTimeout(t);
  }, [value, max]);

  return (
    <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{
          width: `${width}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE                                                          */
/* ------------------------------------------------------------------ */

export default function ImpactSimulatorPage() {
  const [mounted, setMounted] = useState(false);
  const [sggzVolume, setSggzVolume] = useState<number | ''>('');
  const [bggzVolume, setBggzVolume] = useState<number | ''>('');
  const [sggzCost, setSggzCost] = useState<number>(3800);
  const [bggzCost, setBggzCost] = useState<number>(1300);
  const [years, setYears] = useState<number>(1);
  const [scale, setScale] = useState<'organisatie' | 'regio' | 'landelijk'>('organisatie');
  const [selectedInitiatives, setSelectedInitiatives] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => setMounted(true), []);

  const toggleInitiative = (id: string) => {
    setSelectedInitiatives((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleScaleChange = (newScale: 'organisatie' | 'regio' | 'landelijk') => {
    setScale(newScale);
    if (newScale === 'regio') {
      setSggzVolume(4800);
      setBggzVolume(3200);
    } else if (newScale === 'landelijk') {
      setSggzVolume(160000);
      setBggzVolume(240000);
    } else {
      setSggzVolume('');
      setBggzVolume('');
    }
  };

  /* ---- Calculation ---- */
  const results = useMemo(() => {
    const sggz = typeof sggzVolume === 'number' ? sggzVolume : 0;
    const bggz = typeof bggzVolume === 'number' ? bggzVolume : 0;

    const selected = initiativeOptions.filter((i) =>
      selectedInitiatives.has(i.id)
    );

    if (selected.length === 0 || (sggz === 0 && bggz === 0)) {
      return null;
    }

    // Combined SGGZ reduction: 1 - product(1 - r_i)
    const combinedSggzReduction =
      1 -
      selected.reduce(
        (product, init) => product * (1 - init.sggzReductionPct / 100),
        1
      );

    // Combined BGGZ reduction: 1 - product(1 - r_i)
    const combinedBggzReduction =
      1 -
      selected.reduce(
        (product, init) => product * (1 - init.bggzReductionPct / 100),
        1
      );

    // SGGZ to BGGZ shift: 1 - product(1 - shift_i)
    const combinedShift =
      1 -
      selected.reduce(
        (product, init) => product * (1 - init.sggzToBggzShiftPct / 100),
        1
      );

    // Number of jongeren reduced from SGGZ
    const sggzReduced = Math.round(sggz * combinedSggzReduction);
    // Number shifted from SGGZ to BGGZ (from the remaining SGGZ after reduction)
    const sggzRemaining = sggz - sggzReduced;
    const shiftedToBggz = Math.round(sggzRemaining * combinedShift);

    // BGGZ reduction applied to original BGGZ volume
    const bggzReduced = Math.round(bggz * combinedBggzReduction);

    // Cost savings per year
    const sggzSavingsPerYear = sggzReduced * sggzCost + shiftedToBggz * (sggzCost - bggzCost);
    const bggzSavingsPerYear = bggzReduced * bggzCost;
    const totalSavingsPerYear = sggzSavingsPerYear + bggzSavingsPerYear;

    // Cumulative over years
    const sggzSavings = sggzSavingsPerYear * years;
    const bggzSavings = bggzSavingsPerYear * years;
    const totalSavings = totalSavingsPerYear * years;

    // Cumulative trajecten reductie
    const cumulativeSggzReduced = sggzReduced * years;
    const cumulativeBggzReduced = bggzReduced * years;
    const cumulativeShiftedToBggz = shiftedToBggz * years;

    // Investment calculation: fixed costs + variable costs per youth
    const fixedCosts = selected.reduce((sum, init) => {
      if (scale === 'landelijk') return sum + init.fixedCostLandelijk;
      if (scale === 'regio') return sum + init.fixedCostRegio;
      return sum + init.fixedCostOrganisatie;
    }, 0);

    // Variable costs: per-trajectory costs for initiatives that have them
    const variableCostBreakdown = selected
      .filter((init) => init.costPerSggzYouth > 0)
      .map((init) => ({
        name: init.name,
        costPerTraject: init.costPerSggzYouth,
        trajecten: sggz,
        total: init.costPerSggzYouth * sggz,
      }));

    const variableCostsPerYear = variableCostBreakdown.reduce(
      (sum, item) => sum + item.total,
      0
    );

    const totalInvestment = fixedCosts + variableCostsPerYear * years;

    const netSavingsPerYear = totalSavingsPerYear - variableCostsPerYear;

    return {
      combinedSggzReductionPct: combinedSggzReduction * 100,
      combinedBggzReductionPct: combinedBggzReduction * 100,
      sggzReduced: cumulativeSggzReduced,
      bggzReduced: cumulativeBggzReduced,
      shiftedToBggz: cumulativeShiftedToBggz,
      sggzSavings,
      bggzSavings,
      totalSavings,
      totalSavingsPerYear,
      totalInvestment,
      fixedCosts,
      variableCostsPerYear,
      variableCostBreakdown,
      netSavingsPerYear,
      initiativeCount: selected.length,
      years,
    };
  }, [sggzVolume, bggzVolume, sggzCost, bggzCost, selectedInitiatives, years, scale]);

  const hasInput =
    (typeof sggzVolume === 'number' && sggzVolume > 0) ||
    (typeof bggzVolume === 'number' && bggzVolume > 0);

  const downloadBusinesscase = useCallback(() => {
    if (!results) return;
    const sggz = typeof sggzVolume === 'number' ? sggzVolume : 0;
    const bggz = typeof bggzVolume === 'number' ? bggzVolume : 0;
    const selectedNames = initiativeOptions
      .filter((i) => selectedInitiatives.has(i.id))
      .map((i) => i.name);

    const scaleLabel = scale === 'landelijk' ? 'Landelijk' : scale === 'regio' ? 'ZHZ-regio' : 'Organisatie';
    const date = new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });

    const html = `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<title>Businesscase KAM — Impact Simulator</title>
<style>
  @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 40px; color: #1e293b; line-height: 1.6; }
  .header { background: linear-gradient(135deg, #4338ca, #7c3aed); color: white; padding: 32px; border-radius: 12px; margin-bottom: 32px; }
  .header h1 { margin: 0 0 8px; font-size: 28px; }
  .header p { margin: 0; opacity: 0.85; font-size: 14px; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
  .card { border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; }
  .card h3 { margin: 0 0 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; }
  .big { font-size: 32px; font-weight: 800; color: #1e293b; }
  .green { color: #059669; }
  .purple { color: #7c3aed; }
  table { width: 100%; border-collapse: collapse; margin: 16px 0; }
  th, td { text-align: left; padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
  th { font-weight: 600; color: #64748b; }
  .section { margin-bottom: 28px; }
  .section h2 { font-size: 18px; margin: 0 0 12px; padding-bottom: 8px; border-bottom: 2px solid #e2e8f0; }
  .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; }
  .highlight { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 20px; margin: 16px 0; }
</style>
</head>
<body>
<div class="header">
  <h1>Businesscase: Kwaliteit als Medicijn</h1>
  <p>Impact Simulator — gegenereerd op ${date}</p>
</div>

<div class="section">
  <h2>Uitgangspunten</h2>
  <div class="grid">
    <div class="card">
      <h3>Schaal</h3>
      <p class="big">${scaleLabel}</p>
    </div>
    <div class="card">
      <h3>Looptijd</h3>
      <p class="big">${results.years} jaar</p>
    </div>
    <div class="card">
      <h3>SGGZ-volume</h3>
      <p class="big">${formatNumber(sggz)} /jaar</p>
    </div>
    <div class="card">
      <h3>BGGZ-volume</h3>
      <p class="big">${formatNumber(bggz)} /jaar</p>
    </div>
  </div>
  <table>
    <tr><th>Kosten per SGGZ-traject</th><td>${formatEuro(sggzCost)}</td></tr>
    <tr><th>Kosten per BGGZ-traject</th><td>${formatEuro(bggzCost)}</td></tr>
  </table>
</div>

<div class="section">
  <h2>Geselecteerde initiatieven (${selectedNames.length})</h2>
  <table>
    <tr><th>Initiatief</th><th>SGGZ-reductie</th><th>BGGZ-reductie</th><th>SGGZ→BGGZ shift</th></tr>
    ${initiativeOptions
      .filter((i) => selectedInitiatives.has(i.id))
      .map((i) => `<tr><td><strong>${i.name}</strong></td><td>${i.sggzReductionPct}%</td><td>${i.bggzReductionPct}%</td><td>${i.sggzToBggzShiftPct}%</td></tr>`)
      .join('')}
  </table>
</div>

<div class="highlight">
  <h2 style="border:none;padding:0;margin:0 0 12px;">Verwacht resultaat</h2>
  <div class="grid">
    <div>
      <h3 style="color:#64748b;font-size:12px;margin:0;">Gecombineerde SGGZ-reductie</h3>
      <p class="big green">${results.combinedSggzReductionPct.toFixed(1)}%</p>
    </div>
    <div>
      <h3 style="color:#64748b;font-size:12px;margin:0;">Gecombineerde BGGZ-reductie</h3>
      <p class="big green">${results.combinedBggzReductionPct.toFixed(1)}%</p>
    </div>
    <div>
      <h3 style="color:#64748b;font-size:12px;margin:0;">Totale besparing (${results.years}j)</h3>
      <p class="big green">${formatEuro(results.totalSavings)}</p>
    </div>
    <div>
      <h3 style="color:#64748b;font-size:12px;margin:0;">Netto besparing per jaar</h3>
      <p class="big green">${formatEuro(results.netSavingsPerYear)}</p>
    </div>
  </div>
</div>

<div class="section">
  <h2>Investering</h2>
  <table>
    <tr><th>Vaste kosten (implementatie)</th><td>${formatEuro(results.fixedCosts)}</td></tr>
    ${results.variableCostBreakdown.map((item) => `<tr><th>${item.name} (${formatNumber(item.trajecten)} trajecten &times; ${formatEuro(item.costPerTraject)})</th><td>${formatEuro(item.total)}/jaar</td></tr>`).join('')}
    <tr><th>Variabele kosten per jaar totaal</th><td>${formatEuro(results.variableCostsPerYear)}</td></tr>
    <tr style="font-weight:bold;"><th>Totale investering (${results.years}j)</th><td>${formatEuro(results.totalInvestment)}</td></tr>
  </table>
</div>

<div class="section">
  <h2>Volume-effect (${results.years} jaar)</h2>
  <table>
    <tr><th>Minder SGGZ-trajecten</th><td>${formatNumber(results.sggzReduced)}</td></tr>
    <tr><th>Minder BGGZ-trajecten</th><td>${formatNumber(results.bggzReduced)}</td></tr>
    <tr><th>Verschoven naar BGGZ</th><td>${formatNumber(results.shiftedToBggz)}</td></tr>
    <tr><th>SGGZ-besparing</th><td>${formatEuro(results.sggzSavings)}</td></tr>
    <tr><th>BGGZ-besparing</th><td>${formatEuro(results.bggzSavings)}</td></tr>
    <tr style="font-weight:bold;"><th>Totale besparing</th><td>${formatEuro(results.totalSavings)}</td></tr>
  </table>
</div>

<div class="footer">
  <p>Dit document is gegenereerd door de Kwaliteit als Medicijn Impact Simulator. Alle schattingen zijn indicatief en gebaseerd op regionale gemiddelden en aannames uit het programma. De daadwerkelijke resultaten kunnen afwijken afhankelijk van de specifieke context, implementatiekwaliteit en patiëntenpopulatie.</p>
  <p style="margin-top:8px;">Gecombineerde reductie: 1 - ∏(1 - reductie_i) | Kwaliteit als Medicijn — Zuid-Holland Zuid</p>
</div>
</body>
</html>`;

    const w = window.open('', '_blank');
    if (w) {
      w.document.write(html);
      w.document.close();
      setTimeout(() => w.print(), 300);
    }
  }, [results, sggzVolume, bggzVolume, sggzCost, bggzCost, selectedInitiatives, scale]);

  const downloadExcel = useCallback(async () => {
    if (!results) return;
    const sggz = typeof sggzVolume === 'number' ? sggzVolume : 0;
    const bggz = typeof bggzVolume === 'number' ? bggzVolume : 0;
    await generateBusinesscaseExcel({
      sggzVolume: sggz,
      bggzVolume: bggz,
      sggzCost,
      bggzCost,
      years,
      scale,
      selectedInitiativeIds: Array.from(selectedInitiatives),
      allInitiatives: initiativeOptions,
    });
  }, [results, sggzVolume, bggzVolume, sggzCost, bggzCost, selectedInitiatives, years, scale]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* ============================================================ */}
      {/*  HEADER                                                       */}
      {/* ============================================================ */}
      <header className="relative overflow-hidden bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-700 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-2">
            <Calculator size={28} className="text-fuchsia-300" />
            <span className="text-sm font-semibold uppercase tracking-widest text-indigo-200">
              Kwaliteit als Medicijn
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Impact Simulator
          </h1>
          <p className="mt-3 text-lg text-indigo-100 max-w-2xl">
            Bereken de verwachte volumereductie en kostenbesparing voor uw
            organisatie. Vul uw gegevens in, selecteer de initiatieven die u wilt
            implementeren en zie direct het verwachte effect.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium">
              <Target size={16} /> 5 Initiatieven beschikbaar
            </span>
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium">
              <TrendingDown size={16} /> Gecombineerde reductieberekening
            </span>
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium">
              <DollarSign size={16} /> Investeringsanalyse
            </span>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/*  MAIN CONTENT                                                 */}
      {/* ============================================================ */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10">
          {/* ======================================================== */}
          {/*  LEFT SIDE: INPUTS                                        */}
          {/* ======================================================== */}
          <div className="space-y-8">
            {/* Volume inputs */}
            <div className="rounded-2xl bg-white shadow-md border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600">
                  <Users size={20} />
                </span>
                <h2 className="text-lg font-bold text-gray-900">
                  Uw patiëntvolume
                </h2>
              </div>

              <div className="space-y-4">
                {/* SGGZ volume */}
                <div>
                  <label
                    htmlFor="sggz-volume"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Aantal jongeren met SGGZ-verwijzing per jaar
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Users size={16} className="text-gray-400" />
                    </div>
                    <input
                      id="sggz-volume"
                      type="number"
                      min={0}
                      placeholder="bijv. 200"
                      value={sggzVolume === '' ? '' : sggzVolume}
                      onChange={(e) =>
                        setSggzVolume(
                          e.target.value === '' ? '' : Number(e.target.value)
                        )
                      }
                      className="block w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-sm"
                    />
                  </div>
                </div>

                {/* BGGZ volume */}
                <div>
                  <label
                    htmlFor="bggz-volume"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Aantal jongeren met BGGZ-verwijzing per jaar
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Users size={16} className="text-gray-400" />
                    </div>
                    <input
                      id="bggz-volume"
                      type="number"
                      min={0}
                      placeholder="bijv. 150"
                      value={bggzVolume === '' ? '' : bggzVolume}
                      onChange={(e) =>
                        setBggzVolume(
                          e.target.value === '' ? '' : Number(e.target.value)
                        )
                      }
                      className="block w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Cost inputs */}
            <div className="rounded-2xl bg-white shadow-md border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-purple-100 text-purple-600">
                  <DollarSign size={20} />
                </span>
                <h2 className="text-lg font-bold text-gray-900">
                  Trajectkosten
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* SGGZ cost */}
                <div>
                  <label
                    htmlFor="sggz-cost"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Kosten per SGGZ-traject
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-400 text-sm font-medium">
                        &euro;
                      </span>
                    </div>
                    <input
                      id="sggz-cost"
                      type="number"
                      min={0}
                      value={sggzCost}
                      onChange={(e) => setSggzCost(Number(e.target.value))}
                      className="block w-full rounded-xl border border-gray-300 bg-white py-3 pl-8 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-sm"
                    />
                  </div>
                </div>

                {/* BGGZ cost */}
                <div>
                  <label
                    htmlFor="bggz-cost"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Kosten per BGGZ-traject
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-400 text-sm font-medium">
                        &euro;
                      </span>
                    </div>
                    <input
                      id="bggz-cost"
                      type="number"
                      min={0}
                      value={bggzCost}
                      onChange={(e) => setBggzCost(Number(e.target.value))}
                      className="block w-full rounded-xl border border-gray-300 bg-white py-3 pl-8 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Looptijd (years) */}
            <div className="rounded-2xl bg-white shadow-md border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600">
                  <Calculator size={20} />
                </span>
                <h2 className="text-lg font-bold text-gray-900">
                  Looptijd
                </h2>
              </div>

              <div>
                <label
                  htmlFor="years"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Aantal jaar
                </label>
                <div className="flex items-center gap-4">
                  <input
                    id="years"
                    type="range"
                    min={1}
                    max={10}
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="flex-1 h-2 rounded-full appearance-none bg-gray-200 accent-emerald-500"
                  />
                  <div className="relative">
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={years}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        if (v >= 1 && v <= 10) setYears(v);
                      }}
                      className="w-20 rounded-xl border border-gray-300 bg-white py-3 px-4 text-center text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all text-sm font-bold"
                    />
                  </div>
                  <span className="text-sm text-gray-500 font-medium">jaar</span>
                </div>
                <p className="mt-2 text-xs text-gray-400">
                  Besparingen en volumes worden cumulatief berekend over de geselecteerde periode.
                </p>
              </div>
            </div>

            {/* Schaal */}
            <div className="rounded-2xl bg-white shadow-md border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-100 text-cyan-600">
                  <MapPin size={20} />
                </span>
                <h2 className="text-lg font-bold text-gray-900">
                  Schaal
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {([
                  { key: 'organisatie' as const, label: 'Mijn organisatie', icon: Building2, desc: 'Eigen volumes invullen' },
                  { key: 'regio' as const, label: 'ZHZ-regio', icon: MapPin, desc: '10 gemeenten' },
                  { key: 'landelijk' as const, label: 'Landelijk', icon: Globe, desc: '390 gemeenten' },
                ]).map((opt) => {
                  const isActive = scale === opt.key;
                  const OptIcon = opt.icon;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => handleScaleChange(opt.key)}
                      className={`text-left rounded-xl border-2 p-4 transition-all duration-300 ${
                        isActive
                          ? 'border-cyan-400 bg-cyan-50/60 shadow-md shadow-cyan-100'
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-lg transition-colors shrink-0 ${
                            isActive
                              ? 'bg-cyan-500 text-white'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          <OptIcon size={16} />
                        </span>
                        <div className="min-w-0">
                          <span className={`block text-sm font-semibold ${isActive ? 'text-cyan-900' : 'text-gray-900'}`}>
                            {opt.label}
                          </span>
                          <span className="block text-xs text-gray-500">{opt.desc}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {scale === 'regio' && (
                <div className="mt-4 rounded-xl bg-cyan-50 border border-cyan-200 p-4">
                  <p className="text-sm text-cyan-800 leading-relaxed">
                    <span className="font-semibold">Zuid-Holland Zuid</span> heeft ca. 4.800 SGGZ-verwijzingen en ca. 3.200 BGGZ-verwijzingen per jaar (10 gemeenten, ~250.000 inwoners).
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-cyan-600 text-white px-4 py-1.5 text-sm font-semibold">
                    <Users size={14} />
                    Dit raakt {formatNumber(
                      (typeof sggzVolume === 'number' ? sggzVolume : 0) +
                      (typeof bggzVolume === 'number' ? bggzVolume : 0)
                    )} jeugdigen
                  </div>
                </div>
              )}

              {scale === 'landelijk' && (
                <div className="mt-4 rounded-xl bg-cyan-50 border border-cyan-200 p-4">
                  <p className="text-sm text-cyan-800 leading-relaxed">
                    <span className="font-semibold">Nederland</span> heeft ca. 400.000 jeugdigen in de GGZ per jaar, waarvan ca. 160.000 SGGZ en ca. 240.000 BGGZ (390 gemeenten).
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-cyan-600 text-white px-4 py-1.5 text-sm font-semibold">
                    <Users size={14} />
                    Dit raakt {formatNumber(
                      (typeof sggzVolume === 'number' ? sggzVolume : 0) +
                      (typeof bggzVolume === 'number' ? bggzVolume : 0)
                    )} jeugdigen
                  </div>
                </div>
              )}
            </div>

            {/* Initiative checkboxes */}
            <div className="rounded-2xl bg-white shadow-md border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-fuchsia-100 text-fuchsia-600">
                  <Zap size={20} />
                </span>
                <h2 className="text-lg font-bold text-gray-900">
                  Selecteer initiatieven
                </h2>
              </div>

              <div className="space-y-3">
                {initiativeOptions.map((init) => {
                  const isActive = selectedInitiatives.has(init.id);
                  return (
                    <button
                      key={init.id}
                      type="button"
                      onClick={() => toggleInitiative(init.id)}
                      className={`w-full text-left rounded-xl border-2 p-4 transition-all duration-300 ${
                        isActive
                          ? 'border-indigo-400 bg-indigo-50/60 shadow-md shadow-indigo-100'
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-md transition-colors shrink-0 ${
                            isActive
                              ? 'bg-indigo-500 text-white'
                              : 'bg-gray-100 text-gray-400 border border-gray-300'
                          }`}
                        >
                          {isActive && <CheckCircle2 size={16} />}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-gray-900">
                              {init.name}
                            </span>
                            <span
                              className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 transition-colors ${
                                isActive
                                  ? 'bg-indigo-500 text-white'
                                  : 'bg-gray-100 text-gray-500'
                              }`}
                            >
                              {isActive ? 'AAN' : 'UIT'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-0.5">
                            {init.description}
                          </p>
                          <div className="flex flex-wrap gap-3 mt-2 text-xs">
                            {init.sggzReductionPct > 0 && (
                              <span className="inline-flex items-center gap-1 text-indigo-600 font-medium">
                                <TrendingDown size={12} />
                                SGGZ -{init.sggzReductionPct}%
                              </span>
                            )}
                            {init.bggzReductionPct > 0 && (
                              <span className="inline-flex items-center gap-1 text-purple-600 font-medium">
                                <TrendingDown size={12} />
                                BGGZ -{init.bggzReductionPct}%
                              </span>
                            )}
                            {init.sggzToBggzShiftPct > 0 && (
                              <span className="inline-flex items-center gap-1 text-fuchsia-600 font-medium">
                                <ArrowRight size={12} />
                                {init.sggzToBggzShiftPct}% SGGZ naar BGGZ
                              </span>
                            )}
                          </div>
                          {isActive && (
                            <p className="mt-2 text-xs text-gray-400 italic leading-relaxed">
                              {init.costNote}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/*  RIGHT SIDE: RESULTS                                      */}
          {/* ======================================================== */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 text-white p-8 shadow-xl relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              <div className="relative">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm">
                    <Calculator size={24} />
                  </span>
                  <div>
                    <p className="text-indigo-200 text-sm font-semibold uppercase tracking-wider">
                      Berekend Effect
                    </p>
                    <p className="text-xl font-bold">
                      {results
                        ? `${results.initiativeCount} van 5 initiatieven geselecteerd`
                        : 'Resultaten'}
                    </p>
                  </div>
                </div>

                {!results ? (
                  /* Empty state */
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4">
                      <Target size={36} className="text-indigo-200" />
                    </div>
                    <p className="text-indigo-100 text-base max-w-sm">
                      Vul je gegevens in en selecteer initiatieven om je impact
                      te berekenen
                    </p>
                  </div>
                ) : (
                  /* Results */
                  <div className="space-y-6">
                    {/* SGGZ volume reduction */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-1.5 text-sm font-medium">
                          <TrendingDown size={14} /> Verwachte SGGZ
                          volumereductie
                        </span>
                        <span className="text-lg font-extrabold">
                          <AnimatedCounter
                            target={parseFloat(
                              results.combinedSggzReductionPct.toFixed(1)
                            )}
                            suffix="%"
                          />
                        </span>
                      </div>
                      <ProgressBar
                        value={results.combinedSggzReductionPct}
                        max={60}
                        color="rgba(255,255,255,0.85)"
                      />
                      <p className="text-indigo-200 text-xs mt-1">
                        <AnimatedCounter target={results.sggzReduced} /> minder
                        SGGZ-trajecten
                        {results.shiftedToBggz > 0 && (
                          <>
                            {' '}
                            + <AnimatedCounter
                              target={results.shiftedToBggz}
                            />{' '}
                            verschuiven naar BGGZ
                          </>
                        )}
                      </p>
                    </div>

                    {/* BGGZ volume reduction */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-1.5 text-sm font-medium">
                          <TrendingDown size={14} /> Verwachte BGGZ
                          volumereductie
                        </span>
                        <span className="text-lg font-extrabold">
                          <AnimatedCounter
                            target={parseFloat(
                              results.combinedBggzReductionPct.toFixed(1)
                            )}
                            suffix="%"
                          />
                        </span>
                      </div>
                      <ProgressBar
                        value={results.combinedBggzReductionPct}
                        max={60}
                        color="rgba(255,255,255,0.85)"
                      />
                      <p className="text-indigo-200 text-xs mt-1">
                        <AnimatedCounter target={results.bggzReduced} /> minder
                        BGGZ-trajecten
                      </p>
                    </div>

                    {/* Total savings */}
                    <div className="rounded-xl bg-white/15 backdrop-blur-sm p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <DollarSign size={18} />
                        <span className="font-semibold text-sm uppercase tracking-wider">
                          Cumulatieve Kostenbesparing
                        </span>
                      </div>
                      <p className="text-4xl font-extrabold tracking-tight">
                        <AnimatedCounter
                          target={results.totalSavings}
                          formatFn={(v) => formatEuro(Math.round(v))}
                        />
                      </p>
                      <p className="text-xs text-indigo-200 mt-1">
                        over {results.years} jaar ({formatEuro(results.totalSavingsPerYear)} per jaar)
                      </p>
                      <div className="flex flex-col gap-1 mt-3 text-sm text-indigo-100">
                        <span>
                          SGGZ-besparing:{' '}
                          {formatEuro(results.sggzSavings)}
                        </span>
                        <span>
                          BGGZ-besparing:{' '}
                          {formatEuro(results.bggzSavings)}
                        </span>
                      </div>
                    </div>

                    {/* Investering & kosten */}
                    <div className="rounded-xl bg-white/15 backdrop-blur-sm p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Building2 size={18} />
                        <span className="font-semibold text-sm uppercase tracking-wider">
                          Investering
                        </span>
                      </div>
                      <p className="text-3xl font-extrabold">
                        <AnimatedCounter
                          target={results.totalInvestment}
                          formatFn={(v) => formatEuro(Math.round(v))}
                        />
                      </p>
                      <p className="text-xs text-indigo-200 mt-1">
                        totale investering over {results.years} jaar
                      </p>
                      <div className="flex flex-col gap-1 mt-3 text-sm text-indigo-100">
                        <span className="text-xs text-indigo-200">
                          Vaste kosten (implementatie): {formatEuro(results.fixedCosts)}
                        </span>
                        {results.variableCostBreakdown.length > 0 && (
                          <div className="mt-1 space-y-0.5">
                            <span className="text-xs text-indigo-200 font-medium">Variabele kosten per jaar:</span>
                            {results.variableCostBreakdown.map((item) => (
                              <span key={item.name} className="block text-xs text-indigo-200 pl-2">
                                {item.name}: {formatNumber(item.trajecten)} trajecten &times; {formatEuro(item.costPerTraject)} = {formatEuro(item.total)}/jaar
                              </span>
                            ))}
                          </div>
                        )}
                        <span className="text-xs text-indigo-200 mt-1 font-medium">
                          Netto besparing: {formatEuro(results.netSavingsPerYear)}/jaar
                        </span>
                      </div>
                    </div>

                    {/* Summary row */}
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      <div className="text-center rounded-xl bg-white/10 p-3">
                        <p className="text-2xl font-extrabold">
                          {formatNumber(
                            results.sggzReduced + results.bggzReduced
                          )}
                        </p>
                        <p className="text-xs text-indigo-200 mt-0.5">
                          Minder trajecten ({results.years}j)
                        </p>
                      </div>
                      <div className="text-center rounded-xl bg-white/10 p-3">
                        <p className="text-2xl font-extrabold">
                          {results.initiativeCount}
                        </p>
                        <p className="text-xs text-indigo-200 mt-0.5">
                          Initiatieven
                        </p>
                      </div>
                      <div className="text-center rounded-xl bg-white/10 p-3">
                        <p className="text-2xl font-extrabold">
                          {results.shiftedToBggz > 0
                            ? formatNumber(results.shiftedToBggz)
                            : '0'}
                        </p>
                        <p className="text-xs text-indigo-200 mt-0.5">
                          Verschoven naar BGGZ
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  DISCLAIMER / INFO NOTE                                      */}
        {/* ============================================================ */}
        <div className="mt-12 rounded-2xl bg-indigo-50 border border-indigo-100 p-6 flex gap-4">
          <div className="shrink-0 mt-0.5">
            <Info size={22} className="text-indigo-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Over deze berekeningen
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              De getoonde cijfers zijn schattingen op basis van regionale
              gemiddelden en aannames uit het programma Kwaliteit als Medicijn
              in Zuid-Holland Zuid. De
              daadwerkelijke resultaten kunnen afwijken afhankelijk van de
              specifieke context, implementatiekwaliteit en
              patiëntenpopulatie van uw organisatie. De gecombineerde
              reductiepercentages worden berekend met de formule{' '}
              <code className="bg-indigo-100 px-1.5 py-0.5 rounded text-xs font-mono text-indigo-700">
                1 - &prod;(1 - reductie_i)
              </code>{' '}
              om dubbeltellingen te voorkomen. Investeringskosten bestaan uit
              vaste implementatiekosten (die meeschalen met het niveau: organisatie,
              regio of landelijk) en variabele kosten per traject (o.a.
              overbruggingszorg: &euro;1.277/traject, brede intake: &euro;250/traject).
            </p>
          </div>
        </div>

        {/* Download businesscase section */}
        {results && (
          <div className="mt-10 rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-purple-50 border border-indigo-100 shadow-md overflow-hidden">
            <div className="px-6 py-8 sm:px-10 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Jouw businesscase is klaar
              </h3>
              <p className="text-sm text-gray-600 max-w-lg mx-auto mb-6">
                Download de businesscase als PDF en deel deze met je organisatie.
                Zo maak je de impact van Kwaliteit als Medicijn concreet en bespreekbaar.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={downloadBusinesscase}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Download size={20} />
                  Download als PDF
                </button>
                <button
                  type="button"
                  onClick={downloadExcel}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:from-emerald-700 hover:to-teal-700 transition-all hover:shadow-xl hover:-translate-y-0.5"
                >
                  <FileSpreadsheet size={20} />
                  Download als Excel
                </button>
              </div>
              <p className="mt-3 text-xs text-gray-400">
                PDF: print-vriendelijke versie &nbsp;|&nbsp; Excel: volledige businesscase met berekeningen, formules en meerdere tabbladen
              </p>
            </div>

            <div className="border-t border-indigo-100 bg-white/60 px-6 py-6 sm:px-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500 mb-4 flex items-center gap-1.5">
                <Share2 size={14} />
                Wat kun je met deze PDF?
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-100 text-indigo-600 shrink-0">
                    <Presentation size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Presenteer aan je bestuurder</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Laat zien welke impact initiatieven hebben op volume, kosten en kwaliteit binnen jouw organisatie.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-purple-100 text-purple-600 shrink-0">
                    <UserCheck size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Bespreek met je leidinggevende</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Gebruik de cijfers als onderbouwing in gesprekken over capaciteit, werkdruk en transformatie.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-fuchsia-100 text-fuchsia-600 shrink-0">
                    <Users size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Deel met je team</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Inspireer collega&apos;s met concrete cijfers en laat zien wat jullie samen kunnen bereiken.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/*  FOOTER                                                      */}
        {/* ============================================================ */}
        <footer className="text-center text-sm text-gray-400 pt-8 pb-12 border-t border-gray-100 mt-10">
          <p className="flex items-center justify-center gap-1.5">
            Kwaliteit als Medicijn &mdash; Impact Simulator
          </p>
          <p className="mt-1 text-xs text-gray-300">
            Alle schattingen zijn indicatief en gebaseerd op regionale
            gemiddelden.
          </p>
        </footer>
      </main>
    </div>
  );
}
