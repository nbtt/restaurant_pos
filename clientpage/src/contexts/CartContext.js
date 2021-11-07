import { Component, createContext } from "react";

export const CartContext = createContext();

export class CartProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cartItems: [],
            total: 0
        }
        this.addFood = this.addFood.bind(this)
        this.deleteFood = this.deleteFood.bind(this)
        this.editQuantity = this.editQuantity.bind(this)
        this.updateTotal = this.updateTotal.bind(this)
    }

    addFood(food, qty) {
      var exist = this.state.cartItems.find((e => food.name === e.food.name))
      if (exist) {
        exist.qty += qty
        this.setState({
          cartItems: this.state.cartItems
        })
      } else {
        var cartItem = {
          food: food,
          qty: qty
        }
        this.state.cartItems.push(cartItem)
        this.setState({
          cartItems: this.state.cartItems
        })
      }
      this.updateTotal()
    }

    editQuantity(food, qty) {
      var cartItem = this.state.cartItems.find((e => food.name === e.food.name))
      if (cartItem.qty + qty === 0) {
        this.deleteFood(food)
      } else {
        cartItem.qty += qty
        this.setState({
          cartItems: this.state.cartItems
        })
      }
      this.updateTotal()
    }

    deleteFood(food) {
      var index = this.state.cartItems.findIndex((e => food.name === e.food.name))
      this.state.cartItems.splice(index, 1)
      this.setState({
        cartItems: this.state.cartItems
      })
      this.updateTotal()
    }

    updateTotal() {
      var total = 0
      this.state.cartItems.forEach(cartItem => {
          total += cartItem.food.price * cartItem.qty
      });
      this.setState({
        total: total
      })
    }

    render() {
        return(
            <CartContext.Provider
                value={{
                    cartItems: this.state.cartItems,
                    addFood: this.addFood,
                    editQuantity: this.editQuantity,
                    deleteFood: this.deleteFood,
                    total: this.state.total
                }}>
                    {this.props.children}
            </CartContext.Provider>
        )
    }
}