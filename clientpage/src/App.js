import { Component } from "react";
import Menu from "./component/Menu.js";
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Cart from './component/Cart'
import { CartProvider } from "./contexts/CartContext.js";

export default class App extends Component {
  render() {
    return (
      <CartProvider>
        <div className="header">
          <span className="bth">
            <HomeIcon className="homeicon"/>
            <span>Back to home</span>
          </span>
          <span className="cartbutton">
            <ShoppingCartIcon/>
            <span>Your Cart</span>
          </span> 
        </div>
        <div>
          {true ? <Cart/> : null }
        </div>
        <div className="body">
            <Menu/>
        </div>
      </CartProvider>
    )
  }
}