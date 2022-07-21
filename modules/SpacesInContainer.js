// main
export function spacesInContainer(numSize, spacesColOrRow, heightOrWidth) {
    // save and return available spaces in .container on row/height
    // func arg: numSize with (spacesOnRow and container.width) or (spacesOnCol and container.height)
    let numColOrRow = Math.floor(heightOrWidth / numSize);

    spacesColOrRow.push(...arrayInRange(numColOrRow))

    shuffle(spacesColOrRow)

    return spacesColOrRow
}
/////////////////////////////////////////////////////////////

function arrayInRange(num) {
    let myArray = []
    for (let x of Array(num).keys()) {
        myArray.push(x)
    }
    return myArray
}

export function shuffle(array) {
    array.sort(function () {
        return Math.random() - .5;
    });
}
