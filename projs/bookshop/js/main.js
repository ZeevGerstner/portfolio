'use strict'
console.log('main');

function init() {
    createBooks();
    renderBooks();
}

function renderBooks() {
    var books = getBooks();
    var strHtml = books.map(function (book) {
        return strHtml = `<tr>
                        <th scope="row">${book.id}</th>
                        <td><img src="${book.imgUrl}" height="50px" width="30px"/></td>
                        <td>${book.title}</td>
                        <td class="price">${book.price}$</td>
                        <td>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#detailesModal" onclick="onReadClicke('${book.id}')">
                        Read</button>
                            <button type="button" class="btn btn-secondary" onclick = "onUpdateBook(this,'${book.price}','${book.id}')" >Update</button>
                            <button type="button" class="btn btn-danger" onclick = "onDeleteBook('${book.id}')">Delete</button>
                        </td>
                    </tr>`
    })

    $('.books-list').html(strHtml.join(''))
}



function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderBooks();
}

function readAndAddNewBook() {
    var $title = $('#title-input');
    var $price = $('#price-input');
    if (!$title.val() && !$price.val()) return;
    addNewBook($title.val(), $price.val());
    $title.val('');
    $price.val('');
    renderBooks();
}

function onUpdateBook(elTd, bookPrice, bookId) {
    var el = elTd.parentElement.parentElement.children[3];
    el.innerHTML = `<input value = "${bookPrice}" id ="${bookId}"></input><button onclick = "saveUpdate('${bookId}')">save</button>`;
}

function onReadClicke(bookId) {
    var books = getBooks();
    var book = getItembyId(books, bookId);
    $('.detailes-modal  ').html(`
                                         <img class="modal-img" src = "${book.imgUrl}"/>
                                         <h2>Title :  <br >${book.title}</h2>
                                         <h3>Price : ${book.price}</h3>
                                         <h4 class="book-id" id="${book.id}">Book ID : ${book.id}</h4>
                                         <h4>Rate: ${book.rate}</h4>`
    )
    $('.rate').text(`${book.rate}`)
}

function onUpdateRate(val) {
    var $rate = $('.rate').text()
    if (val === '+' && $rate < 10) $('.rate').text(++$rate);
    else if (val === '-' && $rate > 0) $('.rate').text(--$rate);
    var $bookId = $('.book-id')[0].id
    saveUpdateRate($rate, $bookId);
}

function onClickFilter(el) {
    var filter = el.innerText;
    sortBy(filter);
    renderBooks();
}


function onNextPage() {
    goNextPage()
    renderBooks();
}

function onPrevPage() {
    goPrevPage()
    renderBooks();
}
