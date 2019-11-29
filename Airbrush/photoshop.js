class Photoshop {
    constructor(elementId) {
        this.canvas = document.querySelector('#' + elementId)
        let ctx = canvas.getContext('2d')
        let mouseDown = false

        this.canvas.onmousedown = function(e){
            const x = e.clientX - canvas.offsetLeft
            const y = e.clientY - canvas.offsetTop
            mouseDown = true
            ctx.moveTo(x,y)
        }
        this.canvas.onmousemove = function(e){
            if(mouseDown){
                const x = e.clientX - canvas.offsetLeft
                const y = e.clientY - canvas.offsetTop
                ctx.lineTo(x,y)
                ctx.stroke()
            }
        }
        canvas.onmouseup = function(e){
            mouseDown = false
        }
    }
}

