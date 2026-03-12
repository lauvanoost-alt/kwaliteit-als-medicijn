import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import {
  C, F, solidFill, greenBorder, thinBorder,
  colLetter, addr, ref,
  addTitleBar, addBar, addSectionHeader, addSubSection, addColumnHeaders,
  setStaticInput, setDynamicInput, setCalcCell, setInfoCell, setTotalCell,
  setLabel, setCheckCell,
} from './excelStyles';

/* ================================================================
   TYPES
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

/* ================================================================
   SHEET NAMES (constants for formula references)
   ================================================================ */

const SN = {
  TITLE: 'Title',
  TOC: 'ToC',
  INPUT: '1. Input',
  IMPACT: '2. Impact Model',
  FIN: '3. Financieel Model',
  OUTPUT: '4. Output',
  CHECKS: '5. Checks',
  FORMAT: 'A.1 Format Convention',
  DOCS: 'A.2 Documentatie',
};

/* ================================================================
   INPUT SHEET LAYOUT — row/col constants for formula references
   ================================================================ */

// Values are in column D (4)
const I_COL = 4;  // Value column on Input sheet
const I = {
  SGGZ_VOL: 9,
  BGGZ_VOL: 10,
  TOTAL_VOL: 11,
  SGGZ_COST: 15,
  BGGZ_COST: 16,
  COST_DIFF: 17,
  YEARS: 21,
  SCALE: 22,
  INIT_FIRST: 27, // First initiative row
  INIT_LAST: 31,  // Last initiative row (5 initiatives)
};

// Initiative table columns on Input sheet
const IC = {
  NAME: 2,       // B
  SGGZ_RED: 3,   // C
  BGGZ_RED: 4,   // D
  SHIFT: 5,      // E
  VAR_COST: 6,   // F
  FIXED_COST: 7, // G
  ACTIVE: 8,     // H
  NOTE: 9,       // I
};

/* ================================================================
   IMPACT MODEL LAYOUT — row constants
   ================================================================ */

// Values in column D (4)
const M_COL = 4;
const M = {
  // 1. Combined reductions
  SGGZ_H_START: 10,  // Helper rows start (5 rows: 10-14)
  SGGZ_PRODUCT: 16,
  SGGZ_COMBINED: 17,
  BGGZ_H_START: 21,
  BGGZ_PRODUCT: 27,
  BGGZ_COMBINED: 28,
  SHIFT_H_START: 32,
  SHIFT_PRODUCT: 38,
  SHIFT_COMBINED: 39,
  // 2. Volume effects
  VOL_SGGZ: 43,
  VOL_SGGZ_REDUCED: 44,
  VOL_SGGZ_REMAINING: 45,
  VOL_SHIFTED: 46,
  VOL_BGGZ: 47,
  VOL_BGGZ_REDUCED: 48,
  // 3. Cost savings per year
  SAVE_SGGZ_DIRECT: 52,
  SAVE_SHIFT: 53,
  SAVE_SGGZ_TOTAL: 54,
  SAVE_BGGZ: 55,
  SAVE_TOTAL: 56,
  // 4. Investment
  INV_FIXED: 60,
  INV_VARIABLE: 61,
  INV_TOTAL: 62,
  NET_SAVINGS: 63,
};

/* ================================================================
   MAIN EXPORT FUNCTION
   ================================================================ */

export async function generateBusinesscaseExcel(params: ExcelExportParams): Promise<void> {
  const { sggzVolume, bggzVolume, sggzCost, bggzCost, years, scale, selectedInitiativeIds, allInitiatives } = params;

  const fixedCostKey = scale === 'landelijk' ? 'fixedCostLandelijk' : scale === 'regio' ? 'fixedCostRegio' : 'fixedCostOrganisatie';
  const scaleLabel = scale === 'landelijk' ? 'Landelijk' : scale === 'regio' ? 'ZHZ-regio' : 'Organisatie';
  const dateStr = new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });

  // Pre-calculate for cached formula results
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

  // ---- Create workbook ----
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Kwaliteit als Medicijn — Impact Simulator';
  wb.created = new Date();

  // ================================================================
  //  SHEET: TITLE
  // ================================================================
  const wsTitle = wb.addWorksheet(SN.TITLE, { properties: { tabColor: { argb: C.WHITE } } });
  wsTitle.columns = [{ width: 4 }, { width: 60 }, { width: 4 }];
  wsTitle.getRow(5).height = 4;
  wsTitle.mergeCells(5, 1, 5, 3);
  wsTitle.getCell(5, 1).fill = solidFill(C.BORDEAUX);
  wsTitle.getCell(5, 2).fill = solidFill(C.BORDEAUX);
  wsTitle.getCell(5, 3).fill = solidFill(C.BORDEAUX);

  wsTitle.getCell(8, 2).value = 'Kwaliteit als Medicijn';
  wsTitle.getCell(8, 2).font = { name: 'Arial', size: 22, bold: true, color: { argb: C.BORDEAUX } };
  wsTitle.getCell(10, 2).value = 'Businesscase — Impact Simulator';
  wsTitle.getCell(10, 2).font = { name: 'Arial', size: 14, bold: true, color: { argb: C.BORDEAUX } };
  wsTitle.getCell(12, 2).value = `Schaal: ${scaleLabel}`;
  wsTitle.getCell(12, 2).font = F.label;
  wsTitle.getCell(13, 2).value = `Gegenereerd: ${dateStr}`;
  wsTitle.getCell(13, 2).font = F.label;
  wsTitle.getCell(14, 2).value = 'Versie: 1.0';
  wsTitle.getCell(14, 2).font = F.label;

  wsTitle.getRow(17).height = 4;
  wsTitle.mergeCells(17, 1, 17, 3);
  wsTitle.getCell(17, 1).fill = solidFill(C.BORDEAUX);
  wsTitle.getCell(17, 2).fill = solidFill(C.BORDEAUX);
  wsTitle.getCell(17, 3).fill = solidFill(C.BORDEAUX);

  wsTitle.getCell(19, 2).value = 'Dit model bevat de financiele onderbouwing van het programma';
  wsTitle.getCell(19, 2).font = F.note;
  wsTitle.getCell(20, 2).value = 'Kwaliteit als Medicijn voor de Jeugd GGZ in Zuid-Holland Zuid.';
  wsTitle.getCell(20, 2).font = F.note;

  // ================================================================
  //  SHEET: TABLE OF CONTENTS
  // ================================================================
  const wsToc = wb.addWorksheet(SN.TOC, { properties: { tabColor: { argb: C.WHITE } } });
  wsToc.columns = [{ width: 4 }, { width: 50 }, { width: 30 }, { width: 4 }];

  wsToc.getCell(3, 2).value = 'Table of Contents';
  wsToc.getCell(3, 2).font = { name: 'Arial', size: 14, bold: true, color: { argb: C.BLACK } };

  addBar(wsToc, 5, 1, 4);

  const tocItems: [string, string][] = [
    [SN.INPUT, 'Alle input parameters en aannames'],
    [SN.IMPACT, 'Berekeningslogica (formules refereren naar Input)'],
    [SN.FIN, 'Jaaroverzicht besparing, investering, netto resultaat'],
    [SN.OUTPUT, 'Samenvatting KPIs en kernresultaten'],
    [SN.CHECKS, 'Controleberekeningen en foutdetectie'],
    [SN.FORMAT, 'Uitleg kleurconventies in dit model'],
    [SN.DOCS, 'Methodiek, bronnen en disclaimer'],
  ];

  let r = 8;
  for (const [sheet, desc] of tocItems) {
    wsToc.getCell(r, 2).value = sheet;
    wsToc.getCell(r, 2).font = F.section;
    wsToc.getCell(r, 3).value = desc;
    wsToc.getCell(r, 3).font = F.note;
    r += 2;
  }

  // ================================================================
  //  SHEET: 1. INPUT
  // ================================================================
  const wsIn = wb.addWorksheet(SN.INPUT, { properties: { tabColor: { argb: C.BORDEAUX } } });
  wsIn.columns = [
    { width: 3 },  // A spacer
    { width: 36 }, // B label
    { width: 14 }, // C unit
    { width: 16 }, // D value
    { width: 20 }, // E source
    { width: 36 }, // F comment
    { width: 3 },  // G spacer
  ];

  r = 2;
  wsIn.getCell(r, 2).value = '1. Input';
  wsIn.getCell(r, 2).font = { name: 'Arial', size: 14, bold: true, color: { argb: C.BLACK } };
  r++;
  addBar(wsIn, r, 1, 7);

  // -- Volume Assumptions --
  r = 6;
  addSectionHeader(wsIn, r, 2, 'Volume Aannames');
  r++;
  addColumnHeaders(wsIn, r, [
    { col: 2, text: 'Concept' }, { col: 3, text: 'Eenheid' },
    { col: 4, text: 'Waarde' }, { col: 5, text: 'Bron' }, { col: 6, text: 'Toelichting' },
  ]);
  r++;

  // R9: SGGZ volume
  r = I.SGGZ_VOL;
  setLabel(wsIn, r, 2, 'SGGZ-volume per jaar');
  wsIn.getCell(r, 3).value = 'jongeren/jaar'; wsIn.getCell(r, 3).font = F.label;
  setDynamicInput(wsIn, r, I_COL, sggzVolume, '#,##0');
  wsIn.getCell(r, 5).value = 'Gebruikersinput'; wsIn.getCell(r, 5).font = F.note;
  wsIn.getCell(r, 6).value = 'Aantal jongeren met SGGZ-verwijzing per jaar'; wsIn.getCell(r, 6).font = F.note;

  // R10: BGGZ volume
  r = I.BGGZ_VOL;
  setLabel(wsIn, r, 2, 'BGGZ-volume per jaar');
  wsIn.getCell(r, 3).value = 'jongeren/jaar'; wsIn.getCell(r, 3).font = F.label;
  setDynamicInput(wsIn, r, I_COL, bggzVolume, '#,##0');
  wsIn.getCell(r, 5).value = 'Gebruikersinput'; wsIn.getCell(r, 5).font = F.note;
  wsIn.getCell(r, 6).value = 'Aantal jongeren met BGGZ-verwijzing per jaar'; wsIn.getCell(r, 6).font = F.note;

  // R11: Total volume (formula)
  r = I.TOTAL_VOL;
  setLabel(wsIn, r, 2, 'Totaal volume per jaar');
  wsIn.getCell(r, 3).value = 'jongeren/jaar'; wsIn.getCell(r, 3).font = F.label;
  setCalcCell(wsIn, r, I_COL, { formula: `${addr(I_COL, I.SGGZ_VOL)}+${addr(I_COL, I.BGGZ_VOL)}`, result: sggzVolume + bggzVolume }, '#,##0');
  wsIn.getCell(r, 5).value = 'Berekend'; wsIn.getCell(r, 5).font = F.note;

  // -- Cost Assumptions --
  r = 13;
  addSectionHeader(wsIn, r, 2, 'Kosten Aannames');
  r++;
  addColumnHeaders(wsIn, r, [
    { col: 2, text: 'Concept' }, { col: 3, text: 'Eenheid' },
    { col: 4, text: 'Waarde' }, { col: 5, text: 'Bron' }, { col: 6, text: 'Toelichting' },
  ]);

  // R15: SGGZ cost
  r = I.SGGZ_COST;
  setLabel(wsIn, r, 2, 'Kosten per SGGZ-traject');
  wsIn.getCell(r, 3).value = '\u20AC/traject'; wsIn.getCell(r, 3).font = F.label;
  setDynamicInput(wsIn, r, I_COL, sggzCost, '\u20AC#,##0');
  wsIn.getCell(r, 5).value = 'KAM programma'; wsIn.getCell(r, 5).font = F.note;
  wsIn.getCell(r, 6).value = 'Standaardwaarde \u20AC3.800 (aanpasbaar)'; wsIn.getCell(r, 6).font = F.note;

  // R16: BGGZ cost
  r = I.BGGZ_COST;
  setLabel(wsIn, r, 2, 'Kosten per BGGZ-traject');
  wsIn.getCell(r, 3).value = '\u20AC/traject'; wsIn.getCell(r, 3).font = F.label;
  setDynamicInput(wsIn, r, I_COL, bggzCost, '\u20AC#,##0');
  wsIn.getCell(r, 5).value = 'KAM programma'; wsIn.getCell(r, 5).font = F.note;
  wsIn.getCell(r, 6).value = 'Standaardwaarde \u20AC1.300 (aanpasbaar)'; wsIn.getCell(r, 6).font = F.note;

  // R17: Cost difference (formula)
  r = I.COST_DIFF;
  setLabel(wsIn, r, 2, 'Kostenverschil SGGZ - BGGZ');
  wsIn.getCell(r, 3).value = '\u20AC/traject'; wsIn.getCell(r, 3).font = F.label;
  setCalcCell(wsIn, r, I_COL, { formula: `${addr(I_COL, I.SGGZ_COST)}-${addr(I_COL, I.BGGZ_COST)}`, result: sggzCost - bggzCost }, '\u20AC#,##0');
  wsIn.getCell(r, 5).value = 'Berekend'; wsIn.getCell(r, 5).font = F.note;

  // -- Timing & Scale --
  r = 19;
  addSectionHeader(wsIn, r, 2, 'Timing & Schaal');
  r++;
  addColumnHeaders(wsIn, r, [
    { col: 2, text: 'Concept' }, { col: 3, text: 'Eenheid' },
    { col: 4, text: 'Waarde' }, { col: 5, text: 'Bron' }, { col: 6, text: 'Toelichting' },
  ]);

  // R21: Years
  r = I.YEARS;
  setLabel(wsIn, r, 2, 'Looptijd');
  wsIn.getCell(r, 3).value = 'jaar'; wsIn.getCell(r, 3).font = F.label;
  setDynamicInput(wsIn, r, I_COL, years);
  wsIn.getCell(r, 5).value = 'Gebruikersinput'; wsIn.getCell(r, 5).font = F.note;

  // R22: Scale
  r = I.SCALE;
  setLabel(wsIn, r, 2, 'Schaal');
  wsIn.getCell(r, 3).value = '-'; wsIn.getCell(r, 3).font = F.label;
  setDynamicInput(wsIn, r, I_COL, scaleLabel);
  wsIn.getCell(r, 5).value = 'Gebruikersinput'; wsIn.getCell(r, 5).font = F.note;

  // -- Initiative Parameters --
  r = 24;
  addSectionHeader(wsIn, r, 2, 'Initiatief Parameters');

  // Extend columns for initiative table
  wsIn.getColumn(7).width = 16;  // G: Fixed cost
  wsIn.getColumn(8).width = 10;  // H: Active
  wsIn.getColumn(9).width = 40;  // I: Note
  wsIn.getColumn(10).width = 3;  // J: spacer

  r = 25;
  addColumnHeaders(wsIn, r, [
    { col: IC.NAME, text: 'Initiatief' },
    { col: IC.SGGZ_RED, text: 'SGGZ red.' },
    { col: IC.BGGZ_RED, text: 'BGGZ red.' },
    { col: IC.SHIFT, text: 'SGGZ\u2192BGGZ' },
    { col: IC.VAR_COST, text: 'Var.kst/traject' },
    { col: IC.FIXED_COST, text: `Vaste kst (${scale})` },
    { col: IC.ACTIVE, text: 'Actief' },
    { col: IC.NOTE, text: 'Toelichting kosten' },
  ]);

  // R27-R31: Initiative data rows
  for (let idx = 0; idx < allInitiatives.length; idx++) {
    const init = allInitiatives[idx];
    const row = I.INIT_FIRST + idx;
    const isActive = selectedInitiativeIds.includes(init.id);

    setLabel(wsIn, row, IC.NAME, init.name);
    setStaticInput(wsIn, row, IC.SGGZ_RED, init.sggzReductionPct / 100, '0%');
    setStaticInput(wsIn, row, IC.BGGZ_RED, init.bggzReductionPct / 100, '0%');
    setStaticInput(wsIn, row, IC.SHIFT, init.sggzToBggzShiftPct / 100, '0%');
    setStaticInput(wsIn, row, IC.VAR_COST, init.costPerSggzYouth, '\u20AC#,##0');
    setStaticInput(wsIn, row, IC.FIXED_COST, init[fixedCostKey], '\u20AC#,##0');

    // Active flag — dynamic input (yellow bg)
    setDynamicInput(wsIn, row, IC.ACTIVE, isActive ? 1 : 0);

    wsIn.getCell(row, IC.NOTE).value = init.costNote;
    wsIn.getCell(row, IC.NOTE).font = F.note;
    wsIn.getCell(row, IC.NOTE).alignment = { wrapText: true, vertical: 'middle' };
    wsIn.getRow(row).height = 26;
  }

  // ================================================================
  //  SHEET: 2. IMPACT MODEL (all formulas reference Input)
  // ================================================================
  const wsIm = wb.addWorksheet(SN.IMPACT, { properties: { tabColor: { argb: C.BORDEAUX } } });
  wsIm.columns = [
    { width: 3 },  // A
    { width: 40 }, // B
    { width: 14 }, // C
    { width: 18 }, // D (values)
    { width: 36 }, // E (formula explanation)
    { width: 3 },  // F
  ];

  const INP = SN.INPUT; // shorthand for formula refs

  r = 2;
  wsIm.getCell(r, 2).value = '2. Impact Model';
  wsIm.getCell(r, 2).font = { name: 'Arial', size: 14, bold: true, color: { argb: C.BLACK } };
  r++;
  addBar(wsIm, r, 1, 6);

  // ---- 1. Combined Reduction Percentages ----
  r = 6;
  addSectionHeader(wsIm, r, 2, '1. Gecombineerde Reductiepercentages');
  wsIm.getCell(r + 1, 2).value = 'Formule: 1 - \u220F(1 - reductie_i)  — voorkomt dubbeltellingen';
  wsIm.getCell(r + 1, 2).font = F.note;

  // 1.1 SGGZ
  r = M.SGGZ_H_START - 1;
  addSubSection(wsIm, r, 2, '1.1 SGGZ Reductie');
  addColumnHeaders(wsIm, r, [{ col: 3, text: 'Red. %' }, { col: 4, text: '(1-red) of 1' }]);
  wsIm.getCell(r, 5).value = 'Formule'; wsIm.getCell(r, 5).font = F.note;

  for (let idx = 0; idx < 5; idx++) {
    const row = M.SGGZ_H_START + idx;
    const initRow = I.INIT_FIRST + idx;
    setLabel(wsIm, row, 2, allInitiatives[idx].name);
    setInfoCell(wsIm, row, 3, allInitiatives[idx].sggzReductionPct / 100, '0%');
    // Formula: IF(active=1, 1-reduction, 1)
    const formula = `IF(${ref(INP, IC.ACTIVE, initRow)}=1, 1-${ref(INP, IC.SGGZ_RED, initRow)}, 1)`;
    const active = selectedInitiativeIds.includes(allInitiatives[idx].id);
    const result = active ? 1 - allInitiatives[idx].sggzReductionPct / 100 : 1;
    setCalcCell(wsIm, row, M_COL, { formula, result }, '0.000');
    wsIm.getCell(row, 5).value = `=IF('${INP}'!${addr(IC.ACTIVE, initRow)}=1, 1-'${INP}'!${addr(IC.SGGZ_RED, initRow)}, 1)`;
    wsIm.getCell(row, 5).font = F.note;
  }

  r = M.SGGZ_PRODUCT;
  setLabel(wsIm, r, 2, 'Product');
  const sggzProdFormula = `PRODUCT(${addr(M_COL, M.SGGZ_H_START)}:${addr(M_COL, M.SGGZ_H_START + 4)})`;
  setCalcCell(wsIm, r, M_COL, { formula: sggzProdFormula, result: 1 - combinedSggzRed }, '0.0000');

  r = M.SGGZ_COMBINED;
  setLabel(wsIm, r, 2, 'Gecombineerde SGGZ-reductie');
  setCalcCell(wsIm, r, M_COL, { formula: `1-${addr(M_COL, M.SGGZ_PRODUCT)}`, result: combinedSggzRed }, '0.0%');
  wsIm.getCell(r, 2).font = { ...F.label, bold: true };

  // 1.2 BGGZ
  r = M.BGGZ_H_START - 1;
  addSubSection(wsIm, r, 2, '1.2 BGGZ Reductie');
  addColumnHeaders(wsIm, r, [{ col: 3, text: 'Red. %' }, { col: 4, text: '(1-red) of 1' }]);

  for (let idx = 0; idx < 5; idx++) {
    const row = M.BGGZ_H_START + idx;
    const initRow = I.INIT_FIRST + idx;
    setLabel(wsIm, row, 2, allInitiatives[idx].name);
    setInfoCell(wsIm, row, 3, allInitiatives[idx].bggzReductionPct / 100, '0%');
    const formula = `IF(${ref(INP, IC.ACTIVE, initRow)}=1, 1-${ref(INP, IC.BGGZ_RED, initRow)}, 1)`;
    const active = selectedInitiativeIds.includes(allInitiatives[idx].id);
    const result = active ? 1 - allInitiatives[idx].bggzReductionPct / 100 : 1;
    setCalcCell(wsIm, row, M_COL, { formula, result }, '0.000');
  }

  r = M.BGGZ_PRODUCT;
  setLabel(wsIm, r, 2, 'Product');
  setCalcCell(wsIm, r, M_COL, { formula: `PRODUCT(${addr(M_COL, M.BGGZ_H_START)}:${addr(M_COL, M.BGGZ_H_START + 4)})`, result: 1 - combinedBggzRed }, '0.0000');

  r = M.BGGZ_COMBINED;
  setLabel(wsIm, r, 2, 'Gecombineerde BGGZ-reductie');
  setCalcCell(wsIm, r, M_COL, { formula: `1-${addr(M_COL, M.BGGZ_PRODUCT)}`, result: combinedBggzRed }, '0.0%');
  wsIm.getCell(r, 2).font = { ...F.label, bold: true };

  // 1.3 Shift
  r = M.SHIFT_H_START - 1;
  addSubSection(wsIm, r, 2, '1.3 SGGZ\u2192BGGZ Verschuiving');
  addColumnHeaders(wsIm, r, [{ col: 3, text: 'Shift %' }, { col: 4, text: '(1-shift) of 1' }]);

  for (let idx = 0; idx < 5; idx++) {
    const row = M.SHIFT_H_START + idx;
    const initRow = I.INIT_FIRST + idx;
    setLabel(wsIm, row, 2, allInitiatives[idx].name);
    setInfoCell(wsIm, row, 3, allInitiatives[idx].sggzToBggzShiftPct / 100, '0%');
    const formula = `IF(${ref(INP, IC.ACTIVE, initRow)}=1, 1-${ref(INP, IC.SHIFT, initRow)}, 1)`;
    const active = selectedInitiativeIds.includes(allInitiatives[idx].id);
    const result = active ? 1 - allInitiatives[idx].sggzToBggzShiftPct / 100 : 1;
    setCalcCell(wsIm, row, M_COL, { formula, result }, '0.000');
  }

  r = M.SHIFT_PRODUCT;
  setLabel(wsIm, r, 2, 'Product');
  setCalcCell(wsIm, r, M_COL, { formula: `PRODUCT(${addr(M_COL, M.SHIFT_H_START)}:${addr(M_COL, M.SHIFT_H_START + 4)})`, result: 1 - combinedShift }, '0.0000');

  r = M.SHIFT_COMBINED;
  setLabel(wsIm, r, 2, 'Gecombineerde SGGZ\u2192BGGZ verschuiving');
  setCalcCell(wsIm, r, M_COL, { formula: `1-${addr(M_COL, M.SHIFT_PRODUCT)}`, result: combinedShift }, '0.0%');
  wsIm.getCell(r, 2).font = { ...F.label, bold: true };

  // ---- 2. Volume Effects (per year) ----
  r = 41;
  addSectionHeader(wsIm, r, 2, '2. Volume-effecten (per jaar)');
  r++;
  addColumnHeaders(wsIm, r, [{ col: 3, text: 'Eenheid' }, { col: 4, text: 'Waarde' }]);
  wsIm.getCell(r, 5).value = 'Formule'; wsIm.getCell(r, 5).font = F.note;

  // SGGZ volume (input ref)
  r = M.VOL_SGGZ;
  setLabel(wsIm, r, 2, 'SGGZ-volume');
  wsIm.getCell(r, 3).value = 'jongeren/jaar'; wsIm.getCell(r, 3).font = F.label;
  setCalcCell(wsIm, r, M_COL, { formula: ref(INP, I_COL, I.SGGZ_VOL), result: sggzVolume }, '#,##0');
  wsIm.getCell(r, 5).value = `= ${SN.INPUT}!${addr(I_COL, I.SGGZ_VOL)}`; wsIm.getCell(r, 5).font = F.note;

  // SGGZ reduced
  r = M.VOL_SGGZ_REDUCED;
  setLabel(wsIm, r, 2, 'SGGZ gereduceerd');
  wsIm.getCell(r, 3).value = 'jongeren/jaar'; wsIm.getCell(r, 3).font = F.label;
  setCalcCell(wsIm, r, M_COL, { formula: `ROUND(${addr(M_COL, M.VOL_SGGZ)}*${addr(M_COL, M.SGGZ_COMBINED)},0)`, result: sggzReduced }, '#,##0');
  wsIm.getCell(r, 5).value = '= ROUND(SGGZ-volume * gecomb. reductie, 0)'; wsIm.getCell(r, 5).font = F.note;

  // SGGZ remaining
  r = M.VOL_SGGZ_REMAINING;
  setLabel(wsIm, r, 2, 'SGGZ resterend na reductie');
  wsIm.getCell(r, 3).value = 'jongeren/jaar'; wsIm.getCell(r, 3).font = F.label;
  setCalcCell(wsIm, r, M_COL, { formula: `${addr(M_COL, M.VOL_SGGZ)}-${addr(M_COL, M.VOL_SGGZ_REDUCED)}`, result: sggzRemaining }, '#,##0');

  // Shifted to BGGZ
  r = M.VOL_SHIFTED;
  setLabel(wsIm, r, 2, 'Verschoven naar BGGZ');
  wsIm.getCell(r, 3).value = 'jongeren/jaar'; wsIm.getCell(r, 3).font = F.label;
  setCalcCell(wsIm, r, M_COL, { formula: `ROUND(${addr(M_COL, M.VOL_SGGZ_REMAINING)}*${addr(M_COL, M.SHIFT_COMBINED)},0)`, result: shiftedToBggz }, '#,##0');
  wsIm.getCell(r, 5).value = '= ROUND(SGGZ-resterend * gecomb. verschuiving, 0)'; wsIm.getCell(r, 5).font = F.note;

  // BGGZ volume (input ref)
  r = M.VOL_BGGZ;
  setLabel(wsIm, r, 2, 'BGGZ-volume');
  wsIm.getCell(r, 3).value = 'jongeren/jaar'; wsIm.getCell(r, 3).font = F.label;
  setCalcCell(wsIm, r, M_COL, { formula: ref(INP, I_COL, I.BGGZ_VOL), result: bggzVolume }, '#,##0');

  // BGGZ reduced
  r = M.VOL_BGGZ_REDUCED;
  setLabel(wsIm, r, 2, 'BGGZ gereduceerd');
  wsIm.getCell(r, 3).value = 'jongeren/jaar'; wsIm.getCell(r, 3).font = F.label;
  setCalcCell(wsIm, r, M_COL, { formula: `ROUND(${addr(M_COL, M.VOL_BGGZ)}*${addr(M_COL, M.BGGZ_COMBINED)},0)`, result: bggzReduced }, '#,##0');

  // ---- 3. Cost Savings per year ----
  r = 50;
  addSectionHeader(wsIm, r, 2, '3. Kostenbesparing (per jaar)');
  r++;
  addColumnHeaders(wsIm, r, [{ col: 4, text: '\u20AC/jaar' }]);
  wsIm.getCell(r, 5).value = 'Formule'; wsIm.getCell(r, 5).font = F.note;

  // SGGZ direct savings
  r = M.SAVE_SGGZ_DIRECT;
  setLabel(wsIm, r, 2, 'SGGZ-besparing (directe reductie)');
  setCalcCell(wsIm, r, M_COL, { formula: `${addr(M_COL, M.VOL_SGGZ_REDUCED)}*${ref(INP, I_COL, I.SGGZ_COST)}`, result: sggzReduced * sggzCost }, '\u20AC#,##0');
  wsIm.getCell(r, 5).value = '= SGGZ gereduceerd * kosten per SGGZ-traject'; wsIm.getCell(r, 5).font = F.note;

  // Shift savings
  r = M.SAVE_SHIFT;
  setLabel(wsIm, r, 2, 'Verschuivingsbesparing (SGGZ\u2192BGGZ)');
  setCalcCell(wsIm, r, M_COL, { formula: `${addr(M_COL, M.VOL_SHIFTED)}*${ref(INP, I_COL, I.COST_DIFF)}`, result: shiftedToBggz * (sggzCost - bggzCost) }, '\u20AC#,##0');
  wsIm.getCell(r, 5).value = '= Verschoven * (SGGZ-kost - BGGZ-kost)'; wsIm.getCell(r, 5).font = F.note;

  // SGGZ total
  r = M.SAVE_SGGZ_TOTAL;
  setLabel(wsIm, r, 2, 'Totaal SGGZ-gerelateerde besparing');
  setTotalCell(wsIm, r, M_COL, { formula: `${addr(M_COL, M.SAVE_SGGZ_DIRECT)}+${addr(M_COL, M.SAVE_SHIFT)}`, result: sggzSavingsPerYear }, '\u20AC#,##0');

  // BGGZ savings
  r = M.SAVE_BGGZ;
  setLabel(wsIm, r, 2, 'BGGZ-besparing');
  setCalcCell(wsIm, r, M_COL, { formula: `${addr(M_COL, M.VOL_BGGZ_REDUCED)}*${ref(INP, I_COL, I.BGGZ_COST)}`, result: bggzSavingsPerYear }, '\u20AC#,##0');

  // Total savings per year
  r = M.SAVE_TOTAL;
  setLabel(wsIm, r, 2, 'Totale besparing per jaar');
  wsIm.getCell(r, 2).font = { ...F.label, bold: true };
  setTotalCell(wsIm, r, M_COL, { formula: `${addr(M_COL, M.SAVE_SGGZ_TOTAL)}+${addr(M_COL, M.SAVE_BGGZ)}`, result: totalSavingsPerYear }, '\u20AC#,##0');

  // ---- 4. Investment ----
  r = 58;
  addSectionHeader(wsIm, r, 2, '4. Investering');
  r++;
  addColumnHeaders(wsIm, r, [{ col: 4, text: '\u20AC' }]);

  // Fixed costs (SUMPRODUCT)
  r = M.INV_FIXED;
  setLabel(wsIm, r, 2, 'Vaste kosten (implementatie)');
  setCalcCell(wsIm, r, M_COL, {
    formula: `SUMPRODUCT(${ref(INP, IC.FIXED_COST, I.INIT_FIRST)}:${ref(INP, IC.FIXED_COST, I.INIT_LAST)},${ref(INP, IC.ACTIVE, I.INIT_FIRST)}:${ref(INP, IC.ACTIVE, I.INIT_LAST)})`,
    result: fixedCosts,
  }, '\u20AC#,##0');
  wsIm.getCell(r, 5).value = '= SUMPRODUCT(vaste kosten * actief vlag)'; wsIm.getCell(r, 5).font = F.note;

  // Variable costs per year (SUMPRODUCT * SGGZ volume)
  r = M.INV_VARIABLE;
  setLabel(wsIm, r, 2, 'Variabele kosten per jaar');
  setCalcCell(wsIm, r, M_COL, {
    formula: `SUMPRODUCT(${ref(INP, IC.VAR_COST, I.INIT_FIRST)}:${ref(INP, IC.VAR_COST, I.INIT_LAST)},${ref(INP, IC.ACTIVE, I.INIT_FIRST)}:${ref(INP, IC.ACTIVE, I.INIT_LAST)})*${ref(INP, I_COL, I.SGGZ_VOL)}`,
    result: variableCostsPerYear,
  }, '\u20AC#,##0');
  wsIm.getCell(r, 5).value = '= SUMPRODUCT(var kst * actief) * SGGZ-volume'; wsIm.getCell(r, 5).font = F.note;

  // Total investment
  r = M.INV_TOTAL;
  setLabel(wsIm, r, 2, 'Totale investering');
  wsIm.getCell(r, 2).font = { ...F.label, bold: true };
  setTotalCell(wsIm, r, M_COL, {
    formula: `${addr(M_COL, M.INV_FIXED)}+${addr(M_COL, M.INV_VARIABLE)}*${ref(INP, I_COL, I.YEARS)}`,
    result: totalInvestment,
  }, '\u20AC#,##0');
  wsIm.getCell(r, 5).value = '= Vast + Variabel * Looptijd'; wsIm.getCell(r, 5).font = F.note;

  // Net savings per year
  r = M.NET_SAVINGS;
  setLabel(wsIm, r, 2, 'Netto besparing per jaar');
  wsIm.getCell(r, 2).font = { ...F.label, bold: true };
  setTotalCell(wsIm, r, M_COL, {
    formula: `${addr(M_COL, M.SAVE_TOTAL)}-${addr(M_COL, M.INV_VARIABLE)}`,
    result: netSavingsPerYear,
  }, '\u20AC#,##0');

  // ================================================================
  //  SHEET: 3. FINANCIEEL MODEL (year-by-year with formulas)
  // ================================================================
  const wsFin = wb.addWorksheet(SN.FIN, { properties: { tabColor: { argb: C.BORDEAUX } } });

  // Columns: A(spacer) B(label) C(Yr0) D(Yr1) ... (YrN) Total
  const yearCols: number[] = []; // column indices for Year 0 through Year N
  for (let y = 0; y <= years; y++) yearCols.push(3 + y);
  const totalCol = 3 + years + 1;

  wsFin.getColumn(1).width = 3;
  wsFin.getColumn(2).width = 36;
  for (let y = 0; y <= years; y++) wsFin.getColumn(3 + y).width = 14;
  wsFin.getColumn(totalCol).width = 16;
  wsFin.getColumn(totalCol + 1).width = 3;

  const IMP = SN.IMPACT; // shorthand

  r = 2;
  wsFin.getCell(r, 2).value = '3. Financieel Model';
  wsFin.getCell(r, 2).font = { name: 'Arial', size: 14, bold: true, color: { argb: C.BLACK } };
  r++;
  addBar(wsFin, r, 1, totalCol + 1);

  // Year headers
  r = 6;
  wsFin.getCell(r, 2).value = '';
  for (let y = 0; y <= years; y++) {
    const col = yearCols[y];
    const cell = wsFin.getCell(r, col);
    cell.value = y === 0 ? 'Jaar 0' : `Jaar ${y}`;
    cell.font = F.headerCol;
    cell.fill = solidFill(C.BORDEAUX);
    cell.alignment = { horizontal: 'center' };
  }
  const totHeader = wsFin.getCell(r, totalCol);
  totHeader.value = 'Totaal';
  totHeader.font = F.headerCol;
  totHeader.fill = solidFill(C.BORDEAUX);
  totHeader.alignment = { horizontal: 'center' };
  wsFin.getRow(r).height = 22;

  // Helper: add a financial row with formulas
  const FIN_FMT = '\u20AC#,##0';
  const finRow = (row: number, label: string, yr0Formula: string, yr0Result: number, yrNFormula: string, yrNResult: number, isTotal: boolean) => {
    setLabel(wsFin, row, 2, label);
    if (isTotal) wsFin.getCell(row, 2).font = { ...F.label, bold: true };

    // Year 0
    const c0 = yearCols[0];
    if (isTotal) {
      setTotalCell(wsFin, row, c0, { formula: yr0Formula, result: yr0Result }, FIN_FMT);
    } else {
      setCalcCell(wsFin, row, c0, { formula: yr0Formula, result: yr0Result }, FIN_FMT);
    }

    // Years 1..N
    for (let y = 1; y <= years; y++) {
      const col = yearCols[y];
      if (isTotal) {
        setTotalCell(wsFin, row, col, { formula: yrNFormula, result: yrNResult }, FIN_FMT);
      } else {
        setCalcCell(wsFin, row, col, { formula: yrNFormula, result: yrNResult }, FIN_FMT);
      }
    }

    // Total column = SUM
    const sumRange = `${addr(yearCols[0], row)}:${addr(yearCols[years], row)}`;
    const totalResult = yr0Result + yrNResult * years;
    if (isTotal) {
      setTotalCell(wsFin, row, totalCol, { formula: `SUM(${sumRange})`, result: totalResult }, FIN_FMT);
    } else {
      setCalcCell(wsFin, row, totalCol, { formula: `SUM(${sumRange})`, result: totalResult }, FIN_FMT);
    }
  };

  // BESPARING section
  r = 8;
  addSectionHeader(wsFin, r, 2, 'BESPARING');

  r = 9;
  finRow(r, 'SGGZ-besparing (directe reductie)', '0', 0,
    `${ref(IMP, M_COL, M.VOL_SGGZ_REDUCED)}*${ref(INP, I_COL, I.SGGZ_COST)}`, sggzReduced * sggzCost, false);

  r = 10;
  finRow(r, 'Verschuivingsbesparing (SGGZ\u2192BGGZ)', '0', 0,
    `${ref(IMP, M_COL, M.VOL_SHIFTED)}*${ref(INP, I_COL, I.COST_DIFF)}`, shiftedToBggz * (sggzCost - bggzCost), false);

  r = 11;
  finRow(r, 'BGGZ-besparing', '0', 0,
    `${ref(IMP, M_COL, M.VOL_BGGZ_REDUCED)}*${ref(INP, I_COL, I.BGGZ_COST)}`, bggzSavingsPerYear, false);

  r = 12;
  // Total savings: sum of rows 9-11 for each column
  setLabel(wsFin, r, 2, 'Totale besparing');
  wsFin.getCell(r, 2).font = { ...F.label, bold: true };
  for (let y = 0; y <= years; y++) {
    const col = yearCols[y];
    const sumF = `SUM(${addr(col, 9)}:${addr(col, 11)})`;
    const val = y === 0 ? 0 : totalSavingsPerYear;
    setTotalCell(wsFin, r, col, { formula: sumF, result: val }, FIN_FMT);
  }
  setTotalCell(wsFin, r, totalCol, { formula: `SUM(${addr(totalCol, 9)}:${addr(totalCol, 11)})`, result: totalSavingsPerYear * years }, FIN_FMT);

  // INVESTERING section
  r = 14;
  addSectionHeader(wsFin, r, 2, 'INVESTERING');

  r = 15;
  // Fixed costs: Year 0 only
  setLabel(wsFin, r, 2, 'Vaste kosten (implementatie)');
  setCalcCell(wsFin, r, yearCols[0], { formula: ref(IMP, M_COL, M.INV_FIXED), result: fixedCosts }, FIN_FMT);
  for (let y = 1; y <= years; y++) {
    setCalcCell(wsFin, r, yearCols[y], { formula: '0', result: 0 }, FIN_FMT);
  }
  setCalcCell(wsFin, r, totalCol, { formula: `SUM(${addr(yearCols[0], r)}:${addr(yearCols[years], r)})`, result: fixedCosts }, FIN_FMT);

  r = 16;
  // Variable costs: Year 1+ only
  setLabel(wsFin, r, 2, 'Variabele kosten per jaar');
  setCalcCell(wsFin, r, yearCols[0], { formula: '0', result: 0 }, FIN_FMT);
  for (let y = 1; y <= years; y++) {
    setCalcCell(wsFin, r, yearCols[y], { formula: ref(IMP, M_COL, M.INV_VARIABLE), result: variableCostsPerYear }, FIN_FMT);
  }
  setCalcCell(wsFin, r, totalCol, { formula: `SUM(${addr(yearCols[0], r)}:${addr(yearCols[years], r)})`, result: variableCostsPerYear * years }, FIN_FMT);

  r = 17;
  // Total investment per year
  setLabel(wsFin, r, 2, 'Totale kosten');
  wsFin.getCell(r, 2).font = { ...F.label, bold: true };
  for (let y = 0; y <= years; y++) {
    const col = yearCols[y];
    const sumF = `${addr(col, 15)}+${addr(col, 16)}`;
    const val = y === 0 ? fixedCosts : variableCostsPerYear;
    setTotalCell(wsFin, r, col, { formula: sumF, result: val }, FIN_FMT);
  }
  setTotalCell(wsFin, r, totalCol, { formula: `SUM(${addr(totalCol, 15)}:${addr(totalCol, 16)})`, result: totalInvestment }, FIN_FMT);

  // NETTO RESULTAAT section
  r = 19;
  addSectionHeader(wsFin, r, 2, 'NETTO RESULTAAT');

  r = 20;
  // Net per year = savings - costs
  setLabel(wsFin, r, 2, 'Netto resultaat per jaar');
  wsFin.getCell(r, 2).font = { ...F.label, bold: true };
  for (let y = 0; y <= years; y++) {
    const col = yearCols[y];
    const netF = `${addr(col, 12)}-${addr(col, 17)}`;
    const val = y === 0 ? -fixedCosts : totalSavingsPerYear - variableCostsPerYear;
    setTotalCell(wsFin, r, col, { formula: netF, result: val }, FIN_FMT);
  }
  const netTotal = totalSavingsPerYear * years - totalInvestment;
  setTotalCell(wsFin, r, totalCol, { formula: `SUM(${addr(yearCols[0], r)}:${addr(yearCols[years], r)})`, result: netTotal }, FIN_FMT);

  r = 21;
  // Cumulative
  setLabel(wsFin, r, 2, 'Cumulatief netto resultaat');
  wsFin.getCell(r, 2).font = { ...F.label, bold: true };
  let cumSum = 0;
  for (let y = 0; y <= years; y++) {
    const col = yearCols[y];
    const netVal = y === 0 ? -fixedCosts : netSavingsPerYear;
    cumSum += netVal;
    if (y === 0) {
      setTotalCell(wsFin, r, col, { formula: addr(col, 20), result: cumSum }, FIN_FMT);
    } else {
      // Previous cumulative + current net
      setTotalCell(wsFin, r, col, { formula: `${addr(yearCols[y - 1], r)}+${addr(col, 20)}`, result: cumSum }, FIN_FMT);
    }
  }
  // Total col = last cumulative value
  setTotalCell(wsFin, r, totalCol, { formula: addr(yearCols[years], r), result: cumSum }, FIN_FMT);

  // Break-even
  r = 23;
  const breakEvenArr: number[] = [];
  let cs = 0;
  for (let y = 0; y <= years; y++) {
    cs += y === 0 ? -fixedCosts : netSavingsPerYear;
    breakEvenArr.push(cs);
  }
  const beYear = breakEvenArr.findIndex(v => v >= 0);
  wsFin.getCell(r, 2).value = beYear >= 0 ? `Break-even in jaar ${beYear}` : `Break-even niet bereikt binnen ${years} jaar`;
  wsFin.getCell(r, 2).font = { name: 'Arial', size: 10, bold: true, italic: true, color: { argb: beYear >= 0 ? '008000' : 'CC0000' } };

  // VOLUME section
  r = 25;
  addSectionHeader(wsFin, r, 2, 'VOLUME-EFFECTEN (trajecten per jaar)');
  r++;

  const addVolRow = (row: number, label: string, ref_row: number, perYearVal: number) => {
    setLabel(wsFin, row, 2, label);
    setCalcCell(wsFin, row, yearCols[0], { formula: '0', result: 0 }, '#,##0');
    for (let y = 1; y <= years; y++) {
      setCalcCell(wsFin, row, yearCols[y], { formula: ref(IMP, M_COL, ref_row), result: perYearVal }, '#,##0');
    }
    setCalcCell(wsFin, row, totalCol, { formula: `SUM(${addr(yearCols[0], row)}:${addr(yearCols[years], row)})`, result: perYearVal * years }, '#,##0');
  };

  addVolRow(r, 'Minder SGGZ-trajecten', M.VOL_SGGZ_REDUCED, sggzReduced);
  addVolRow(r + 1, 'Minder BGGZ-trajecten', M.VOL_BGGZ_REDUCED, bggzReduced);
  addVolRow(r + 2, 'Verschoven naar BGGZ', M.VOL_SHIFTED, shiftedToBggz);

  // ================================================================
  //  SHEET: 4. OUTPUT
  // ================================================================
  const wsOut = wb.addWorksheet(SN.OUTPUT, { properties: { tabColor: { argb: C.BORDEAUX } } });
  wsOut.columns = [{ width: 3 }, { width: 40 }, { width: 20 }, { width: 20 }, { width: 3 }];

  r = 2;
  wsOut.getCell(r, 2).value = '4. Output: Samenvatting';
  wsOut.getCell(r, 2).font = { name: 'Arial', size: 14, bold: true, color: { argb: C.BLACK } };
  r++;
  addBar(wsOut, r, 1, 5);

  r = 6;
  addSectionHeader(wsOut, r, 2, 'Kernresultaten');
  r++;
  addColumnHeaders(wsOut, r, [{ col: 2, text: 'KPI' }, { col: 3, text: 'Waarde' }, { col: 4, text: 'Eenheid' }]);

  const outputKPIs: [string, string, number | string, string, string][] = [
    // [label, formula, result, numFmt, unit]
    ['Gecombineerde SGGZ-reductie', ref(IMP, M_COL, M.SGGZ_COMBINED), combinedSggzRed, '0.0%', '%'],
    ['Gecombineerde BGGZ-reductie', ref(IMP, M_COL, M.BGGZ_COMBINED), combinedBggzRed, '0.0%', '%'],
    ['Verschuiving SGGZ\u2192BGGZ', ref(IMP, M_COL, M.SHIFT_COMBINED), combinedShift, '0.0%', '%'],
    ['Besparing per jaar', ref(IMP, M_COL, M.SAVE_TOTAL), totalSavingsPerYear, '\u20AC#,##0', '\u20AC/jaar'],
    ['Totale besparing (cumulatief)', `${ref(IMP, M_COL, M.SAVE_TOTAL)}*${ref(INP, I_COL, I.YEARS)}`, totalSavingsPerYear * years, '\u20AC#,##0', `\u20AC (${years} jaar)`],
    ['Totale investering', ref(IMP, M_COL, M.INV_TOTAL), totalInvestment, '\u20AC#,##0', '\u20AC'],
    ['Netto besparing per jaar', ref(IMP, M_COL, M.NET_SAVINGS), netSavingsPerYear, '\u20AC#,##0', '\u20AC/jaar'],
    ['Minder SGGZ-trajecten/jaar', ref(IMP, M_COL, M.VOL_SGGZ_REDUCED), sggzReduced, '#,##0', 'trajecten/jaar'],
    ['Minder BGGZ-trajecten/jaar', ref(IMP, M_COL, M.VOL_BGGZ_REDUCED), bggzReduced, '#,##0', 'trajecten/jaar'],
    ['Verschoven naar BGGZ/jaar', ref(IMP, M_COL, M.VOL_SHIFTED), shiftedToBggz, '#,##0', 'trajecten/jaar'],
  ];

  r = 8;
  for (const [label, formula, result, numFmt, unit] of outputKPIs) {
    setLabel(wsOut, r, 2, label);
    setCalcCell(wsOut, r, 3, { formula, result: result as number }, numFmt);
    wsOut.getCell(r, 4).value = unit;
    wsOut.getCell(r, 4).font = F.label;
    r++;
  }

  // ROI
  r += 1;
  addSectionHeader(wsOut, r, 2, 'Rendement');
  r++;
  setLabel(wsOut, r, 2, 'ROI (netto besparing / investering)');
  const roiVal = totalInvestment > 0 ? (totalSavingsPerYear * years - totalInvestment) / totalInvestment : 0;
  setCalcCell(wsOut, r, 3, {
    formula: `IF(${ref(IMP, M_COL, M.INV_TOTAL)}=0,0,(${ref(IMP, M_COL, M.SAVE_TOTAL)}*${ref(INP, I_COL, I.YEARS)}-${ref(IMP, M_COL, M.INV_TOTAL)})/${ref(IMP, M_COL, M.INV_TOTAL)})`,
    result: roiVal,
  }, '0%');
  wsOut.getCell(r, 4).value = '%'; wsOut.getCell(r, 4).font = F.label;

  r++;
  setLabel(wsOut, r, 2, 'Payback periode');
  wsOut.getCell(r, 3).value = beYear >= 0 ? `Jaar ${beYear}` : 'n.v.t.';
  wsOut.getCell(r, 3).font = F.calcVal;
  wsOut.getCell(r, 3).border = greenBorder();

  // ================================================================
  //  SHEET: 5. CHECKS
  // ================================================================
  const wsChk = wb.addWorksheet(SN.CHECKS, { properties: { tabColor: { argb: C.BORDEAUX } } });
  wsChk.columns = [{ width: 3 }, { width: 44 }, { width: 20 }, { width: 14 }, { width: 36 }, { width: 3 }];

  r = 2;
  wsChk.getCell(r, 2).value = '5. Checks';
  wsChk.getCell(r, 2).font = { name: 'Arial', size: 14, bold: true, color: { argb: C.BLACK } };
  r++;
  addBar(wsChk, r, 1, 6);

  r = 6;
  addColumnHeaders(wsChk, r, [
    { col: 2, text: 'Check' }, { col: 3, text: 'Formule' }, { col: 4, text: 'Status' }, { col: 5, text: 'Toelichting' },
  ]);

  const checks: [string, string, boolean, string][] = [
    [
      'Totale besparing = SGGZ + BGGZ',
      `IF(ABS(${ref(IMP, M_COL, M.SAVE_TOTAL)}-${ref(IMP, M_COL, M.SAVE_SGGZ_TOTAL)}-${ref(IMP, M_COL, M.SAVE_BGGZ)})<1,"OK","ERROR")`,
      Math.abs(totalSavingsPerYear - sggzSavingsPerYear - bggzSavingsPerYear) < 1,
      'Totale besparing moet gelijk zijn aan som SGGZ + BGGZ',
    ],
    [
      'SGGZ resterend + gereduceerd = origineel',
      `IF(ABS(${ref(IMP, M_COL, M.VOL_SGGZ_REMAINING)}+${ref(IMP, M_COL, M.VOL_SGGZ_REDUCED)}-${ref(IMP, M_COL, M.VOL_SGGZ)})<1,"OK","ERROR")`,
      Math.abs(sggzRemaining + sggzReduced - sggzVolume) < 1,
      'Volume balanscontrole SGGZ',
    ],
    [
      'Reductiepercentages >= 0',
      `IF(AND(${ref(IMP, M_COL, M.SGGZ_COMBINED)}>=0,${ref(IMP, M_COL, M.BGGZ_COMBINED)}>=0),"OK","ERROR")`,
      combinedSggzRed >= 0 && combinedBggzRed >= 0,
      'Reductiepercentages mogen niet negatief zijn',
    ],
    [
      'Investering >= 0',
      `IF(${ref(IMP, M_COL, M.INV_TOTAL)}>=0,"OK","ERROR")`,
      totalInvestment >= 0,
      'Totale investering moet positief zijn',
    ],
    [
      'Volumes >= 0',
      `IF(AND(${ref(INP, I_COL, I.SGGZ_VOL)}>=0,${ref(INP, I_COL, I.BGGZ_VOL)}>=0),"OK","ERROR")`,
      sggzVolume >= 0 && bggzVolume >= 0,
      'Input volumes mogen niet negatief zijn',
    ],
    [
      'Netto = Besparing - Variabel',
      `IF(ABS(${ref(IMP, M_COL, M.NET_SAVINGS)}-${ref(IMP, M_COL, M.SAVE_TOTAL)}+${ref(IMP, M_COL, M.INV_VARIABLE)})<1,"OK","ERROR")`,
      Math.abs(netSavingsPerYear - totalSavingsPerYear + variableCostsPerYear) < 1,
      'Netto besparing = totale besparing - variabele kosten',
    ],
  ];

  r = 7;
  for (const [label, formula, result, note] of checks) {
    setLabel(wsChk, r, 2, label);
    wsChk.getCell(r, 3).value = '(zie formule)';
    wsChk.getCell(r, 3).font = F.note;
    setCheckCell(wsChk, r, 4, formula, result);
    wsChk.getCell(r, 5).value = note;
    wsChk.getCell(r, 5).font = F.note;
    r++;
  }

  // ================================================================
  //  SHEET: A.1 FORMAT CONVENTION
  // ================================================================
  const wsFmt = wb.addWorksheet(SN.FORMAT, { properties: { tabColor: { argb: '808080' } } });
  wsFmt.columns = [{ width: 3 }, { width: 48 }, { width: 20 }, { width: 3 }];

  r = 2;
  wsFmt.getCell(r, 2).value = 'A.1 Format Convention';
  wsFmt.getCell(r, 2).font = { name: 'Arial', size: 14, bold: true, color: { argb: C.BLACK } };
  r++;
  addBar(wsFmt, r, 1, 4);

  const fmtItems: [string, () => void][] = [
    ['Titles and table captions', () => {
      const c = wsFmt.getCell(r, 3);
      c.value = 'Title';
      c.font = F.title;
      c.fill = solidFill(C.BORDEAUX);
      c.alignment = { horizontal: 'center' };
    }],
    ['Input cells (static) — blue italic', () => {
      const c = wsFmt.getCell(r, 3);
      c.value = '99.0';
      c.font = F.inputVal;
      c.alignment = { horizontal: 'center' };
    }],
    ['Input cells (dynamic) — yellow bg, blue italic', () => {
      const c = wsFmt.getCell(r, 3);
      c.value = '99.0';
      c.font = F.inputVal;
      c.fill = solidFill(C.YELLOW_BG);
      c.alignment = { horizontal: 'center' };
    }],
    ['Calculated cells — green border', () => {
      const c = wsFmt.getCell(r, 3);
      c.value = '99.0';
      c.font = F.calcVal;
      c.border = greenBorder();
      c.alignment = { horizontal: 'center' };
    }],
    ['Informative cells — gray text', () => {
      const c = wsFmt.getCell(r, 3);
      c.value = '99.0';
      c.font = F.infoVal;
      c.alignment = { horizontal: 'center' };
    }],
    ['Totals / subtotals — bold', () => {
      const c = wsFmt.getCell(r, 3);
      c.value = '99.0';
      c.font = F.totalVal;
      c.alignment = { horizontal: 'center' };
    }],
    ['Check-sum cells (if negative) — red bg', () => {
      const c = wsFmt.getCell(r, 3);
      c.value = '-';
      c.font = F.checkERR;
      c.fill = solidFill(C.RED_BG);
      c.alignment = { horizontal: 'center' };
    }],
  ];

  r = 6;
  for (const [label, applyStyling] of fmtItems) {
    setLabel(wsFmt, r, 2, label);
    applyStyling();
    r += 2;
  }

  // ================================================================
  //  SHEET: A.2 DOCUMENTATIE
  // ================================================================
  const wsDoc = wb.addWorksheet(SN.DOCS, { properties: { tabColor: { argb: '808080' } } });
  wsDoc.columns = [{ width: 3 }, { width: 80 }, { width: 3 }];

  r = 2;
  wsDoc.getCell(r, 2).value = 'A.2 Documentatie';
  wsDoc.getCell(r, 2).font = { name: 'Arial', size: 14, bold: true, color: { argb: C.BLACK } };
  r++;
  addBar(wsDoc, r, 1, 3);

  const docSections: [string, string[]][] = [
    ['Doel van dit model', [
      'Dit Excel-model bevat de financiele businesscase voor het programma "Kwaliteit als Medicijn".',
      'Het berekent de verwachte volumereductie en kostenbesparing bij implementatie van initiatieven',
      'voor de Jeugd GGZ in Zuid-Holland Zuid.',
    ]],
    ['Scope', [
      `Schaal: ${scaleLabel}`,
      `Looptijd: ${years} jaar`,
      `Geselecteerde initiatieven: ${selected.map(i => i.name).join(', ')}`,
    ]],
    ['Berekeningslogica', [
      'Gecombineerde reductie: 1 - product(1 - reductie_i) per actief initiatief.',
      'Dit is een multiplicatieve formule die dubbeltellingen voorkomt.',
      'Voorbeeld: 10% + 15% = 1 - (0.90 * 0.85) = 23.5% (niet 25%).',
      '',
      'Verschuiving SGGZ naar BGGZ wordt toegepast op het resterende SGGZ-volume na reductie.',
      'Jongeren verdwijnen niet uit zorg, maar verschuiven naar lichtere (goedkopere) zorg.',
      '',
      'Vaste kosten zijn eenmalig (jaar 0). Variabele kosten zijn jaarlijks.',
    ]],
    ['Bronnen aannames', [
      'SGGZ-volume ZHZ-regio: ca. 4.800 jongeren/jaar (10 gemeenten, ~250.000 inwoners)',
      'BGGZ-volume ZHZ-regio: ca. 3.200 jongeren/jaar',
      'SGGZ-volume landelijk: ca. 160.000 jongeren/jaar (390 gemeenten)',
      'BGGZ-volume landelijk: ca. 240.000 jongeren/jaar',
      'Kosten per SGGZ-traject: standaard EUR 3.800 (regionaal gemiddelde)',
      'Kosten per BGGZ-traject: standaard EUR 1.300 (regionaal gemiddelde)',
      'Reductiepercentages per initiatief: Kwaliteit als Medicijn programma-evaluatie',
    ]],
    ['Model conventies', [
      'Alle formules in het berekeningsblad refereren naar het Input-blad — geen hardcoded waarden.',
      'Gele cellen = door gebruiker aanpasbare waarden.',
      'Blauwe tekst = input (statisch).',
      'Groene rand = berekend resultaat.',
      'Grijze tekst = informatief / hulpwaarde.',
      'Vet = totalen en subtotalen.',
    ]],
    ['Disclaimer', [
      'Alle schattingen zijn indicatief en gebaseerd op regionale gemiddelden en aannames uit het',
      'programma Kwaliteit als Medicijn in Zuid-Holland Zuid. De daadwerkelijke resultaten kunnen',
      'afwijken afhankelijk van de specifieke context, implementatiekwaliteit en patientenpopulatie.',
      'Dit model is bedoeld als ondersteuning bij besluitvorming, niet als garantie van resultaten.',
    ]],
    ['Versie-informatie', [
      `Gegenereerd: ${dateStr}`,
      'Versie: 1.0',
      'Bron: Kwaliteit als Medicijn — Impact Simulator',
    ]],
  ];

  r = 6;
  for (const [title, lines] of docSections) {
    addSectionHeader(wsDoc, r, 2, title);
    r++;
    for (const line of lines) {
      if (line === '') { r++; continue; }
      wsDoc.getCell(r, 2).value = line;
      wsDoc.getCell(r, 2).font = F.label;
      wsDoc.getCell(r, 2).alignment = { wrapText: true };
      r++;
    }
    r++;
  }

  // ================================================================
  //  GENERATE & DOWNLOAD
  // ================================================================
  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const fileName = `Businesscase_KAM_${scaleLabel.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().slice(0, 10)}.xlsx`;
  saveAs(blob, fileName);
}
