const playerOneDisplay = document.querySelector('#player1')
const playerTwoDisplay = document.querySelector('#player2')
const statusDisplay = document.querySelector('.gameStatus')

const players = [
    {
        id: 0,
        name: 'Computer',
        symbol: 'O',
        score: 0
    },
    {
        id: 1,
        name: 'Wario',
        // name: prompt('Enter a name for player 1'),
        symbol: 'X',
        score: 0
    },
    {
        id: 2,
        name: 'Waluigi',
        // name: prompt('Enter a name for player 2'),
        symbol: 'O',
        score: 0
    }
]

let gameActive = true
let currentPlayer = players[1]
let gameState = ["", "", "", "", "", "", "", "", ""]

function statusUpdate() {
    statusDisplay.innerHTML = `It's ${currentPlayer.name}'s turn`
}

statusDisplay.innerHTML = `Select the number of players and then New Game.`

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick))
document.querySelector('.gameRestart').addEventListener('click', handleRestartGame)
document.querySelector('.scoreReset').addEventListener('click', handleScoreReset)


function handleCellClick(clickedCellEventOrIndex) {
    let clickedCell
    let clickedCellIndex

    if (typeof clickedCellEventOrIndex === 'number') {
        clickedCellIndex = clickedCellEventOrIndex
        clickedCell = document.querySelector(`[data-cell-index="${clickedCellIndex}"]`)
    } else {
        clickedCell = clickedCellEventOrIndex.target
        clickedCellIndex = parseInt(
            clickedCell.getAttribute('data-cell-index')
        )
    }

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}



function handleCellPlayed(clickedCell, clickedCellIndex) {

    gameState[clickedCellIndex] = currentPlayer.symbol
    clickedCell.innerHTML = currentPlayer.symbol

}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function handle2PlayerChange() {
    currentPlayer = currentPlayer === players[1] ? players[2] : players[1]
    playerOneDisplay.innerHTML = `${players[1].name}: ${players[1].score}`
    playerTwoDisplay.innerHTML = `${players[2].name}: ${players[2].score}`
    statusUpdate()

}

function handle1PlayerChange() {
    currentPlayer = currentPlayer === players[1] ? players[0] : players[1]
    playerOneDisplay.innerHTML = `${players[1].name}: ${players[1].score}`
    playerTwoDisplay.innerHTML = `${players[0].name}: ${players[0].score}`
    statusUpdate()

    setTimeout(() => {

        if (currentPlayer === players[0]) {
            do {
                selected = Math.floor(Math.random() * 9)
            } while (gameState[selected] != "")

            addComputerMove(selected)
            handleResultValidation()
            currentPlayer = players[1]
        }
    }, 3000)

    playerTwoDisplay.innerHTML = `Computer: ${players[0].score}`

}

let mode = ''
const selectMode = document.querySelector('select[name="Mode"]')

selectMode.addEventListener('change', (event) => {
    mode = event.target.value
})

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i]
        let a = gameState[winCondition[0]]
        let b = gameState[winCondition[1]]
        let c = gameState[winCondition[2]]
        if (a === '' || b === '' || c === '') {
            continue
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        if (currentPlayer.name == 'Computer') {
            statusDisplay.innerHTML = `The ${currentPlayer.name} has won!`

        } else {
            statusDisplay.innerHTML = `Player ${currentPlayer.name} has won!`
        }
        currentPlayer.score++
        updateScore()
        gameActive = false
        return
    }

    let roundDraw = !gameState.includes("")
    if (roundDraw) {
        statusDisplay.innerHTML = `Game ended in a draw!`
        gameActive = false
        return
    }

    if (mode == '1 Player') {
        handle1PlayerChange()
        console.log(currentPlayer.name)
    } else if (mode == '2 Players') {
        handle2PlayerChange()
        console.log(currentPlayer.name)
    }
}

function updateScore() {
    if (mode == '1 Player') {
        playerOneDisplay.innerHTML = `${players[1].name}: ${players[1].score}`
        playerTwoDisplay.innerHTML = `${players[0].name}: ${players[0].score}`

    } else if (mode == '2 Players') {
        playerOneDisplay.innerHTML = `${players[1].name}: ${players[1].score}`
        playerTwoDisplay.innerHTML = `${players[2].name}: ${players[2].score}`
    }
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = players[1];
    gameState = ["", "", "", "", "", "", "", "", ""]
    statusUpdate()
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "")
    updateScore()
}

function handleScoreReset() {
    players[0].score = 0
    players[1].score = 0
    players[2].score = 0
    updateScore()
}

const addComputerMove = (cellIndex) => {
    gameState[cellIndex] = currentPlayer.symbol
    document.querySelector(`[data-cell-index='${cellIndex}']`).innerHTML = currentPlayer.symbol
}

const selectElement = document.getElementById("boxxy")
selectElement.addEventListener("change", function () {
    if (this.value !== "") {
        const defaultOption = document.querySelector("#boxxy option[value='']")
        if (defaultOption) {
            defaultOption.parentNode.removeChild(defaultOption)
        }
    }
})