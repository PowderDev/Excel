/* eslint-disable max-len */
const CODES = {
    A: 65,
    Z: 90
}

function createCell() {
    return `<div class="cell" contenteditable></div>`
}

function createCol(Char) {
    return `<div class="column">${Char}</div>`
}

function createRow(content, i = '') {
    return `
        <div class="row">
            <div class="row-info">${i}</div>
            <div class="row-data">${content}</div>
        </div>
    `
}


export function createTable(rowsCount = 30) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount).fill('')
        .map((el, i) => {
            return String.fromCharCode(CODES.A + i)
        })
        .map(el => createCol(el))
        .join('')

    rows.push(createRow(cols))

    const cols2 = new Array(colsCount).fill(createCell()).join('')

    for (let i = 0; i < rowsCount; i++) {
        rows.push(createRow(cols2, i + 1))
    }

    return rows.join('')
}