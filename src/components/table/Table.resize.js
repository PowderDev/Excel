/* eslint-disable space-before-blocks */
/* eslint-disable max-len */
export default function resizeHandler(resizeType, $root, event, resizer ) {
    return new Promise(resolve =>{
        const $resizer = resizer;
        const $parent = $resizer.closest('[data-type="resizable"]')
        const coords = $parent.getCoords();
        const cols = $root.querySelectorAll(`[data-col="${$parent.dataset.col}"]`)
        let delta;
        let value;

        $resizer.css({
            opacity: 1,
            bottom: '-2000px'
        })

        document.onmousemove = e => {
            if (resizeType == 'row') {
                delta =  e.pageY - coords.bottom
                value = ( coords.height + delta ) + 'px'
                $resizer.css({ bottom: -delta + 'px', right: '-2000px' })
            } else {
                delta =  e.pageX - coords.right
                value = ( coords.width + delta ) + 'px'
                $resizer.css({ right: -delta + 'px' })
            }
        }

        document.onmouseup = () => {

            if (resizeType == 'col'){
                $parent.css({width: value})
                cols.forEach(el => el.style.width = value )
            } else {
                $parent.css({height: value})
            }

            resolve({
                value,
                resizeType,
                id: resizeType === 'col' ? $parent.dataset.col : $parent.dataset.row 
            })
            $resizer.css({
                opacity: 0,
                bottom: 0,
                right: 0
            })
            document.onmouseup = null
            document.onmousemove = null
        }
    })
}