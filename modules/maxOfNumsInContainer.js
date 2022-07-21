export function maxOfNumsInContainer(numSize, containerWidth, containerHeight) {
    // number of nums that can fit in container
    let numCol = Math.floor(containerHeight / numSize);
    let numRow = Math.floor(containerWidth / numSize);
    return numCol * numRow;
}