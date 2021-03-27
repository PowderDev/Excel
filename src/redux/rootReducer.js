/* eslint-disable max-len */
import * as types from "./actionTypes"

/* eslint-disable no-case-declarations */
export function rootReducer(state, action) {
    let field
    let prevState

    switch (action.type) {
        case types.TABLE_RESIZE: 
            field = action.payload.resizeType == 'col' ? 'colState' : 'rowState'
            prevState = state.[field] || {}
            prevState[action.payload.id] = action.payload.value
            return {...state, [field]: prevState}

        case types.CHANGE_TEXT:
            const payload = action.payload
            prevState = state['dataState'] || {}
            prevState[payload.id] = payload.text
            return {...state, currentText: payload.text, dataState: prevState}    

        case types.APPLY_STYLE:
            const stylesObj = state['stylesState'] || {}
            action.payload.ids.forEach(id => {
                if (stylesObj[id]) {
                    stylesObj[id] = {...stylesObj[id], ...action.payload.style}
                } else {
                    stylesObj[id] = action.payload.style
                }
            })
            return {...state, stylesState: stylesObj}

        case types.CHANGE_STYLES:
            return {...state, currentStyles: action.payload}

        case types.CHANGE_TITLE:
            return {...state, appTitle: action.payload}

        case types.CHANGE_OPENED_TIME:
            return {...state, openedDate: new Date().toJSON()}

        default: return state
    }
}