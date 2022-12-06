const toggle = document.getElementById('toggle')
const sidebar = document.getElementById('header')


document.onclick = function(e){
    if(e.target.id !== 'sidebar' && e.target.id !== 'toggle'){
        toggle.classList.remove('active')
        sidebar.classList.remove('active')
    }
}


toggle.onclick = function(){
    toggle.classList.toggle('active')
    sidebar.classList.toggle('active')

}

// making a game 

let x = 0
let y = 0
let mole = null

const moleWidth = 150
const moleHeight = 150

let score = 0
let maxPossibleScore = -1

let time = 60 // seconds
let moleRotationInterval = 2 // seconds
let moleRotationIntervalId = null
let moleRotationIntervalIncTime = 10 // seconds
const moleRotationIntervalIncFactor = 0.75

let timeIntervalId = null


const speedUp = () => {
    if(time % moleRotationIntervalIncTime !== 0) return
    moleRotationInterval = moleRotationInterval * moleRotationIntervalIncFactor
    startMoleRotationInterval()

}

const decTime = () => {
    time -= 1
    if(time === 0) endGame()
    speedUp()
    displayTime()
}

const displayTime = () => {
    const timer = document.getElementById('main-info')

    timer.querySelector('h1').innerText ='Pozostały czas: ' + time + ' s'

}

const incMaxPossibleScore = () => {
    maxPossibleScore += 1
    displayScore()
}
const incScore = () => {
    score += 1
    displayScore()
}

const displayScore = () => {

    const info = document.getElementById('main-info')
    info.querySelector('h2').innerText = `Punkty: ${score} / ${maxPossibleScore}`
    
}

const randomizeNumber = (min,max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomizeMolePosition = () => {

    const xMax = document.getElementById('screen').clientWidth - moleWidth
    const yMax = document.getElementById('screen').clientHeight - moleHeight

    const xMin = (window.innerWidth - document.getElementById('screen').clientWidth) / 2
    const yMin = (window.innerHeight - document.getElementById('screen').clientHeight) / 2

    x = randomizeNumber(xMin, xMax)
    y = randomizeNumber(yMin, yMax)

}

const removeMole = () => {
    if(mole === null) return
    mole.remove()
}

const makeMole = () => {
    removeMole()
    incMaxPossibleScore()
    const div = document.createElement('div')

    div.style.width = moleWidth + 'px'
    div.style.height = moleHeight + 'px'
    div.style.position = 'fixed'
    div.style.left = x + 'px'
    div.style.top = y + 'px'
    div.style.backgroundImage = 'url("./santa.svg")'
    div.style.backgroundSize = 'cover'
    div.style.cursor = 'pointer'


    div.addEventListener(
        'click',
        clickOnMole
    )

    document.getElementById('screen').appendChild(div)

    mole = div
}

const makeNewMole = () => {
    randomizeMolePosition()
    makeMole()
    
}

const clickOnMole = () => {
    startMoleRotationInterval()
    incScore()
    makeNewMole()

}

const endGame = () => {
    alert(`Your score is: ${score} out of ${maxPossibleScore}`)
    resetGame()
}

const resetGame = () => {
    window.location = ''
}

const startTimeInterval = () => {
    timeIntervalId = setInterval(decTime, 1000)
}

const startMoleRotationInterval = () => {
    stopMoleRotationInterval()
    moleRotationIntervalId = setInterval(
        makeNewMole,
        moleRotationInterval * 1000
    )
}

const stopMoleRotationInterval = () => {
    if(moleRotationIntervalId === null ) return
    clearInterval(moleRotationIntervalId)

}


const init = () => {
    makeNewMole()
    displayScore()
    displayTime()
    startTimeInterval()
    startMoleRotationInterval()
}

init()

