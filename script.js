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
        (board)
    }

}
