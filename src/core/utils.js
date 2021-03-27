export function capitalize(str) {   
    if (typeof str !== 'string') {
        return ''
    }
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function range(start, end) {
    if (start > end) {
        [end, start] = [start, end]
    }
    const res = []
    for (let i = start; i <= end; i++) res.push(i)
    return res
}

export function nextSelector(key, { col, row }) {
    const MAX_COL_NUM = 25
    const MAX_ROW_NUM = 300

    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            row < MAX_ROW_NUM ? row++: null
            break
        case 'Tab':
        case 'ArrowRight':
            col < MAX_COL_NUM ? col++ : null
            break
        case 'ArrowLeft':
            col > 0 ? col-- : null
            break
        case 'ArrowUp': 
            row > 0 ? row-- : null
            break
    }

    return `[data-id="${row}:${col}"]`
}

export function storage(key, data) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key))
    }
    localStorage.setItem(key, JSON.stringify(data))
}


export function isEqual(prev, curr) {
    if (typeof prev === 'object' && typeof curr === 'object') {
        return JSON.stringify(prev) === JSON.stringify(curr)
    }
    return prev === curr
}


export function camelToDashCase(str) {
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function debounce(fn, wait) {
    let timeout
    return function(...args) {
        const later = () => {
            clearTimeout(timeout)
            // eslint-disable-next-line
            fn.apply(this, args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}