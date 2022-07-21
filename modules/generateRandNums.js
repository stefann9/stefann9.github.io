import { gameVar} from '../app.js'

// main
export function genRandNum(numCount,container) {
    // tCountloop:
    for (let i = 0; i < numCount; i++) {
        /////////////////////////////////////////////////////////
        // check if size of gameVar.spacesOnCol/Row is exceeded
        addNewSpaces(gameVar.spacesOnCol, gameVar.spacesOnRow, numCount)
        ////////////////////////////////////////////////////////
        const newNum = document.createElement('button')
        newNum.classList.add('randNum');
        newNum.innerText = i
        /////////////////////////////////////////////////
        //set position
        let randLeft = `${gameVar.spacesOnRow[i] * gameVar.numSize}px`
        let randTop = `${gameVar.spacesOnCol[i] * gameVar.numSize}px`
        ////////////////////////////////////////

        // check collision
        let keepLoop = true
        while (keepLoop && gameVar.listOfPositions.length > 1) {
            for (let x of gameVar.listOfPositions) {
                if (randLeft === x.posLeft && randTop === x.posTop) {
                    shuffle(gameVar.spacesOnRow)
                    shuffle(gameVar.spacesOnCol)
                    randLeft = `${gameVar.spacesOnRow[i] * gameVar.numSize}px`
                    randTop = `${gameVar.spacesOnCol[i] * gameVar.numSize}px`
                    keepLoop = true
                    break
                } else {
                    keepLoop = false
                }
            }
        }

        ///////////////////////////////////////////////////////////
        gameVar.listOfPositions.push({ posLeft: randLeft, posTop: randTop })
        gameVar.listOfNum.push(newNum)
        ///////////////////////////////////////////////////////////////
        newNum.style.left = randLeft
        newNum.style.top = randTop
        container.append(newNum)
        //////////////////////////////////////////////////////////////
    }

}

///
function addNewSpaces(spacesOnCol, spacesOnRow, numCount) {
    // if gameVar.spacesOnCol/Row.length < numCount then add more
    while (spacesOnCol.length < numCount || spacesOnRow.length < numCount) {
        if (spacesOnCol.length < numCount) {
            spacesOnCol.push(...spacesOnCol)
        } else if (gameVar.spacesOnRow.length < numCount) {
            spacesOnRow.push(...spacesOnRow)
        } else {
            break
        }
    }
}