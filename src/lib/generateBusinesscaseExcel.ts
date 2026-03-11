import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

/* ------------------------------------------------------------------ */
/*  TYPES                                                              */
/* ------------------------------------------------------------------ */

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

export interface ExcelExportParams {
  sggzVolume: number;
  bggzVolume: number;
  sggzCost: number;
  bggzCost: number;
  years: number;
  scale: 'organisatie' | 'regio' | 'landelijk';
  selectedInitiativeIds: string[];
  allInitiatives: InitiativeData[];
}

/* ------------------------------------------------------------------ */
/*  STYLING CONSTANTS                                                  */
/* ------------------------------------------------------------------ */

const COLORS = {
  headerBg: 'FF4338CA',        // Indigo-700
  headerFont: 'FFFFFFFF',
  inputBg: 'FFEEF2FF',         // Indigo-50  (lichtblauw)
  inputBorder: 'FF818CF8',     // Indigo-400
  assumptionBg: 'FFFEFCE8',    // Yellow-50
  assumptionBorder: 'FFFBBF24', // Yellow-400
  outputBg: 'FFF0FDF4',        // Green-50
  outputBorder: 'FF22C55E',    // Green-500
  sectionBg: 'FFF8FAFC',       // Slate-50
  subtleBorder: 'FFE2E8F0',    // Slate-200
  accentPurple: 'FF7C3AED',
  accentGreen: 'FF059669',
  white: 'FFFFFFFF',
};

const FONT = {
  header: { name: 'Calibri', size: 14, bold: true, color: { argb: COLORS.headerFont } },
  sectionTitle: { name: 'Calibri', size: 12, bold: true, color: { argb: 'FF1E293B' } },
  label: { name: 'Calibri', size: 11, color: { argb: 'FF475569' } },
  value: { name: 'Calibri', size: 11, bold: true, color: { argb: 'FF1E293B' } },
  valueLarge: { name: 'Calibri', size: 13, bold: true, color: { argb: 'FF1E293B' } },
  note: { name: 'Calibri', size: 9, italic: true, color: { argb: 'FF94A3B8' } },
  instruction: { name: 'Calibri', size: 11, color: { argb: 'FF334155' } },
};

function headerFill(color: string): ExcelJS.Fill {
  return { type: 'pattern', pattern: 'solid', fgColor: { argb: color } };
}

function thinBorder(color: string): Partial<ExcelJS.Borders> {
  const style: ExcelJS.BorderStyle = 'thin';
  const border = { style, color: { argb: color } };
  return { top: border, bottom: border, left: border, right: border };
}

function euroFormat(value: number): string {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
}

/* ------------------------------------------------------------------ */
/*  HELPER: style a header row                                         */
/* ------------------------------------------------------------------ */
function styleHeaderRow(ws: ExcelJS.Worksheet, row: number, colStart: number, colEnd: number) {
  for (let c = colStart; c <= colEnd; c++) {
    const cell = ws.getCell(row, c);
    cell.font = FONT.header;
    cell.fill = headerFill(COLORS.headerBg);
    cell.alignment = { vertical: 'middle', horizontal: 'left' };
  }
}

function styleSectionTitle(ws: ExcelJS.Worksheet, row: number, col: number, colSpan: number) {
  const cell = ws.getCell(row, col);
  cell.font = FONT.sectionTitle;
  if (colSpan > 1) ws.mergeCells(row, col, row, col + colSpan - 1);
  cell.border = { bottom: { style: 'medium', color: { argb: COLORS.headerBg } } };
}

function setLabelValue(ws: ExcelJS.Worksheet, row: number, labelCol: number, valueCol: number, label: string, value: string | number, options?: { isCurrency?: boolean; isPercentage?: boolean; bgColor?: string; borderColor?: string; note?: string }) {
  const labelCell = ws.getCell(row, labelCol);
  labelCell.value = label;
  labelCell.font = FONT.label;
  labelCell.alignment = { vertical: 'middle', wrapText: true };

  const valueCell = ws.getCell(row, valueCol);
  valueCell.value = value;
  valueCell.font = FONT.value;
  valueCell.alignment = { vertical: 'middle', horizontal: 'right' };

  if (options?.isCurrency && typeof value === 'number') {
    valueCell.numFmt = '€#,##0';
  }
  if (options?.isPercentage && typeof value === 'number') {
    valueCell.numFmt = '0.0%';
  }
  if (options?.bgColor) {
    labelCell.fill = headerFill(options.bgColor);
    valueCell.fill = headerFill(options.bgColor);
  }
  if (options?.borderColor) {
    labelCell.border = thinBorder(options.borderColor);
    valueCell.border = thinBorder(options.borderColor);
  }
  if (options?.note) {
    valueCell.note = options.note;
  }
}

/* ------------------------------------------------------------------ */
/*  MAIN EXPORT FUNCTION                                               */
/* ------------------------------------------------------------------ */

export async function generateBusinesscaseExcel(params: ExcelExportParams): Promise<void> {
  const { sggzVolume, bggzVolume, sggzCost, bggzCost, years, scale, selectedInitiativeIds, allInitiatives } = params;

  const selected = allInitiatives.filter(i => selectedInitiativeIds.includes(i.id));
  const scaleLabel = scale === 'landelijk' ? 'Landelijk (Nederland)' : scale === 'regio' ? 'ZHZ-regio (Zuid-Holland Zuid)' : 'Organisatie';

  // ---- Pre-calculate results (same logic as simulator) ----
  const combinedSggzReduction = 1 - selected.reduce((p, i) => p * (1 - i.sggzReductionPct / 100), 1);
  const combinedBggzReduction = 1 - selected.reduce((p, i) => p * (1 - i.bggzReductionPct / 100), 1);
  const combinedShift = 1 - selected.reduce((p, i) => p * (1 - i.sggzToBggzShiftPct / 100), 1);

  const sggzReduced = Math.round(sggzVolume * combinedSggzReduction);
  const sggzRemaining = sggzVolume - sggzReduced;
  const shiftedToBggz = Math.round(sggzRemaining * combinedShift);
  const bggzReduced = Math.round(bggzVolume * combinedBggzReduction);

  const sggzSavingsPerYear = sggzReduced * sggzCost + shiftedToBggz * (sggzCost - bggzCost);
  const bggzSavingsPerYear = bggzReduced * bggzCost;
  const totalSavingsPerYear = sggzSavingsPerYear + bggzSavingsPerYear;

  const fixedCostKey = scale === 'landelijk' ? 'fixedCostLandelijk' : scale === 'regio' ? 'fixedCostRegio' : 'fixedCostOrganisatie';
  const fixedCosts = selected.reduce((sum, i) => sum + i[fixedCostKey], 0);
  const variableCostsPerYear = selected.reduce((sum, i) => sum + i.costPerSggzYouth * sggzVolume, 0);
  const totalInvestment = fixedCosts + variableCostsPerYear * years;
  const netSavingsPerYear = totalSavingsPerYear - variableCostsPerYear;

  // ---- Create workbook ----
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Kwaliteit als Medicijn - Impact Simulator';
  wb.created = new Date();
  wb.properties.date1904 = false;

  // ================================================================
  //  SHEET 1: SAMENVATTING (Executive Summary)
  // ================================================================
  const wsSummary = wb.addWorksheet('Samenvatting', { properties: { tabColor: { argb: '4338CA' } } });
  wsSummary.columns = [
    { width: 4 },  // A: spacer
    { width: 38 }, // B: labels
    { width: 22 }, // C: values
    { width: 22 }, // D: extra
    { width: 4 },  // E: spacer
  ];

  // Title block
  let r = 2;
  wsSummary.mergeCells(r, 2, r, 4);
  const titleCell = wsSummary.getCell(r, 2);
  titleCell.value = 'BUSINESSCASE: KWALITEIT ALS MEDICIJN';
  titleCell.font = { name: 'Calibri', size: 16, bold: true, color: { argb: COLORS.headerFont } };
  titleCell.fill = headerFill(COLORS.headerBg);
  titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
  wsSummary.getCell(r, 3).fill = headerFill(COLORS.headerBg);
  wsSummary.getCell(r, 4).fill = headerFill(COLORS.headerBg);
  wsSummary.getRow(r).height = 36;

  r++;
  wsSummary.mergeCells(r, 2, r, 4);
  const subtitleCell = wsSummary.getCell(r, 2);
  subtitleCell.value = `Impact Simulator — gegenereerd op ${new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}`;
  subtitleCell.font = { name: 'Calibri', size: 10, italic: true, color: { argb: COLORS.headerFont } };
  subtitleCell.fill = headerFill(COLORS.accentPurple);
  subtitleCell.alignment = { horizontal: 'center' };
  wsSummary.getCell(r, 3).fill = headerFill(COLORS.accentPurple);
  wsSummary.getCell(r, 4).fill = headerFill(COLORS.accentPurple);

  // Configuratie
  r += 2;
  styleSectionTitle(wsSummary, r, 2, 3);
  wsSummary.getCell(r, 2).value = 'Configuratie';
  r++;
  setLabelValue(wsSummary, r, 2, 3, 'Schaal', scaleLabel, { bgColor: COLORS.inputBg, borderColor: COLORS.inputBorder });
  r++;
  setLabelValue(wsSummary, r, 2, 3, 'Looptijd', `${years} jaar`, { bgColor: COLORS.inputBg, borderColor: COLORS.inputBorder });
  r++;
  setLabelValue(wsSummary, r, 2, 3, 'SGGZ-volume per jaar', sggzVolume, { bgColor: COLORS.inputBg, borderColor: COLORS.inputBorder, note: 'INPUT: Aantal jongeren met SGGZ-verwijzing per jaar' });
  r++;
  setLabelValue(wsSummary, r, 2, 3, 'BGGZ-volume per jaar', bggzVolume, { bgColor: COLORS.inputBg, borderColor: COLORS.inputBorder, note: 'INPUT: Aantal jongeren met BGGZ-verwijzing per jaar' });
  r++;
  setLabelValue(wsSummary, r, 2, 3, 'Kosten per SGGZ-traject', sggzCost, { isCurrency: true, bgColor: COLORS.inputBg, borderColor: COLORS.inputBorder, note: 'INPUT: Gemiddelde kosten per SGGZ-traject. Standaardwaarde: €3.800' });
  r++;
  setLabelValue(wsSummary, r, 2, 3, 'Kosten per BGGZ-traject', bggzCost, { isCurrency: true, bgColor: COLORS.inputBg, borderColor: COLORS.inputBorder, note: 'INPUT: Gemiddelde kosten per BGGZ-traject. Standaardwaarde: €1.300' });
  r++;
  setLabelValue(wsSummary, r, 2, 3, 'Geselecteerde initiatieven', selected.map(i => i.name).join(', '), { bgColor: COLORS.inputBg, borderColor: COLORS.inputBorder });
  wsSummary.getCell(r, 3).alignment = { wrapText: true, vertical: 'middle', horizontal: 'right' };
  wsSummary.getRow(r).height = Math.max(20, selected.length * 14);

  // Resultaten
  r += 2;
  styleSectionTitle(wsSummary, r, 2, 3);
  wsSummary.getCell(r, 2).value = 'Verwachte Resultaten';
  r++;
  setLabelValue(wsSummary, r, 2, 3, 'Gecombineerde SGGZ-reductie', combinedSggzReduction, { isPercentage: true, bgColor: COLORS.outputBg, borderColor: COLORS.outputBorder, note: 'OUTPUT: Gecombineerde reductie via multiplicatieve formule: 1 - ∏(1 - reductie_i)' });
  r++;
  setLabelValue(wsSummary, r, 2, 3, 'Gecombineerde BGGZ-reductie', combinedBggzReduction, { isPercentage: true, bgColor: COLORS.outputBg, borderColor: COLORS.outputBorder });
  r++;
  setLabelValue(wsSummary, r, 2, 3, 'SGGZ→BGGZ verschuiving', combinedShift, { isPercentage: true, bgColor: COLORS.outputBg, borderColor: COLORS.outputBorder, note: 'OUTPUT: Percentage van resterende SGGZ-trajecten dat verschuift naar lichtere BGGZ-zorg' });

  r += 2;
  styleSectionTitle(wsSummary, r, 2, 3);
  wsSummary.getCell(r, 2).value = `Financieel Overzicht (${years} jaar)`;
  r++;

  const summaryFinancials: [string, number, string?][] = [
    ['Totale besparing (cumulatief)', totalSavingsPerYear * years],
    ['Besparing per jaar', totalSavingsPerYear],
    ['  - SGGZ-besparing per jaar', sggzSavingsPerYear],
    ['  - BGGZ-besparing per jaar', bggzSavingsPerYear],
    ['', 0],
    ['Totale investering', totalInvestment],
    ['  - Vaste kosten (implementatie)', fixedCosts, 'Eenmalige kosten voor implementatie, training en opzet'],
    ['  - Variabele kosten per jaar', variableCostsPerYear, 'Jaarlijkse kosten afhankelijk van het aantal trajecten'],
    ['', 0],
    ['Netto besparing per jaar', netSavingsPerYear, 'Besparing minus variabele kosten per jaar'],
  ];

  for (const [label, value, note] of summaryFinancials) {
    if (!label) { r++; continue; }
    const isTotal = !label.startsWith('  ');
    setLabelValue(wsSummary, r, 2, 3, label, value, {
      isCurrency: true,
      bgColor: isTotal ? COLORS.outputBg : undefined,
      borderColor: isTotal ? COLORS.outputBorder : COLORS.subtleBorder,
      note,
    });
    if (isTotal) {
      wsSummary.getCell(r, 3).font = { ...FONT.valueLarge, color: { argb: value >= 0 ? COLORS.accentGreen : 'FFDC2626' } };
    }
    r++;
  }

  // Volume effecten
  r++;
  styleSectionTitle(wsSummary, r, 2, 3);
  wsSummary.getCell(r, 2).value = `Volume-effect (${years} jaar cumulatief)`;
  r++;
  setLabelValue(wsSummary, r, 2, 3, 'Minder SGGZ-trajecten', sggzReduced * years, { bgColor: COLORS.outputBg, borderColor: COLORS.outputBorder });
  r++;
  setLabelValue(wsSummary, r, 2, 3, 'Minder BGGZ-trajecten', bggzReduced * years, { bgColor: COLORS.outputBg, borderColor: COLORS.outputBorder });
  r++;
  setLabelValue(wsSummary, r, 2, 3, 'Verschoven naar BGGZ', shiftedToBggz * years, { bgColor: COLORS.outputBg, borderColor: COLORS.outputBorder, note: 'Jongeren die van SGGZ naar de lichtere BGGZ verschuiven' });
  r++;
  setLabelValue(wsSummary, r, 2, 3, 'Totaal minder trajecten', (sggzReduced + bggzReduced) * years, { bgColor: COLORS.outputBg, borderColor: COLORS.outputBorder });

  // Legenda
  r += 2;
  styleSectionTitle(wsSummary, r, 2, 3);
  wsSummary.getCell(r, 2).value = 'Legenda';
  r++;
  const legendItems: [string, string, string][] = [
    [COLORS.inputBg, COLORS.inputBorder, 'INPUT — door u ingevulde gegevens'],
    [COLORS.assumptionBg, COLORS.assumptionBorder, 'AANNAME — standaardwaarden (aanpasbaar op tab "Input & Aannames")'],
    [COLORS.outputBg, COLORS.outputBorder, 'OUTPUT — berekend resultaat'],
  ];
  for (const [bg, border, text] of legendItems) {
    const colorCell = wsSummary.getCell(r, 2);
    colorCell.value = '';
    colorCell.fill = headerFill(bg);
    colorCell.border = thinBorder(border);
    const textCell = wsSummary.getCell(r, 3);
    textCell.value = text;
    textCell.font = FONT.note;
    r++;
  }

  // ================================================================
  //  SHEET 2: INPUT & AANNAMES
  // ================================================================
  const wsInput = wb.addWorksheet('Input & Aannames', { properties: { tabColor: { argb: '818CF8' } } });
  wsInput.columns = [
    { width: 4 },
    { width: 40 },
    { width: 20 },
    { width: 16 },
    { width: 30 },
    { width: 4 },
  ];

  r = 2;
  wsInput.mergeCells(r, 2, r, 5);
  styleHeaderRow(wsInput, r, 2, 5);
  wsInput.getCell(r, 2).value = 'INPUT & AANNAMES';
  wsInput.getRow(r).height = 30;

  r += 2;
  // Section: Gebruikersinput
  styleSectionTitle(wsInput, r, 2, 4);
  wsInput.getCell(r, 2).value = 'Gebruikersinput (uw selectie)';
  r++;
  // Header row
  for (const [col, text] of [[2, 'Parameter'], [3, 'Waarde'], [4, 'Eenheid'], [5, 'Toelichting']] as const) {
    const cell = wsInput.getCell(r, col);
    cell.value = text;
    cell.font = { ...FONT.label, bold: true };
    cell.fill = headerFill(COLORS.sectionBg);
    cell.border = thinBorder(COLORS.subtleBorder);
  }
  r++;

  const inputRows: [string, string | number, string, string][] = [
    ['Schaal', scaleLabel, '', 'Het niveau waarop de business case wordt berekend'],
    ['Looptijd', years, 'jaar', 'Periode waarover de impact cumulatief wordt berekend'],
    ['SGGZ-volume', sggzVolume, 'jongeren/jaar', 'Aantal jongeren met specialistische GGZ-verwijzing per jaar'],
    ['BGGZ-volume', bggzVolume, 'jongeren/jaar', 'Aantal jongeren met basis GGZ-verwijzing per jaar'],
    ['Kosten SGGZ-traject', sggzCost, '€ per traject', 'Gemiddelde kosten per specialistisch GGZ-traject'],
    ['Kosten BGGZ-traject', bggzCost, '€ per traject', 'Gemiddelde kosten per basis GGZ-traject'],
  ];

  for (const [param, value, unit, note] of inputRows) {
    wsInput.getCell(r, 2).value = param;
    wsInput.getCell(r, 2).font = FONT.label;
    const vCell = wsInput.getCell(r, 3);
    vCell.value = value;
    vCell.font = FONT.value;
    vCell.alignment = { horizontal: 'right' };
    if (typeof value === 'number' && unit.includes('€')) vCell.numFmt = '€#,##0';
    wsInput.getCell(r, 4).value = unit;
    wsInput.getCell(r, 4).font = FONT.label;
    wsInput.getCell(r, 5).value = note;
    wsInput.getCell(r, 5).font = FONT.note;
    for (let c = 2; c <= 5; c++) {
      wsInput.getCell(r, c).fill = headerFill(COLORS.inputBg);
      wsInput.getCell(r, c).border = thinBorder(COLORS.inputBorder);
    }
    r++;
  }

  // Section: Aannames / standaardwaarden
  r += 2;
  styleSectionTitle(wsInput, r, 2, 4);
  wsInput.getCell(r, 2).value = 'Aannames & Standaardwaarden';
  r++;

  const assumptions: [string, string, string][] = [
    ['Reductieberekening', 'Multiplicatief: 1 - ∏(1 - reductie_i)', 'Voorkomt dubbeltellingen bij meerdere initiatieven'],
    ['Verschuiving SGGZ→BGGZ', 'Toegepast op resterende SGGZ na reductie', 'Jongeren verschuiven naar lichtere zorg, niet uit zorg'],
    ['Vaste kosten', 'Eenmalig (niet jaarlijks)', 'Implementatie-, trainings- en opzetkosten'],
    ['Variabele kosten', 'Jaarlijks terugkerend', 'Afhankelijk van het aantal SGGZ-trajecten'],
    ['SGGZ-regio volume (ZHZ)', '4.800 jongeren/jaar', '10 gemeenten, ~250.000 inwoners'],
    ['BGGZ-regio volume (ZHZ)', '3.200 jongeren/jaar', '10 gemeenten, ~250.000 inwoners'],
    ['SGGZ landelijk volume', '160.000 jongeren/jaar', '390 gemeenten, heel Nederland'],
    ['BGGZ landelijk volume', '240.000 jongeren/jaar', '390 gemeenten, heel Nederland'],
  ];

  for (const [param, value, note] of assumptions) {
    wsInput.getCell(r, 2).value = param;
    wsInput.getCell(r, 2).font = FONT.label;
    wsInput.getCell(r, 3).value = value;
    wsInput.getCell(r, 3).font = FONT.value;
    wsInput.getCell(r, 3).alignment = { horizontal: 'right', wrapText: true };
    wsInput.getCell(r, 5).value = note;
    wsInput.getCell(r, 5).font = FONT.note;
    for (let c = 2; c <= 5; c++) {
      wsInput.getCell(r, c).fill = headerFill(COLORS.assumptionBg);
      wsInput.getCell(r, c).border = thinBorder(COLORS.assumptionBorder);
    }
    r++;
  }

  // Disclaimer
  r += 2;
  wsInput.mergeCells(r, 2, r + 2, 5);
  const disclaimerCell = wsInput.getCell(r, 2);
  disclaimerCell.value = 'Let op: Alle schattingen zijn indicatief en gebaseerd op regionale gemiddelden en aannames uit het programma Kwaliteit als Medicijn in Zuid-Holland Zuid. De daadwerkelijke resultaten kunnen afwijken afhankelijk van de specifieke context, implementatiekwaliteit en patiëntenpopulatie.';
  disclaimerCell.font = FONT.note;
  disclaimerCell.alignment = { wrapText: true, vertical: 'top' };

  // ================================================================
  //  SHEET 3: INITIATIEVEN
  // ================================================================
  const wsInit = wb.addWorksheet('Initiatieven', { properties: { tabColor: { argb: 'A855F7' } } });
  wsInit.columns = [
    { width: 4 },
    { width: 34 },
    { width: 36 },
    { width: 14 },
    { width: 14 },
    { width: 16 },
    { width: 16 },
    { width: 18 },
    { width: 40 },
    { width: 4 },
  ];

  r = 2;
  wsInit.mergeCells(r, 2, r, 9);
  styleHeaderRow(wsInit, r, 2, 9);
  wsInit.getCell(r, 2).value = 'INITIATIEVEN — KWALITEIT ALS MEDICIJN';
  wsInit.getRow(r).height = 30;

  r += 2;
  const initHeaders = ['Initiatief', 'Beschrijving', 'SGGZ-reductie', 'BGGZ-reductie', 'SGGZ→BGGZ shift', 'Var. kosten/traject', `Vaste kosten (${scale})`, 'Kostentoelichting'];
  for (let c = 0; c < initHeaders.length; c++) {
    const cell = wsInit.getCell(r, c + 2);
    cell.value = initHeaders[c];
    cell.font = { ...FONT.label, bold: true, color: { argb: COLORS.headerFont } };
    cell.fill = headerFill(COLORS.headerBg);
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = thinBorder(COLORS.headerBg);
  }
  wsInit.getRow(r).height = 28;
  r++;

  for (const init of allInitiatives) {
    const isSelected = selectedInitiativeIds.includes(init.id);
    const bg = isSelected ? COLORS.outputBg : COLORS.white;
    const border = isSelected ? COLORS.outputBorder : COLORS.subtleBorder;
    const fixedCost = init[fixedCostKey];

    const rowData = [
      `${isSelected ? '✓ ' : ''}${init.name}`,
      init.description,
      init.sggzReductionPct / 100,
      init.bggzReductionPct / 100,
      init.sggzToBggzShiftPct / 100,
      init.costPerSggzYouth,
      fixedCost,
      init.costNote,
    ];

    for (let c = 0; c < rowData.length; c++) {
      const cell = wsInit.getCell(r, c + 2);
      cell.value = rowData[c];
      cell.fill = headerFill(bg);
      cell.border = thinBorder(border);
      cell.alignment = { vertical: 'middle', wrapText: true };

      if (c === 0) cell.font = isSelected ? { ...FONT.value, color: { argb: COLORS.accentGreen } } : FONT.value;
      else if (c === 1 || c === 7) cell.font = FONT.label;
      else {
        cell.font = FONT.value;
        cell.alignment = { horizontal: 'right', vertical: 'middle' };
      }

      if (c === 2 || c === 3 || c === 4) cell.numFmt = '0%';
      if (c === 5 || c === 6) cell.numFmt = '€#,##0';
    }
    wsInit.getRow(r).height = 32;
    r++;
  }

  // Add note about selection
  r += 2;
  wsInit.mergeCells(r, 2, r, 9);
  const selNote = wsInit.getCell(r, 2);
  selNote.value = `Geselecteerde initiatieven zijn groen gemarkeerd met een ✓. Er zijn ${selected.length} van ${allInitiatives.length} initiatieven geselecteerd.`;
  selNote.font = FONT.note;

  // ================================================================
  //  SHEET 4: BEREKENINGEN (step-by-step with formulas in comments)
  // ================================================================
  const wsCalc = wb.addWorksheet('Berekeningen', { properties: { tabColor: { argb: '059669' } } });
  wsCalc.columns = [
    { width: 4 },
    { width: 42 },
    { width: 20 },
    { width: 14 },
    { width: 36 },
    { width: 4 },
  ];

  r = 2;
  wsCalc.mergeCells(r, 2, r, 5);
  styleHeaderRow(wsCalc, r, 2, 5);
  wsCalc.getCell(r, 2).value = 'BEREKENINGEN — STAP VOOR STAP';
  wsCalc.getRow(r).height = 30;

  // Step 1: Gecombineerde reductiepercentages
  r += 2;
  styleSectionTitle(wsCalc, r, 2, 4);
  wsCalc.getCell(r, 2).value = 'Stap 1: Gecombineerde reductiepercentages';
  r++;
  wsCalc.getCell(r, 2).value = 'Formule: 1 - ∏(1 - reductie_i)  (voorkomt dubbeltellingen)';
  wsCalc.getCell(r, 2).font = FONT.note;
  r += 2;

  // Show the multiplication steps for SGGZ
  wsCalc.getCell(r, 2).value = 'SGGZ-reductie per initiatief:';
  wsCalc.getCell(r, 2).font = { ...FONT.label, bold: true };
  r++;
  let sggzProduct = 1;
  for (const init of selected) {
    wsCalc.getCell(r, 2).value = `  ${init.name}`;
    wsCalc.getCell(r, 2).font = FONT.label;
    wsCalc.getCell(r, 3).value = init.sggzReductionPct / 100;
    wsCalc.getCell(r, 3).numFmt = '0%';
    wsCalc.getCell(r, 3).font = FONT.value;
    wsCalc.getCell(r, 3).alignment = { horizontal: 'right' };
    wsCalc.getCell(r, 4).value = `(1 - ${init.sggzReductionPct}%) = ${((1 - init.sggzReductionPct / 100) * 100).toFixed(1)}%`;
    wsCalc.getCell(r, 4).font = FONT.note;
    sggzProduct *= (1 - init.sggzReductionPct / 100);
    r++;
  }
  r++;
  wsCalc.getCell(r, 2).value = 'Product van (1 - reductie_i):';
  wsCalc.getCell(r, 2).font = FONT.label;
  wsCalc.getCell(r, 3).value = sggzProduct;
  wsCalc.getCell(r, 3).numFmt = '0.000%';
  wsCalc.getCell(r, 3).font = FONT.value;
  wsCalc.getCell(r, 3).alignment = { horizontal: 'right' };
  r++;
  setLabelValue(wsCalc, r, 2, 3, 'Gecombineerde SGGZ-reductie (1 - product)', combinedSggzReduction, { isPercentage: true, bgColor: COLORS.outputBg, borderColor: COLORS.outputBorder });
  r += 2;

  // BGGZ
  wsCalc.getCell(r, 2).value = 'BGGZ-reductie per initiatief:';
  wsCalc.getCell(r, 2).font = { ...FONT.label, bold: true };
  r++;
  for (const init of selected) {
    wsCalc.getCell(r, 2).value = `  ${init.name}`;
    wsCalc.getCell(r, 2).font = FONT.label;
    wsCalc.getCell(r, 3).value = init.bggzReductionPct / 100;
    wsCalc.getCell(r, 3).numFmt = '0%';
    wsCalc.getCell(r, 3).font = FONT.value;
    wsCalc.getCell(r, 3).alignment = { horizontal: 'right' };
    r++;
  }
  r++;
  setLabelValue(wsCalc, r, 2, 3, 'Gecombineerde BGGZ-reductie', combinedBggzReduction, { isPercentage: true, bgColor: COLORS.outputBg, borderColor: COLORS.outputBorder });

  r += 2;
  wsCalc.getCell(r, 2).value = 'SGGZ→BGGZ verschuiving per initiatief:';
  wsCalc.getCell(r, 2).font = { ...FONT.label, bold: true };
  r++;
  for (const init of selected) {
    wsCalc.getCell(r, 2).value = `  ${init.name}`;
    wsCalc.getCell(r, 2).font = FONT.label;
    wsCalc.getCell(r, 3).value = init.sggzToBggzShiftPct / 100;
    wsCalc.getCell(r, 3).numFmt = '0%';
    wsCalc.getCell(r, 3).font = FONT.value;
    wsCalc.getCell(r, 3).alignment = { horizontal: 'right' };
    r++;
  }
  r++;
  setLabelValue(wsCalc, r, 2, 3, 'Gecombineerde SGGZ→BGGZ verschuiving', combinedShift, { isPercentage: true, bgColor: COLORS.outputBg, borderColor: COLORS.outputBorder });

  // Step 2: Volume-effecten
  r += 3;
  styleSectionTitle(wsCalc, r, 2, 4);
  wsCalc.getCell(r, 2).value = 'Stap 2: Volume-effecten (per jaar)';
  r += 2;

  const volumeCalcs: [string, number, string][] = [
    ['SGGZ-volume', sggzVolume, 'Input'],
    ['SGGZ gereduceerd', sggzReduced, `= ${sggzVolume} × ${(combinedSggzReduction * 100).toFixed(1)}% = ${sggzReduced}`],
    ['SGGZ resterend na reductie', sggzRemaining, `= ${sggzVolume} - ${sggzReduced} = ${sggzRemaining}`],
    ['Verschoven naar BGGZ', shiftedToBggz, `= ${sggzRemaining} × ${(combinedShift * 100).toFixed(1)}% = ${shiftedToBggz}`],
    ['BGGZ-volume', bggzVolume, 'Input'],
    ['BGGZ gereduceerd', bggzReduced, `= ${bggzVolume} × ${(combinedBggzReduction * 100).toFixed(1)}% = ${bggzReduced}`],
  ];

  for (const [label, value, formula] of volumeCalcs) {
    const isInput = formula === 'Input';
    wsCalc.getCell(r, 2).value = label;
    wsCalc.getCell(r, 2).font = FONT.label;
    wsCalc.getCell(r, 3).value = value;
    wsCalc.getCell(r, 3).font = FONT.value;
    wsCalc.getCell(r, 3).alignment = { horizontal: 'right' };
    wsCalc.getCell(r, 3).numFmt = '#,##0';
    wsCalc.getCell(r, 5).value = formula;
    wsCalc.getCell(r, 5).font = FONT.note;
    for (let c = 2; c <= 3; c++) {
      wsCalc.getCell(r, c).fill = headerFill(isInput ? COLORS.inputBg : COLORS.outputBg);
      wsCalc.getCell(r, c).border = thinBorder(isInput ? COLORS.inputBorder : COLORS.outputBorder);
    }
    r++;
  }

  // Step 3: Kostenbesparing per jaar
  r += 2;
  styleSectionTitle(wsCalc, r, 2, 4);
  wsCalc.getCell(r, 2).value = 'Stap 3: Kostenbesparing (per jaar)';
  r += 2;

  const costCalcs: [string, number, string][] = [
    ['SGGZ-besparing (directe reductie)', sggzReduced * sggzCost, `= ${sggzReduced} trajecten × €${sggzCost} = ${euroFormat(sggzReduced * sggzCost)}`],
    ['Verschuivingsbesparing (SGGZ→BGGZ)', shiftedToBggz * (sggzCost - bggzCost), `= ${shiftedToBggz} × (€${sggzCost} - €${bggzCost}) = ${euroFormat(shiftedToBggz * (sggzCost - bggzCost))}`],
    ['Totaal SGGZ-gerelateerde besparing', sggzSavingsPerYear, `= ${euroFormat(sggzReduced * sggzCost)} + ${euroFormat(shiftedToBggz * (sggzCost - bggzCost))}`],
    ['BGGZ-besparing', bggzSavingsPerYear, `= ${bggzReduced} trajecten × €${bggzCost} = ${euroFormat(bggzSavingsPerYear)}`],
    ['Totale besparing per jaar', totalSavingsPerYear, `= ${euroFormat(sggzSavingsPerYear)} + ${euroFormat(bggzSavingsPerYear)}`],
  ];

  for (const [label, value, formula] of costCalcs) {
    const isTotal = label.startsWith('Totaal') || label.startsWith('Totale');
    wsCalc.getCell(r, 2).value = label;
    wsCalc.getCell(r, 2).font = isTotal ? { ...FONT.value, bold: true } : FONT.label;
    wsCalc.getCell(r, 3).value = value;
    wsCalc.getCell(r, 3).font = isTotal ? { ...FONT.valueLarge, color: { argb: COLORS.accentGreen } } : FONT.value;
    wsCalc.getCell(r, 3).numFmt = '€#,##0';
    wsCalc.getCell(r, 3).alignment = { horizontal: 'right' };
    wsCalc.getCell(r, 5).value = formula;
    wsCalc.getCell(r, 5).font = FONT.note;
    for (let c = 2; c <= 3; c++) {
      wsCalc.getCell(r, c).fill = headerFill(COLORS.outputBg);
      wsCalc.getCell(r, c).border = thinBorder(COLORS.outputBorder);
    }
    r++;
  }

  // Step 4: Investering
  r += 2;
  styleSectionTitle(wsCalc, r, 2, 4);
  wsCalc.getCell(r, 2).value = 'Stap 4: Investering';
  r += 2;

  setLabelValue(wsCalc, r, 2, 3, 'Vaste kosten (implementatie)', fixedCosts, { isCurrency: true, bgColor: COLORS.assumptionBg, borderColor: COLORS.assumptionBorder, note: 'Eenmalige kosten: training, opzet, coördinatie, methodiek-implementatie' });
  r++;
  for (const init of selected) {
    if (init.costPerSggzYouth > 0) {
      wsCalc.getCell(r, 2).value = `  Variabel: ${init.name}`;
      wsCalc.getCell(r, 2).font = FONT.label;
      wsCalc.getCell(r, 3).value = init.costPerSggzYouth * sggzVolume;
      wsCalc.getCell(r, 3).numFmt = '€#,##0';
      wsCalc.getCell(r, 3).font = FONT.value;
      wsCalc.getCell(r, 3).alignment = { horizontal: 'right' };
      wsCalc.getCell(r, 5).value = `= ${sggzVolume} trajecten × €${init.costPerSggzYouth}/traject`;
      wsCalc.getCell(r, 5).font = FONT.note;
      for (let c = 2; c <= 3; c++) {
        wsCalc.getCell(r, c).fill = headerFill(COLORS.assumptionBg);
        wsCalc.getCell(r, c).border = thinBorder(COLORS.assumptionBorder);
      }
      r++;
    }
  }
  setLabelValue(wsCalc, r, 2, 3, 'Variabele kosten per jaar (totaal)', variableCostsPerYear, { isCurrency: true, bgColor: COLORS.assumptionBg, borderColor: COLORS.assumptionBorder });
  r++;
  setLabelValue(wsCalc, r, 2, 3, `Totale investering (${years} jaar)`, totalInvestment, { isCurrency: true, bgColor: COLORS.outputBg, borderColor: COLORS.outputBorder, note: `= Vast (${euroFormat(fixedCosts)}) + Variabel (${euroFormat(variableCostsPerYear)}) × ${years} jaar` });

  // ================================================================
  //  SHEET 5: FINANCIEEL MODEL (year-by-year with Excel formulas)
  // ================================================================
  const wsFin = wb.addWorksheet('Financieel Model', { properties: { tabColor: { argb: '0EA5E9' } } });
  wsFin.columns = [
    { width: 4 },   // A
    { width: 36 },  // B
  ];
  // Add year columns
  for (let y = 0; y <= years; y++) {
    wsFin.getColumn(3 + y).width = 16;
  }
  // Extra column for totaal
  wsFin.getColumn(3 + years + 1).width = 18;

  r = 2;
  wsFin.mergeCells(r, 2, r, 3 + years + 1);
  styleHeaderRow(wsFin, r, 2, 3 + years + 1);
  wsFin.getCell(r, 2).value = 'FINANCIEEL MODEL — JAAROVERZICHT';
  wsFin.getRow(r).height = 30;

  r += 2;
  // Year headers
  wsFin.getCell(r, 2).value = '';
  wsFin.getCell(r, 2).font = { ...FONT.label, bold: true };
  for (let y = 0; y <= years; y++) {
    const cell = wsFin.getCell(r, 3 + y);
    cell.value = y === 0 ? 'Jaar 0 (start)' : `Jaar ${y}`;
    cell.font = { ...FONT.label, bold: true, color: { argb: COLORS.headerFont } };
    cell.fill = headerFill(COLORS.headerBg);
    cell.alignment = { horizontal: 'center' };
    cell.border = thinBorder(COLORS.headerBg);
  }
  const totColIdx = 3 + years + 1;
  const totCell = wsFin.getCell(r, totColIdx);
  totCell.value = 'TOTAAL';
  totCell.font = { ...FONT.label, bold: true, color: { argb: COLORS.headerFont } };
  totCell.fill = headerFill(COLORS.accentPurple);
  totCell.alignment = { horizontal: 'center' };
  totCell.border = thinBorder(COLORS.accentPurple);

  // Helper to add a financial row
  const addFinRow = (label: string, yearValues: number[], total: number, options?: { isBold?: boolean; bgColor?: string; borderColor?: string; isNegative?: boolean }) => {
    r++;
    wsFin.getCell(r, 2).value = label;
    wsFin.getCell(r, 2).font = options?.isBold ? { ...FONT.value, bold: true } : FONT.label;
    if (options?.bgColor) {
      wsFin.getCell(r, 2).fill = headerFill(options.bgColor);
      wsFin.getCell(r, 2).border = thinBorder(options?.borderColor || COLORS.subtleBorder);
    }

    for (let y = 0; y <= years; y++) {
      const cell = wsFin.getCell(r, 3 + y);
      cell.value = yearValues[y] || 0;
      cell.numFmt = '€#,##0';
      cell.font = options?.isBold ? FONT.value : FONT.label;
      cell.alignment = { horizontal: 'right' };
      if (options?.bgColor) {
        cell.fill = headerFill(options.bgColor);
        cell.border = thinBorder(options?.borderColor || COLORS.subtleBorder);
      }
    }

    const tCell = wsFin.getCell(r, totColIdx);
    tCell.value = total;
    tCell.numFmt = '€#,##0';
    tCell.font = options?.isBold
      ? { ...FONT.valueLarge, color: { argb: total >= 0 ? COLORS.accentGreen : 'FFDC2626' } }
      : FONT.value;
    tCell.alignment = { horizontal: 'right' };
    if (options?.bgColor) {
      tCell.fill = headerFill(options.bgColor);
      tCell.border = thinBorder(options?.borderColor || COLORS.subtleBorder);
    }
  };

  // BESPARING section
  r++;
  wsFin.getCell(r, 2).value = 'BESPARING';
  wsFin.getCell(r, 2).font = FONT.sectionTitle;
  wsFin.getCell(r, 2).border = { bottom: { style: 'medium', color: { argb: COLORS.accentGreen } } };

  // Year 0 = 0, Year 1..n = per year value
  const savingsPerYearArr = Array.from({ length: years + 1 }, (_, y) => y === 0 ? 0 : sggzSavingsPerYear);
  const bggzSavingsPerYearArr = Array.from({ length: years + 1 }, (_, y) => y === 0 ? 0 : bggzSavingsPerYear);
  const totalSavingsPerYearArr = Array.from({ length: years + 1 }, (_, y) => y === 0 ? 0 : totalSavingsPerYear);

  addFinRow('SGGZ-besparing (directe reductie)', Array.from({ length: years + 1 }, (_, y) => y === 0 ? 0 : sggzReduced * sggzCost), sggzReduced * sggzCost * years);
  addFinRow('Verschuivingsbesparing (SGGZ→BGGZ)', Array.from({ length: years + 1 }, (_, y) => y === 0 ? 0 : shiftedToBggz * (sggzCost - bggzCost)), shiftedToBggz * (sggzCost - bggzCost) * years);
  addFinRow('BGGZ-besparing', bggzSavingsPerYearArr, bggzSavingsPerYear * years);
  addFinRow('Totale besparing', totalSavingsPerYearArr, totalSavingsPerYear * years, { isBold: true, bgColor: COLORS.outputBg, borderColor: COLORS.outputBorder });

  // INVESTERING section
  r += 2;
  wsFin.getCell(r, 2).value = 'INVESTERING';
  wsFin.getCell(r, 2).font = FONT.sectionTitle;
  wsFin.getCell(r, 2).border = { bottom: { style: 'medium', color: { argb: 'FFDC2626' } } };

  // Fixed costs in year 0
  addFinRow('Vaste kosten (implementatie)', Array.from({ length: years + 1 }, (_, y) => y === 0 ? fixedCosts : 0), fixedCosts, { bgColor: COLORS.assumptionBg, borderColor: COLORS.assumptionBorder });

  // Variable costs per year
  for (const init of selected) {
    if (init.costPerSggzYouth > 0) {
      const varCost = init.costPerSggzYouth * sggzVolume;
      addFinRow(`  ${init.name} (variabel)`, Array.from({ length: years + 1 }, (_, y) => y === 0 ? 0 : varCost), varCost * years);
    }
  }

  addFinRow('Totale variabele kosten', Array.from({ length: years + 1 }, (_, y) => y === 0 ? 0 : variableCostsPerYear), variableCostsPerYear * years);
  addFinRow('Totale investering', Array.from({ length: years + 1 }, (_, y) => y === 0 ? fixedCosts : variableCostsPerYear), totalInvestment, { isBold: true, bgColor: COLORS.assumptionBg, borderColor: COLORS.assumptionBorder });

  // NETTO RESULTAAT
  r += 2;
  wsFin.getCell(r, 2).value = 'NETTO RESULTAAT';
  wsFin.getCell(r, 2).font = FONT.sectionTitle;
  wsFin.getCell(r, 2).border = { bottom: { style: 'medium', color: { argb: COLORS.headerBg } } };

  const netPerYear = Array.from({ length: years + 1 }, (_, y) => y === 0 ? -fixedCosts : totalSavingsPerYear - variableCostsPerYear);
  const netTotal = totalSavingsPerYear * years - totalInvestment;
  addFinRow('Netto resultaat per jaar', netPerYear, netTotal, { isBold: true, bgColor: COLORS.outputBg, borderColor: COLORS.outputBorder });

  // Cumulatief
  const cumulative: number[] = [];
  let cumSum = 0;
  for (let y = 0; y <= years; y++) {
    cumSum += netPerYear[y];
    cumulative.push(cumSum);
  }
  addFinRow('Cumulatief netto resultaat', cumulative, cumulative[cumulative.length - 1], { isBold: true, bgColor: COLORS.outputBg, borderColor: COLORS.outputBorder });

  // Break-even indicator
  r += 2;
  const breakEvenYear = cumulative.findIndex(v => v >= 0);
  if (breakEvenYear >= 0) {
    wsFin.getCell(r, 2).value = `Break-even bereikt in jaar ${breakEvenYear}`;
    wsFin.getCell(r, 2).font = { ...FONT.value, color: { argb: COLORS.accentGreen } };
  } else {
    wsFin.getCell(r, 2).value = `Break-even wordt niet bereikt binnen ${years} jaar`;
    wsFin.getCell(r, 2).font = { ...FONT.value, color: { argb: 'FFDC2626' } };
  }

  // VOLUME section
  r += 2;
  wsFin.getCell(r, 2).value = 'VOLUME-EFFECTEN';
  wsFin.getCell(r, 2).font = FONT.sectionTitle;
  wsFin.getCell(r, 2).border = { bottom: { style: 'medium', color: { argb: COLORS.headerBg } } };

  const addVolRow = (label: string, perYear: number) => {
    r++;
    wsFin.getCell(r, 2).value = label;
    wsFin.getCell(r, 2).font = FONT.label;
    let cum = 0;
    for (let y = 0; y <= years; y++) {
      const v = y === 0 ? 0 : perYear;
      cum += v;
      const cell = wsFin.getCell(r, 3 + y);
      cell.value = v;
      cell.numFmt = '#,##0';
      cell.alignment = { horizontal: 'right' };
      cell.font = FONT.value;
    }
    const tCell = wsFin.getCell(r, totColIdx);
    tCell.value = perYear * years;
    tCell.numFmt = '#,##0';
    tCell.font = FONT.value;
    tCell.alignment = { horizontal: 'right' };
  };

  addVolRow('Minder SGGZ-trajecten', sggzReduced);
  addVolRow('Minder BGGZ-trajecten', bggzReduced);
  addVolRow('Verschoven naar BGGZ', shiftedToBggz);

  // ================================================================
  //  SHEET 6: INSTRUCTIES
  // ================================================================
  const wsInstr = wb.addWorksheet('Instructies', { properties: { tabColor: { argb: 'F59E0B' } } });
  wsInstr.columns = [
    { width: 4 },
    { width: 80 },
    { width: 4 },
  ];

  r = 2;
  wsInstr.mergeCells(r, 2, r, 2);
  wsInstr.getCell(r, 2).value = 'INSTRUCTIES — HOE GEBRUIK JE DIT BESTAND?';
  wsInstr.getCell(r, 2).font = FONT.header;
  wsInstr.getCell(r, 2).fill = headerFill(COLORS.headerBg);
  wsInstr.getRow(r).height = 36;

  const instructions: [string, string[]][] = [
    ['Overzicht van dit bestand', [
      'Dit Excel-bestand bevat een volledige businesscase voor het programma "Kwaliteit als Medicijn".',
      'Het is gegenereerd op basis van de selectie die je hebt gemaakt in de online Impact Simulator.',
      'Het bestand bevat 6 tabs die samen een compleet financieel en inhoudelijk overzicht geven.',
    ]],
    ['Tabbladen', [
      '1. Samenvatting — Executive summary met de belangrijkste input, resultaten en financiële impact.',
      '2. Input & Aannames — Overzicht van alle ingevoerde parameters en de achterliggende aannames.',
      '3. Initiatieven — Details van alle 5 initiatieven met hun reductiepercentages en kosten.',
      '4. Berekeningen — Stap-voor-stap uitleg van elke berekening met de gebruikte formules.',
      '5. Financieel Model — Jaaroverzicht met besparing, investering en netto resultaat per jaar + cumulatief.',
      '6. Instructies — Dit tabblad met uitleg over het gebruik van het bestand.',
    ]],
    ['Kleurcodering', [
      'BLAUW/PAARS (koppen) — Sectiekoppen en titels',
      'LICHTBLAUW — INPUT: door jou ingevoerde gegevens (volumes, kosten, schaal, looptijd)',
      'LICHTGEEL — AANNAME: standaardwaarden en vaste parameters uit het programma',
      'LICHTGROEN — OUTPUT: berekende resultaten en uitkomsten',
    ]],
    ['Aanpassen van de business case', [
      'Dit bestand bevat vaste waarden (geen live Excel-formules die automatisch herberekenen).',
      'Wil je een andere configuratie doorrekenen? Ga dan terug naar de online Impact Simulator',
      'en maak een nieuwe selectie. Je kunt eenvoudig een nieuw Excel-bestand genereren.',
      '',
      'Tip: Gebruik dit bestand als basis voor je eigen presentatie of voorstel.',
      'Je kunt de data kopiëren naar PowerPoint, Google Slides of andere tools.',
    ]],
    ['Berekeningsmethodiek', [
      'De gecombineerde reductiepercentages worden berekend met een multiplicatieve formule:',
      '  Gecombineerde reductie = 1 - ∏(1 - reductie_i)',
      '',
      'Dit voorkomt dubbeltellingen wanneer meerdere initiatieven tegelijk worden ingezet.',
      'Voorbeeld: als initiatief A 10% reduceert en initiatief B 15%, dan is de gecombineerde',
      'reductie niet 25% maar: 1 - (0,90 × 0,85) = 1 - 0,765 = 23,5%.',
      '',
      'De verschuiving van SGGZ naar BGGZ wordt toegepast op het resterende SGGZ-volume',
      'na reductie. Dit betekent dat jongeren niet uit zorg verdwijnen, maar verschuiven',
      'naar een lichtere (en goedkopere) vorm van zorg.',
    ]],
    ['Disclaimer', [
      'Alle schattingen zijn indicatief en gebaseerd op regionale gemiddelden en aannames',
      'uit het programma Kwaliteit als Medicijn in Zuid-Holland Zuid.',
      'De daadwerkelijke resultaten kunnen afwijken afhankelijk van:',
      '  • De specifieke context van uw organisatie',
      '  • De kwaliteit van de implementatie',
      '  • De samenstelling van de patiëntenpopulatie',
      '  • Externe factoren (beleid, financiering, demografie)',
      '',
      'Dit bestand is bedoeld als ondersteuning bij besluitvorming en niet als garantie van resultaten.',
    ]],
    ['Contact & meer informatie', [
      'Dit bestand is gegenereerd door de Kwaliteit als Medicijn Impact Simulator.',
      'Voor vragen over het programma of de berekeningen, neem contact op met het programmateam.',
    ]],
  ];

  for (const [title, lines] of instructions) {
    r += 2;
    wsInstr.getCell(r, 2).value = title;
    wsInstr.getCell(r, 2).font = FONT.sectionTitle;
    wsInstr.getCell(r, 2).border = { bottom: { style: 'medium', color: { argb: COLORS.headerBg } } };
    r++;
    for (const line of lines) {
      wsInstr.getCell(r, 2).value = line;
      wsInstr.getCell(r, 2).font = line.startsWith('  ') ? { ...FONT.instruction, name: 'Consolas' } : FONT.instruction;
      wsInstr.getCell(r, 2).alignment = { wrapText: true };
      r++;
    }
  }

  // ================================================================
  //  GENERATE & DOWNLOAD
  // ================================================================
  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const dateStr = new Date().toISOString().slice(0, 10);
  saveAs(blob, `Businesscase_KAM_${scaleLabel.replace(/[^a-zA-Z0-9]/g, '_')}_${dateStr}.xlsx`);
}
