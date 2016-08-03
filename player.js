var Direction = require('./direction');

const empty = "-"

var findValidMoves = function (board, myColor) {
  var result = [];
  board.forEach(function(element, position) {
    if (element === empty) {
      const directionSet = [
                            [Direction.left],
                            [Direction.right],
                            [Direction.up],
                            [Direction.down],
                            [Direction.up, Direction.right],
                            [Direction.up, Direction.left],
                            [Direction.down, Direction.right],
                            [Direction.down, Direction.left]
                           ]
      directionSet.forEach(function(directions) {
        if (findSandwich(board, directions, position, myColor)) {
          result.push(position);
          return;
        }
      });
    }
  });
  return result;
};

var moveFromPosition = function(position, directions) {
  var result = position;
  directions.forEach(function(direction) {
    result = direction(result);
  });
  return result;
};

var findSandwich = function(board, directions, position, myColor, foundOneOpposite) {
  foundOneOpposite = foundOneOpposite ? foundOneOpposite : false;
  var currentPosition = moveFromPosition(position, directions);
  if (currentPosition !== null) {
    if (board[currentPosition] === myColor) {
      return true && foundOneOpposite;
    }
    else if (board[currentPosition] === empty) {
      return false;
    } else {
      return findSandwich(board, directions, currentPosition, myColor, true);
    }
  } else {
    return false;
  }
};

var getRandomMove = function(moves) {
  return moves[Math.floor(Math.random() * moves.length)];
}

module.exports = {
  findValidMoves: findValidMoves,
  moveFromPosition: moveFromPosition,
  findSandwich: findSandwich,
  getRandomMove: getRandomMove
};
