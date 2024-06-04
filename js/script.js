// TODO: Create tic-tac-toe within the console
// We need two players who have each Marker X and Marker O
// We need to create the board and update each time players select where they
// place their marker

function createPlayer(name, marker) {
  const getName = function() {
    return name;
  };

  const getMarker = function() {
    return marker;
  };
  return { getName, getMarker };
}

const gameBoard = (function() {
  const board = [[], [], [], [], [], [], [], [], []];

  const playerOne = createPlayer("PlayerOne", "X");
  const playerTwo = createPlayer("PlayerTwo", "O");

  return function generateBoard() {
    const copyOfBoard = board.slice();
    return { copyOfBoard, playerOne, playerTwo };
  };
})();
