import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import OrderManagement from "./component/OrderManagement.js";
import ListFoodManagement from "./component/ListFoodManagement"
import socketIOClient from "socket.io-client";

var serversocket = socketIOClient('http://127.0.0.1:5000')

export default class App extends Component {
  render() {
    return (
      <div>
      <Router>
        <Routes>
          <Route path="/" element={<OrderManagement/>}/>
          <Route path="/foodManagement" element={<ListFoodManagement/>}/>
        </Routes>
      </Router>
      </div>
    )
  }
}

export {serversocket}