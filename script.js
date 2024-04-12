// Define TicTacToeUI object
const TicTacToeUI = {
    // Function to render the game board to the webpage
    renderBoard: function(board) {
        const boardElement = document.getElementById('board');
        boardElement.innerHTML = ''; // Clear previous content

        // Loop through each row and column of the board
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.textContent = board[row][col];
                boardElement.appendChild(cell);
            }
        }
    }
};

// player symbols
const player_x = 'X';
const player_o = 'O';

// Define the Tic Tac Toe board
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

// Function to print the current state of the board to the console
function printBoard() {
    console.log("Current Board:");
    for (let row of board) {
        console.log(row.join(' | '));
    }
}

// Function to check if the current player has won
function checkWin(player) {
    // Check rows
    for (let row of board) {
        if (row.every(cell => cell === player)) {
            return true;
        }
    }
    // Check columns
    for (let col = 0; col < 3; col++) {
        if (board[0][col] === player && board[1][col] === player && board[2][col] === player) {
            return true;
        }
    }
    // Check diagonals
    if ((board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
        (board[0][2] === player && board[1][1] === player && board[2][0] === player)) {
        return true;
    }
    return false;
}

// Function to check if the game is a tie
function checkTie() {
    for (let row of board) {
        if (row.includes('')) {
            return false; // There is an empty cell, so game is not a tie
        }
    }
    return true; // All cells are filled, game is a tie
}

// Function to handle a player's move
function makeMove(row, col, player) {
    if (board[row][col] === '') {
        board[row][col] = player;
        return true; // Move is valid
    }
    return false; // Move is invalid
}

// Function to clear the board
function clearBoard() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
}

// Function to simulate the game
function playGame() {
    let currentPlayer = player_x;
    let gameOver = false;

    while (!gameOver) {
        printBoard();
        console.log(`Player ${currentPlayer}'s turn:`);
        // Simulate random valid move for the current player
        let row = Math.floor(Math.random() * 3);
        let col = Math.floor(Math.random() * 3);
        if (makeMove(row, col, currentPlayer)) {
            if (checkWin(currentPlayer)) {
                printBoard();
                console.log(`Player ${currentPlayer} wins!`);
                gameOver = true;
            } else if (checkTie()) {
                printBoard();
                console.log("It's a tie!");
                gameOver = true;
            } else {
                currentPlayer = currentPlayer === player_x ? player_o : player_x;
            }
        }
    }
}

// Start the game
playGame();
