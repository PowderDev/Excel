/* eslint-disable max-len */
import { Page } from "@core/routing/Page";
import { Excel } from '@/components/excel/Excel'
import { Header } from '@/components/header/Header'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Formula } from '@/components/formula/Formula'
import { Table } from '@/components/table/Table'
import { createStore } from '@core/createStore'
import { rootReducer } from '@/redux/rootReducer'
import { storage, debounce, getDefaultState } from '@core/utils'


class StateProcessor {
    constructor(client, delay=300) {
        this.client = client
        this.listen = debounce(this.listen.bind(this), delay)
    }

    listen(state) {
        this.client.save(state)
    }

    get() {
        return this.client.get()
    }
}

class LocalStateClient {
    constructor(param) {
        this.param = `excel:${this.param}`
    }

    save(state) {
        storage(this.name, state)
        return Promise.resolve()
    }

    get() {
        // return Promise.resolve(state)
        return new Promise(resolve =>{
            const state = storage(this.name) || getDefaultState()

            setTimeout(() => resolve(state), 1500)
        })
    }
}


export class ExcelPage extends Page {
    constructor(params) {
        super(params)
        this.storeSub = null
        this.params[1] = this.params[1] ? this.params[1] : Date.now().toString()
        this.processor = new StateProcessor(new LocalStateClient(this.params[1]))
    }

    async getRoot() {
        const state = await this.processor.get()
        const store = createStore(rootReducer, state)

        this.storeSub = store.subscribe(this.processor.listen)

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        })

        return this.excel.getRoot()
    }

    afterRender() {
        this.excel.init()
    }

    destroy() {
        this.excel.destroy()
        this.storeSub.unsub()
    }
}