import { defaultStyles } from "../../constans"
import { parse } from "../../core/parse"
import { camelToDashCase } from "../../core/utils"

/* eslint-disable max-len */
const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 30

const styles = Object.keys(defaultStyles).map(key => `${camelToDashCase(key)}: ${defaultStyles[key]}`).join(';')


// function createCell(colIndex, rowIndex) {
//     return `<div class="cell" data-col="${colIndex}" data-row="${rowIndex}"  contenteditable></div>`
// }

function createCell(rowIndex, state = {}) {
    return function(_, colIndex) {
        const width = state.colState[colIndex] || DEFAULT_WIDTH+'px'
        const id = `${rowIndex}:${colIndex}`
        const data = state.dataState[id]
        const extraStyles = state.stylesState[id] ? Object.keys(state.stylesState[id]).map(key => `${camelToDashCase(key)}: ${state.stylesState[id][key]}`).join(';') : null
        return `
        <div class="cell"
            data-col="${colIndex}"
            data-id="${rowIndex}:${colIndex}" 
            style="${styles};${extraStyles};width: ${width}"
            data-value="${data || ''}"
            contenteditable
        >${parse(data) || ''}</div>`
    }
}

function createCol(Char, index, width) {
    return `
    <div class="column" style="width: ${width}" data-type="resizable" data-col="${index}" >
        ${Char}
        <div class="col-resize" data-resize="col" ></div>
    </div>`
}

function createRow(content, i = '', rowState = {}) {
    const resizer = i ? '<div class="row-resize" data-resize="row" ></div>' : ''
    const height = rowState[i] || DEFAULT_HEIGHT+'px'
    return `
        <div class="row" style="height: ${height}"data-row="${i}" data-type="resizable" >
            <div class="row-info" data-type="row-info" >
                ${i}
                ${resizer}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function getWidth(state = {}, index) {
    return state[index] || DEFAULT_WIDTH+'px'
}


export function createTable(rowsCount = 300, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount).fill('')
        .map((el, i) => {
            return String.fromCharCode(CODES.A + i)
        })
        .map((char, index) =>{
            const width = getWidth(state.colState, index)
            return createCol(char, index, width)
        }) 
        .join('')

    rows.push(createRow(cols))


    for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell(rowIndex, state))
        .join('')

        rows.push(createRow(cells, rowIndex + 1, state.rowState))
    }
    return rows.join('')
}