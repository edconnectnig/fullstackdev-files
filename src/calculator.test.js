const calc = require("./calculator");
const assert = require('assert')

const testAddsIntegers = () => {
  assert.strictEqual(calc.add(10, 20), 30, '10+20=30')
}
const testAddsNegatives = () => {
  assert.strictEqual(calc.add(-10, -20), -30, '-10+(-20)=-30')
  assert.strictEqual(calc.add(10, -2), -30, '10+(-20)=-8')
}


const test = () => {
  testAddsIntegers()
  testAddsNegatives
}

test();