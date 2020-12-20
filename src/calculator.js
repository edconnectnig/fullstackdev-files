module.exports = {
  add(a, b, ) {
    return a + b;
  },
  divide(a, b) {
    if (b <= 0) {
      throw new Error('Cannot divide by zero')
    }
    return a / b;
  },
};
