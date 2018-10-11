'use strict';
var WALL = '❌';
var FOOD = '🍕';
var EMPTY = ' ';
const SUPERFOOD = '🍡';
const CHERRY = '🍒';

var gBoard;
var gState = {
  score: 0,
  isGameDone: false
};

var gFoodCount = 0;
var gAddCherryInterval;

function init() {
  gFoodCount = 0;
  document.querySelector('.end-game').style.display = 'none';
  gState.score = 0;
  document.querySelector('header > h3 > span').innerText = gState.score;
  gState.isGameDone = false;
  gBoard = buildBoard();

  createPacman(gBoard);
  createGhosts(gBoard);

  printMat(gBoard, '.board-container');
  gAddCherryInterval = setInterval(addCherryFood, 15000);
  console.table(gBoard);

}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      gFoodCount++;
      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j == 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
        gFoodCount--;

      }
      if (i === SIZE - 2 && j === SIZE - 2 || i === 1 && j === SIZE - 2
        || i === SIZE - 2 && j === 1 || i === 1 && j === 1) {
        board[i][j] = SUPERFOOD;
      }
    }
  }
  console.log({ gFoodCount });

  return board;
}

// This function is called from both pacman and ghost to check engage
function checkEngage(nextLocation, opponent) {
  var cell = gBoard[nextLocation.i][nextLocation.j];
  if (cell === opponent) {
    // TODO: basic support for eating power-ball (which is not in the game yet)
    if (gPacman.isSuper) {
      console.log('Ghost is dead');
      killGhost(nextLocation);
    } else {
      // TODO: GameOver popup with a play again button
      // alert('Game Over!');
      gameOver('lose!', 'red')
      return true;
    }
  }
  return false;
}


// this function updates both the model and the dom for the score
function updateScore(value) {
  gState.score += value;
  document.querySelector('header > h3 > span').innerText = gState.score;
  if (gState.score === gFoodCount) {
    gameOver('Won!', 'gold')
  }
}


function gameOver(txt, color) {
  clearInterval(gIntervalGhosts);
  clearInterval(gAddCherryInterval);
  gState.isGameDone = true;
  document.querySelector('.score').innerText = `You ${txt} `;
  document.querySelector('.score').style.color = color;
  document.querySelector('.end-game').style.display = 'block';
  console.log('Game Over!');
}

function addCherryFood() {
  var cell = {
    i: getRandomIntInclusive(1, gBoard.length - 2),
    j: getRandomIntInclusive(1, gBoard.length - 2)
  }
  if (gBoard[cell.i][cell.j] === FOOD) {
    gBoard[cell.i][cell.j] = CHERRY;
    renderCell(cell, CHERRY);
    setTimeout(() => {
      if (gBoard[cell.i][cell.j] !== PACMAN) {
        gBoard[cell.i][cell.j] = EMPTY;
        renderCell(cell, '');
      }
    }, 4000);
  }
}