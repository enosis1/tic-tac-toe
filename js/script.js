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
    const board = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];

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

    gameBoard.printBoard();

    const acceptable_positions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let position = +prompt("Make your move: ");

    if (position in acceptable_positions) {
        gameBoard.board[position] = currentPlayer.getMarker();
        gameBoard.printBoard();
    } else {
        console.log("That wasn't a correct position... try again!");
        console.log(`Still ${currentPlayer.getName()}'s turn.`);
    }
}
