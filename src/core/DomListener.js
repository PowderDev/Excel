/* eslint-disable max-len */
import { capitalize } from '@core/utils'
import { $ } from '@core/dom'

export class DomListener {
    constructor($root, options = {}) {
        if (!$root) throw new Error("Cannot listen undefinded")
        this.$root = $root;
        this.listeners = options.listeners || [];
        this.name = options.name;
    }

    initDomListeners() {
        this.listeners.forEach(listener => {
            const methodName ='on' + capitalize(listener)
            if (!this[methodName]) {
                throw new Error(`Method: ${methodName} is not implemented in ${this.name} Component`)
            } 
            this[methodName] = this[methodName].bind(this)
           $(this.$root).on(listener, this[methodName])
        })
    }

    
    removeDomListeners() {
        this.listeners.forEach(listener => {
            const methodName ='on' + capitalize(listener)
           $(this.$root).off(listener, this[methodName])
        })
    }
}