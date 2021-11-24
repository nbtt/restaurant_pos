import React, { Component } from "react";
import HomeIcon from '@material-ui/icons/Home';
import Table from "./component/board.js";
import socketIOClient from "socket.io-client";

var serversocket = socketIOClient('http://127.0.0.1:5000')

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
        </div>
        <div>
          <Table/>
        </div>
      </div>
    )
  }
}

export {serversocket}