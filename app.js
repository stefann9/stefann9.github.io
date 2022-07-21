///////////////////////////////////////////////////////////
import { spacesInContainer } from './modules/SpacesInContainer.js'
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
//gen rand num 
import { genRandNum } from './modules/generateRandNums.js'
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
import { maxOfNumsInContainer } from './modules/maxOfNumsInContainer.js';
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
//win
import { containerIsFull } from './modules/winIfcontainerIsFull.js';
///////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////
import { ascNums } from './modules/checkChoise.js';
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
import { removeAfterTransition } from './modules/checkChoise.js';
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// promises
import { hideNumId, timeToChooseId } from './modules/promises.js'
import { timeToChoose } from './modules/promises.js';
import { hideNum } from './modules/promises.js';


// lose
import { endOfGame } from './modules/lose.js';

import { resetGameVar } from './modules/resetGame.js'

export { scoreDisplay, timeBar, container, gameVar, title, startGameBtn, newGame }



const container = document.querySelector('.container');
const startGameBtn = document.querySelector('button');
const timeBar = document.querySelector('.timeBar')

const title = document.querySelector('h1')
const scoreDisplay = document.createElement('p');

const gameVar = {
    // max space occupied by num
    numSize: 38,
    // how many nums to gen
    //   numCounmaxNumCount : maxOfNumsInContainer(gameVar.numSize, container.offsetWidth, container.offsetHeight),
    // spaces available on col
    spacesOnCol: [],
    spacesOnRow: [],
    // list of num in .container
    listOfNum: [],
    // list with position of nums
    listOfPositions: [],

    choice: NaN,
    listOfChoices: [-1],

    score: 0,

    hideNumDelay: 1000,
    timeToChooseDelay: 3000,
}


let maxNumCount = maxOfNumsInContainer(gameVar.numSize, container.offsetWidth, container.offsetHeight)


startGameBtn.addEventListener('click', newGame)
///////////////////////////////////////////////////////////
function newGame() {

    //remove nums after transition
    for (let e of container.children) {
        removeAfterTransition(e)
    }

    gameVar.numCount = 2
    gameVar.score = 0
    gameVar.hideNumDelay = 1000;
    gameVar.timeToChooseDelay = 3000;
    startGame()

    //disabled btn / remove eve after newGame
    startGameBtn.setAttribute('disabled', "");
    startGameBtn.removeEventListener('click', newGame)
}
///////////////////////////////////////////////////////////

function startGame() {

    // del old timeout
    clearTimeout(timeToChooseId)
    clearInterval(hideNumId)

    resetGameVar(gameVar.numCount, gameVar.score);

    // update title
    title.innerHTML = `Lv. ${gameVar.score}`

    //update maxNumCount
    maxNumCount = maxOfNumsInContainer(gameVar.numSize, container.offsetWidth, container.offsetHeight)

    // check if max number of nums
    if (containerIsFull(maxNumCount, gameVar.numCount) === true) {
        endOfGame('You win')
        return 'win'
    }

    // save spaces available on row/col
    gameVar.spacesOnRow = spacesInContainer(gameVar.numSize, gameVar.spacesOnRow, container.offsetWidth)
    gameVar.spacesOnCol = spacesInContainer(gameVar.numSize, gameVar.spacesOnCol, container.offsetHeight)

    // avoid typig nums before hideNum
    container.removeEventListener('mouseup', startChoosing)

    genRandNum(gameVar.numCount, container)

    hideNum(gameVar.hideNumDelay)
        .then(() => {
            // hide nums
            gameVar.listOfNum.forEach(x => { x.classList.add('hideNum') })
            // let player choose
            container.addEventListener('mouseup', startChoosing)
            // set time bar
            timeBar.style.transition = `width ${gameVar.timeToChooseDelay / 1000}s ease-in, background-color ${gameVar.timeToChooseDelay / 1000}s ease-in`
            timeBar.classList.add('timeBarShrink')
            // set time to choose
            return timeToChoose(gameVar.timeToChooseDelay)
        })
        .then(() => {
            // if time to choose = over => game Over
            endOfGame('Game Over')
        })
}
///////////////////////////////////////////////////////////
function startChoosing(e) {

    if (e.target.classList[1] === 'hideNum' && e.target.tagName === 'BUTTON') {

        gameVar.choice = parseInt(e.target.innerText)
        let prevChoice = gameVar.listOfChoices[gameVar.listOfChoices.length - 1]

        if (ascNums(gameVar.choice, prevChoice)) {

            gameVar.listOfChoices.push(gameVar.choice)

            removeAfterTransition(gameVar.listOfNum[gameVar.choice])

            if (gameVar.listOfNum.length === gameVar.listOfChoices.length - 1) {
                //win: 
                gameVar.numCount++
                gameVar.score++
                gameVar.hideNumDelay += 250;
                gameVar.timeToChooseDelay += 500;
                startGame()
            }
        } else {
            // lose:
            // stop timeBar and time to choose
            clearInterval(timeToChooseId)

            endOfGame('Game Over')
        }
    }
}


