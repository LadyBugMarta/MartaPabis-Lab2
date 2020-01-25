let canvas = document.querySelector('#canvas')
let ctx = canvas.getContext('2d')
let timeStart = Date.now()
let playGame = true
let balls = []

class Ball {
    constructor(x, y, color, id){
        this.x = x
        this.y = y
        this.color = color
        this.id = id
    }
    drawBall(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, 20, 0, 2*Math.PI)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
    }
}

// black holes
for (let i = 0; i < 7; i++) {
     let randomX = Math.floor(Math.random()*950 + 20)
     let randomY = Math.floor(Math.random()*550 + 20)
     let holes = new Ball(randomX, randomY, 'black', i)
     holes.drawBall()
     balls.push(holes)
}
function draw(){
    for (let i = 0; i < balls.length; i++) {
        balls[i].drawBall()
    }
}

// win ball
let winBall = new Ball(500, 300, 'white', 'winBall')
winBall.drawBall()
balls.push(winBall)

// main ball which is able to moving by sensors
let mainBall = new Ball(0, 0, 'teal', 'mainBall')
mainBall.drawBall()
balls.push(mainBall)

// move the ball by sensors
window.addEventListener('deviceorientation', this.handleOrientation)
function handleOrientation(e){
    let x = e.alpha*8 
    let y = e.beta*8 
    if(playGame){
        mainBall.x = x
        mainBall.y = y
        ctx.clearRect(0, 0, canvas.width, canvas.height) // clear a tail
    }
    draw()

    // collision detection between main ball and holes
        for (let j = 0; j < balls.length; j++) {
            let xDistance = balls[j].x - mainBall.x
            let yDistance = balls[j].y - mainBall.y
            let middle = Math.sqrt((xDistance)**2 + (yDistance)**2)

            if(middle > 0 && middle < 40 && balls[j].id !== 'winBall'){

                ctx.font = '40px Verdana'
                ctx.fillStyle = 'teal'
                ctx.fillText('Try one more time', 320, 50)
                playGame = false

                // reload after 1 sec
                window.setTimeout(function(){
                    location.reload()
                }, 1000)
        }
    }

    // collision detection between main ball and win ball
    let xDistance = winBall.x - mainBall.x
    let yDistance = winBall.y - mainBall.y
    let middle = Math.sqrt((xDistance)**2 + (yDistance)**2)

    if(middle > 0 && middle < 40 && playGame){
        let timeStop = Date.now()
        let timer = 'Your time is ' + ((timeStop - timeStart) / 1000).toFixed(2) + ' sec'

        // show text after win
        ctx.font = '40px Verdana'
        ctx.fillStyle = 'teal'
        ctx.fillText('Congratulations!' , 320, 50)
        ctx.fillText(timer, 280, 100)
        playGame = false

        // reload after 1 sec
        window.setTimeout(function(){
            location.reload()
        }, 1000)
    }
}