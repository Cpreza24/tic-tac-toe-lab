/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
    [0, 4, 8], [2, 4, 6] //diagonals
] 


/*---------------------------- Variables (state) ----------------------------*/
let board; //
let turn; // represents 'X' or 'O"
let winner; //Shows a message of who won the game
let tie; // shows if the game was a tie
let squareIndex;


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const gameBoard = document.querySelector('.board');
const resetBtnEl = document.getElementById('reset');


/*-------------------------------- Functions --------------------------------*/
function init() {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    winner = false;
    tie = false;
    
    squareEls.forEach((square) => {
        square.textContent = '';
    });
    console.log('Game initialized');
    render();
}

init(); //call function

function render() {
    updateBoard();
    updateMessage();
}

function updateBoard() {
    board.forEach((mark, index) => {
        const square = squareEls[index];
        square.textContent = mark;
    })
};

function updateMessage() {
    if (winner === true & tie === false) {
        messageEl.textContent = `${turn} wins!`;
        //restartGame();
    } else if (winner === false && tie === true) {
        // render message that thegame is a tie
        messageEl.textContent = `It's a tie!`;
        //restartGame();
    } else if (winner === false && tie === false){
        //render message showing who won
        //restartGame();
        messageEl.textContent = `Current turn: ${turn}`
    }
};

function handleClick(e) {
    squareIndex = parseInt(e.target.id);
    //console.log(board[squareIndex]);
    if (board[squareIndex] || winner === true) {
        return;
    } 
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    updateMessage();
};

function placePiece(index) {
    board[index] = turn;
    if (board[index] === 'X') {
        updateBoard(index);
        updateMessage();
        changeTurn()
        //turn = 'O'
    } else if (board[index] === 'O') {
        updateBoard(index);
        updateMessage();
        changeTurn()
        //turn = 'X'
    }
    //console.log(board[index]);
}

function checkForWinner() {
    for (const combo of winningCombos) {
        //console.log(combo);
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            winner = true;
            tie = false;
            turn = board[a];
            updateMessage();
            console.log(`The winner is ${turn}`)
            return;
        } 
    }
};

// function checkForTie() {
//     if (winner) {
//         return;
//     }
//     squareEls.forEach((square) => {
//         if (square.textContent !== '') {
//             tie = true;
//             console.log(square.textContent, tie);
//             return;
//         } else {
//             tie = false;
//             console.log(tie);
//             return;
//         }
//     })
// }

function changeTurn() {
    if (winner === true) return;
    //turnary operator
    turn = turn === 'X' ? 'O' : 'X';
}

function checkForTie() {
    if (winner === true) return;
    tie = board.every(square => square !== '');
    console.log('tie' + tie);
}

// function restartGame() {
//     const resetBtnEl = document.createElement('button');
//     resetBtnEl.textContent = 'Restart?';
//     resetBtnEl.setAttribute('id', 'reset');
//     messageEl.appendChild(resetBtnEl);
// };



/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square => {
    square.addEventListener('click', handleClick);
});

resetBtnEl.addEventListener('click', init);



