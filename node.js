'use strict';

module.exports = class Node {
  constructor(move, value) {
    this.move = move;
    this.value = value;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
  }

  mostPromisingChild() {
    var bestChild = null;
    var bestValue = -1;
    this.children.forEach(function(child) {
      var value = child.getBestValue();
      if (value > bestValue) {
        bestValue = value;
        bestChild = child;
      }
    });
    return bestChild;
  }

  getBestValue() {
    var bestValue = -1;
    if (this.children.length === 0) {
      return this.value;
    }
    this.children.forEach(function(child) {
      var value = child.getBestValue();
      if (value > bestValue) {
        bestValue = value;
      }
    });
    return bestValue;
  }
}
