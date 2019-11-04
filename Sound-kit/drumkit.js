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

const channel1 = [] // declaring an empty array
const channel2 = [] 
const channel3 = [] 
const channel4 = [] 

let activeChannel = -1;

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

    if(activeChannel === -1)
    return

    if(activeChannel === 0) {
    const time = Date.now() - channel1Start;
    const sound = {
        sound: e.code,
        time: time
        }
        channel1.push(sound) // add element at the end of the array
    }
    if(activeChannel === 1) {
        const time = Date.now() - channel2Start;
        const sound = {
            sound: e.code,
            time: time
        }
        channel2.push(sound) 
    }
    if(activeChannel === 2) {
        const time = Date.now() - channel3Start;
        const sound = {
            sound: e.code,
            time: time
        }
        channel3.push(sound) 
    }
    if(activeChannel === 3) {
        const time = Date.now() - channel4Start;
        const sound = {
            sound: e.code,
            time: time
        }
        channel4.push(sound) 
    }
}

function DisableRec(){
    activeChannel = -1
}

// channel 1
function playChannel1() { // Start playing Channel 1
    DisableRec()
    channel1.forEach((el) => {
        setTimeout(() => { // run function after time
            playSound(sounds[el.sound])
        }, el.time);
    })
}

// channel 2
function playChannel2() { // Start playing Channel 2
    DisableRec()
    channel2.forEach((el) => {
        setTimeout(() => { // run function after time
            playSound(sounds[el.sound])
        }, el.time);
    })
}

// channel 3
function playChannel3() { // Start playing Channel 3
    DisableRec()
    channel3.forEach((el) => {
        setTimeout(() => { // run function after time
            playSound(sounds[el.sound])
        }, el.time);
    })
}

// channel 4
function playChannel4() { // Start playing Channel 4
    DisableRec();
    channel4.forEach((el) => {
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