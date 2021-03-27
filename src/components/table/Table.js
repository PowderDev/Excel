/* eslint-disable keyword-spacing */
/* eslint-disable space-before-blocks */
/* eslint-disable max-len */
/* eslint-disable no-invalid-this */
/* eslint-disable prefer-rest-params */
/* eslint-disable brace-style */
import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./Table.template";
import { $ } from '@core/dom'
import { TableSelection } from "./TableSelection";
import { range, nextSelector } from '@core/utils'
import resizeHandler from './Table.resize'
import * as actions from "@/redux/actions";
import { defaultStyles } from "@/constans";
import { debounce } from "../../core/utils";
import { parse } from "@core/parse";


export class Table extends ExcelComponent {
    static className = 'excel__table'
    static rowsCount = 300

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            subscribe: ['currentText'],
            ...options
        })
    }

    prepate() {
        this.onInput = debounce(this.onInput, 300)
    }
        
    toHtml() {
        return createTable(Table.rowsCount, this.store.getState())
    }

    init() {
        super.init()
        this.selection = new TableSelection()

        const $cell = $(this.$root).findOneBySelector('[data-id="0:0"]')
        this.selectCell($cell)

        this.$on('fomula:input', text => {
            this.selection.current
                .attr('data-value', text)
                .text(parse(text))
            this.$dispatch(actions.changeText({
                id: this.selection.current.getId(),
                text
            }))
        })

        this.$on('fomula:enter', da => {
            this.selection.current.focus()
        })

        this.$on('toolbar:applyStyle', style => {
            this.selection.applyStyle(style)
            this.$dispatch(actions.applyStyle({
                style,
                ids: this.selection.selectedIds 
            }))
        })
    }

    async resizeTable(e, resizeType) {
        try {
            const data = await resizeHandler(resizeType, this.$root, e, $(e.target))
            this.$dispatch(actions.tableResize(data))
        } catch(err) {
            console.warn('Resize Error: ', err.message);
        }
    } 

    onMousedown(e) {
        const resizeType = e.target.dataset.resize
        if (resizeType) {
            this.resizeTable(e, resizeType)
        } else if (e.target.dataset.id) {
            const $target = $(e.target)

            if (e.shiftKey) {
                const targetCoords  = $target.getId(true)
                const currentCoords = this.selection.current.getId(true)

                const cols = range(currentCoords.col, targetCoords.col)
                const rows = range(currentCoords.row, targetCoords.row)

                const ids = cols.reduce((acc, col) => {
                    rows.forEach(row => acc.push(`${row}:${col}`))
                    return acc
                }, [])

                const $cells = ids.map(id => $(this.$root).findOneBySelector(`[data-id="${id}"]`))

                this.selection.selectGroupOfFields($cells)

            } else {
                this.selectCell($target)
            }
        }
    }

    onKeydown(e) {
        const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']

        const { key } = e

        if (keys.includes(key) && !e.shiftKey){
            e.preventDefault()
            const id =  this.selection.current.getId(true)
            const $next = $(this.$root).findOneBySelector(nextSelector(key, id))
            this.selectCell($next)
        }
    }

    selectCell($cell) {
        this.selection.selectOneField($cell)
        this.$emit('table:select', $cell)
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        this.$dispatch(actions.changeStyles(styles))
    }
    
    onInput(e) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.getId(),
            text: $(e.target).text() 
        }))
    }
}