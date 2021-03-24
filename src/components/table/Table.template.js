/* eslint-disable max-len */
const CODES = {
    A: 65,
    Z: 90
}

function createCell(_, index) {
    return `<div class="cell" data-col="${index}"  contenteditable></div>`
}

function createCol(Char, index) {
    return `
    <div class="column" data-type="resizable" data-col="${index}" >
        ${Char}
        <div class="col-resize" data-resize="col" ></div>
    </div>`
}

function createRow(content, i = '') {
    const resizer = i ? '<div class="row-resize" data-resize="row" ></div>' : ''
    return `
        <div class="row" data-type="resizable" >
            <div class="row-info" data-type="row-info" >
                ${i}
                ${resizer}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}


export function createTable(rowsCount = 300) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount).fill('')
        .map((el, i) => {
            return String.fromCharCode(CODES.A + i)
        })
        .map((el, i) => createCol(el, i))
        .join('')

    rows.push(createRow(cols))

    const cells = new Array(colsCount).fill('').map((el, i) => createCell(el, i)).join('')

    for (let i = 0; i < rowsCount; i++) {
        rows.push(createRow(cells, i + 1))
    }

    return rows.join('')
}