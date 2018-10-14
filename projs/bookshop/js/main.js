'use strict'
console.log('main');

function init() {
    createBooks();
    var lang = getFromStorage('lang');
    setLang(lang);
    renderBooks();
}

function renderBooks() {
    var books = getBooks();
    var strHtml = books.map(function (book) {
        return strHtml = `<tr>
                        <td scope="row">${book.id}</td>
                        <td><img src="${book.imgUrl}"\/></td>
                        <td>${book.title}</td>
                        <td class="price">${book.price}$</td>
                        <td>
                        <button type="button" class="btn btn-primary" data-toggle="modal" 
                        data-target="#detailesModal" onclick="onReadClicke('${book.id}')" data-trans="btnRead">
                        Read</button>
                            <button type="button" class="btn btn-secondary" onclick = "onUpdateBook(this,'${book.price}','${book.id}')" 
                            data-trans="btnUpdate">Update</button>
                            <button type="button" class="btn btn-danger" onclick = "onDeleteBook('${book.id}')" data-trans="btnDelete">Delete</button>
                        </td>
                    </tr>`
    })

    $('.books-list').html(strHtml.join(''))
    doTrans();

}



function onDeleteBook(bookId) {
    var isConfirm = confirm('Are yoy sure?');
    if (!isconfirm) return;
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
    el.innerHTML = `<input value = "${bookPrice}" id ="${bookId}"></input>
                                <button onclick = "saveUpdate('${bookId}')" data-trans="btnSave">save</button>`;
    doTrans();

}

function onReadClicke(bookId) {
    var books = getBooks();
    var book = getItembyId(books, bookId);

    $('.detailes-modal  ').html(`
                                         <img class="modal-img" src = "${book.imgUrl}"/>
                                         <h2>${book.title}</h2>
                                         <h3><span  data-trans="price">Price </span>: ${book.price}$</h3>
                                         <h4 class="book-id" id="${book.id}"><span data-trans="id">Book ID</span> : ${book.id}</h4>
                                         <h4><span data-trans="bookRate">Rate</span>: ${book.rate}</h4>`
    )
    $('.rate').text(`${book.rate}`)
    doTrans()
}

function onUpdateRate(val) {
    var $rate = $('.rate').text()
    if (val === '+' && $rate < 10) $('.rate').text(++$rate);
    else if (val === '-' && $rate > 0) $('.rate').text(--$rate);
    var $bookId = $('.book-id')[0].id
    saveUpdateRate($rate, $bookId);
}

function onClickFilter(filter) {
    sortBy(filter);
    renderBooks();
}


function onNextPage() {
    goNextPage();
    renderBooks();
    setLang(gCurrLang)
}

function onPrevPage() {
    goPrevPage();
    renderBooks();
    setLang(gCurrLang)
}
function onSetLang(lang) {
    console.log(lang);
    setLang(lang);
    renderBooks();
}