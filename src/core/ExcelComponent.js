import { DomListener } from "@core/DomListener";

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options)
        this.emitter = options.emitter
        this.unsubs = []
        this.store = options.store
        this.subscribe = options.subscribe || []
        // this.storeSub =  null
        this.prepare()
    }

    prepare() {}

    $emit(eventName, ...args) {
        this.emitter.emit(eventName, ...args)
    }

    $on(eventName, fn) {
        const unsub = this.emitter.subscribe(eventName, fn)
        this.unsubs.push(unsub)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    } 

    storeChanged() {}

    // $subscribe(fn) {
    //     this.storeSub = this.store.subscribe(fn)
    // }

    isWatching(key) {
        return this.subscribe.includes(key)
    }

    toHtml() {
        return ''
    }

    init() {
        this.initDomListeners()
    }

    destroy() {
        this.removeDomListeners()
        this.unsubs.forEach(unsub => unsub())
        // this.storeSub.unsub()
    }
}
