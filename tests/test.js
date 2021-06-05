const cart = require('../cart')
const products = require('../products')
const assert = require('assert')

beforeEach(function () {
  cart.cartProducts.length = 0
})

describe('Mocha Tests', function () {
  describe('Test 1', function () {
    it('Should start at a 0 item count', function () {
      assert.strictEqual(0, cart.cartProducts.length)
    })
    it('Should have 2 x Apples and 1 x Orange for a total of $13.89', function () {
      cart.addItem(products[0])
      cart.addItem(products[0])
      cart.addItem(products[1])
      assert.strictEqual(13.89, cart.totalPrice())
    })
  })

  describe('Test 2', function () {
    it('Should start at a 0 item count', function () {
      assert.strictEqual(0, cart.cartProducts.length)
    })
    it('Should add 3 x Apples and remove 1 x Apple for a total price of $9.90', function () {
      cart.addItem(products[0])
      cart.addItem(products[0])
      cart.addItem(products[0])
      cart.removeItem(products[0])
      assert.strictEqual(9.90, cart.totalPrice())
    })
  })
})
