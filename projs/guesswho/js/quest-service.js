'use strict'

console.log('service');

function getFromStorage(key) {
    var val = localStorage.getItem(key);
    return JSON.parse(val)
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function createQutions() {
    var qutions = getFromStorage(LOCAL_KEY);
    if (qutions) gQuestsTree = qutions;
    else {
        gQuestsTree = createQuest('Male?'),
            gQuestsTree.yes = createQuest('Gandhi?'),
            gQuestsTree.no = createQuest('Rita?')
    }
    gCurrQuest = gQuestsTree;
}

