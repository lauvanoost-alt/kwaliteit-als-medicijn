import type ExcelJS from 'exceljs';

/* ================================================================
   COLOUR PALETTE — Corporate Bordeaux Convention
   ================================================================ */
export const C = {
  BORDEAUX:       'FF800000',
  BORDEAUX_LIGHT: 'FFA03030',
  WHITE:          'FFFFFFFF',
  BLACK:          'FF1E1E1E',
  BLUE:           'FF0000CC',
  YELLOW_BG:      'FFFFFF00',
  GREEN_BORDER:   'FF008000',
  GRAY:           'FF808080',
  GRAY_LIGHT:     'FFD0D0D0',
  GRAY_BG:        'FFF5F5F5',
  RED_BG:         'FFFF0000',
  GREEN_BG:       'FF90EE90',
};

/* ================================================================
   FONT PRESETS
   ================================================================ */
export const F = {
  title:     { name: 'Arial', size: 14, bold: true, color: { argb: C.WHITE } } as Partial<ExcelJS.Font>,
  subtitle:  { name: 'Arial', size: 11, bold: true, color: { argb: C.BORDEAUX } } as Partial<ExcelJS.Font>,
  section:   { name: 'Arial', size: 11, bold: true, color: { argb: C.BORDEAUX } } as Partial<ExcelJS.Font>,
  label:     { name: 'Arial', size: 10, color: { argb: C.BLACK } } as Partial<ExcelJS.Font>,
  inputVal:  { name: 'Arial', size: 10, italic: true, color: { argb: C.BLUE } } as Partial<ExcelJS.Font>,
  calcVal:   { name: 'Arial', size: 10, bold: true, color: { argb: C.BLACK } } as Partial<ExcelJS.Font>,
  infoVal:   { name: 'Arial', size: 10, color: { argb: C.GRAY } } as Partial<ExcelJS.Font>,
  totalVal:  { name: 'Arial', size: 10, bold: true, color: { argb: C.BLACK } } as Partial<ExcelJS.Font>,
  note:      { name: 'Arial', size: 8, italic: true, color: { argb: C.GRAY } } as Partial<ExcelJS.Font>,
  headerCol: { name: 'Arial', size: 9, bold: true, color: { argb: C.WHITE } } as Partial<ExcelJS.Font>,
  checkOK:   { name: 'Arial', size: 10, bold: true, color: { argb: 'FF008000' } } as Partial<ExcelJS.Font>,
  checkERR:  { name: 'Arial', size: 10, bold: true, color: { argb: C.WHITE } } as Partial<ExcelJS.Font>,
};

/* ================================================================
   HELPERS
   ================================================================ */

export function solidFill(argb: string): ExcelJS.Fill {
  return { type: 'pattern', pattern: 'solid', fgColor: { argb } };
}

export function greenBorder(): Partial<ExcelJS.Borders> {
  const s: ExcelJS.BorderStyle = 'thin';
  const b = { style: s, color: { argb: C.GREEN_BORDER } };
  return { top: b, bottom: b, left: b, right: b };
}

export function thinBorder(argb: string = C.GRAY_LIGHT): Partial<ExcelJS.Borders> {
  const s: ExcelJS.BorderStyle = 'thin';
  const b = { style: s, color: { argb } };
  return { top: b, bottom: b, left: b, right: b };
}

/** Column number (1-based) → letter (A-Z, AA-AZ for >26) */
export function colLetter(n: number): string {
  let s = '';
  while (n > 0) { n--; s = String.fromCharCode(65 + (n % 26)) + s; n = Math.floor(n / 26); }
  return s;
}

/** Cell address like "D9" */
export function addr(col: number, row: number): string {
  return `${colLetter(col)}${row}`;
}

/** Sheet-qualified reference like "'1. Input'!D9" */
export function ref(sheet: string, col: number, row: number): string {
  return `'${sheet}'!${addr(col, row)}`;
}

/* ================================================================
   SHEET-LEVEL HELPERS
   ================================================================ */

/** Add a bordeaux title bar across columns */
export function addTitleBar(ws: ExcelJS.Worksheet, row: number, colStart: number, colEnd: number, text: string) {
  ws.mergeCells(row, colStart, row, colEnd);
  const cell = ws.getCell(row, colStart);
  cell.value = text;
  cell.font = F.title;
  cell.fill = solidFill(C.BORDEAUX);
  cell.alignment = { vertical: 'middle', horizontal: 'left' };
  for (let c = colStart; c <= colEnd; c++) {
    ws.getCell(row, c).fill = solidFill(C.BORDEAUX);
  }
  ws.getRow(row).height = 28;
}

/** Add a bordeaux decorative bar (no text) */
export function addBar(ws: ExcelJS.Worksheet, row: number, colStart: number, colEnd: number) {
  ws.mergeCells(row, colStart, row, colEnd);
  for (let c = colStart; c <= colEnd; c++) {
    ws.getCell(row, c).fill = solidFill(C.BORDEAUX);
  }
  ws.getRow(row).height = 4;
}

/** Section header — bold bordeaux text */
export function addSectionHeader(ws: ExcelJS.Worksheet, row: number, col: number, text: string) {
  const cell = ws.getCell(row, col);
  cell.value = text;
  cell.font = F.section;
}

/** Sub-section header — bold, slightly smaller */
export function addSubSection(ws: ExcelJS.Worksheet, row: number, col: number, text: string) {
  const cell = ws.getCell(row, col);
  cell.value = text;
  cell.font = { name: 'Arial', size: 10, bold: true, color: { argb: C.BLACK } };
}

/** Column header row (bordeaux bg, white text) */
export function addColumnHeaders(ws: ExcelJS.Worksheet, row: number, headers: { col: number; text: string }[]) {
  for (const h of headers) {
    const cell = ws.getCell(row, h.col);
    cell.value = h.text;
    cell.font = F.headerCol;
    cell.fill = solidFill(C.BORDEAUX);
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
  }
  ws.getRow(row).height = 22;
}

/** Set a static input cell (blue italic text, no bg) */
export function setStaticInput(ws: ExcelJS.Worksheet, row: number, col: number, value: string | number, numFmt?: string) {
  const cell = ws.getCell(row, col);
  cell.value = value;
  cell.font = F.inputVal;
  cell.alignment = { horizontal: 'right' };
  if (numFmt) cell.numFmt = numFmt;
}

/** Set a dynamic assumption cell (yellow bg, blue italic text) */
export function setDynamicInput(ws: ExcelJS.Worksheet, row: number, col: number, value: string | number, numFmt?: string) {
  const cell = ws.getCell(row, col);
  cell.value = value;
  cell.font = F.inputVal;
  cell.fill = solidFill(C.YELLOW_BG);
  cell.alignment = { horizontal: 'right' };
  if (numFmt) cell.numFmt = numFmt;
}

/** Set a calculated cell (green border, bold) */
export function setCalcCell(ws: ExcelJS.Worksheet, row: number, col: number, value: ExcelJS.CellValue, numFmt?: string) {
  const cell = ws.getCell(row, col);
  cell.value = value;
  cell.font = F.calcVal;
  cell.border = greenBorder();
  cell.alignment = { horizontal: 'right' };
  if (numFmt) cell.numFmt = numFmt;
}

/** Set an informative cell (gray text) */
export function setInfoCell(ws: ExcelJS.Worksheet, row: number, col: number, value: string | number, numFmt?: string) {
  const cell = ws.getCell(row, col);
  cell.value = value;
  cell.font = F.infoVal;
  cell.alignment = { horizontal: 'right' };
  if (numFmt) cell.numFmt = numFmt;
}

/** Set a total/subtotal cell (bold) */
export function setTotalCell(ws: ExcelJS.Worksheet, row: number, col: number, value: ExcelJS.CellValue, numFmt?: string) {
  const cell = ws.getCell(row, col);
  cell.value = value;
  cell.font = F.totalVal;
  cell.alignment = { horizontal: 'right' };
  if (numFmt) cell.numFmt = numFmt;
}

/** Set a label cell */
export function setLabel(ws: ExcelJS.Worksheet, row: number, col: number, text: string, indent?: number) {
  const cell = ws.getCell(row, col);
  cell.value = indent ? `${'  '.repeat(indent)}${text}` : text;
  cell.font = F.label;
  cell.alignment = { vertical: 'middle' };
}

/** Set a check cell — shows OK (green) or ERROR (red bg) */
export function setCheckCell(ws: ExcelJS.Worksheet, row: number, col: number, formula: string, result: boolean) {
  const cell = ws.getCell(row, col);
  cell.value = { formula, result: result ? 'OK' : 'ERROR' };
  if (result) {
    cell.font = F.checkOK;
  } else {
    cell.font = F.checkERR;
    cell.fill = solidFill(C.RED_BG);
  }
  cell.alignment = { horizontal: 'center' };
}
