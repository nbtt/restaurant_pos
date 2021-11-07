import { Component } from "react";
import Menu from "./Menu.js";
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Cart from './Cart'

export default class ClientPage extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <span className="bth">
            <HomeIcon className="homeicon" fontSize="large"/>
            <span>Home</span>
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