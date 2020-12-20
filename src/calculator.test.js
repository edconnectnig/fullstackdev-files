const calc = require("./calculator");

describe("Calculator", () => {
  describe("add", () => {
    test("10 + 30 = 40", () => {
      expect(calc.add(10, 30)).toBe(40);
    });
    test("-10 + -30 = -40", () => {
      expect(calc.add(-10, -30)).toBe(-40);
    });
    test("200 + 0.2 = 200.2", () => {
      expect(calc.add(200, 0.2)).toBe(200.2);
    });
  });

  describe("divide", () => {
    test("10/2 = 5", () => {
      expect(calc.divide(10, 2)).toBe(5);
    });
    test("10/0 should throw error", () => {
      expect(() => calc.divide(10, 0)).toThrowError('Cannot divide by zero')
    });
  });
});
