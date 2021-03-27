import * as types from './actionTypes'

export function tableResize(data) {
    return {
        type: types.TABLE_RESIZE,
        payload: data
    }
}

export function changeText(data) {
    return {
        type: types.CHANGE_TEXT,
        payload: data
    }
}

export function changeStyles(data) {
    return {
        type: types.CHANGE_STYLES,
        payload: data
    }
}

export function applyStyle(data) {
    return {
        type: types.APPLY_STYLE,
        payload: data
    }
}

export function changeTitles(data) {
    return {
        type: types.CHANGE_TITLE,
        payload: data
    }
}