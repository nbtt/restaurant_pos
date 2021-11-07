import React, { Component } from "react";
import Slick from "./component/Slick.js";
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Cart from './component/Cart'
import ListSearch from "./component/ListSearch.js";
import FoodDescription from "./component/FoodDescription.js";

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {cart: new Map()}
  }
  render() {
    return (
      <div>
        <div className="header" style={{display: 'flex', alignItems: 'center'}}>
          <div style={{width: '40vw'}}>
            <span className="bth">
              <HomeIcon className="home-icon"/>
              <span style={{color: 'rgba(16, 3, 75, 0.89)'}}>Back to home</span>
            </span >
          </div>
          <div>
            <span style={{color: 'rgba(16, 3, 75, 0.89)'}}>QUẢN LÝ DANH SÁCH MÓN ĂN</span>
          </div>
        </div>
        <div className="body">
          <ListSearch/>
        </div>
        {/* <div>
        <FoodDescription image="https://shipdoandemff.com/wp-content/uploads/2018/05/Hamburger-bò.png" name="a" price="1"/>
        </div> */}
      </div>
    )
  }
}