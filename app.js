var Player = require('./player');

console.log('start');
var board = '';
var player = '';
var time = 5000;
process.argv.forEach(function (val, index, array) {
  switch (val) {
    case '-b':
      board = JSON.parse(array[index + 1])["squares"];
      break;
    case '-p':
      player = array[index + 1].charAt(0);
      break;
    case '-t':
      time = array[index + 1];
      break;
  }
});


var validMoves = Player.findValidMoves(board, player);
var movesLeft = Player.getMovesLeft(board);
console.log(movesLeft);
if (movesLeft > 30) {
  console.log('changing things up');
  process.exit(validMoves[validMoves.length-1]);
}
var bestMove = -1;

// First, get the best move for the next turn
var bestValue = -6666;

validMoves.forEach(function(move) {
  var nextBoard = Player.playMove(board, player, move);
  var value = Player.getBoardValue(nextBoard, player);
  if (value > bestValue) {
    bestValue = value;
    bestMove = move;
  }
});

process.exit(bestMove);
