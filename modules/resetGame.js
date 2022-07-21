import {timeBar,scoreDisplay,gameVar} from '../app.js'

export function resetGameVar(currentCount, currentScore) {
    gameVar.numCount = currentCount

    gameVar.listOfNum = []
    gameVar.listOfPositions = []
    gameVar.spacesOnCol = [];
    gameVar.spacesOnRow = [];

    gameVar.choice = NaN
    gameVar.listOfChoices = [-1]
    gameVar.score = currentScore

    timeBar.style.transition = ``
    timeBar.classList.remove('timeBarShrink')

    scoreDisplay.remove()
}