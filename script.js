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
            
            // Start the game loop
            this.playGame();
        } else {
            alert("Please enter names for both players!");
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

    // Function to simulate the game
    playGame: function() {
        let currentPlayer = player_x;
        let gameOver = false;

        while (!gameOver) {
            // Render the current state of the board
            this.renderBoard();

            // Check if the current player wins or if it's a tie
            if (checkWin(currentPlayer)) {
                this.displayResult(`Player ${currentPlayer} wins!`);
                gameOver = true;
            } else if (checkTie()) {
                this.displayResult("It's a tie!");
                gameOver = true;
            } else {
                // If game is not over, switch to the next player
                currentPlayer = currentPlayer === player_x ? player_o : player_x;
            }

            // Simulate random valid move for the current player
            let row = Math.floor(Math.random() * 3);
            let col = Math.floor(Math.random() * 3);
            makeMove(row, col, currentPlayer);
        }
    }
};

// Initialize the game
TicTacToeUI.init();




