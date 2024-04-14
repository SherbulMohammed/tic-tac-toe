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
    for (let row = 0; row < 3; row++) {
        if (board[row][0] === player && board[row][1] === player && board[row][2] === player) {
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

// Define TicTacToeUI object
const TicTacToeUI = {
    currentPlayer: null,
    playerXName: null,
    playerOName: null,
    playerXSymbol: 'X',
    playerOSymbol: 'O',
    gameOver: false,

    // Function to initialize the game
    init: function() {
        const startButton = document.getElementById('startButton');
        startButton.addEventListener('click', this.startGame.bind(this));

        const resetButton = document.getElementById('resetButton');
        resetButton.addEventListener('click', this.resetGame.bind(this));
    },

    // Function to start/restart the game
    startGame: function() {
        this.playerXName = document.getElementById('playerXName').value;
        this.playerOName = document.getElementById('playerOName').value;

        const xRadio = document.getElementById('playerXSymbol');
        const oRadio = document.getElementById('playerOSymbol');


        if (this.playerXName && this.playerOName && (xRadio.checked || oRadio.checked)) {
            this.currentPlayer = this.playerXName;
            this.gameOver = false;
            this.playerXSymbol = xRadio.checked ? 'X' : 'O';
            this.playerOSymbol = this.playerXSymbol === 'X' ? 'O' : 'X';
            this.renderBoard();
            this.addClickHandlers();
            this.displayResult('');
            this.displayTurn();
        } else {
            alert("Please enter names for both players and select symbols!");
        }
    },
    
    // Function to render the game board to the webpage
    renderBoard: function() {
        if (!board || !Array.isArray(board) || board.length !== 3 || board.some(row => !Array.isArray(row) || row.length !== 3)) {
            console.error("Invalid board state.");
            return;
        }

        const grids = document.querySelectorAll('.grid');
        grids.forEach((grid, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            grid.textContent = board[row][col];
            grid.dataset.row = row;
            grid.dataset.col = col;
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
    },

    // Function to display current player's turn
    displayTurn: function() {
        const turnElement = document.getElementById('turn');
        turnElement.textContent = `Current Turn: ${this.currentPlayer}`;
    }

    // Function to reset the game
    resetGame: function() {
        // Clear the board
        clearBoard();
        this.renderBoard();

        // Reset game state
        this.currentPlayer = null;
        this.gameOver = false;
        this.displayResult('');
        this.displayTurn();
    }
};

// Initialize the game
TicTacToeUI.init();




