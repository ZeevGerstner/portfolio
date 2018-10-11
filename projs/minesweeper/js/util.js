'use strict'
const MINE = '💣';
const EMPTY = '';
const FLAG = '🚩';
var gBoard;

// CR - This isn't really a utilities file.

function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                gameElement: EMPTY
            };
        }
    }
    return board;
}

function renderBoard(board) {

    var elBoard = document.querySelector('.board');

    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var className = `cell cell-${i}-${j}`;
            if (cell.isMine) {
                className += ' mine';
            }
            strHTML += `<td class="${className} hide" onclick="cellClicked(this,${i},${j})"
                        oncontextmenu="cellMarked(this,${i},${j})">
                        </td>`
        }

        strHTML += '</tr>'
    }
    elBoard.innerHTML = strHTML;
}

function startStoper() {
    gStartStoper = setInterval(function () {
        gState.secsPassed += 1;
        document.querySelector('.time').innerText = gState.secsPassed;
    }, 1000);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

