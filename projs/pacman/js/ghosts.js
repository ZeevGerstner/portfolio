var GHOST = '&#9781;';

var gIntervalGhosts;
var gGhosts;

function createGhost(board) {

    var ghost = {
        color: getRandomColor(),
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD
    };


    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
}


function createGhosts(board) {
    gGhosts = [];
    createGhost(board);
    createGhost(board);
    createGhost(board);
    gIntervalGhosts = setInterval(moveGhosts, 1000);
}

function moveGhosts() {
    // TODO, if there are less than 3 ghosts, create one
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];

        var nextLocation = {
            i: ghost.location.i + getRandomIntInclusive(-1, 1),
            j: ghost.location.j + getRandomIntInclusive(-1, 1)
        }
        // console.log('nextLocation', nextLocation);

        if (gBoard[nextLocation.i][nextLocation.j] === WALL) return;
        if (gBoard[nextLocation.i][nextLocation.j] === GHOST) return;

        var isGameOver = checkEngage(nextLocation, PACMAN);
        if (isGameOver) {
        }

        // set back what we stepped on
        gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
        renderCell(ghost.location, ghost.currCellContent);

        // move the ghost
        ghost.location = nextLocation;

        // keep the contnet of the cell we are going to
        ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j];

        // move the ghost model and update dom
        gBoard[ghost.location.i][ghost.location.j] = GHOST;
        renderCell(ghost.location, getGhostHTML(ghost));
    }
}


function getGhostHTML(ghost) {
    return `<span style="color:${ghost.color}">${GHOST}</span>`
}

