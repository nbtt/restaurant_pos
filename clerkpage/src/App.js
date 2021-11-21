import React, { Component } from "react";
import HomeIcon from '@material-ui/icons/Home';
import ListFoodManagement from "./component/ListFoodManagement";

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
              <span style={{color: 'rgba(16, 3, 75, 0.89)'}}>Đi đến QUẢN LÝ ĐƠN HÀNG  </span>
            </span >
          </div>
          <div>
            <span style={{color: 'rgba(16, 3, 75, 0.89)'}}>QUẢN LÝ DANH SÁCH MÓN ĂN</span>
          </div>
        </div>
        <div className="body">
          <ListFoodManagement/>
        </div>
      </div>
    )
  }
}