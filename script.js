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

function GameController(playerX = "X", playerO = "O") {
    const board = Gameboard();

    const players = [
        {name: playerX,
        mark: "X"},
        {name: playerO,
        mark: "O"}
    ];

    let activePlayer = players[0];
    let turns = 0;

    const switchTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        turns++;
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

        checkWin();
        printRound();
    };

    const checkWin = () => {
        const b = board.getBoard();
        // check for all 8 win scenarios
        for (let i = 0; i < 3; i++) {
            if (b[i][0].getValue() !== "" 
            && b[i][0].getValue() === b[i][1].getValue() 
            && b[i][0].getValue() === b[i][2].getValue()) {
                return `${b[i][0].getValue()} wins!`;
            }
        }
        for (let j = 0; j < 3; j++) {
            if (b[0][j].getValue() !== "" 
            && b[0][j].getValue() === b[1][j].getValue() 
            && b[0][j].getValue() === b[2][j].getValue()) {
                return `${b[0][j].getValue()} wins!`;
            }
        }
        if (b[0][0].getValue() !== "" 
        && b[0][0].getValue() === b[1][1].getValue() 
        && b[0][0].getValue() === b[2][2].getValue()) {
            return `${b[0][0].getValue()} wins!`;
        }
        if (b[0][2].getValue() !== "" 
        && b[0][2].getValue() === b[1][1].getValue() 
        && b[0][2].getValue() === b[2][0].getValue()) {
            return `${b[0][2].getValue()} wins!`;
        }

        // check for tie
        if (turns === 9) {
            return "It's a tie!";
        }
        return false;
    };

    const reset = () => {
        board.getBoard().forEach((row) => {
            row.forEach((cell) => {
                cell.addMark("");
            })
        })
        activePlayer = players[0];
        turns = 0;
        printRound();
    }

    printRound();

    return { playRound, getActivePlayer, getBoard: board.getBoard, checkWin, reset};
}

function ScreenController() {
    let game = GameController();
    const winnerDiv = document.querySelector(".winner");
    const boardDiv = document.querySelector(".board");
    const restartButton = document.querySelector(".restart");

    const updateScreen = () => {
        boardDiv.textContent = "";
        winnerDiv.textContent = "";
        restartButton.textContent = "restart";

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

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

        if (game.checkWin() !== false) {
            winnerDiv.textContent = `${game.checkWin()}`;
            boardDiv.removeEventListener("click", clickHandlerBoard);
        }
    }

    function clickHandlerBoard(e) {
        const row = e.target.dataset.row;
        const col = e.target.dataset.column;
        if (!row || !col) return;
        game.playRound(row, col);
        updateScreen();
    }

    const newGame = () => {
        game.reset();
        updateScreen();
        boardDiv.addEventListener("click", clickHandlerBoard);
    }

    restartButton.addEventListener("click", newGame);
    boardDiv.addEventListener("click", clickHandlerBoard);
    updateScreen();
}

ScreenController();