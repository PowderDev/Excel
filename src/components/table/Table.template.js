/* eslint-disable max-len */
const CODES = {
    A: 65,
    Z: 90
}

// function createCell(colIndex, rowIndex) {
//     return `<div class="cell" data-col="${colIndex}" data-row="${rowIndex}"  contenteditable></div>`
// }

function createCell(rowIndex) {
    return function(_, colIndex) {
        return `
        <div class="cell"
            data-col="${colIndex}"
            data-id="${rowIndex}:${colIndex}" 
            contenteditable
        ></div>`
    }
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
        .map(createCol)
        .join('')

    rows.push(createRow(cols))


    for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell(rowIndex))
        .join('')

        rows.push(createRow(cells, rowIndex + 1))
    }

    return rows.join('')
}