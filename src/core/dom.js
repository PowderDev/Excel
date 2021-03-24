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