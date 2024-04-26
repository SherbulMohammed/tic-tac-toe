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
const resetButton = document.getElementById('resetButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let oTurn

startGame()

resetButton.addEventListener('click', startGame)

function startGame() {
    oTurn = false
    gridElements.forEach(grid => {
    grid.classList.remove(X_CLASS)
    grid.classList.remove(O_CLASS)
    grid.removeEventListener('click', handleClick               )
    grid.addEventListener('click', handleClick, { once: true })
    })
    setboardHoverClass()
    winningMessageElement.classList.remove('show')
}


function handleClick(e) {
    const grid = e.target 
    const currentClass = oTurn ? O_CLASS : X_CLASS 
    placeMark(grid, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
    setboardHoverClass()
    }
    }


function endGame(draw) {
    if (draw) {
    winningMessageTextElement.innerText = 'Ooo its a Draw!'
    } else {
        winningMessageTextElement.innerText = `${oTurn ? "Player O" : "Player X"} Wins!`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw() {
    return [...gridElements].every(grid => {
    return grid.classList.contains(X_CLASS) ||
    grid.classList.contains(O_CLASS)
    })
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