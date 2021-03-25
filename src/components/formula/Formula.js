/* eslint-disable max-len */
import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from '@core/dom'

export class Formula extends ExcelComponent {
    static className = 'excel__formula'
    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        })
    }

    toHtml() {
        return `
            <div class="info">fx</div>
            <div id="formula-input" class="input" contenteditable spellcheck="false" ></div>
        `
    }

    init() {
        super.init()
        this.$formula = $(this.$root).findOneBySelector('#formula-input')
        this.$on('table:select', $cell => {
            this.$formula.text($cell.text())
        })
        
        this.$on('table:input', $cell => {
            this.$formula.text($cell.text())
        })
    }

    onInput(e) {
        const text = $(e.target).text()
        this.$emit('fomula:input', text)
    }

    onKeydown(e) {
        const keys = ['Enter', 'Tab']

        if (keys.includes(e.key)) {
            e.preventDefault()
            this.$emit('fomula:enter', true)
        }
    }

} 