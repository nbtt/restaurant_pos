import { Component } from "react";
import '../style/FoodDescription.css'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { CartContext } from "../contexts/CartContext";

export default class FoodDescription extends Component {
    constructor(props) {
        super(props)
        this.state = { qty: 1 };
    }

    render() {
        const {food, setFood, typeID} = this.props
        return (
            <div className="popup-background">
            <div className="box">
              <div className = "header-bar">
                  <p className="header-content">ART TO CART</p>
                  <span className="close-icon" onClick={() => setFood(-1)}>x</span>
                  {/* {props.content} */}
              </div>        
              <div className = "body">
                  <div className="img">
                      <img src={food.image} alt='name' className="pop-img"></img>
                  </div>
                  <div className="info">
                      <div className="header-info">
                          <table className="info-table">
                              <thead>
                                  <tr>
                                      <th>SKU</th>
                                      <th>{food.name}</th>
                                      <th className="last-col">Unit Price</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr>
                                      <td>401</td>
                                      <td>Burgur</td>
                                      <td className="last-col-row">{food.price} VND</td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                      <div className="quantity">
                          <span className="quantity-text">Quantity</span>
                          <span className="controlQty">
                                <RemoveOutlinedIcon className="sub" onClick={() => this.setState({qty: this.state.qty > 1 ? this.state.qty - 1 : 1})}/>
                                <span className="valueQty"> {this.state.qty} </span>
                                <AddOutlinedIcon className="add" onClick={() => this.setState({qty: this.state.qty + 1})}/>
                          </span>   
                      </div>
                      <div className="detail-info">
                          {Object.keys(food.Description).map( k => <div><b>{k} </b> : <p> {food.Description[k]}</p></div>)}         
                      </div>
                      <div className="side-dishes"> 
                          {/* <span>Side dishes (<b>*</b>): </span> <p >Selected quantity 0</p> <br/> */}
                          <article>Please select one of the properties below </article>
                          <div className="dishes">
                              <input className="check-box-dish" id="check-dish" type="checkbox" name="default-check" value="vegetables"/>
                              <label for="check-dish">Vegetables</label>
                          </div>
                      </div>
                      <CartContext.Consumer>
                        {({ addFood }) => (
                            <div className="paymentButton" onClick={() => {addFood(typeID, food, this.state.qty); setFood(-1)}}>
                                <ShoppingCartOutlinedIcon className="cart-payment"/> 
                                <p>{food.price * this.state.qty} VND</p>
                            </div>
                        )}
                      </CartContext.Consumer>
                  </div>
              </div>
            </div>
          </div>
        );
    }
}