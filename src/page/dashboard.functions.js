import { storage } from '@core/utils'

function createHtml(key) {
    const data = storage(key)
    const id = key.split(':')[1]
    return `
        <li class="record">
            <a href="#excel/${id}">${data.appTitle}</a>
            <strong>${data.openedDate.substr(0, 10)}</strong>
        <li />
    `
}

function getAllKeys() {
    const keys = []

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.includes('excel:')) continue

        keys.push(key)
    }
    return keys
}

export function createRecordsTable() {
    const keys = getAllKeys()

    if (!keys.length) {
        return '<p>Вы пока не создали не одной таблицы</p>'
    }

    return `
        <div class="list-header">
            <span>Название</span>
            <span>Дата открытия</span>
        </div>
        <ul class="list">
            ${keys.map(createHtml).join('')}
        </ul>
    `
}

