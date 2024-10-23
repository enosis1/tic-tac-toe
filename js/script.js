function Player(name, marker) {
    let score = 0;
    return {
        getName: () => name,
        getMarker: () => marker,
        getScore: () => score,
        win: () => score++,
    };
}

const gameBoard = (function() {
    let board = ["", "", "", "", "", "", "", "", ""];

    // Creates the players
    const playerOne = Player("PlayerOne", "X");
    const playerTwo = Player("PlayerTwo", "O");

    function getBoard() {
        return board;
    }

    function printBoard() {
        // Print the board in a 3x3 format
        console.log(`
    ${board[0]} | ${board[1]} | ${board[2]}
    ---------
    ${board[3]} | ${board[4]} | ${board[5]}
    ---------
    ${board[6]} | ${board[7]} | ${board[8]}
        `);
    }

    function resetBoard() {
        board = ["", "", "", "", "", "", "", "", ""];
    }

    function checkForWin(board, marker) {
        const winningCombinations = [
            // Horizontal wins
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            // Vertical wins
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            // Diagonal wins
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winningCombinations.some((combo) =>
            combo.every((index) => board[index] === marker),
        );
    }

    function isTieGame(board) {
        return board.every((position) => position != "");
    }

    return {
        playerOne,
        playerTwo,
        printBoard,
        resetBoard,
        checkForWin,
        isTieGame,
        getBoard,
    };
})();

function handleRounds(playerOne, playerTwo) {
    // First player will always be marker 'X'
    let currentPlayer = playerOne;
    let nextPlayer = playerTwo;
    let board = gameBoard.getBoard();

    gameBoard.printBoard();

    // TODO: Correct this logic below to handle checking the win function is correct
    let isGameWinner = false;
    while (!isGameWinner) {
        let position = prompt(
            `${currentPlayer.getName()}'s turn. Make your move: `,
        );

        if (position === "stop") {
            break;
        }
        position = +position;

        if (board[position] === "") {
            board[position] = currentPlayer.getMarker();
            gameBoard.printBoard();

            gameBoard.checkForWin(board, currentPlayer.getMarker())
                ? (isGameWinner = true)
                : (isGameWinner = false);

            if (isGameWinner) {
                // Increase the score of last move player
                console.log(`Game over! ${currentPlayer.getName()} wins this round.`);
                currentPlayer.win();
                break;
            }

            if (gameBoard.isTieGame(board)) {
                console.log("It's a tie game! No winner this round.");
                break;
            }

            console.log(`${nextPlayer.getName()}'s turn!`);
            if (currentPlayer === playerOne) {
                currentPlayer = nextPlayer;
                nextPlayer = playerOne;
            } else {
                currentPlayer = playerOne;
                nextPlayer = playerTwo;
            }
        } else if (board[position] === "X" || board[position] === "O") {
            console.log("That position on the board is already filled, try again.");
            console.log(`Still ${currentPlayer.getName()}'s turn.`);
        }
    }

    // Resets the game board with empty tiles
    gameBoard.resetBoard();

    // Sets the current player back to playerOne with marker 'X'
    currentPlayer = playerOne;
    nextPlayer = playerTwo;
}
