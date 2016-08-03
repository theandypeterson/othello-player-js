var Player = require('./player');

console.log('start');
var board = '';
var player = '';
var time = 1000;
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

var moves = Player.findValidMoves(board, player);

var move = Player.getRandomMove(moves);

console.log(move);

console.log('end');

process.exit(move);
