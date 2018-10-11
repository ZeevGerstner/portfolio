'use strict'

console.log('service');
const PROJS_KEY = 'projs';

var gProjs;

function createProj(id, name, title,desc,img,modalImg, url) {
    return {
        id: id,
        name: name,
        title: title,
        desc: desc,
        img: img,
        modalImg:modalImg,
        url: url,
        publishedAt: Date.now(),
        labels: ["Games"]
    }
}

function createProjs() {
    if (localStorage.projs) gProjs = getFromStorage(PROJS_KEY);
    else gProjs = [
        createProj('book-shop', 'book-shop', 'Lets find a Book!', 'LIst of fav books that you should read..', 'img/portfolio/bookshop.jpeg','img/portfolio/bookshop2.png','projs/bookshop'),
        createProj('minesweeper', 'minesweeper', 'Lets mine!', 'An awsome minesweeper!', 'img/portfolio/mine.png','img/portfolio/minesweeper2.png','projs/minesweeper'),
        createProj('pacman', 'pacman', 'My pacman', 'An awsome pacman!', 'img/portfolio/pacman.png','img/portfolio/pacman2.png','projs/pacman'),
        createProj('todo', 'todo', 'todo list', 'A simple todo app', 'img/portfolio/todo.jpeg','img/portfolio/todo2.png','projs/todo'),
        createProj('touchthenums', 'touchthenums', 'Touch the nums game', 'A simple Touch the nums game', 'img/portfolio/touchthenums.png','img/portfolio/touchthenums.png','projs/todo'),    
    ]

}

function getProjs() {
    return gProjs;
}
