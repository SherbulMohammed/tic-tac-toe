const Gameboard = (() => {
    let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
    ];

    const render = () => {
        let boardHTML = "";
        board.forEach((grid, index) => {
            boardHTML += `<div class="grid" id="grid-${index}">${grid}</div>`
        })
        document.querySelector("#board").innerHTML = boardHTML;
    }
    

    return {
        render,
    }

})();

const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
}


const Game = (() => {
        let players = [];
        let currentPlayerIndex = 0;
        let gameOver = false;

        const start = () => {
            players = [
                createPlayer(document.querySelector("#player1").value, "X"),
                createPlayer(document.querySelector("#player1").value, "O")
            ]
            currentPlayerIndex = 0;
            gameOver = false;
            Gameboard.render();
        }
        return {
            start,
        }
})();

const startButton = document.querySelector("#startButton");
startButton.addEventListener("click", () => {
    //Game.start();
})

  

