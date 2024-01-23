const state = {
    gameElement: document.querySelector('.game'),   //Get the game element from HTML file
    cells: Array(9).fill(null),                     //Creates an array with 9 elements, all null
    symbols: ['O', 'X'],
    winningCombinations: [
        [0, 1, 2],  //Top row
        [3, 4, 5],  //Middle row
        [6, 7, 8],  //bottom row
        [0, 3, 6],  //Left column
        [1, 4, 7],  //Middle column
        [2, 5, 8],  //Right column
        [0, 4, 8],  //Left diagonal
        [2, 4, 6]   //Right diagonal
    ],
    gameFinished: false     //Game is initially unfinished
}

function drawboard() {              //Function to create 9 cells for the game
    
    state.gameElement.innerHTML = ''

    for (let i = 0; i < 9; i++) {    //Using a loop here prevents repetition of the elements in the HTML file

        const cell = document.createElement('div')  //Create a new div element and set its class to cell
        cell.classList.add('cell')

        if (state.cells[i]) {        //We need to see if a cell has a value to display, does the cell have an x or o
            const cellSymbol = document.createElement('p') //Creates a paragraph element
            cellSymbol.innerHTML = state.cells[i]
            cellSymbol.classList.add('symbol')
            cell.append(cellSymbol)
        } else {
            cell.addEventListener('click', function() {

                if (state.gameFinished) {
                    return
                }

                state.symbols.reverse()     //Reverse symbols to alternate between 'x' and 'o' 
                state.cells[i] = state.symbols[0]
                
                if (checkForWinner()) {
                    drawMessage(`${state.symbols[0]} won!`)
                    state.gameFinished = true
                    return
                }

                if (checkForDraw()) {
                    drawMessage('Draw!')
                    state.gameFinished = true
                    return
                }

                drawboard()
            })
        }

        state.gameElement.append(cell)  //Add the cell to the game div
    }
}

function checkForWinner() {
    return state.winningCombinations.some(function (combo) {    //For each winning combination
        const cells = combo.map(function (index) {  //Map each index in state.cells
            return state.cells[index]
        })

        return !(cells.includes(null)) && new Set(cells).size === 1 //should have 1 unique value, cannot be null

    })
}

function checkForDraw() {
    return state.cells.every(function (cell) {
        return cell !== null
    })
}

function drawMessage(message) {
    const banner = document.createElement('div')
    banner.classList.add('banner')

    const h1 = document.createElement('h1')
    h1.innerHTML = message
    banner.append(h1)

    const newGame = document.createElement("BUTTON")
    newGame.addEventListener("click", function () {
        state.gameElement.innerHTML = ''
        state.cells = Array(9).fill(null)
        state.gameFinished = false
        state.symbols = ['O', 'X']
        drawboard()
    })
    const prompt = document.createTextNode("New Game")
    newGame.appendChild(prompt)
    banner.append(newGame)

    state.gameElement.append(banner)
    state.gameElement.appendChild(newGame)
}

drawboard()