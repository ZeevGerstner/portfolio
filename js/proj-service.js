'use strict'

console.log('service');
const PROJS_KEY = 'projs';

var gProjs;

function createProj(id, name, title,desc,img, url) {
    return {
        id: id,
        name: name,
        title: title,
        desc: desc,
        img: img,
        url: url,
        publishedAt: Date.now(),
        labels: ["Matrixes", "keyboard events"],
    }
}

function createProjs() {
    if (localStorage.projs) gProjs = getFromStorage(PROJS_KEY);
    else gProjs = [
        createProj('book-shop', 'book-shop', 'Lets find a Book!', 'LIst of fav books that you should read..', 'img/portfolio/bookshop.jpeg','projs/bookshop'),
        createProj('minesweeper', 'minesweeper', 'Lets mine!', 'An awsome minesweeper!', 'img/portfolio/mine.png','projs/minesweeper')
    ]
}

function getProjs() {
    return gProjs;
}
