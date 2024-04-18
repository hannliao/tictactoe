function Gameboard () {
    const board = [];
    const rows = 3;
    const cols = 3;

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const markSpot = (row, col, player) => {
        // can't mark a spot that is already marked
        if (board[row][col].getValue() !== "") return false;
        board[row][col].addMark(player);
    };

    const printBoard = () => {
        const printedBoard = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(printedBoard);
    };
    
    return { getBoard, markSpot, printBoard };
}

function Cell() {
    let value = "";

    const addMark = (player) => {
        value = player;
    }

    const getValue = () => value;

    return { addMark, getValue };
}

function GameController(playerX = "Player X", playerO = "Player O") {
    const board = Gameboard();

    const players = [
        {name: playerX,
        mark: "X"},
        {name: playerO,
        mark: "O"}
    ];

    let activePlayer = players[0];

    const switchTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    const getActivePlayer = () => activePlayer;

    const printRound = () => {
        board.printBoard();
    };

    const playRound = (row, col) => {
        // don't switch turns until the player marks a valid spot
        if (board.markSpot(row, col, getActivePlayer().mark) !== false) {
            switchTurn();
        }

        // check for a winner
        printRound();
    };

    printRound();

    return { playRound, getActivePlayer, getBoard: board.getBoard };
}

function ScreenController() {
    const game = GameController();
    const playerTurn = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");

    const updateScreen = () => {
        boardDiv.textContent = "";

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        playerTurn.textContent = `${activePlayer.name}'s turn...`;

        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = colIndex;
                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);
            })
        })
    }

    function clickHandlerBoard(e) {
        const row = e.target.dataset.row;
        const col = e.target.dataset.column;
        if (!row || !col) return;
        game.playRound(row, col);
        updateScreen();
    }
    boardDiv.addEventListener("click", clickHandlerBoard);
    updateScreen();
}

ScreenController();