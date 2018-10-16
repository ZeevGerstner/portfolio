'use strict'

console.log('service');
const PROJS_KEY = 'projs';

var gProjs;

function createProj(id, name, title, desc, img, modalImg,labels) {
    return {
        id: id,
        name: name,
        title: title,
        desc: desc,
        img: img,
        modalImg: modalImg,
        publishedAt: getDate(),
        labels: labels
    }
}

function createProjs() {
    if (localStorage.projs) gProjs = getFromStorage(PROJS_KEY);
    else gProjs = [
        createProj('bookshop', 'Book-shop', 'Lets find a Book!', 'A little books shop', 'bookshop.jpeg', 'bookshop2.png',['Games','Dasktop','Mobile']),
        createProj('minesweeper', 'Minesweeper', 'Lets mine!', 'An awsome minesweeper!', 'mine.png', 'minesweeper2.png',['Games','Dasktop','Mobile']),
        createProj('pacman', 'Pacman', 'My pacman', 'An awsome pacman!', 'pacman.png', 'pacman2.png',['Games','Dasktop']),
        createProj('todoMVC', 'Todo', 'todo list', 'A simple todo app', 'todo.jpeg', 'todo2.png',['Tools','Dasktop','Mobile']),
        createProj('touch-nums', 'Touch the nums', 'Touch the nums game', 'A simple Touch the nums game', 'touchthenums.png', 'touchthenums.png',['Games','Dasktop','Mobile']),
        createProj('guesswho', 'Guess Who', 'Guess who game', 'A smart Guess who game', 'guesswho.jpeg', 'guesswho.png',['Games','Dasktop','Mobile']),

    ]

}

function getProjs() {
    return gProjs;
}
