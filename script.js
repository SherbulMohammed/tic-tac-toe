const X_CLASS = 'x'
const O_CLASS = 'o'
const WINNING_COMBINATIIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const gridElements = document.querySelectorAll('[data-grid]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let oTurn

startGame()

function startGame() {
    oTurn = false
    gridElements.forEach(grid => {
        grid.addEventListener('click', handleClick, { once: true })
    })
    setboardHoverClass()
}


function handleClick(e) {
    const grid = e.target 
    const currentClass = oTurn ? O_CLASS : X_CLASS 
    placeMark(grid, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)

    }

    // Check for Win
    // Check for Draw
    // Switch Turns
    swapTurns()
    setboardHoverClass()
}

function endGame(isDraw) {
    if (isDraw) {

    } else {
        winningMessageTextElement.innerText = `${oTurn ? "Player O" : "Player X"} Wins!`;
    }
    winningMessageElement.classList.add('show');
}


function placeMark(grid, currentClass) {
    grid.classList.add(currentClass)
}

function swapTurns() {
    oTurn = !oTurn
}

function setboardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if (oTurn) {
        board.classList.add(O_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
   return WINNING_COMBINATIIONS.some(combination => {
    return combination.every(index => {
        return gridElements[index].classList.contains(currentClass)
    })
   })
}