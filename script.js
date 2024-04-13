// Define TicTacToeUI object
const TicTacToeUI = {
    currentPlayer: null,
    playerXName: null,
    playerOName: null,
    gameOver: false,

    // Function to initialize the game
    init: function() {
        const startButton = document.getElementById('startButton');
        startButton.addEventListener('click', this.startGame.bind(this));
    },

    // Function to start/restart the game
    startGame: function() {
        this.playerXName = document.getElementById('playerXName').value;
        this.playerOName = document.getElementById('playerOName').value;
        if (this.playerXName && this.playerOName) {
            this.currentPlayer = this.playerXName;
            this.gameOver = false;
            this.renderBoard();
            this.addClickHandlers();
            this.displayResult('');
        } else {
            alert("Please enter names for both players!");
        }
    },
    
    // Function to render the game board to the webpage
    renderBoard: function() {
        const grids = document.querySelectorAll('.grid');
        grids.forEach((grid, index) => {
            grid.textContent = board[Math.floor(index / 3)][index % 3];
            grid.dataset.row = Math.floor(index / 3);
            grid.dataset.col = index % 3;
        });
    },

    // Function to add click handlers to cells
    addClickHandlers: function() {
        const grids = document.querySelectorAll('.grid');
        grids.forEach(grid => {
            grid.addEventListener('click', this.handleGridClick.bind(this));
        });
    },

    // Function to handle a grid click event
    handleGridClick: function(event) {
        if (!this.gameOver) {
            const row = parseInt(event.target.dataset.row);
            const col = parseInt(event.target.dataset.col);
            if (board[row][col] === '') {
                board[row][col] = this.currentPlayer === this.playerXName ? 'X' : 'O';
                this.renderBoard();
                if (checkWin(this.currentPlayer)) {
                    this.displayResult(`Player ${this.currentPlayer} wins!`);
                    this.gameOver = true;
                } else if (checkTie()) {
                    this.displayResult("It's a tie!");
                    this.gameOver = true;
                } else {
                    this.currentPlayer = this.currentPlayer === this.playerXName ? this.playerOName : this.playerXName;
                }
            }
        }
    },

    // Function to display game result
    displayResult: function(message) {
        const messageElement = document.getElementById('message');
        messageElement.textContent = message;
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
        TicTacToeUI.renderBoard(board);
        console.log(`Player ${currentPlayer}'s turn:`);
        // Simulate random valid move for the current player
        let row = Math.floor(Math.random() * 3);
        let col = Math.floor(Math.random() * 3);
        if (makeMove(row, col, currentPlayer)) {
            if (checkWin(currentPlayer)) {
                TicTacToeUI.renderBoard(board); // Update board before displaying result
                console.log(`Player ${currentPlayer} wins!`);
                gameOver = true;
            } else if (checkTie()) {
                TicTacToeUI.renderBoard(board); // Update board before displaying result
                console.log("It's a tie!");
                gameOver = true;
            } else {
                currentPlayer = currentPlayer === player_x ? player_o : player_x;
            }
        }
    }
}

// Function to handle a player's move
function makeMove(row, col, player) {
    if (board[row][col] === '') {
        board[row][col] = player;
        return true; // Move is valid
    }
    return false; // Move is invalid
}


// Start the game
playGame();

// Initialize the game
TicTacToeUI.init();
