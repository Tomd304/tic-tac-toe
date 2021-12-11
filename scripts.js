const playerFactory = (playerNumber, marker, myTurn, winner) => {
    return { playerNumber, marker, myTurn, winner }
}

player1 = playerFactory(1, 'X', true, false)
player2 = playerFactory(2, 'O', false, false)

const gameboard = (() => {
    let boardArray = [[0, 0, 0],[0, 0, 0],[0, 0, 0]]
    let selectedX = 0
    let selectedY = 0
    let playerOneTurn = true
    let winner = false

    const playTurn = (y, x) => {
        if (winner == true) {
            console.log('Game Over')
            console.log(player1.winner ? 'Player One has Won.' : 'Player Two has Won')
        }
        else if (boardArray[y][x] == 0) {
            setXY(y, x)
            changeArray()
            printObject()
            drawSquares()
            checkWinner()
            switchPlayer()
        }
    }

    const setXY = (y, x) => {
        selectedY = y
        selectedX = x
    }

    const changeArray = () => {
        if (playerOneTurn) {
            boardArray[selectedY][selectedX] = player1.playerNumber
        }
        else {
            boardArray[selectedY][selectedX] = player2.playerNumber
        }
        
    }

    const printObject = () => {
        console.table(boardArray)
        console.log(`X:${selectedX}, Y:${selectedY}`)
    }

    const drawSquares = () => {
        squares.forEach(square => {
            if (boardArray[square.dataset.y][square.dataset.x] == 1) {
                square.textContent = player1.marker
            }
            else if (boardArray[square.dataset.y][square.dataset.x] == 2) {
                square.textContent = player2.marker
            }
            else {
                square.textContent = ''
            }
        })
    }

    const switchPlayer = () => {
        playerOneTurn = playerOneTurn ? false : true
    }

    const checkWinner = () => {
        switch (true) {
            case boardArray[selectedY][0] == boardArray[selectedY][1] && boardArray[selectedY][0] == boardArray[selectedY][2]:
            case boardArray[0][selectedX] == boardArray[1][selectedX] && boardArray[0][selectedX] == boardArray[2][selectedX]:
            case boardArray[0][0] == boardArray[1][1] && boardArray[2][2] == boardArray[1][1] && boardArray[1][1] != 0:
            case boardArray[0][2] == boardArray[1][1] && boardArray[2][0] == boardArray[1][1] && boardArray[1][1] != 0:
                if (playerOneTurn) {
                    player1.winner = true
                    winner = true
                }
                else {
                    player2.winner = true
                    winner = true                
                }
                break;
            default:
                break;
        }
    }

    const resetGame = () => {
        boardArray = [[0, 0, 0],[0, 0, 0],[0, 0, 0]]
        selectedX = 0
        selectedY = 0
        playerOneTurn = true
        winner = false
        drawSquares()
    }

    return {playTurn, resetGame, winner}
})();

let squares = document.querySelectorAll('.game-square')

squares.forEach(square => {
    square.addEventListener('click', () => {
        if (gameboard.winner == false) {
            gameboard.playTurn(square.dataset.y, square.dataset.x)
        }
        
    })
});

let resetButton = document.querySelector('#reset-btn')
resetButton.addEventListener('click', (e) => {
    console.log(e)
    gameboard.resetGame()
})