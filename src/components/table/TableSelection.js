export class TableSelection {
    static selectClass = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }

    selectOneField($el) {
        this.clear()
        this.group.push($el)
        $el.addClass(TableSelection.selectClass)
        this.current = $el
        $el.$el.focus()
    }

    clear() {
        this.group.forEach(el => el.removeClass(TableSelection.selectClass))
        this.group = []
    }

    selectGroupOfFields($group = []) {
        this.clear()
        this.group = $group
        this.group.forEach(el => el.addClass(TableSelection.selectClass))
    }
}