var expect = require('chai').expect;
var Player = require('./player');
var Direction = require('./direction');
var Node = require('./node');
describe('Player', function() {
  describe('#findValidMoves()', function() {
    var incomingJSON = {
      "width": 8,
      "height": 8,
      "max-index": 63,
      "squares": ["-","-","-","-","-","-","-","-",
                  "-","-","-","-","-","-","-","-",
                  "-","-","-","-","-","-","-","-",
                  "-","-","-","w","b","-","-","-",
                  "-","-","-","b","w","-","-","-",
                  "-","-","-","-","-","-","-","-",
                  "-","-","-","-","-","-","-","-",
                  "-","-","-","-","-","-","-","-"]
    };

    it('should return valid moves', function() {
                  //  0   1   2   3   4   5   6   7
      const board = ["w","b","-","-","b","w","-","-",
                  //  8   9  10  11  12  13  14  15
                     "b","-","-","-","-","-","-","b",
                  // 16  17  18  19  20  21  22  23
                     "-","-","-","-","-","w","-","w",
                  // 24  25  26  27  28  29  30  31
                     "-","-","-","-","-","-","b","-",
                  // 32  33  34  35  36  37  38  39
                     "-","-","-","b","-","-","-","-",
                  // 40  41  42  43  44  45  46  47
                     "-","-","w","-","w","-","-","-",
                  // 48  49  50  51  52  53  54  55
                     "-","-","b","-","-","-","-","-",
                  // 56  57  58  59  60  61  62  63
                     "-","-","-","b","w","-","-","-"]
      const color = "w"
      const validMoves = Player.findValidMoves(board, color);
      console.log(validMoves);
      expect(validMoves.length).to.equal(9);
      expect(validMoves).to.include(2);
      expect(validMoves).to.include(3);
      expect(validMoves).to.include(7);
      expect(validMoves).to.include(16);
      expect(validMoves).to.include(26);
      expect(validMoves).to.include(28);
      expect(validMoves).to.include(37);
      expect(validMoves).to.include(39);
    });

    it('works', function() {
      const color = "w";
      const board = ["-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","b","-","-","-","-",
                     "-","-","-","w","-","-","-","-",
                     "-","-","-","b","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-"];
      const moves = Player.findValidMoves(board, color);
      console.log(moves);
      expect(moves.length).to.eq(2);
    });
  });

  describe('findSandwich', function() {
    it('should find left sandwiches', function() {
      const color = "w";
      const board = ["w","b","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-"]
      const foundSandwich = Player.findSandwich(board, [Direction.left], 2, color);
      expect(foundSandwich).to.be.true;
    });

    it('should find right sandwiches', function() {
      const color = "w";
      const board = ["-","b","w","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-"]
      const foundSandwich = Player.findSandwich(board, [Direction.right], 0, color);
      expect(foundSandwich).to.be.true;
    });

    it('should find up sandwiches', function() {
      const color = "w";
      const board = ["w","-","-","-","-","-","-","-",
                     "b","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-"]
      const foundSandwich = Player.findSandwich(board, [Direction.up], 16, color);
      expect(foundSandwich).to.be.true;
    });

    it('should find down sandwiches', function() {
      const color = "w";
      const board = ["-","-","-","-","-","-","-","-",
                     "b","-","-","-","-","-","-","-",
                     "w","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-"]
      const foundSandwich = Player.findSandwich(board, [Direction.down], 0, color);
      expect(foundSandwich).to.be.true;
    });

    it('should not find empty sandwiches', function() {
      const color = "w";
      const board = ["-","-","-","-","-","-","-","-",
                     "w","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-"]
      const foundSandwich = Player.findSandwich(board, [Direction.down], 0, color);
      expect(foundSandwich).to.be.false;
    });

    it('should find up right sandwiches', function() {
      const color = "w";
      const board = ["-","-","w","-","-","-","-","-",
                     "-","b","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-"]
      const foundSandwich = Player.findSandwich(board, [Direction.up, Direction.right], 16, color);
      expect(foundSandwich).to.be.true;
    });

    it('should find up left sandwiches', function() {
      const color = "w";
      const board = ["w","-","-","-","-","-","-","-",
                     "-","b","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-"]
      const foundSandwich = Player.findSandwich(board, [Direction.up, Direction.left], 18, color);
      expect(foundSandwich).to.be.true;
    });

    it('should find down right sandwiches', function() {
      const color = "w";
      const board = ["-","-","-","-","-","-","-","-",
                     "-","b","-","-","-","-","-","-",
                     "-","-","w","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-"]
      const foundSandwich = Player.findSandwich(board, [Direction.down, Direction.right], 0, color);
      expect(foundSandwich).to.be.true;
    });

    it('should find down left sadnwiches', function() {
      const color = "w";
      const board = ["-","-","-","-","-","-","-","-",
                     "-","b","-","-","-","-","-","-",
                     "w","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-"]
      const foundSandwich = Player.findSandwich(board, [Direction.down, Direction.left], 2, color);
      expect(foundSandwich).to.be.true;
    });

    it('should not break when checking off the board', function() {
      const color = "w";
      const board = ["-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-"]
      const foundSandwich = Player.findSandwich(board, [Direction.up, Direction.left], 0, color);
      expect(foundSandwich).to.be.false;

      const foundSandwich2 = Player.findSandwich(board, [Direction.up, Direction.right], 2, color);
      expect(foundSandwich).to.be.false;
    })
  });

  describe('movement', function() {
    it('should be able to move up', function() {
      const currentPosition = 8;
      const newPosition = Player.moveFromPosition(currentPosition, [Direction.up]);
      expect(newPosition).to.equal(0);
    });

    it('should be able to move down', function() {
      const currentPosition = 8;
      const newPosition = Player.moveFromPosition(currentPosition, [Direction.down]);
      expect(newPosition).to.equal(16);
    });

    it('should be able to move left', function() {
      const currentPosition = 4;
      const newPosition = Player.moveFromPosition(currentPosition, [Direction.left]);
      expect(newPosition).to.equal(3);
    });

    it('should be able to move right', function() {
      const currentPosition = 4;
      const newPosition = Player.moveFromPosition(currentPosition, [Direction.right]);
      expect(newPosition).to.equal(5);
    });

    it('should be able to move in multiple directions', function() {
      var currentPosition = 35;
      currentPosition = Player.moveFromPosition(currentPosition, [Direction.up, Direction.left]);
      expect(currentPosition).to.equal(26);

      currentPosition = Player.moveFromPosition(currentPosition, [Direction.down, Direction.down, Direction.right]);
      expect(currentPosition).to.equal(43);
    });

    it('should catch itself going above the board', function() {
      const currentPosition = 7;
      const newPosition = Player.moveFromPosition(currentPosition, [Direction.up]);
      expect(newPosition).to.not.be.ok;
    });

    it('should catch itself going below the board', function() {
      const currentPosition = 56;
      const newPosition = Player.moveFromPosition(currentPosition, [Direction.down]);
      expect(newPosition).to.not.be.ok;
    });

    it('should catch itself going off the left side of the board', function() {
      const currentPosition = 24;
      const newPosition = Player.moveFromPosition(currentPosition, [Direction.left]);
      expect(newPosition).to.not.be.ok;
    });

    it('should catch itself going off the right side of the board', function() {
      const currentPosition = 23;
      const newPosition = Player.moveFromPosition(currentPosition, [Direction.right]);
      expect(newPosition).to.not.be.ok;
    });

    it('should catch itself going off the board with multiple moves', function() {
      var position1 = Player.moveFromPosition(2, [Direction.up, Direction.left]);
      expect(position1).to.not.be.ok;
      var position2 = Player.moveFromPosition(2, [Direction.up]);
      expect(position2).to.not.be.ok;
      var position3 = Player.moveFromPosition(null, [Direction.right]);
      expect(position3).to.not.be.ok;
      var position4 = Player.moveFromPosition(2, [Direction.up, Direction.right]);
      expect(position4).to.not.be.ok;
    });
  });

  describe('playMove()', function() {
    it('should do all the moves', function() {
      const color = "w";
      const board = ["w","b","b","w","b","b","b","-",
                     "-","b","b","b","b","w","-","-",
                     "-","-","b","b","b","-","-","-",
                     "-","w","b","-","b","w","-","-",
                     "-","-","b","b","b","-","-","-",
                     "-","w","-","b","-","w","-","-",
                     "-","-","-","w","-","-","b","-",
                     "-","-","-","-","-","-","-","-"];
      const newBoard = Player.playMove(board, color, 27);
      expect(newBoard).to.deep.equal(["w","b","b","w","b","b","b","-",
                                      "-","w","b","w","b","w","-","-",
                                      "-","-","w","w","w","-","-","-",
                                      "-","w","w","w","w","w","-","-",
                                      "-","-","w","w","w","-","-","-",
                                      "-","w","-","w","-","w","-","-",
                                      "-","-","-","w","-","-","b","-",
                                      "-","-","-","-","-","-","-","-"]);
    });
  });

  describe('flipSandwich()', function() {
    it('should flip up', function() {
      const color = "w";
      const board = ["w","-","-","-","-","-","-","-",
                     "b","-","-","-","-","-","-","-",
                     "b","-","-","-","-","-","-","-",
                     "b","-","-","-","-","-","-","-",
                     "b","-","-","-","-","-","-","-",
                     "b","-","-","-","-","-","-","-",
                     "b","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-"];
      const newBoard = Player.flipSandwich(board, color, 56, [Direction.up]);
      expect(newBoard).to.deep.equal(["w","-","-","-","-","-","-","-",
                                      "w","-","-","-","-","-","-","-",
                                      "w","-","-","-","-","-","-","-",
                                      "w","-","-","-","-","-","-","-",
                                      "w","-","-","-","-","-","-","-",
                                      "w","-","-","-","-","-","-","-",
                                      "w","-","-","-","-","-","-","-",
                                      "-","-","-","-","-","-","-","-"]);
    });
    it('should flip down', function() {
      const color = "w";
      const board = ["-","-","-","-","-","-","-","-",
                     "b","-","-","-","-","-","-","-",
                     "b","-","-","-","-","-","-","-",
                     "b","-","-","-","-","-","-","-",
                     "b","-","-","-","-","-","-","-",
                     "b","-","-","-","-","-","-","-",
                     "w","-","-","-","-","-","-","-",
                     "b","-","-","-","-","-","-","-"];
      const newBoard = Player.flipSandwich(board, color, 0, [Direction.down]);
      expect(newBoard).to.deep.equal(["-","-","-","-","-","-","-","-",
                                      "w","-","-","-","-","-","-","-",
                                      "w","-","-","-","-","-","-","-",
                                      "w","-","-","-","-","-","-","-",
                                      "w","-","-","-","-","-","-","-",
                                      "w","-","-","-","-","-","-","-",
                                      "w","-","-","-","-","-","-","-",
                                      "b","-","-","-","-","-","-","-"]);
    });
    it('should flip right', function() {
      const color = "w";
      const board = ["-","b","b","b","w","b","-","-",
                     "b","-","-","-","-","-","-","-",
                     "b","-","-","-","-","-","-","-",
                     "b","-","-","-","-","-","-","-",
                     "b","-","-","-","-","-","-","-",
                     "b","-","-","-","-","-","-","-",
                     "w","-","-","-","-","-","-","-",
                     "b","-","-","-","-","-","-","-"];
      const newBoard = Player.flipSandwich(board, color, 0, [Direction.right]);
      expect(newBoard).to.deep.equal(["-","w","w","w","w","b","-","-",
                                      "b","-","-","-","-","-","-","-",
                                      "b","-","-","-","-","-","-","-",
                                      "b","-","-","-","-","-","-","-",
                                      "b","-","-","-","-","-","-","-",
                                      "b","-","-","-","-","-","-","-",
                                      "w","-","-","-","-","-","-","-",
                                      "b","-","-","-","-","-","-","-"]);
    });
    it('should flip left', function() {
      const color = "w";
      const board = ["-","b","b","b","w","b","-","-",
                     "b","-","-","-","-","-","-","-",
                     "b","-","-","-","-","-","-","-",
                     "b","-","-","-","-","-","-","-",
                     "b","-","-","-","-","-","-","-",
                     "b","-","-","-","-","-","-","-",
                     "w","-","-","-","-","-","-","-",
                     "b","-","-","-","-","-","-","-"];
      const newBoard = Player.flipSandwich(board, color, 6, [Direction.left]);
      expect(newBoard).to.deep.equal(["-","b","b","b","w","w","-","-",
                                      "b","-","-","-","-","-","-","-",
                                      "b","-","-","-","-","-","-","-",
                                      "b","-","-","-","-","-","-","-",
                                      "b","-","-","-","-","-","-","-",
                                      "b","-","-","-","-","-","-","-",
                                      "w","-","-","-","-","-","-","-",
                                      "b","-","-","-","-","-","-","-"]);
    });
    it('should flip diagonal', function() {
      const color = "w";
      const board = ["-","b","b","b","w","b","-","-",
                     "b","b","-","-","-","-","-","-",
                     "b","-","b","-","-","-","-","-",
                     "b","-","-","b","-","-","-","-",
                     "b","-","-","-","b","-","-","-",
                     "b","-","-","-","-","w","-","-",
                     "w","-","-","-","-","-","-","-",
                     "b","-","-","-","-","-","-","-"];
      const newBoard = Player.flipSandwich(board, color, 0, [Direction.down, Direction.right]);
      expect(newBoard).to.deep.equal(["-","b","b","b","w","b","-","-",
                                      "b","w","-","-","-","-","-","-",
                                      "b","-","w","-","-","-","-","-",
                                      "b","-","-","w","-","-","-","-",
                                      "b","-","-","-","w","-","-","-",
                                      "b","-","-","-","-","w","-","-",
                                      "w","-","-","-","-","-","-","-",
                                      "b","-","-","-","-","-","-","-"]);
    });
  });
  describe('bestmove', function() {
    it('works', function() {
      const color = "w";
      const board = ["-","-","-","-","-","-","-","-",
                     "b","-","b","-","b","-","b","-",
                     "w","-","b","-","b","-","b","-",
                     "-","-","b","-","w","-","b","-",
                     "-","-","b","-","-","-","w","-",
                     "-","-","b","-","-","-","-","-",
                     "-","-","b","-","-","-","-","-",
                     "-","-","w","-","-","-","-","-"];
      const move = Player.findBestMove(board, color);
      expect(move).to.eq(2);
    });
    it('wwefworks', function() {
      const color = "w";
      const board = ["-","-","-","-","-","-","-","-",
                     "b","-","b","-","-","-","-","-",
                     "b","-","w","-","-","-","-","-",
                     "w","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-"];
      const move = Player.findBestMove(board, color);
      expect(move).to.eq(0);
    });
  });

  describe('node', function() {
    it('generateTree', function() {
      const color = "w";
      var board =   ["-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","b","-","-","-","-",
                     "-","-","-","w","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-"];
      var root = Player.generateTree(board, color, 0, 0);
      expect(root.children.length).to.eq(1);

      color = "w";
      board =       ["-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","b","-","-","-","-",
                     "-","-","-","w","-","-","-","-",
                     "-","-","-","b","-","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-"];
      var root2 = Player.generateTree(board, color, 1, 0);
      expect(root2.children.length).to.eq(2);
      expect(root2.children[0].children.length).to.eq(1);
    });

    it.only('does stuff', function() {
      this.timeout(0);
      const color = "w";
      var board =   ["-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","w","-","-",
                     "-","-","-","b","-","w","-","-",
                     "-","-","-","b","b","w","-","-",
                     "-","-","-","b","b","b","-","-",
                     "-","-","-","-","b","-","-","-",
                     "-","-","-","-","-","-","-","-",
                     "-","-","-","-","-","-","-","-"];
      var root = Player.generateTree(board, color, 4, 0, null);
      console.log(root);
      console.log(root.mostPromisingChild());
    })
  });
});
