/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross placeX">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross placeO">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';

    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = '';
    if(turn == 'X') {
        newValue = 1;
        turn = 'O'
    }
    else if(turn == 'O') {
        newValue = 2;
        turn = 'X'
    }
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    addClickHandlers();
    checkWinner();
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
    if(turn == 'O') {
        compTurn();
    }
}

function compTurn() {
    var boxes = document.getElementsByClassName("box");
    var randomMove = getFreeBox();
    while(boxes[randomMove].hasChildNodes()){
        if( boxes[randomMove].querySelector('.cross').classList.contains('placeX') || boxes[randomMove].querySelector('.cross').classList.contains('placeO')){
            randomMove = getFreeBox();
        }
    }
    boxes[randomMove].click();

}
function getFreeBox() {
    return Math.floor(Math.random() * (9 - 0)) + 0;
}

function checkWinner() {
    var boxes = document.getElementsByClassName("box");
    if((boxes[0].querySelector('.cross.placeX')&&boxes[1].querySelector('.cross.placeX')&&boxes[2].querySelector('.cross.placeX')) || (boxes[3].querySelector('.cross.placeX')&&boxes[4].querySelector('.cross.placeX')&&boxes[5].querySelector('.cross.placeX')) || (boxes[6].querySelector('.cross.placeX')&&boxes[7].querySelector('.cross.placeX')&&boxes[8].querySelector('.cross.placeX')) || (boxes[0].querySelector('.cross.placeX')&&boxes[3].querySelector('.cross.placeX')&&boxes[6].querySelector('.cross.placeX')) || (boxes[1].querySelector('.cross.placeX')&&boxes[4].querySelector('.cross.placeX')&&boxes[7].querySelector('.cross.placeX')) || (boxes[2].querySelector('.cross.placeX')&&boxes[5].querySelector('.cross.placeX')&&boxes[8].querySelector('.cross.placeX')) || (boxes[0].querySelector('.cross.placeX')&&boxes[4].querySelector('.cross.placeX')&&boxes[8].querySelector('.cross.placeX')) || (boxes[2].querySelector('.cross.placeX')&&boxes[4].querySelector('.cross.placeX')&&boxes[6].querySelector('.cross.placeX'))) {
        alert('Player (X) Wins ');
    }
    if((boxes[0].querySelector('.cross.placeO')&&boxes[1].querySelector('.cross.placeO')&&boxes[2].querySelector('.cross.placeO')) || (boxes[3].querySelector('.cross.placeO')&&boxes[4].querySelector('.cross.placeO')&&boxes[5].querySelector('.cross.placeO')) || (boxes[6].querySelector('.cross.placeO')&&boxes[7].querySelector('.cross.placeO')&&boxes[8].querySelector('.cross.placeO')) || (boxes[0].querySelector('.cross.placeO')&&boxes[3].querySelector('.cross.placeO')&&boxes[6].querySelector('.cross.placeO')) || (boxes[1].querySelector('.cross.placeO')&&boxes[4].querySelector('.cross.placeO')&&boxes[7].querySelector('.cross.placeO')) || (boxes[2].querySelector('.cross.placeO')&&boxes[5].querySelector('.cross.placeO')&&boxes[8].querySelector('.cross.placeO')) || (boxes[0].querySelector('.cross.placeO')&&boxes[4].querySelector('.cross.placeO')&&boxes[8].querySelector('.cross.placeO')) || (boxes[2].querySelector('.cross.placeO')&&boxes[4].querySelector('.cross.placeO')&&boxes[6].querySelector('.cross.placeO'))) {
        alert('Computer (O) Wins ');
    }

}

initializeGrid();
renderMainGrid();
addClickHandlers();
