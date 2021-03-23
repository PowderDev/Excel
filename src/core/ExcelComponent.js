import { DomListener } from "@core/DomListener";

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options)
    }

    toHtml() {
        return ''
    }

    init() {
        this.initDomListeners()
    }

    destroy() {
        this.removeEventListener()
    }
}
