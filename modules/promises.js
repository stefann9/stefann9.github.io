// import {x} from '../app.js';
export let timeToChooseId = NaN
export function timeToChoose(timeToChoosedelay) {
    return new Promise((resolve, reject) => {
        timeToChooseId = setTimeout(() => {
            resolve();
        }, timeToChoosedelay)
    })
}

export let hideNumId = NaN;
export function hideNum(hideNumDelay) {
    return new Promise((resolve, refect) => {
        hideNumId = setTimeout(() => {
            resolve();
        }, hideNumDelay)
    })
}

