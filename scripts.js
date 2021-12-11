const playerFactory = (playerNumber, marker, myTurn, winner) => {
    return { playerNumber, marker, myTurn, winner }
}

player1 = playerFactory(1, 'X', true, false)
player2 = playerFactory(2, 'O', false, false)

let displayMsg = document.querySelector('h2')
displayMsg.textContent = `Player 1's Turn`

const gameboard = (() => {
    let boardArray = [[0, 0, 0],[0, 0, 0],[0, 0, 0]]
    let selectedX = 0
    let selectedY = 0
    let playerOneTurn = true
    let gameEnd = false

    const playTurn = (y, x) => {
        
        if (boardArray[y][x] == 0 && gameEnd == false) {
            setXY(y, x)
            changeArray()
            printObject()
            drawSquares()
            checkFinish()
            switchPlayer()
        }
        if (gameEnd == true) {
            displayMsg.textContent = player1.winner ? 'Player 1 wins.' : player2.winner ? 'Player 2 wins' : 'Tie!'
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
        displayMsg.textContent = playerOneTurn ? `Player 1's Turn` : `Player 2's Turn`
    }

    const checkFinish = () => {
        switch (true) {
            case boardArray[selectedY][0] == boardArray[selectedY][1] && boardArray[selectedY][0] == boardArray[selectedY][2]:
            case boardArray[0][selectedX] == boardArray[1][selectedX] && boardArray[0][selectedX] == boardArray[2][selectedX]:
            case boardArray[0][0] == boardArray[1][1] && boardArray[2][2] == boardArray[1][1] && boardArray[1][1] != 0:
            case boardArray[0][2] == boardArray[1][1] && boardArray[2][0] == boardArray[1][1] && boardArray[1][1] != 0:
                if (playerOneTurn) {
                    player1.winner = true
                    gameEnd = true
                    break;
                }
                else {
                    player2.winner = true
                    gameEnd = true
                    break;                
                }
                break;
            case checkDraw():
                gameEnd = true
                break;
            default:
                break;
        }
    }

    const checkDraw = () => {
        let end = true
        boardArray.forEach(arr => {
            if (arr.includes(0)) {
                end = false
                return
            }
        })     
        return end;
    }

    const resetGame = () => {
        boardArray = [[0, 0, 0],[0, 0, 0],[0, 0, 0]]
        selectedX = 0
        selectedY = 0
        playerOneTurn = true
        gameEnd = false
        drawSquares()
        player1.winner = false
        player2.winner = false
        displayMsg.textContent = `Player 1's Turn`
    }

    return {playTurn, resetGame, gameEnd}
})();

let squares = document.querySelectorAll('.game-square')

squares.forEach(square => {
    square.addEventListener('click', () => {
        if (gameboard.gameEnd == false) {
            gameboard.playTurn(square.dataset.y, square.dataset.x)
        }
        
    })
});

let resetButton = document.querySelector('#reset-btn')
resetButton.addEventListener('click', (e) => {
    console.log(e)
    gameboard.resetGame()
})