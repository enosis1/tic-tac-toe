const displayController = (function () {
  const gameGrid = document.querySelector(".game-grid");

  function generateGameGrid() {
    for (let i = 0; i < 3; i++) {
      for (let row = 0; row < 3; row++) {
        let cell = document.createElement("button");
        cell.classList.add("grid-cell");
        cell.classList.add("grid-cell-button");
        cell.setAttribute("data-index", i * 3 + row); // Set index for each button

        gameGrid.appendChild(cell);
      }
    }
  }

  function displayMarker(cell, marker) {
    cell.textContent = marker;
  }

  function getGameGrid() {
    return document.querySelectorAll(".grid-cell");
  }

  function displayText(player) {
    const gamePlayerText = document.querySelector(".game-player-text");
    gamePlayerText.textContent = `${player.getName()}'s turn!`;
  }

  generateGameGrid();

  return { displayMarker, displayText, getGameGrid };
})();

function Player(name, marker) {
  let score = 0;
  return {
    getName: () => name,
    getMarker: () => marker,
    getScore: () => score,
    win: () => score++,
  };
}

const gameBoard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  // Creates the players
  const playerOne = Player("PlayerOne", "X");
  const playerTwo = Player("PlayerTwo", "O");

  function getBoard() {
    return board;
  }

  function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
    // Clear the visual board
    const cells = displayController.getGameGrid();
    cells.forEach((cell) => (cell.textContent = ""));
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
    resetBoard,
    checkForWin,
    isTieGame,
    getBoard,
  };
})();

function handleRounds() {
  // First player will always be marker 'X'
  const playerOne = Player("Player One", "X");
  const playerTwo = Player("Player Two", "O");

  let currentPlayer = playerOne;
  let board = gameBoard.getBoard();
  let isWinner = false;

  const gameText = document.querySelector(".game-player-text");

  const cells = displayController.getGameGrid();
  displayController.displayText(currentPlayer);

  const resetButton = document.querySelector(".game-button");
  resetButton.addEventListener("click", () => {
    gameBoard.resetBoard();
    board = gameBoard.getBoard();
    isWinner = false;
    currentPlayer = playerOne;
    displayController.displayText(currentPlayer); // Update display
  });

  cells.forEach((cell) => {
    cell.addEventListener("click", (event) => {
      position = event.target.dataset.index;

      if (isWinner) {
        return;
      }

      if (board[position] === "") {
        board[position] = currentPlayer.getMarker();
        displayController.displayMarker(
          event.target,
          currentPlayer.getMarker(),
        );

        // Checks for a winner
        if (gameBoard.checkForWin(board, currentPlayer.getMarker())) {
          // Increase the score of last move player
          gameText.textContent = `${currentPlayer.getName()} wins this round!`;
          isWinner = true;
          return;
        }

        if (gameBoard.isTieGame(board)) {
          gameText.textContent = "It's a tie game! No winner this round.";
          return;
        }

        // Switch Players
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        displayController.displayText(currentPlayer);
      }
    });
  });
}

handleRounds();
