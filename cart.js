const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const products = require('./products')

const cart = {
  cartProducts: [],
  addItem: function (product) {
    this.cartProducts.push(product)
    console.log(`You have added 1 ${product.name}`)
    this.showCartItemsMessage()
  },
  removeItem: function (product) {
    this.cartProducts.splice(this.cartProducts.findIndex(function (a) {
      return a.name === product.name
    }), 1)
    console.log(`You have removed ${product.name} from your cart.`)
    this.showCartItemsMessage()
  },
  findProduct: function (product) {
    return this.cartProducts.indexOf(product, 0)
  },
  showCartItemsMessage: function () {
    return console.log(`You have ${cart.cartProducts.length} item(s) in your cart! `, '\n')
  },
  totalPrice: function () {
    let total = null
    this.cartProducts.forEach(function (product) { total += product.price })
    return total
  }
}

module.exports = cart

function recurse () {
  rl.question('What would you like to purchase today, Apple or Orange? ', product => {
    if (product.toLowerCase() === products[0].name.toLowerCase()) {
      cart.addItem(products[0])
    } else if (product.toLowerCase() === products[1].name.toLowerCase()) {
      cart.addItem(products[1])
    }
    function question () {
      rl.question('Would you like to add or remove a product, or head to the checkout? ', select => {
        if (select.toLowerCase() === 'remove') {
          rl.question('Which product would you like to remove? ', product => {
            if (product.toLowerCase() === products[0].name.toLowerCase()) {
              cart.removeItem(products[0])
            } else if (product.toLowerCase() === products[1].name.toLowerCase()) {
              cart.removeItem(products[1])
            }
            question()
          })
        } else if (select.toLowerCase() === 'add') {
          rl.question('What would you like to add? ', product => {
            if (product.toLowerCase() === products[0].name.toLowerCase()) {
              cart.addItem(products[0])
            } else if (product.toLowerCase() === products[1].name.toLowerCase()) {
              cart.addItem(products[1])
            }
            question()
          })
        } else if (select.toLowerCase() === 'checkout') {
          let total = null
          cart.cartProducts.forEach(function (name, price) {
            total += name.price
          })
          console.log(`You have ${cart.cartProducts.length} item(s) in your cart:`, '\n')
          for (let i = 0; i < cart.cartProducts.length; i++) {
            console.log(`+ ${cart.cartProducts[i].name} $${cart.cartProducts[i].price} x ${cart.cartProducts[i].qty}`)
          }
          console.log('\n')
          if (cart.cartProducts.length > 0) {
            console.log(`Your total is: $${total.toFixed(2)}`, '\n')
          } else if (cart.cartProducts.length <= 0) {
            console.log('Your total is: $0.00')
          }
          question()
        }
      })
    }
    question()
  })
}
recurse()
