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

