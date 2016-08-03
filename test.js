var expect = require('chai').expect;
var Player = require('./player');
var Direction = require('./direction');
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
      expect(validMoves.length).to.equal(10);
      expect(validMoves).to.include(2);
      expect(validMoves).to.include(3);
      expect(validMoves).to.include(7);
      expect(validMoves).to.include(16);
      expect(validMoves).to.include(26);
      expect(validMoves).to.include(28);
      expect(validMoves).to.include(37);
      expect(validMoves).to.include(39);
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
});
