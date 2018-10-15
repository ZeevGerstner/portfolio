'use strict'

console.log('touch the nums');


var nums;
var gNumCount;
var gSize;
// var gBoard;
var time;
var startStoper;
var bestTime = 100;

function init(size) {
    gSize = size;
    // bestTime = localStorage.getItem(`best time level ${size}`, time);
    clearInterval(startStoper);
    createBoard(size);
    document.querySelector('.start').innerHTML = `<h2 class="time">0</h2>`;
    document.querySelector('.start').innerHTML += `<h2 class="next-num">Find num: 1</h2>`;
}

function showBestTime(size, time) {
    size = Math.sqrt(gSize);
    if (bestTime === 100) {
        bestTime = localStorage.setItem(`best time level ${size}`, time);
        document.querySelector('.best-time').innerText = `Level ${size} best time : ${time}`

    }
    if (time < bestTime) {
        bestTime = localStorage.setItem(`best time level ${size}`, time);
        document.querySelector('.best-time').innerText = `Level ${size} best time : ${time}`
    }
    bestTime = localStorage.getItem(`best time level ${size}`, time);
    console.log('best time');

}


function stoper() {
    var start = Date.now();
    startStoper = setInterval(function () {
        time = (Date.now() - start) / 1000;
        document.querySelector('.time').innerText = time;
    }, 1);
}

function checkClick(elNum) {

    if (+elNum.innerText === (gNumCount + 1)) {
        if (gNumCount === 0) {
            stoper();
        }
        elNum.style.backgroundColor = "greenyellow";
        gNumCount++;
        document.querySelector('.next-num').innerText = `Find num : ${gNumCount + 1}`;
        checkVictory();
    }
}

function checkVictory() {
    console.log(gNumCount);
    if (gNumCount === gSize) {
        clearInterval(startStoper);
        showBestTime(gSize, time);
        document.querySelector('.next-num').innerHTML =
            `<button class="restart"
        onclick="init(${Math.sqrt(gSize)})">
        Play again</button>`;
        console.log('victory');
    }
}

function createBoard(size) {
    var rndNum;
    gSize = size ** 2;
    nums = createArrNumbs(size);
    rndNum = shuffle(nums);
    gNumCount = 0;
    var strHTML = '';
    for (var i = 0; i < size; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < size; j++) {
            strHTML += '<td onclick="checkClick(this)">'
            strHTML += rndNum.pop();
            strHTML += '</td>'
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function createArrNumbs(size) {
    var numsArr = []
    var sizeNumbs = size ** 2 + 1;
    for (var i = 1; i < sizeNumbs; i++) {
        numsArr.push(i)
    }
    return numsArr
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}