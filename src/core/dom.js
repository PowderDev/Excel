/* eslint-disable space-before-blocks */
class Dom {
    constructor(selector) {
        if (typeof selector === 'string') {
            this.$el = document.querySelector(selector)
        } else {
            this.$el = selector
        }
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHtml.trim()
    }

    text(text) {
        if (typeof text !== 'undefined') {
            this.$el.textContent = text
            return this
        }
        if (this.$el.tagName.toLowerCase() === 'input'){
            return this.$el.value.trim()
        }
        return this.$el.textContent.trim()
    }

    focus() {
        this.$el.focus()
        return this
    }

    clear() {
        this.html('')
        return this
    }

    on(eType, callback) {
        this.$el.addEventListener(eType, callback)
    }

    off(eType, callback) {
        this.$el.removeEventListener(eType, callback)
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    get dataset() {
        return this.$el.dataset
    }

    css(styles = {}) {
        Object.keys(styles).forEach(key => {
            this.$el.style[key] = styles[key]
        })
    }

    append(node) {
        if (Element.prototype.append) {
            this.$el.append(node?.$el)
        } else {
            this.$el.appendChild(node.$el)
        }

        return this  
    }

    findOneBySelector(selector) {
        return $(this.$el.querySelector(selector))
    }

    addClass(className) {
        this.$el.classList.add(className)
        return this
    }

    removeClass(className) {
        this.$el.classList.remove(className)
        return this
    }

    getId(parse) {
        if (parse) {
            const parsed = this.getId().split(':')
            
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.$el.dataset.id
    }

    getStyles(styles = []) {
        return styles.reduce((acc, s) =>{
            acc[s] = this.$el.style[s]
            return acc
        }, {})
    }

    attr(name, value) {
        if (value !== undefined) {
            this.$el.setAttribute(name, value)
            return this
        }

        return this.$el.getAttribute(name)
    }

    clearHtml() {
        this.html('')
        return this
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    const $el = document.createElement(tagName)
    if (classes) {
        $el.classList.add(classes)
    }
    return $($el)
}