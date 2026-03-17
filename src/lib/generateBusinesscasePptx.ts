import PptxGenJS from 'pptxgenjs';
import { saveAs } from 'file-saver';

/* ================================================================
   TYPES (shared with Excel export)
   ================================================================ */

export interface InitiativeData {
  id: string;
  name: string;
  description: string;
  sggzReductionPct: number;
  bggzReductionPct: number;
  sggzToBggzShiftPct: number;
  costPerSggzYouth: number;
  fixedCostOrganisatie: number;
  fixedCostRegio: number;
  fixedCostLandelijk: number;
  costNote: string;
}

export interface PptxExportParams {
  sggzVolume: number;
  bggzVolume: number;
  sggzCost: number;
  bggzCost: number;
  years: number;
  scale: 'organisatie' | 'regio' | 'landelijk';
  selectedInitiativeIds: string[];
  allInitiatives: InitiativeData[];
}

/* ================================================================
   COLOUR PALETTE — Corporate Bordeaux (matching Excel)
   ================================================================ */

const CLR = {
  BORDEAUX: '800000',
  BORDEAUX_LIGHT: 'C05050',
  BORDEAUX_BG: 'F5E8E8',
  WHITE: 'FFFFFF',
  BLACK: '1E1E1E',
  GRAY: '808080',
  GRAY_LIGHT: 'D0D0D0',
  GRAY_BG: 'F5F5F5',
  GREEN: '008000',
  RED: 'CC0000',
};

/* ================================================================
   SLIDE MASTER LAYOUT
   ================================================================ */

function setupMaster(pptx: PptxGenJS) {
  // Define a master slide matching the Strategy& consulting style
  pptx.defineSlideMaster({
    title: 'KAM_MASTER',
    background: { fill: CLR.WHITE },
    objects: [
      // Top bordeaux bar
      { rect: { x: 0, y: 0, w: '100%', h: 0.08, fill: { color: CLR.BORDEAUX } } },
      // Bottom gray line
      { rect: { x: 0, y: 5.35, w: '100%', h: 0.01, fill: { color: CLR.GRAY_LIGHT } } },
      // Footer: company name left
      {
        text: {
          text: 'Kwaliteit als Medicijn',
          options: {
            x: 0.4, y: 5.38, w: 2.5, h: 0.25,
            fontSize: 7, fontFace: 'Arial', bold: true, color: CLR.BLACK,
          },
        },
      },
    ],
    slideNumber: {
      x: 9.1, y: 5.38, w: 0.4, h: 0.25,
      fontSize: 7, fontFace: 'Arial', color: CLR.GRAY,
    },
  });

  // Title slide master
  pptx.defineSlideMaster({
    title: 'KAM_TITLE',
    background: { fill: CLR.WHITE },
    objects: [
      // Thick bordeaux bar across middle
      { rect: { x: 0, y: 2.2, w: '100%', h: 0.06, fill: { color: CLR.BORDEAUX } } },
      // Bottom gray line
      { rect: { x: 0, y: 5.35, w: '100%', h: 0.01, fill: { color: CLR.GRAY_LIGHT } } },
      {
        text: {
          text: 'Kwaliteit als Medicijn',
          options: {
            x: 0.4, y: 5.38, w: 2.5, h: 0.25,
            fontSize: 7, fontFace: 'Arial', bold: true, color: CLR.BLACK,
          },
        },
      },
    ],
  });
}

/* ================================================================
   HELPER: format currency
   ================================================================ */
function fmtEur(val: number): string {
  return '\u20AC' + val.toLocaleString('nl-NL', { maximumFractionDigits: 0 });
}

function fmtPct(val: number): string {
  return (val * 100).toFixed(1) + '%';
}

function fmtNum(val: number): string {
  return val.toLocaleString('nl-NL', { maximumFractionDigits: 0 });
}

/* ================================================================
   HELPER: add a section breadcrumb text at top
   ================================================================ */
function addBreadcrumb(slide: PptxGenJS.Slide, text: string) {
  slide.addText(text, {
    x: 0.4, y: 0.15, w: 9, h: 0.25,
    fontSize: 8, fontFace: 'Arial', color: CLR.GRAY,
  });
}

/* ================================================================
   HELPER: add slide title (large bold black) + subtitle (bordeaux)
   ================================================================ */
function addSlideTitle(slide: PptxGenJS.Slide, title: string, subtitle?: string) {
  slide.addText(title, {
    x: 0.4, y: 0.45, w: 9, h: 0.7,
    fontSize: 22, fontFace: 'Arial', bold: true, color: CLR.BLACK,
    valign: 'top',
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.4, y: 1.15, w: 9, h: 0.35,
      fontSize: 13, fontFace: 'Arial', bold: true, color: CLR.BORDEAUX,
    });
  }
}

/* ================================================================
   HELPER: add source text in footer area
   ================================================================ */
function addSource(slide: PptxGenJS.Slide, text: string) {
  slide.addText(`Bron: ${text}`, {
    x: 3.0, y: 5.38, w: 5, h: 0.25,
    fontSize: 6, fontFace: 'Arial', color: CLR.GRAY, align: 'center',
  });
}

/* ================================================================
   HELPER: horizontal bar chart (consulting style)
   ================================================================ */
type BarItem = { label: string; value: number };

function addHorizontalBars(
  slide: PptxGenJS.Slide,
  items: BarItem[],
  x: number, y: number, w: number, h: number,
  maxVal: number,
  formatFn: (v: number) => string,
  barColor: string = CLR.BORDEAUX,
) {
  const rowH = h / items.length;
  const labelW = w * 0.45;
  const barAreaW = w * 0.45;
  const valW = w * 0.1;

  items.forEach((item, i) => {
    const ry = y + i * rowH;
    // Label
    slide.addText(item.label, {
      x, y: ry, w: labelW, h: rowH,
      fontSize: 8, fontFace: 'Arial', color: CLR.BLACK,
      valign: 'middle', align: 'right',
    });
    // Bar
    const barW = maxVal > 0 ? (item.value / maxVal) * barAreaW : 0;
    if (barW > 0) {
      slide.addShape('rect' as PptxGenJS.ShapeType, {
        x: x + labelW + 0.05, y: ry + rowH * 0.2,
        w: barW, h: rowH * 0.6,
        fill: { color: barColor },
      });
    }
    // Value
    slide.addText(formatFn(item.value), {
      x: x + labelW + 0.05 + barW + 0.05, y: ry, w: valW, h: rowH,
      fontSize: 8, fontFace: 'Arial', bold: true, color: CLR.BLACK,
      valign: 'middle',
    });
  });
}

/* ================================================================
   HELPER: KPI table (two columns)
   ================================================================ */
type KpiRow = { label: string; value: string };

function addKpiTable(
  slide: PptxGenJS.Slide,
  title: string,
  rows: KpiRow[],
  x: number, y: number, w: number,
) {
  // Title
  slide.addText(title, {
    x, y, w, h: 0.3,
    fontSize: 10, fontFace: 'Arial', bold: true, color: CLR.BLACK,
  });

  const tableRows: PptxGenJS.TableRow[] = rows.map(row => [
    { text: row.label, options: { fontSize: 9, fontFace: 'Arial', color: CLR.BLACK, align: 'left' as const, valign: 'middle' as const } },
    { text: row.value, options: { fontSize: 9, fontFace: 'Arial', bold: true, color: CLR.BORDEAUX, align: 'right' as const, valign: 'middle' as const } },
  ]);

  slide.addTable(tableRows, {
    x, y: y + 0.35, w,
    colW: [w * 0.65, w * 0.35],
    rowH: 0.3,
    border: { type: 'solid', pt: 0.5, color: CLR.GRAY_LIGHT },
    fill: { color: CLR.WHITE },
  });
}

/* ================================================================
   MAIN EXPORT FUNCTION
   ================================================================ */

export async function generateBusinesscasePptx(params: PptxExportParams): Promise<void> {
  const { sggzVolume, bggzVolume, sggzCost, bggzCost, years, scale, selectedInitiativeIds, allInitiatives } = params;

  const fixedCostKey = scale === 'landelijk' ? 'fixedCostLandelijk' : scale === 'regio' ? 'fixedCostRegio' : 'fixedCostOrganisatie';
  const scaleLabel = scale === 'landelijk' ? 'Landelijk' : scale === 'regio' ? 'ZHZ-regio' : 'Organisatie';
  const dateStr = new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });

  // Pre-calculate all values (same as Excel)
  const selected = allInitiatives.filter(i => selectedInitiativeIds.includes(i.id));
  const combinedSggzRed = 1 - selected.reduce((p, i) => p * (1 - i.sggzReductionPct / 100), 1);
  const combinedBggzRed = 1 - selected.reduce((p, i) => p * (1 - i.bggzReductionPct / 100), 1);
  const combinedShift = 1 - selected.reduce((p, i) => p * (1 - i.sggzToBggzShiftPct / 100), 1);
  const sggzReduced = Math.round(sggzVolume * combinedSggzRed);
  const sggzRemaining = sggzVolume - sggzReduced;
  const shiftedToBggz = Math.round(sggzRemaining * combinedShift);
  const bggzReduced = Math.round(bggzVolume * combinedBggzRed);
  const sggzSavingsPerYear = sggzReduced * sggzCost + shiftedToBggz * (sggzCost - bggzCost);
  const bggzSavingsPerYear = bggzReduced * bggzCost;
  const totalSavingsPerYear = sggzSavingsPerYear + bggzSavingsPerYear;
  const fixedCosts = selected.reduce((s, i) => s + i[fixedCostKey], 0);
  const variableCostsPerYear = selected.reduce((s, i) => s + i.costPerSggzYouth * sggzVolume, 0);
  const totalInvestment = fixedCosts + variableCostsPerYear * years;
  const netSavingsPerYear = totalSavingsPerYear - variableCostsPerYear;
  const netTotal = totalSavingsPerYear * years - totalInvestment;
  const roiVal = totalInvestment > 0 ? (totalSavingsPerYear * years - totalInvestment) / totalInvestment : 0;

  // Break-even calculation
  let cumBE = 0;
  let beYear = -1;
  for (let y = 0; y <= years; y++) {
    cumBE += y === 0 ? -fixedCosts : netSavingsPerYear;
    if (cumBE >= 0 && beYear < 0) beYear = y;
  }

  // ---- Create presentation ----
  const pptx = new PptxGenJS();
  pptx.author = 'Kwaliteit als Medicijn';
  pptx.company = 'Kwaliteit als Medicijn';
  pptx.subject = 'Businesscase Impact Simulator';
  pptx.title = 'Businesscase Kwaliteit als Medicijn';
  pptx.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 inch

  setupMaster(pptx);

  // ================================================================
  //  SLIDE 1: TITLE
  // ================================================================
  const slide1 = pptx.addSlide({ masterName: 'KAM_TITLE' });
  slide1.addText('Kwaliteit als Medicijn', {
    x: 0.6, y: 0.8, w: 8, h: 0.8,
    fontSize: 32, fontFace: 'Arial', bold: true, color: CLR.BLACK,
  });
  slide1.addText('Businesscase \u2014 Impact Simulator', {
    x: 0.6, y: 1.5, w: 8, h: 0.5,
    fontSize: 18, fontFace: 'Arial', color: CLR.BORDEAUX,
  });
  slide1.addText([
    { text: `Schaal: ${scaleLabel}`, options: { breakLine: true } },
    { text: `Initiatieven: ${selected.length} van ${allInitiatives.length} actief`, options: { breakLine: true } },
    { text: `Looptijd: ${years} jaar`, options: { breakLine: true } },
    { text: `Gegenereerd: ${dateStr}`, options: {} },
  ], {
    x: 0.6, y: 2.6, w: 6, h: 1.4,
    fontSize: 11, fontFace: 'Arial', color: CLR.GRAY,
    lineSpacingMultiple: 1.5,
  });
  slide1.addText('Aan dit model en de uitkomsten hiervan kunnen geen rechten worden ontleend.', {
    x: 0.6, y: 4.8, w: 8, h: 0.3,
    fontSize: 7, fontFace: 'Arial', italic: true, color: CLR.RED,
  });

  // ================================================================
  //  SLIDE 2: TABLE OF CONTENTS
  // ================================================================
  const slide2 = pptx.addSlide({ masterName: 'KAM_MASTER' });
  addSlideTitle(slide2, 'Inhoud');
  // Bordeaux bar
  slide2.addShape('rect' as PptxGenJS.ShapeType, {
    x: 0.4, y: 1.35, w: 8.5, h: 0.04,
    fill: { color: CLR.BORDEAUX },
  });

  const tocItems = [
    { num: '1.', text: 'Management Summary', bold: true },
    { num: '2.', text: 'Geselecteerde Initiatieven' },
    { num: '3.', text: 'Impact Model: Volume-effecten' },
    { num: '4.', text: 'Financieel Overzicht' },
    { num: '5.', text: 'Jaaroverzicht & Break-even' },
    { num: '6.', text: 'Conclusie & Aanbevelingen' },
  ];

  tocItems.forEach((item, i) => {
    const ry = 1.55 + i * 0.45;
    const bg = i === 0 ? CLR.BORDEAUX_BG : CLR.WHITE;
    slide2.addShape('rect' as PptxGenJS.ShapeType, {
      x: 0.4, y: ry, w: 8.5, h: 0.4,
      fill: { color: bg },
    });
    slide2.addText(`${item.num}  ${item.text}`, {
      x: 0.6, y: ry, w: 8, h: 0.4,
      fontSize: 12, fontFace: 'Arial', bold: !!item.bold, color: CLR.BLACK,
      valign: 'middle',
    });
  });

  // ================================================================
  //  SLIDE 3: MANAGEMENT SUMMARY
  // ================================================================
  const slide3 = pptx.addSlide({ masterName: 'KAM_MASTER' });
  addBreadcrumb(slide3, '1. Management Summary');
  addSlideTitle(slide3,
    `De businesscase levert ${fmtEur(netTotal)} netto resultaat over ${years} jaar`,
    'Kernresultaten op basis van geselecteerde initiatieven',
  );

  // Left: Financial KPIs
  addKpiTable(slide3, 'Financi\u00EBle Resultaten', [
    { label: 'Besparing per jaar', value: fmtEur(totalSavingsPerYear) },
    { label: 'Variabele kosten per jaar', value: fmtEur(variableCostsPerYear) },
    { label: 'Netto besparing per jaar', value: fmtEur(netSavingsPerYear) },
    { label: 'Totale investering', value: fmtEur(totalInvestment) },
    { label: `Netto resultaat (${years}j)`, value: fmtEur(netTotal) },
    { label: 'ROI', value: fmtPct(roiVal) },
    { label: 'Break-even', value: beYear >= 0 ? `Jaar ${beYear}` : 'n.v.t.' },
  ], 0.4, 1.65, 4.2);

  // Right: Volume KPIs
  addKpiTable(slide3, 'Volume-effecten (per jaar)', [
    { label: 'SGGZ-reductie', value: fmtPct(combinedSggzRed) },
    { label: 'BGGZ-reductie', value: fmtPct(combinedBggzRed) },
    { label: 'Verschuiving SGGZ\u2192BGGZ', value: fmtPct(combinedShift) },
    { label: 'Minder SGGZ-trajecten', value: fmtNum(sggzReduced) },
    { label: 'Minder BGGZ-trajecten', value: fmtNum(bggzReduced) },
    { label: 'Verschoven naar BGGZ', value: fmtNum(shiftedToBggz) },
  ], 5.2, 1.65, 4.2);

  // Key insight box at bottom
  const insightColor = netTotal > 0 ? CLR.GREEN : CLR.RED;
  slide3.addShape('rect' as PptxGenJS.ShapeType, {
    x: 0.4, y: 4.6, w: 9.0, h: 0.55,
    fill: { color: CLR.GRAY_BG },
  });
  slide3.addText([
    { text: '\u2022 ', options: { bold: true, color: CLR.BORDEAUX } },
    { text: `De businesscase is ${netTotal > 0 ? 'positief' : 'negatief'}: netto resultaat van ${fmtEur(netTotal)} over ${years} jaar`, options: { bold: true, color: insightColor } },
    { text: '\n\u2022 ', options: { bold: true, color: CLR.BORDEAUX } },
    { text: beYear >= 0 ? `Break-even wordt bereikt in jaar ${beYear}` : `Break-even wordt niet bereikt binnen ${years} jaar`, options: { color: CLR.BLACK } },
  ], {
    x: 0.6, y: 4.62, w: 8.6, h: 0.5,
    fontSize: 9, fontFace: 'Arial',
    valign: 'middle',
  });
  addSource(slide3, 'Kwaliteit als Medicijn \u2014 Impact Simulator');

  // ================================================================
  //  SLIDE 4: GESELECTEERDE INITIATIEVEN
  // ================================================================
  const slide4 = pptx.addSlide({ masterName: 'KAM_MASTER' });
  addBreadcrumb(slide4, '2. Geselecteerde Initiatieven');
  addSlideTitle(slide4,
    `${selected.length} initiatieven geselecteerd voor implementatie op ${scaleLabel}-niveau`,
    'Overzicht reductiepercentages en kosten per initiatief',
  );

  // Initiative table
  const initHeaderRow: PptxGenJS.TableRow = [
    { text: 'Initiatief', options: { fontSize: 8, fontFace: 'Arial', bold: true, color: CLR.WHITE, fill: { color: CLR.BORDEAUX }, align: 'left' as const, valign: 'middle' as const } },
    { text: 'SGGZ red.', options: { fontSize: 8, fontFace: 'Arial', bold: true, color: CLR.WHITE, fill: { color: CLR.BORDEAUX }, align: 'center' as const, valign: 'middle' as const } },
    { text: 'BGGZ red.', options: { fontSize: 8, fontFace: 'Arial', bold: true, color: CLR.WHITE, fill: { color: CLR.BORDEAUX }, align: 'center' as const, valign: 'middle' as const } },
    { text: 'SGGZ\u2192BGGZ', options: { fontSize: 8, fontFace: 'Arial', bold: true, color: CLR.WHITE, fill: { color: CLR.BORDEAUX }, align: 'center' as const, valign: 'middle' as const } },
    { text: 'Vaste kst', options: { fontSize: 8, fontFace: 'Arial', bold: true, color: CLR.WHITE, fill: { color: CLR.BORDEAUX }, align: 'center' as const, valign: 'middle' as const } },
    { text: 'Actief', options: { fontSize: 8, fontFace: 'Arial', bold: true, color: CLR.WHITE, fill: { color: CLR.BORDEAUX }, align: 'center' as const, valign: 'middle' as const } },
  ];

  const initDataRows: PptxGenJS.TableRow[] = allInitiatives.map(init => {
    const isActive = selectedInitiativeIds.includes(init.id);
    const activeStyle = isActive ? { color: CLR.GREEN, bold: true } : { color: CLR.RED };
    return [
      { text: init.name, options: { fontSize: 8, fontFace: 'Arial', color: CLR.BLACK, align: 'left' as const, valign: 'middle' as const } },
      { text: `${init.sggzReductionPct}%`, options: { fontSize: 8, fontFace: 'Arial', color: CLR.BLACK, align: 'center' as const, valign: 'middle' as const } },
      { text: `${init.bggzReductionPct}%`, options: { fontSize: 8, fontFace: 'Arial', color: CLR.BLACK, align: 'center' as const, valign: 'middle' as const } },
      { text: `${init.sggzToBggzShiftPct}%`, options: { fontSize: 8, fontFace: 'Arial', color: CLR.BLACK, align: 'center' as const, valign: 'middle' as const } },
      { text: fmtEur(init[fixedCostKey]), options: { fontSize: 8, fontFace: 'Arial', color: CLR.BLACK, align: 'center' as const, valign: 'middle' as const } },
      { text: isActive ? '\u2713' : '\u2717', options: { fontSize: 10, fontFace: 'Arial', ...activeStyle, align: 'center' as const, valign: 'middle' as const } },
    ];
  });

  slide4.addTable([initHeaderRow, ...initDataRows], {
    x: 0.4, y: 1.65, w: 9.0,
    colW: [3.0, 1.0, 1.0, 1.0, 1.2, 0.8],
    rowH: 0.35,
    border: { type: 'solid', pt: 0.5, color: CLR.GRAY_LIGHT },
  });

  // Note about multiplicative reduction
  slide4.addText([
    { text: 'Berekeningswijze: ', options: { bold: true } },
    { text: 'Gecombineerde reductie = 1 - \u220F(1 - reductie_i). Voorkomt dubbeltellingen bij meerdere initiatieven.', options: {} },
  ], {
    x: 0.4, y: 4.5, w: 9.0, h: 0.3,
    fontSize: 8, fontFace: 'Arial', color: CLR.GRAY,
  });
  addSource(slide4, 'Kwaliteit als Medicijn programma-evaluatie');

  // ================================================================
  //  SLIDE 5: IMPACT MODEL — VOLUME EFFECTS
  // ================================================================
  const slide5 = pptx.addSlide({ masterName: 'KAM_MASTER' });
  addBreadcrumb(slide5, '3. Impact Model');
  addSlideTitle(slide5,
    `Gecombineerde reductie leidt tot ${fmtNum(sggzReduced + bggzReduced)} minder trajecten per jaar`,
    'Volume-effecten van geselecteerde initiatieven',
  );

  // Left: Reduction bars
  slide5.addText('Gecombineerde reductiepercentages', {
    x: 0.4, y: 1.65, w: 4.2, h: 0.3,
    fontSize: 10, fontFace: 'Arial', bold: true, color: CLR.BLACK,
  });
  slide5.addText('(Percentage volume-reductie per zorgtype)', {
    x: 0.4, y: 1.9, w: 4.2, h: 0.2,
    fontSize: 7, fontFace: 'Arial', italic: true, color: CLR.GRAY,
  });

  const reductionBars: BarItem[] = [
    { label: 'SGGZ-reductie', value: combinedSggzRed * 100 },
    { label: 'BGGZ-reductie', value: combinedBggzRed * 100 },
    { label: 'Verschuiving SGGZ\u2192BGGZ', value: combinedShift * 100 },
  ];
  const maxPct = Math.max(...reductionBars.map(b => b.value), 1);
  addHorizontalBars(slide5, reductionBars, 0.4, 2.2, 4.2, 1.4, maxPct, v => `${v.toFixed(1)}%`);

  // Right: Volume effects
  slide5.addText('Volume-effecten per jaar', {
    x: 5.2, y: 1.65, w: 4.2, h: 0.3,
    fontSize: 10, fontFace: 'Arial', bold: true, color: CLR.BLACK,
  });
  slide5.addText('(Aantal trajecten per jaar)', {
    x: 5.2, y: 1.9, w: 4.2, h: 0.2,
    fontSize: 7, fontFace: 'Arial', italic: true, color: CLR.GRAY,
  });

  const volumeBars: BarItem[] = [
    { label: 'Minder SGGZ', value: sggzReduced },
    { label: 'Minder BGGZ', value: bggzReduced },
    { label: 'Verschoven naar BGGZ', value: shiftedToBggz },
  ];
  const maxVol = Math.max(...volumeBars.map(b => b.value), 1);
  addHorizontalBars(slide5, volumeBars, 5.2, 2.2, 4.2, 1.4, maxVol, fmtNum, CLR.BORDEAUX_LIGHT);

  // Bottom: context
  slide5.addShape('rect' as PptxGenJS.ShapeType, {
    x: 0.4, y: 4.0, w: 9.0, h: 0.55,
    fill: { color: CLR.GRAY_BG },
  });
  slide5.addText([
    { text: '\u2022 ', options: { bold: true, color: CLR.BORDEAUX } },
    { text: `Totaal SGGZ-volume: ${fmtNum(sggzVolume)} jongeren/jaar \u2192 ${fmtNum(sggzReduced)} minder door reductie + ${fmtNum(shiftedToBggz)} verschoven naar BGGZ`, options: { color: CLR.BLACK } },
    { text: '\n\u2022 ', options: { bold: true, color: CLR.BORDEAUX } },
    { text: `Totaal BGGZ-volume: ${fmtNum(bggzVolume)} jongeren/jaar \u2192 ${fmtNum(bggzReduced)} minder door reductie`, options: { color: CLR.BLACK } },
  ], {
    x: 0.6, y: 4.02, w: 8.6, h: 0.5,
    fontSize: 8, fontFace: 'Arial',
    valign: 'middle',
  });
  addSource(slide5, 'Kwaliteit als Medicijn \u2014 Impact Simulator');

  // ================================================================
  //  SLIDE 6: FINANCIEEL OVERZICHT
  // ================================================================
  const slide6 = pptx.addSlide({ masterName: 'KAM_MASTER' });
  addBreadcrumb(slide6, '4. Financieel Overzicht');
  addSlideTitle(slide6,
    `Jaarlijkse netto besparing van ${fmtEur(netSavingsPerYear)} na aftrek variabele kosten`,
    'Besparing vs. investering',
  );

  // Left: Savings breakdown bar chart
  slide5.addText('', {}); // ensure ordering
  const savingsBars: BarItem[] = [
    { label: 'SGGZ-besparing (direct)', value: sggzReduced * sggzCost },
    { label: 'Verschuivingsbesparing', value: shiftedToBggz * (sggzCost - bggzCost) },
    { label: 'BGGZ-besparing', value: bggzSavingsPerYear },
  ];
  const maxSav = Math.max(...savingsBars.map(b => b.value), 1);

  slide6.addText('Besparing per jaar', {
    x: 0.4, y: 1.65, w: 4.2, h: 0.3,
    fontSize: 10, fontFace: 'Arial', bold: true, color: CLR.BLACK,
  });
  addHorizontalBars(slide6, savingsBars, 0.4, 2.0, 4.2, 1.2, maxSav, fmtEur, CLR.GREEN);
  slide6.addText(`Totaal: ${fmtEur(totalSavingsPerYear)} per jaar`, {
    x: 0.4, y: 3.3, w: 4.2, h: 0.25,
    fontSize: 9, fontFace: 'Arial', bold: true, color: CLR.GREEN,
  });

  // Right: Investment breakdown
  slide6.addText('Investering', {
    x: 5.2, y: 1.65, w: 4.2, h: 0.3,
    fontSize: 10, fontFace: 'Arial', bold: true, color: CLR.BLACK,
  });
  const invBars: BarItem[] = [
    { label: 'Vaste kosten (eenmalig)', value: fixedCosts },
    { label: `Variabel (${years}j)`, value: variableCostsPerYear * years },
  ];
  const maxInv = Math.max(...invBars.map(b => b.value), 1);
  addHorizontalBars(slide6, invBars, 5.2, 2.0, 4.2, 0.8, maxInv, fmtEur, CLR.BORDEAUX);
  slide6.addText(`Totaal: ${fmtEur(totalInvestment)}`, {
    x: 5.2, y: 2.9, w: 4.2, h: 0.25,
    fontSize: 9, fontFace: 'Arial', bold: true, color: CLR.BORDEAUX,
  });

  // Net result box
  slide6.addShape('rect' as PptxGenJS.ShapeType, {
    x: 5.2, y: 3.3, w: 4.2, h: 0.9,
    fill: { color: CLR.GRAY_BG },
    line: { color: netTotal > 0 ? CLR.GREEN : CLR.RED, width: 1.5 },
  });
  slide6.addText([
    { text: `Netto resultaat (${years}j):\n`, options: { fontSize: 9, color: CLR.BLACK } },
    { text: fmtEur(netTotal), options: { fontSize: 18, bold: true, color: netTotal > 0 ? CLR.GREEN : CLR.RED } },
  ], {
    x: 5.4, y: 3.35, w: 3.8, h: 0.8,
    fontFace: 'Arial', align: 'center', valign: 'middle',
  });

  addSource(slide6, 'Kwaliteit als Medicijn \u2014 Impact Simulator');

  // ================================================================
  //  SLIDE 7: JAAROVERZICHT & BREAK-EVEN
  // ================================================================
  const slide7 = pptx.addSlide({ masterName: 'KAM_MASTER' });
  addBreadcrumb(slide7, '5. Jaaroverzicht & Break-even');
  addSlideTitle(slide7,
    beYear >= 0
      ? `Break-even wordt bereikt in jaar ${beYear} met een ROI van ${fmtPct(roiVal)}`
      : `Break-even wordt niet bereikt binnen ${years} jaar`,
    `Cumulatief financieel overzicht (${years} jaar)`,
  );

  // Year-by-year table
  const yrHeaderRow: PptxGenJS.TableRow = [
    { text: '', options: { fontSize: 8, fontFace: 'Arial', bold: true, fill: { color: CLR.BORDEAUX }, color: CLR.WHITE } },
  ];
  for (let y = 0; y <= years; y++) {
    yrHeaderRow.push({
      text: y === 0 ? 'Jaar 0' : `Jaar ${y}`,
      options: { fontSize: 8, fontFace: 'Arial', bold: true, fill: { color: CLR.BORDEAUX }, color: CLR.WHITE, align: 'center' as const },
    });
  }
  yrHeaderRow.push({
    text: 'Totaal',
    options: { fontSize: 8, fontFace: 'Arial', bold: true, fill: { color: CLR.BORDEAUX }, color: CLR.WHITE, align: 'center' as const },
  });

  const makeYrRow = (label: string, getVal: (y: number) => number, total: number, bold?: boolean): PptxGenJS.TableRow => {
    const row: PptxGenJS.TableRow = [
      { text: label, options: { fontSize: 7, fontFace: 'Arial', bold: !!bold, color: CLR.BLACK } },
    ];
    for (let y = 0; y <= years; y++) {
      row.push({ text: fmtEur(getVal(y)), options: { fontSize: 7, fontFace: 'Arial', bold: !!bold, color: CLR.BLACK, align: 'center' as const } });
    }
    row.push({ text: fmtEur(total), options: { fontSize: 7, fontFace: 'Arial', bold: true, color: CLR.BLACK, align: 'center' as const } });
    return row;
  };

  let cumulative = 0;
  const cumValues: number[] = [];
  for (let y = 0; y <= years; y++) {
    cumulative += y === 0 ? -fixedCosts : netSavingsPerYear;
    cumValues.push(cumulative);
  }

  const yrRows: PptxGenJS.TableRow[] = [
    yrHeaderRow,
    makeYrRow('Besparing', y => y === 0 ? 0 : totalSavingsPerYear, totalSavingsPerYear * years),
    makeYrRow('Kosten', y => y === 0 ? fixedCosts : variableCostsPerYear, totalInvestment),
    makeYrRow('Netto', y => y === 0 ? -fixedCosts : netSavingsPerYear, netTotal, true),
    makeYrRow('Cumulatief', y => cumValues[y], cumValues[cumValues.length - 1], true),
  ];

  const colWidths = [2.4];
  const yrColW = Math.min(1.0, 6.0 / (years + 2));
  for (let y = 0; y <= years + 1; y++) colWidths.push(yrColW);

  slide7.addTable(yrRows, {
    x: 0.4, y: 1.65, w: 9.0,
    colW: colWidths,
    rowH: 0.3,
    border: { type: 'solid', pt: 0.5, color: CLR.GRAY_LIGHT },
  });

  addSource(slide7, 'Kwaliteit als Medicijn \u2014 Impact Simulator');

  // ================================================================
  //  SLIDE 8: CONCLUSIE & AANBEVELINGEN
  // ================================================================
  const slide8 = pptx.addSlide({ masterName: 'KAM_MASTER' });
  addBreadcrumb(slide8, '6. Conclusie & Aanbevelingen');
  addSlideTitle(slide8, 'Conclusie & Aanbevelingen');

  const conclusions: string[] = [];
  if (netTotal > 0) {
    conclusions.push(`De businesscase is positief met een netto resultaat van ${fmtEur(netTotal)} over ${years} jaar.`);
  } else {
    conclusions.push(`De businesscase is negatief met een netto resultaat van ${fmtEur(netTotal)} over ${years} jaar. Overweeg meer initiatieven of langere looptijd.`);
  }
  if (beYear >= 0) {
    conclusions.push(`Break-even wordt bereikt in jaar ${beYear}, waarna het programma zichzelf terugverdient.`);
  }
  conclusions.push(`De ROI bedraagt ${fmtPct(roiVal)} over de volledige looptijd.`);
  conclusions.push(`Per jaar worden ${fmtNum(sggzReduced + bggzReduced)} trajecten vermeden en ${fmtNum(shiftedToBggz)} jongeren verschoven naar lichtere zorg.`);

  conclusions.forEach((text, i) => {
    const ry = 1.4 + i * 0.6;
    // Bordeaux bullet
    slide8.addShape('rect' as PptxGenJS.ShapeType, {
      x: 0.6, y: ry + 0.08, w: 0.12, h: 0.12,
      fill: { color: CLR.BORDEAUX },
    });
    slide8.addText(text, {
      x: 0.9, y: ry, w: 8.4, h: 0.5,
      fontSize: 11, fontFace: 'Arial', color: CLR.BLACK,
      valign: 'top',
    });
  });

  // Disclaimer
  slide8.addText('Disclaimer: Aan dit model en de uitkomsten hiervan kunnen geen rechten worden ontleend. Alle schattingen zijn indicatief.', {
    x: 0.4, y: 4.8, w: 9, h: 0.3,
    fontSize: 7, fontFace: 'Arial', italic: true, color: CLR.RED,
  });
  addSource(slide8, 'Kwaliteit als Medicijn \u2014 Impact Simulator');

  // ================================================================
  //  GENERATE & DOWNLOAD
  // ================================================================
  const fileName = `Businesscase_KAM_${scaleLabel.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().slice(0, 10)}.pptx`;
  await pptx.writeFile({ fileName });
}
