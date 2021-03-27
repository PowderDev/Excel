export function parse(value = '') {
    if (value.startsWith('=')) {
        if (value.length === 2) return value
        try {
            return eval(value.slice(1))
        } catch (e) {
            return value
        }
    }
    return value
}