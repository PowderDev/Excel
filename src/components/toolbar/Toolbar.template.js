/* eslint-disable max-len */
/* eslint-disable no-unreachable */
function createButton(btn) {
    return `
        <div id="tool-button" data-value=${JSON.stringify(btn.value)} class="button ${btn.active ? 'active' : ''}">
            <span class="material-icons">${btn.icon}</span>
        </div>
    `
}

export function createToolbar(state) {
    const btns = [
        {
            icon: 'format_align_left',
            active: state['textAlign'] === 'left',
            value: {fontWeight: 'left'}
        },
        {
            icon: 'format_align_center',
            active: state['textAlign'] === 'center',
            value: {textAlign: state['textAlign'] !== 'center' ? 'center' : 'left'}
        },
        {
            icon: 'format_align_right',
            active: state['textAlign'] === 'right',
            value: {textAlign: state['textAlign'] !== 'right' ? 'right' : 'left'}
        },
        {
            icon: 'format_bold',
            active: state['fontWeight'] === 'bold',
            value: {fontWeight: state['fontWeight'] !== 'bold' ? 'bold' : 'normal'}
        },
        {
            icon: 'format_italic',
            active: state['fontStyle'] === 'italic',
            value: {fontStyle: state['fontStyle'] !== 'italic' ? 'italic' : 'normal'}
        },
        {
            icon: 'format_underlined',
            active: state['textDecoration'] === 'underline',
            value: {textDecoration: state['textDecoration'] !== 'underline' ? 'underline' : 'none'}
        },
    ]

    return btns.map(createButton).join('')
}