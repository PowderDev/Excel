import { DomListener } from "@core/DomListener";

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options)
        this.emitter = options.emitter
        this.unsubs = []
    }

    $emit(eventName, ...args) {
        this.emitter.emit(eventName, ...args)
    }

    $on(eventName, fn) {
        const unsub = this.emitter.subscribe(eventName, fn)
        this.unsubs.push(unsub)
    }

    toHtml() {
        return ''
    }

    init() {
        this.initDomListeners()
    }

    destroy() {
        this.removeEventListener()
        this.unsubs.forEach(unsub => unsub())
    }
}
