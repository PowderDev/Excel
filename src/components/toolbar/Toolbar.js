/* eslint-disable space-before-blocks */
import { createToolbar } from "./Toolbar.template";
import { $ } from '@core/dom'
import { ExcelStateComponent } from "@core/ExcelStateComponent";
import { defaultStyles } from "@/constans";

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar'
    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options
        })
    }

    onClick(e) {
        if (!e.target.closest('#tool-button')) return

        const $target = $(e.target).closest('#tool-button');
        const value = JSON.parse($target.dataset.value)
        const key = Object.keys(value)[0]

        this.$emit('toolbar:applyStyle', value)

        this.setState({[key]: value[key]})
        
    }

    prepare() {
        this.initState(defaultStyles)
    }

    get template() {
        return createToolbar(this.state)
    }

    storeChanged(changes) {
        console.log('changes', changes);
        this.setState(changes.currentStyles)
    }
        
    toHtml() {
        return this.template
    }
}
