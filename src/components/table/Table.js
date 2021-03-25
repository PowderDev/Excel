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


export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }
        
    toHtml() {
        return createTable()
    }

    init() {
        super.init()
        this.selection = new TableSelection()

        const $cell = $(this.$root).findOneBySelector('[data-id="0:0"]')
        this.selection.selectOneField($cell)
        this.$emit('table:select', $cell)

        this.$on('fomula:input', text => {
            this.selection.current.text(text)
        })

        this.$on('fomula:enter', da => {
            this.selection.current.focus()
        })
    }

    onMousedown(e) {
        const resizeType = e.target.dataset.resize
        if (resizeType) {
            const $resizer = $(e.target);
            const $parent = $resizer.closest('[data-type="resizable"]')
            const coords = $parent.getCoords();
            const cols = this.$root.querySelectorAll(`[data-col="${$parent.dataset.col}"]`)
            let delta;
            let value;

            $resizer.css({
                opacity: 1,
                bottom: '-2000px'
            })

            document.onmousemove = e => {
                if (resizeType == 'row') {
                    delta =  e.pageY - coords.bottom
                    value = ( coords.height + delta ) + 'px'
                    $resizer.css({ bottom: -delta + 'px', right: '-2000px' })
                } else {
                    delta =  e.pageX - coords.right
                    value = ( coords.width + delta ) + 'px'
                    $resizer.css({ right: -delta + 'px' })
                }
            }

            document.onmouseup = () => {

                if (resizeType == 'col'){
                    $parent.css({width: value})
                    cols.forEach(el => el.style.width = value )
                } else {
                    $parent.css({height: value})
                }

                $resizer.css({
                    opacity: 0,
                    bottom: 0,
                    right: 0
                })
                document.onmouseup = null
                document.onmousemove = null
            }
            
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
                this.selection.selectOneField($target)
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
            this.selection.selectOneField($next)
            this.$emit('table:select', $next)
        }
    }
    
    onInput(e) {
        this.$emit('table:input', $(e.target))
    }

}