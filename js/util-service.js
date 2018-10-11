'use strict'
console.log('util service');

function makeId() {
    var length = 6;
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getFromStorage(key) {
    var val = localStorage.getItem(key);
    return JSON.parse(val)
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function getItembyId(items, itemId) {
    return items.find(function (item) {
        return item.id === itemId;
    })
}

function sortByTxt(a, b) {
    var a = a.title;
    var b = b.title;
    if (a < b) return -1;
    else if (a > b) return 1;
    return 0;
}

function sortByNum(a, b) {
    return a.price - b.price;
}