var Direction = require('./direction');
var Node = require('./node');

const empty = "-";

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
                           ];
      directionSet.forEach(function(directions) {
        if (findSandwich(board, directions, position, myColor)) {
          result.push(position);
          return;
        }
      });
    }
  });
  return result.filter(function(elem, pos) {
    return result.indexOf(elem) == pos;
  });
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
};

var flipSandwich = function(board, myColor, position, directions) {
  const nextPosition = moveFromPosition(position, directions);
  if (board[nextPosition] === myColor) {
    return board;
  }
  board[nextPosition] = myColor;
  return flipSandwich(board, myColor, nextPosition, directions);
};

var playMove = function(originalBoard, myColor, position) {
  var board = JSON.parse(JSON.stringify(originalBoard));
  const directionSet = [
                        [Direction.left],
                        [Direction.right],
                        [Direction.up],
                        [Direction.down],
                        [Direction.up, Direction.right],
                        [Direction.up, Direction.left],
                        [Direction.down, Direction.right],
                        [Direction.down, Direction.left]
                       ];
  directionSet.forEach(function(directions) {
    if (findSandwich(board, directions, position, myColor)) {
      board = flipSandwich(board, myColor, position, directions);
    }
  });
  board[position] = myColor;
  return board;
};

var findBestMove = function(board, myColor) {
  const moves = findValidMoves(board, myColor);
  var bestMove = -1;
  var bestValue = -1;
  moves.forEach(function(move) {
    var newBoard = playMove(board, myColor, move);
    var value = getBoardValue(newBoard, myColor);
    if (value > bestValue) {
      bestMove = move;
      bestValue = value;
    }
  });
  return bestMove;
};

var getBoardValue = function(board, color) {
  var count = 0;
  board.forEach(function(element) {
    if (element === oppositeColorOf(color)) {
      count += 1;
    }
  });
  return 100 - count;
};

var oppositeColorOf = function(color) {
  return color === "w" ? "b" : "w";
}

var generateTree = function(board, color, maxLevel, currentLevel, previousMove) {
  var root = new Node(previousMove, getBoardValue(board, color));
  var validMoves = findValidMoves(board, color);
  validMoves.forEach(function(move) {
    var child = null;
    var newBoard = playMove(board, color, move);
    if (maxLevel > currentLevel) {
      var nextColor = oppositeColorOf(color);
      child = generateTree(newBoard, nextColor, maxLevel, currentLevel + 1, move);
    } else {
      var value = getBoardValue(newBoard, color);
      child = new Node(move, value);
    }
    root.addChild(child);
  });
  return root;
}

module.exports = {
  findValidMoves: findValidMoves,
  moveFromPosition: moveFromPosition,
  findSandwich: findSandwich,
  getRandomMove: getRandomMove,
  flipSandwich: flipSandwich,
  playMove: playMove,
  findBestMove: findBestMove,
  generateTree: generateTree
};
