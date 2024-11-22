const CODES = {
  A: 65,
  Z: 90
}

function createCell(data) {
  return `
    <div class="cell" contenteditable>${data}</div>
  `
}

function toColumn(col) {
  return `
    <div class="column">${col}</div>
  `
}

function createRow(content, i) {
  return `
    <div class="row">
      <div class="row-info">${i}</div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, i) {
  return String.fromCharCode(CODES.A + i);
}

export function createTable(rowsCount = 40) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  rows.push(createRow(cols, ''));

  for (let i = 0; i < rowsCount; i++) {
    const colsCell = new Array(colsCount)
        .fill('')
        .map(createCell)
        .join('')

    rows.push(createRow(colsCell, i + 1))
  }

  return rows.join('')
}
