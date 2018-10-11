'use strict'

console.log('service');
const PROJS_KEY = 'projs';

var gProjs;

function createProj(id, name, title, desc, img, modalImg) {
    return {
        id: id,
        name: name,
        title: title,
        desc: desc,
        img: img,
        modalImg: modalImg,
        publishedAt: getDate(),
        labels: ["Games"]
    }
}

function createProjs() {
    if (localStorage.projs) gProjs = getFromStorage(PROJS_KEY);
    else gProjs = [
        createProj('bookshop', 'Book-shop', 'Lets find a Book!', 'A little books shop', 'bookshop.jpeg', 'bookshop2.png'),
        createProj('minesweeper', 'Minesweeper', 'Lets mine!', 'An awsome minesweeper!', 'mine.png', 'minesweeper2.png'),
        createProj('pacman', 'Pacman', 'My pacman', 'An awsome pacman!', 'pacman.png', 'pacman2.png'),
        createProj('todoMVC', 'Todo', 'todo list', 'A simple todo app', 'todo.jpeg', 'todo2.png'),
        createProj('touch-nums', 'Touch the nums', 'Touch the nums game', 'A simple Touch the nums game', 'touchthenums.png', 'touchthenums.png'),
    ]

}

function getProjs() {
    return gProjs;
}
