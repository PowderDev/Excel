/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
import { Loader } from '../../components/Loader'
import {$} from '../dom'
import { ActiveRoute } from './ActiveRoute'

export class Router {
    constructor(selector, routes) {
        if (!selector) throw new Error('Selector is not provided in Router')
        this.$placeholder = $(selector)
        this.routes = routes
        this.page = null
        this.loader = new Loader()


        this.changePageHadler = this.changePageHadler.bind(this)
        this.init() 
    }


    init() {
        window.addEventListener('hashchange', this.changePageHadler)
        this.changePageHadler()
    }

    async changePageHadler() {
        if (this.page) {
            this.page.destroy()
        }

        this.$placeholder.clearHtml().append(this.loader)

        const Page = ActiveRoute.path.includes('excel')
        ? this.routes.excel
        : this.routes.dashboard

        this.page = new Page(ActiveRoute.params)
        const root = await this.page.getRoot()
        this.$placeholder.clearHtml(this.loader).append(root)

        this.page.afterRender()
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHadler)
    }

}