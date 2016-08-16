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


var movesLeft = Player.getMovesLeft(board);

if (movesLeft > 40) {
  console.log('BEST VALUE TIME!!!!!');
  var bestMove = Player.findBestMove(board, player);
  console.log(bestMove);
  process.exit(bestMove);
}

var validMoves = Player.findValidMoves(board, player);
var worstMove = -1;

// First, get the best move for the next turn
var worstValue = 100;

validMoves.forEach(function(move) {
  var nextBoard = Player.playMove(board, player, move);
  var otherPlayer = Player.oppositeColorOf(player);
  var otherPlayersValidMoves = Player.findValidMoves(nextBoard, otherPlayer);
  var value = otherPlayersValidMoves.length;
  if (value < worstValue) {
    worstValue = value;
    worstMove = move;
  }
});

process.exit(worstMove);
