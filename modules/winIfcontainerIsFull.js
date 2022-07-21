export function containerIsFull(maxNumCount, numCount) {
    if (maxNumCount < numCount) {
        console.log('win')
        return true
    } else {
        return false
    }
}