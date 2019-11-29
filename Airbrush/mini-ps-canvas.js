// TODO: KISS - Keep it simple stupid 
document.addEventListener('DOMContentLoaded', appStart)

let ctx 
let ps

function appStart() {

    ps = new Photoshop('canvas')

    canvas = document.querySelector('#canvas')

    document.querySelector('#btnReload').addEventListener('click', () => reload())
 
    document.querySelector('#btnDimmed').addEventListener('click', () => dimmedFilter())
    document.querySelector('#btnLighten').addEventListener('click', () => lightenFilter())
    document.querySelector('#btnContrast').addEventListener('click', () => contrastFilter())
    document.querySelector('#btnBlur').addEventListener('click', () => blurFilter())
    document.querySelector('#btnBlack').addEventListener('click', () => blackFilter())
    document.querySelector('#btnSaturation').addEventListener('click', () => saturationFilter())
    document.querySelector('#btnInvert').addEventListener('click', () => invertFilter())
    document.querySelector('#btnSepia').addEventListener('click', () => sepiaFilter())
    document.querySelector('#btnOpacity').addEventListener('click', () => opacityFilter())
    document.querySelector('#btnClear').addEventListener('click', () => clear())
    document.querySelector('#btnRed').addEventListener('click', () => redFilter())
    document.querySelector('#btnGreen').addEventListener('click', () => greenFilter())
    document.querySelector('#btnBlue').addEventListener('click', () => blueFilter())

    document.querySelector('#btnSquare').addEventListener('click', () => squareShape())
    document.querySelector('#btnCircle').addEventListener('click', () => circleShape())
    document.querySelector('#rangeSlider').addEventListener('mousemove', () => sizeChange())
    document.querySelector('#color').addEventListener('change', () => colorChange())

    ctx = canvas.getContext('2d')
    const scrImage = new Image() 
    scrImage.src='bb8.jpg' 
    scrImage.addEventListener('load', () => {
        drawImage(scrImage, 0, 0)
    })
}

function drawImage(img, x, y) {
    ctx.drawImage(img, x, y)
}

function reload(){
    window.location.reload()
    alert('Do you want refresh the page?')
}

document.querySelector('#file').addEventListener('change', function (e) { 
    const photo = new Image()
    photo.src = URL.createObjectURL(e.target.files[0]) 
    photo.addEventListener('load', () => {
        canvas.width = photo.width 
        canvas.height = photo.height
        drawImage(photo, 0, 0)
    })
})

function dimmedFilter(amount = 30) {
    const canvasData = ctx.getImageData(0,0,canvas.width,canvas.height) 
    for (let i=0; i < canvasData.data.length; i += 4){
        canvasData.data[i] -= amount // R
        canvasData.data[i+1] -= amount // G
        canvasData.data[i+2] -= amount // B
}
    ctx.putImageData(canvasData, 0, 0)
}

function lightenFilter() {
    const canvasData = ctx.getImageData(0,0,canvas.width,canvas.height)
    for (let i=0; i < canvasData.data.length; i += 4){

        const R = canvasData.data[i], G = canvasData.data[i+1], B = canvasData.data[i+2]
        const light = (Math.max(R,G,B) + Math.min(R,G,B))/2

        canvasData.data[i] += light
        canvasData.data[i+1] += light
        canvasData.data[i+2] += light
    }
    ctx.putImageData(canvasData, 0, 0)
}

function contrastFilter() {
    const canvasData = ctx.getImageData(0,0,canvas.width,canvas.height)
        for (let i=0; i < canvasData.data.length; i += 4){
        R = canvasData.data[i], G = canvasData.data[i+1], B = canvasData.data[i+2] // colors
        const contrast = 25
        const faktor =  259*(contrast+255)/(255*(259-contrast))
        canvasData.data[i] = faktor*(canvasData.data[i]-128)+128
        canvasData.data[i+1] = faktor*(canvasData.data[i+1]-128)+128
        canvasData.data[i+2] = faktor*(canvasData.data[i+2]-128)+128
    }
    ctx.putImageData(canvasData, 0, 0)
}

function blurFilter() {
    const canvasData = ctx.getImageData(0,0,canvas.width,canvas.height)
    for( let i = 0; i < canvasData.data.length; i+=5) {        
    canvasData.data[i] = (canvasData.data[i] + canvasData.data[i+4])/2
    canvasData.data[i+1] = (canvasData.data[i+1] + canvasData.data[i+5])/2
    canvasData.data[i+2] = (canvasData.data[i+2] + canvasData.data[i+6])/2
    }
    ctx.putImageData(canvasData, 0, 0)
    console.log(canvasData.data)
}

function blackFilter() {
    const canvasData = ctx.getImageData(0,0,canvas.width,canvas.height)
    for( let i = 0; i < canvasData.data.length; i+=4) { 
        R = canvasData.data[i], G = canvasData.data[i+1], B = canvasData.data[i+2]
        const black = 0.22*R + 0.66*G + 0.05*B
        canvasData.data[i] = canvasData.data[i+1] = canvasData.data[i+2] = black
    }
ctx.putImageData(canvasData, 0, 0)
}

function saturationFilter(){
    const canvasData = ctx.getImageData(0,0,canvas.width,canvas.height)
    for( let i = 0; i < canvasData.data.length; i+=4) { 
        R = canvasData.data[i], G = canvasData.data[i+1], B = canvasData.data[i+2]
        black = 0.22*R + 0.66*G + 0.05*B
        canvasData.data[i] = -black  + canvasData.data[i]*2
        canvasData.data[i+1] = -black  + canvasData.data[i+1]*2
        canvasData.data[i+2] = -black + canvasData.data[i+2]*2

        if((canvasData.data[i] > 255) || (canvasData.data[i+1] > 255 || canvasData.data[i+2] > 255)) canvasData.data[i] = 255
        if((canvasData.data[i] < 0) || canvasData.data[i+1] < 0 || canvasData.data[i+2] < 0) canvasData.data[i] = 0
    }
ctx.putImageData(canvasData, 0, 0)
}

function invertFilter(){
    const canvasData = ctx.getImageData(0,0,canvas.width,canvas.height)
    for( let i = 0; i < canvasData.data.length; i+=4) { 
        R = canvasData.data[i]
        G = canvasData.data[i+1]
        B = canvasData.data[i+2]

        canvasData.data[i] = 255 - R 
        canvasData.data[i+1] = 255 - G
        canvasData.data[i+2] = 255 - B
    }
ctx.putImageData(canvasData, 0, 0)
}

function sepiaFilter(){
    const canvasData = ctx.getImageData(0,0,canvas.width,canvas.height)
    for( let i = 0; i < canvasData.data.length; i+=4) { 
        R = canvasData.data[i]
        G = canvasData.data[i+1]
        B = canvasData.data[i+2]
    
        const sepiaR = 0.393*R + 0.769*G + 0.189*B
        const sepiaG = 0.349*R + 0.686*G + 0.168*B
        const sepiaB = 0.272*R + 0.534*G + 0.131*B
        
        canvasData.data[i] += sepiaR
        canvasData.data[i+1] += sepiaG
        canvasData.data[i+2] += sepiaB 
        
    }
ctx.putImageData(canvasData, 0, 0)
}

function redFilter(){
    const canvasData = ctx.getImageData(0,0,canvas.width,canvas.height)
    for( let i = 0; i < canvasData.data.length; i+=4) { 
        canvasData.data[i] = 255
}
ctx.putImageData(canvasData, 0, 0)
}

function greenFilter(){
    const canvasData = ctx.getImageData(0,0,canvas.width,canvas.height)
    for( let i = 0; i < canvasData.data.length; i+=4) { 
        canvasData.data[i+1] = 255
}
ctx.putImageData(canvasData, 0, 0)
}

function blueFilter(){
    const canvasData = ctx.getImageData(0,0,canvas.width,canvas.height)
    for( let i = 0; i < canvasData.data.length; i+=4) { 
        canvasData.data[i+2] = 255
}
ctx.putImageData(canvasData, 0, 0)
}

function opacityFilter(amount = 15){
    const canvasData = ctx.getImageData(0,0,canvas.width,canvas.height)
    for( let i = 0; i < canvasData.data.length; i+=4) { 
        canvasData.data[i+3] -= amount
}
ctx.putImageData(canvasData, 0, 0)
}

function clear(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
}

function colorChange(){
    colorPicker.style.backgroundColor=color.value
    ctx.strokeStyle = color.value
}

function sizeChange(){
    ctx.lineWidth = rangeSlider.value
}

function squareShape(){
    ctx.lineCap = 'square'
}

function circleShape(){
    ctx.lineCap = 'round'
}
