'use strict';
console.log('main - quest');

var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var gLastRes = null;

const LOCAL_KEY = 'qutions';

$(document).ready(init);

function init() {
    createQutions();
}

function startGuessing() {
    // TODO: hide the gameStart section
    $('.gameStart').hide();
    renderQuest();
    // TODO: show the gameQuest section
    $('.gameQuest').show();
}


function renderQuest() {
    // TODO: select the <h2> inside gameQuest and update its text by the currQuest text
    $('.gameQuest h2').html(gCurrQuest.txt);
}


function userResponse(res) {
    // If this node has no children
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            alert('Yes, I knew it!');
            restartGame();
            // TODO: improve UX
        } else {
            alert('I dont know...teach me!')
            // TODO: hide and show gameNewQuest section
            $('.gameQuest').hide();
            $('.gameNewQuest').show()
        }
    } else {
        // TODO: update the prev, curr and res global vars
        gPrevQuest = gCurrQuest;
        gLastRes = res;
        gCurrQuest = gCurrQuest[gLastRes];
        renderQuest();
    }
}

function addGuess() {
    // TODO: create 2 new Quests based on the inputs' values
    // TODO: connect the 2 Quests to the quetsions tree
    var $quest = $('#newQuest').val();
    var $guess = $('#newGuess').val();

    gPrevQuest[gLastRes] = createQuest($quest);
    gPrevQuest[gLastRes].yes = createQuest($guess);
    gPrevQuest[gLastRes].no = gCurrQuest;

    saveToStorage(LOCAL_KEY, gQuestsTree);
    restartGame();
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function restartGame() {
    $('.gameNewQuest').hide();
    $('.gameQuest').hide();
    $('.gameStart').show();
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    gLastRes = null;
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}