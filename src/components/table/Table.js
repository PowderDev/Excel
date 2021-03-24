/* eslint-disable space-before-blocks */
/* eslint-disable max-len */
/* eslint-disable no-invalid-this */
/* eslint-disable prefer-rest-params */
/* eslint-disable brace-style */
import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./Table.template";
import { $ } from '@core/dom'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        })
    }
        
    toHtml() {
        return createTable()
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
            
        }
    }

}