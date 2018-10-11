'use strict';
console.log('mainer');

var gLevel = {
    SIZE: 4,
    MINES: 2,
    LEVEL: 'Beginner'

};

var gState = {
    isGameOn: true,
    shownCount: 0,
    markedCount: 2,
    secsPassed: 0,
};

var gFirstClick = 0;
var gRightFirstClick = 0;
var gStartStoper;
var gElFirstCell;

function init() {
    var bestTime = localStorage.getItem(gLevel.LEVEL);
    document.querySelector('.high-score span').innerText = bestTime;
    gBoard = buildBoard();
    renderBoard(gBoard)
}

function addMine(board, numOfMines) {
    var count = 0;
    while (count < numOfMines) {
        var cell = { i: getRandomInt(0, board.length), j: getRandomInt(0, board.length) }
        var currCell = board[cell.i][cell.j];

        if (currCell !== gElFirstCell && !currCell.isMine) {
            currCell.isMine = true;
            currCell.gameElement = MINE;
            setMinesNegsCount(board, cell)
            // console.log(cell);
            count++;
        }
    }
}

function setMinesNegsCount(board, cell) {
    for (var i = cell.i - 1; i <= cell.i + 1; i++) {
        for (var j = cell.j - 1; j <= cell.j + 1; j++) {
            if (i < 0 || i >= board.length || j < 0 || j >= board.length) continue;
            if (i === cell.i && j === cell.j) continue;
            if (!board[i][j].isMine) {
                board[i][j].minesAroundCount++;
                board[i][j].gameElement = board[i][j].minesAroundCount;
            }
        }
    }
}

function cellClicked(elCell, idxI, idxJ) {
    if (!gState.isGameOn) return;
    if (gFirstClick === 0 && gRightFirstClick === 0) {
        startStoper();
        setTimeout(() => {
            // CR - Unclear as to why this bit is in a 10ms timeout
            document.querySelector('.toggel-game').style.display = 'none';
        }, 10);
    }

    var cell = gBoard[idxI][idxJ];

    if (gFirstClick === 0) {
        // CR - gElFirstCell is a name for a DOM element object
        // CR... Doesn't need to be a global variable, as it is only used here.
        // CR... Can be passed to the function that places mines. 
        gElFirstCell = cell;
        // console.table(gBoard)
        addMine(gBoard, gLevel.MINES);
        gFirstClick++;
    }
    if (cell.isShown || cell.isMarked) return;

    cell.isShown = true;
    elCell.classList.remove('hide')

    if (cell.isMine) {
        elCell.innerText = MINE;
        findMines(MINE);
    } else if (cell.minesAroundCount !== 0) {
        gState.shownCount++;
        elCell.innerText = cell.minesAroundCount;
    } else {
        gState.shownCount++;
        expandShown(gBoard, idxI, idxJ);
        console.log('EMPTY');
    }

    checkGameOver(cell)
    return;
}

function cellMarked(elCell, i, j) {
    // CR -  This is adding a lot of eventListeners to the table element - one for every right click on a cell
    // CR... Doing this once in an init function would suffice.
    document.querySelector('table').addEventListener("contextmenu", function(e) {
        e.preventDefault();
    }, false);

    if (!gState.isGameOn) return;
    if (gFirstClick === 0 && gRightFirstClick === 0) {
        startStoper();
        gRightFirstClick++;
        setTimeout(() => {
            document.querySelector('.toggel-game').style.display = 'none';
        }, 10);
    }

    var cell = gBoard[i][j];
    if (cell.isShown) return;

    if (!cell.isMarked && gState.markedCount !== 0) {
        elCell.innerText = FLAG;
        gState.markedCount--;
        cell.isMarked = true;
    } else if (cell.isMarked) {
        elCell.innerText = '';
        gState.markedCount++;
        cell.isMarked = false;
    }
    // CR - Not really markedCount. markedCountdown maybe.
    document.querySelector('.countFlags').innerText = gState.markedCount;
}

function checkGameOver(cell) {
    var currHtml = document.querySelector('.toggel-game');
    var smileBtn = document.querySelector('.btn-restart');
    if (cell.isMine) {
        currHtml.innerText = 'You lose';
        // CR - Next line queries for the same element that you already have in currHtml
        document.querySelector('.toggel-game').style.display = 'block';
        smileBtn.innerText = '😖';
        gState.isGameOn = false;
        clearInterval(gStartStoper)
        // CR - No need to check if there's a win after this. You can use return here.
    }

    // CR - checkEnd is actually cellCount
    var checkEnd = gLevel.SIZE ** 2;
    // CR - the first condition should be enough
    if (gState.shownCount === checkEnd - gLevel.MINES ||
        gState.shownCount === checkEnd - gState.markedCount) {

        gState.isGameOn = false;

        smileBtn.innerText = '😎';
        currHtml.innerText = 'You Won';
        currHtml.style.display = 'block';
        
        // CR - Good. Could be exported to a seperate function.
        var levelScore = localStorage.getItem(gLevel.LEVEL);
        if (gState.secsPassed < levelScore || levelScore === null) {
            localStorage.setItem(gLevel.LEVEL, gState.secsPassed);
            var updateScore = localStorage.getItem(gLevel.LEVEL, gState.secsPassed);
            document.querySelector('.high-score span').innerText = updateScore;
        }

        findMines(FLAG)
        clearInterval(gStartStoper)
    }
}

function gameLevel(elCell, size, mines, name) {
    gLevel.SIZE = size;
    gLevel.MINES = mines;
    gLevel.LEVEL = name;
    restart()
    // CR - next line is not necessary.
    gState.markedCount = gLevel.MINES;
}

function expandShown(board, idxI, idxJ) {
    for (var i = idxI - 1; i <= idxI + 1; i++) {
        // CR - It would be better to check that the i is in bounds here, before going into the inner loop.
        for (var j = idxJ - 1; j <= idxJ + 1; j++) {
            if (i < 0 || i > board.length - 1 || j < 0 || j > board.length - 1) continue;
            if (i === idxI && j === idxJ) continue;
            if (board[i][j].isShown || board[i][j].isMarked) continue;
            if (!board[i][j].isMine) {
                var currCell = document.querySelector(`.cell-${i}-${j}`);
                // CR -  There are three identical lines of code in these next if/else blocks.
                // CR... Those three code lines could be written once, before the conditional blocks.
                if (board[i][j].minesAroundCount === 0) {
                    board[i][j].isShown = true;
                    gState.shownCount++;
                    currCell.classList.remove('hide')
                    expandShown(board, i, j)
                } else {
                    board[i][j].isShown = true;
                    gState.shownCount++;
                    currCell.innerText = board[i][j].minesAroundCount;
                    currCell.classList.remove('hide')
                }
            }
        }
    }
}

function restart() {
    gState.isGameOn = true;
    gState.secsPassed = 0;
    gState.shownCount = 0;
    gState.markedCount = gLevel.MINES;

    gFirstClick = 0;
    gRightFirstClick = 0;

    clearInterval(gStartStoper);

    document.querySelector('.toggel-game').innerText = 'READY TO MINE!';
    document.querySelector('.toggel-game').style.display = 'block';
    document.querySelector('.time').innerText = 0;
    document.querySelector('.btn-restart').innerText = '😃';
    document.querySelector('.countFlags').innerText = gLevel.MINES;

    init()
    return
}

// CR - Nice use of the symbol parameter.
function findMines(symbol) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var currCell = gBoard[i][j];
            // CR - Use the querySelector inside the next if block (no need to query for every elCell here).
            var cellHtml = document.querySelector(`.cell-${i}-${j}`);
            if (currCell.isMine) {
                cellHtml.innerText = symbol;
                if (symbol === MINE) {
                    cellHtml.classList.remove('hide')
                    currCell.isShown = true;
                } else if (symbol === FLAG) {
                    cellHtml.innerText = FLAG;
                }
            }
        }
    }
}