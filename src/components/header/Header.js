import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from '@core/dom'
import { changeTitles } from "../../redux/actions";
import { debounce } from "../../core/utils";

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
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
                    <div class="button">
                        <span class="material-icons">exit_to_app</span>
                    </div>
                    <div class="button2">
                        <span class="material-icons">delete_forever</span>
                    </div>
                </div>
        `
    }

    onInput(e) {
        this.$dispatch(changeTitles(e.target.value))
    }
}