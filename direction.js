module.exports = {
  up: function(position) {
    if (position !== null) {
      const result = position - 8;
      return result >= 0 ? result : null;
    }
    return null;
  },

  down: function(position) {
    if (position !== null) {
      const result = position + 8;
      return result <= 63 ? result : null;
    }
    return null;
  },

  left: function(position) {
    if (position !== null) {
      const result = position - 1;
      return result%8 != 7 && result >= 0 ? result : null;
    }
    return null;
  },

  right: function(position) {
    if (position !== null) {
      const result = position + 1;
      return result%8 != 0 && result >= 0 ? result : null;
    }
    return null;
  }
}
