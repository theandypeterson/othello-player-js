var Player = require('./player')
onmessage = function(e) {
  console.log('Message received from main script');
  console.log('treeing');
  var maxLevel = 6;
  console.log(maxLevel);
  var board = e.data[0];
  var player = e.data[1];
  var tree = Player.generateTree(board, player, maxLevel, 0, null);
  var possibleWinningMove = tree.mostPromisingChild();
  if (possibleWinningMove.value === 7777) {
    postMessage(possibleWinningMove);
  } else {
    console.log('nothing...');
  }
}
