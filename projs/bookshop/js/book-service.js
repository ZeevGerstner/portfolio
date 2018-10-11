'use strict'
console.log('book service');

const BOOKS_KEY = 'books';
const BOOK_KEY = 'book';
const PAGE_SIZE = 5;

var gCurrPageNo = 0;
var gBooks;


function createBook(title, price, img) {
    if (!img) img = 'img/NoCoverAvailable.png'

    return {
        id: makeId(),
        title: title,
        price: price,
        imgUrl: img,
        rate: 0
    }
}

function createBooks() {
    if (localStorage.books) gbooks = getFromStorage(BOOKS_KEY);
    else gBooks = [
        createBook('Minds Game', '1', 'img/mind.png'),
        createBook('Etics', '2', 'https://d188rgcu4zozwl.cloudfront.net/content/B01EMADYJM/resources/1533621840'),
        createBook('Moby Dic', '16', 'https://d188rgcu4zozwl.cloudfront.net/content/B01EMADYJM/resources/1533621840'),
        createBook('Minds Game', '32', 'img/mind.png'),
        createBook('Etics', '3', 'https://d188rgcu4zozwl.cloudfront.net/content/B01EMADYJM/resources/1533621840'),
        createBook('Moby Dic', '4', 'https://d188rgcu4zozwl.cloudfront.net/content/B01EMADYJM/resources/1533621840'),
        createBook('Minds Game', '5', 'img/mind.png'),
        createBook('Etics', '6', 'https://d188rgcu4zozwl.cloudfront.net/content/B01EMADYJM/resources/1533621840'),
        createBook('Moby Dic', '7', 'https://d188rgcu4zozwl.cloudfront.net/content/B01EMADYJM/resources/1533621840'),
        createBook('Minds Game', '8', 'img/mind.png'),
        createBook('Etics', '9', 'https://d188rgcu4zozwl.cloudfront.net/content/B01EMADYJM/resources/1533621840'),
        createBook('Minds Game', '10', 'img/mind.png'),
        createBook('Etics', '11', 'https://d188rgcu4zozwl.cloudfront.net/content/B01EMADYJM/resources/1533621840'),
        createBook('Moby Dic', '12', 'https://d188rgcu4zozwl.cloudfront.net/content/B01EMADYJM/resources/1533621840'),
        createBook('Minds Game', '13', 'img/mind.png'),
        createBook('Etics', '14', 'https://d188rgcu4zozwl.cloudfront.net/content/B01EMADYJM/resources/1533621840'),

    ]
}

function getBooks() {
    var fromBooksIdx = gCurrPageNo * PAGE_SIZE;
    return gBooks.slice(fromBooksIdx, fromBooksIdx + PAGE_SIZE);
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    gBooks.splice(bookIdx, 1);
}


function addNewBook(title, price) {
    var newBook = createBook(title, price, '');
    gBooks.unshift(newBook);
}

function saveUpdate(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    var $newPrice = $(`#${bookId}`).val();
    gBooks[bookIdx].price = $newPrice;
    renderBooks()
}

function saveUpdateRate(rate, bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    gBooks[bookIdx].rate = rate;
}


function sortBy(filter) {
    if (filter === 'Title') {
        return gBooks.sort(sortByTxt)
    }
    else if (filter === 'Price') {
        return gBooks.sort(sortByNum)
    }
}

function goPrevPage() {
    if (gCurrPageNo === 0) return;
    gCurrPageNo--;
    $('.curr-page').text(gCurrPageNo)
}

function goNextPage() {
    var pageLimit = PAGE_SIZE * (gCurrPageNo+1);
    if (pageLimit >= gBooks.length) return;
    gCurrPageNo++;
    $('.curr-page').text(gCurrPageNo)
}
