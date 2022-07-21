import {container,gameVar,title,scoreDisplay,startGameBtn,newGame} from '../app.js'
import { resetGameVar } from './resetGame.js';

export function endOfGame(message) {
    // show nums
    revealNums(container.children)
    // reset game
    resetGameVar(gameVar.numCount, gameVar.score);

    // update title and show gameVar.score
    title.innerHTML = message;
    appendScore(gameVar.score, title)

    startGameBtn.removeAttribute('disabled')
    startGameBtn.addEventListener('click', newGame)
}

function revealNums(container) {
    for (let x of container) {
        x.classList.remove('hideNum')
        x.classList.add('revealNums')
    }
}

function appendScore(score, adjSibling) {
    scoreDisplay.innerText = `Your score: ${score}`
    scoreDisplay.classList.add('scoreClass')
    adjSibling.insertAdjacentElement('afterend', scoreDisplay);
}