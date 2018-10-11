var gPacman;
var PACMAN = '🐶';

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
  gFoodCount--;
  console.log({ gFoodCount });

}

function movePacman(eventKeyboard) {
  console.log('eventKeyboard:', eventKeyboard);

  if (gState.isGameDone) return;

  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (eventKeyboard.code) {

    case 'ArrowUp':
      //console.log('Arrow Up!');
      document.querySelector(`.cell${nextLocation.i}-${nextLocation.j}`).style.transform = 'rotate(0deg)';
      nextLocation.i--;
      break;
    case 'ArrowDown':
      //console.log('Arrow Down!');
      document.querySelector(`.cell${nextLocation.i}-${nextLocation.j}`).style.transform = 'rotate(180deg)';
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      //console.log('Arrow Left!');
      document.querySelector(`.cell${nextLocation.i}-${nextLocation.j}`).style.transform = 'rotate(270deg)';
      nextLocation.j--;
      break;
    case 'ArrowRight':
      //console.log('Arrow Right!');
      document.querySelector(`.cell${nextLocation.i}-${nextLocation.j}`).style.transform = 'rotate(90deg)';
      nextLocation.j++;
      break;

  }

  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  // console.log('Heading: row:', newLocation.i , ' col: ', newLocation.j );
  // console.log('Whats there:', gBoard[newLocation.i][newLocation.j]);

  // hitting a wall, not moving anywhere
  if (nextCell === WALL) return;

  // hitting FOOD
  if (nextCell === FOOD) {
    updateScore(1);
  }
  if (nextCell === CHERRY) {
    updateScore(5);
  }
  // TODO: add support for power-food
  if (nextCell === SUPERFOOD) {
    console.log('super');
    updateScore(1);
    gPacman.isSuper = true;


    var ghostsColor = []
    for (var i = 0; i < gGhosts.length; i++) {
      var currGhost = gGhosts[i]
      var currGhostColor = currGhost.color;
      ghostsColor.push(currGhostColor)
      gGhosts[i].color = 'blue';
      renderCell(currGhost.location, getGhostHTML(currGhost));
    }

    setTimeout(() => {
      gPacman.isSuper = false;
      for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].color = ghostsColor[i];
        renderCell(currGhost.location, getGhostHTML(currGhost));
      }
    }, 5000);
  }

  //check if found ghost. if did check if superMode and if yes
  // eat the ghost
  var isGameDone = checkEngage(nextLocation, GHOST);
  if (isGameDone) return;


  // update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

  // render updated model to the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;


  // render updated model to the DOM
  renderCell(gPacman.location, PACMAN);

}

function killGhost(location) {
  // console.log({ location })
  //  console.log({ gGhosts })
  // debugger;
  for (var i = 0; i < gGhosts.length; i++) {
    var currGhost = gGhosts[i];
    if (currGhost.location.i === location.i && currGhost.location.j === location.j) {
      console.log('eating a monster')
      gGhosts.splice(i, 1);
      if (currGhost.currCellContent === FOOD) updateScore(1);
      setTimeout(() => {
        createGhost(gBoard);
      }, 5000);
      return
    }
  }
}


function rotateCell(i,j,dgree) {
  document.querySelector(`.cell${i}-${j}`).style.transform = `rotate${dgree}`;
}