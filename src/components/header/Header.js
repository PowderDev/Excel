/* eslint-disable no-empty */
import { ExcelComponent } from "@core/ExcelComponent";
import { changeTitles } from "../../redux/actions";
import { debounce } from "../../core/utils";
import { ActiveRoute } from "../../core/routing/ActiveRoute";
import { $ } from '@core/dom'

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        })
    }

    prepate() {
        this.onInput = debounce(this.onInput, 300)
    }
        
    toHtml() {
        const title = this.store.getState().appTitle || 'Новая таблица'
        return `
        <input type="text" class="title-input" value="${title}" >
                <div class="btns">
                    <div class="button" data-type="exit" >
                        <span class="material-icons">exit_to_app</span>
                    </div>
                    <div class="button2" data-type="delete" >
                        <span class="material-icons">delete_forever</span>
                    </div>
                </div>
        `
    }

    onInput(e) {
        this.$dispatch(changeTitles(e.target.value))
    }

    onClick(e) {
        const $target = $(e.target).closest('[data-type]')
        if ($target.dataset.type === 'delete') {
            const decision = confirm('Are you sure you want to delete')
            if (decision) {
                localStorage.removeItem('excel:' + ActiveRoute.params[1])
                ActiveRoute.navigate('')
            }
        } else if ($target.dataset.type === 'exit') {
            ActiveRoute.navigate('')
        }
    }
}