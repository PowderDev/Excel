/* eslint-disable max-len */
import { Page } from "@core/routing/Page";
import { Excel } from '@/components/excel/Excel'
import { Header } from '@/components/header/Header'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Formula } from '@/components/formula/Formula'
import { Table } from '@/components/table/Table'
import { createStore } from '@core/createStore'
import { rootReducer } from '@/redux/rootReducer'
import { storage } from '@core/utils'
import { defaultStyles } from '@/constans'
import { debounce } from '@core/utils'


export class ExcelPage extends Page {
    getRoot() {
        this.params[1] = this.params[1] ? this.params[1] : Date.now().toString()
        const defaultState =  {
            rowState: {},
            colState: {},
            dataState: {},
            stylesState: {},
            currentText: "",
            appTitle: "Новая таблица",
            currentStyles: defaultStyles,
            openedDate: new Date().toJSON()
        }

        const store = createStore(rootReducer, storage(`excel:${this.params[1]}`) || defaultState)

        const stateListener = debounce(state => {
            storage('excel:'+this.params[1], state)
        }, 300)

        store.subscribe(stateListener)

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
    }
}