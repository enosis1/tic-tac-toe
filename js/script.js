// TODO: Create tic-tac-toe within the console
// We need two players who have each Marker X and Marker O
// We need to create the board and update each time players select where they
// place their marker

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
    const board = ["", "", "", "", "", "", "", "", ""];

    // Creates the players
    const playerOne = Player("PlayerOne", "X");
    const playerTwo = Player("PlayerTwo", "O");

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

    return { board, playerOne, playerTwo, printBoard };
})();

function handleRound(playerOne, playerTwo) {
    // First player will always be marker 'X'
    let currentPlayer = playerOne;
    let nextPlayer = playerTwo;

    while (!checkForWin(gameBoard.board, currentPlayer.marker)) {
        let position = +prompt("Make your move: ");

        if (gameBoard.board[position] === "") {
            gameBoard.board[position] = currentPlayer.getMarker();
            gameBoard.printBoard();

            console.log(`${nextPlayer.getName()}'s turn!`);
            if (currentPlayer === playerOne) {
                currentPlayer = nextPlayer;
                nextPlayer = playerOne;
            } else {
                currentPlayer = playerOne;
                nextPlayer = playerTwo;
            }
        } else if (
            gameBoard.board[position] === "X" ||
            gameBoard.board[position] === "O"
        ) {
            console.log("That position on the board is already filled, try again.");
            console.log(`Still ${currentPlayer.getName()}'s turn.`);
        }
    }
    currentPlayer.win();
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

function resetGame() {
    gameBoard.board();
}
