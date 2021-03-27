import { Excel } from './components/excel/Excel'
import './styles/index.scss'
import { Header } from '@/components/header/Header'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Formula } from '@/components/formula/Formula'
import { Table } from '@/components/table/Table'
import { createStore } from '@core/createStore'
import { rootReducer } from '@/redux/rootReducer'
import { storage } from '@core/utils'
import { defaultStyles } from './constans'
import { debounce } from './core/utils'

const defaultState =  {
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: "",
    appTitle: "Новая таблица",
    currentStyles: defaultStyles,
}

const store = createStore(rootReducer, storage('excel-state') || defaultState)

const stateListener = debounce(state => {
    storage('excel-state', state)
}, 300)

store.subscribe(stateListener)

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
})

excel.render()