document.body.addEventListener('keypress', onKeyPress)
document.querySelector('#channel1Rec').addEventListener('click', btnChannel1Click)
document.querySelector('#channel1Play').addEventListener('click', playChannel1)
document.querySelector('#channel2Rec').addEventListener('click', btnChannel2Click)
document.querySelector('#channel2Play').addEventListener('click', playChannel2)
document.querySelector('#channel3Rec').addEventListener('click', btnChannel3Click)
document.querySelector('#channel3Play').addEventListener('click', playChannel3)
document.querySelector('#channel4Rec').addEventListener('click', btnChannel4Click)
document.querySelector('#channel4Play').addEventListener('click', playChannel4)
document.querySelector('#channel5Rec').addEventListener('click', btnChannel5Click)
document.querySelector('#channel5Play').addEventListener('click', playChannel5)

let channel1Start // declaring a variable
let channel2Start
let channel3Start
let channel4Start

const channels = [[ ],[ ],[ ],[ ]] // declaring an empty array

let activeChannel = null

const sounds = {
    KeyQ: '#boom',
    KeyW: '#clap',
    KeyE: '#hithat',
    KeyR: '#kick',
    KeyT: '#openhat',
    KeyY: '#ride',
    KeyU: '#snare',
    KeyI: '#tink',
    KeyA: '#amajor',
    KeyS: '#c',
    KeyD: '#cut',
    KeyF: '#ddur',
    KeyG: '#electric',
    KeyH: '#fmajor',
    KeyJ: '#pluck',
    KeyK: '#road',
    KeyZ: '#a3',
    KeyX: '#a5',
    KeyC: '#c3',
    KeyV: '#c6',
    KeyB: '#f3',
    KeyO: '#amol3',
    KeyP: '#cc',
    KeyL: '#d6',
    KeyM: '#menegass',
    KeyN: '#mf'
}

function onKeyPress(e) { // find sound after click
    playSound(sounds[e.code]);

    if(activeChannel === null) {
        return
    }

    if(activeChannel === 0) {
    const time = Date.now() - channel1Start;
    const sound = {
        sound: e.code,
        time: time
        }
        channels[0].push(sound) // add element at the end of the array
    }
    if(activeChannel === 1) {
        const time = Date.now() - channel2Start;
        const sound = {
            sound: e.code,
            time: time
        }
        channels[1].push(sound) 
    }
    if(activeChannel === 2) {
        const time = Date.now() - channel3Start;
        const sound = {
            sound: e.code,
            time: time
        }
        channels[2].push(sound) 
    }
    if(activeChannel === 3) {
        const time = Date.now() - channel4Start;
        const sound = {
            sound: e.code,
            time: time
        }
        channels[3].push(sound) 
    }
}

function DisableRec(){
    activeChannel = null
}

function playChannel1() { // Start playing Channel 1
    DisableRec()
    channels[0].forEach((el) => {
        setTimeout(() => { // run function after time
            playSound(sounds[el.sound])
        }, el.time);
    })
}

function playChannel2() { // Start playing Channel 2
    DisableRec()
    channels[1].forEach((el) => {
        setTimeout(() => { // run function after time
            playSound(sounds[el.sound])
        }, el.time);
    })
}

function playChannel3() { // Start playing Channel 3
    DisableRec()
    channels[2].forEach((el) => {
        setTimeout(() => { // run function after time
            playSound(sounds[el.sound])
        }, el.time);
    })
}

function playChannel4() { // Start playing Channel 4
    DisableRec();
    channels[3].forEach((el) => {
        setTimeout(() => { // run function after time
            playSound(sounds[el.sound])
        }, el.time);
    })
}

function playSound(id) {
    const audioTag = document.querySelector(id)
    audioTag.currentTime = 0 // current time of audio
    audioTag.play() // start playing 
}

function btnChannel1Click() { // Start recording Channel 1
    channel1Start = Date.now() // the time which passed
    activeChannel = 0
}

function btnChannel2Click() { // Start recording Channel 2
    channel2Start = Date.now() 
    activeChannel = 1
}

function btnChannel3Click() { // Start recording Channel 3
    channel3Start = Date.now()
    activeChannel = 2
}

function btnChannel4Click() { // Start recording Channel 4
    channel4Start = Date.now() 
    activeChannel = 3
}

function btnChannel5Click(){ // Recording all channels
    btnChannel1Click()
    btnChannel2Click()
    btnChannel3Click()
    btnChannel5Click()
}

function playChannel5(){ // Playing all channels
    playChannel1()
    playChannel2()
    playChannel3()
    playChannel4()
}