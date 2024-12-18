const CODES = {
  A: 65,
  Z: 90
}

function toCell(_, col) {
  return `
    <div class="cell" contenteditable data-col="${col}"></div>
  `
}

function toColumn(col, i) {
  return `
    <div class="column" data-type="resizable" data-col="${i}">
      ${col}
      <div class="col-resize" data-resize="col""></div>
    </div>
  `
}

function createRow(i, content) {
  const resize = i
      ? '<div class="row-resize" data-resize="row"></div>'
      : '';
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${i ? i : ''}
        ${resize}
      </div>
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

  rows.push(createRow(null, cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toCell)
        .join('')

    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}
