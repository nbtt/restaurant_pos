import React, { Component } from "react";
import Menu from "./component/Menu.js";
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Cart from './component/Cart'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {cart: new Map()}
  }
  render() {
    return (
      <div>
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
      </div>
    )
  }
}