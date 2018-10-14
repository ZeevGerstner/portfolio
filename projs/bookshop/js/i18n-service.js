'use strict'
console.log('i18n-service');


function formatNum(num) {
    // return new Intl.NumberFormat('he-IL',{ style: 'currency', currency: 'ILS' }).format(num);
    return new Intl.NumberFormat().format(num);
}

function formatDate(time) {

    options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}


function kmToMiles(km) {
    return km / 1.609;
}


var gTrans = {

    pageName: {
        en: 'Book Shop',
        he: 'חנות ספרים'
    },
    addBook: {
        en: 'Add Book',
        he: ' הוסף ספר',
    },
    title: {
        en: 'Book Shop',
        he: 'חנות ספרים',
    },
    id: {
        en: 'id',
        he: 'מק"ט',
    },
    cover: {
        en: 'Cover',
        he: 'עטיפה',
    },
    bookTitle: {
        en: 'Title',
        he: 'כותר'
    },
    price: {
        en: 'Price',
        he: 'מחיר',
    },
    actions: {
        en: 'Actions',
        he: ' פעולות',
    },
    btnRead: {
        en: 'Read',
        he: 'קרא'
    },
    btnUpdate: {
        en: 'Update',
        he: 'עדכן'
    },
    btnDelete: {
        en: 'Delete',
        he: 'מחק'
    },
    bookDetailes: {
        en: 'Book detailes',
        he: 'פרטי הספר'
    },
    rateAdd: {
        en: 'Rate this Book',
        he: 'דרג את הספר'
    },
    btnSave: {
        en: 'Save',
        he: 'שמור'
    },
    updateTitle: {
        en: 'Add New Book',
        he: 'הוסף ספר חדש'
    },
    updateName: {
        en: 'Enter Book Title',
        he: 'הכנס שם ספר'
    },
    updatePrice: {
        en: 'Enter Book Price',
        he: 'הכנס מחיר ספר'
    },
    btnClose: {
        en: 'CLose',
        he: 'סגור'
    },
    bookRate: {
        en: 'Rate',
        he: 'דירוג'
    }
}

var gCurrLang = 'en';

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');

    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var transKey = el.getAttribute('data-trans');
        var txt = getTrans(transKey);

        // Translating is actually complex and needs a library
        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    }
}


function getTrans(transKey) {

    var keyTrans = gTrans[transKey];

    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang];

    // If not found - use english
    if (!txt) txt = keyTrans['en'];

    return txt;
}


function setLang(lang) {
    gCurrLang = lang;

    if (gCurrLang === 'he') {
        document.body.classList.add('rtl')
    } else {
        document.body.classList.remove('rtl')
    }
    saveToStorage('lang', gCurrLang);
    doTrans();
}