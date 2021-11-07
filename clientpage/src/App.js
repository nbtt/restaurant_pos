import { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import ClientPage from "./component/clientpage.js";
import Payment from "./component/payment.js";
import { CartProvider } from "./contexts/CartContext.js";
import PaymentDone from "./component/payment-done.js";

export default class App extends Component {
  render() {
    return (
      <Router>
        <CartProvider>
          <Routes>
            <Route path="/" element={<ClientPage/>}/>
            <Route path="/payment" element={<Payment/>}/>
            <Route path="/payment-done" element={<PaymentDone/>}/>
          </Routes>
        </CartProvider>
      </Router>
    )
  }
}