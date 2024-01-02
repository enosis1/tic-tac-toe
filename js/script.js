(function createBoard() {
  // Gameboard for tic-tac-toe
  const gameBoard = [[], [], [], [], [], [], [], [], []];

  return { gameBoard };
})()

function createPlayer(name, marker) {
  const getName = function () {
    return console.log(`${name}`);
  };

  const getMarker = function () {
    return console.log(`${name} has marker: ${marker}`);
  };
  return { getName, getMarker };
}
