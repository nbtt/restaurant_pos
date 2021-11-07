import React from "react";
import '../style/popup.css'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

const Popup = props => {
const img_burger = 'https://shipdoandemff.com/wp-content/uploads/2018/05/Hamburger-b%C3%B2.png';
return (
    <div className="popup-background">
      <div className="box">
        <div className = "header-bar">
            <p className="header-content">ART TO CART</p>
            <span className="close-icon" onClick={props.handleClose}>x</span>
            {/* {props.content} */}
        </div>
        <div className = "body">
            <div className="img">
                <img src={img_burger} alt='name' className="pop-img"></img>
            </div>
            <div className="info">
                <div className="header-info">
                    <table className="info-table">
                        <thead>
                            <tr>
                                <th>SKU</th>
                                <th>Hamburger</th>
                                <th className="last-col">Unit Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>401</td>
                                <td>Burgur</td>
                                <td className="last-col-row">kr 123,00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="quantity">
                    Quantity
                    <div className="adj">
                        <AddOutlinedIcon className="add"/>
                        <span> 1 </span>
                        <RemoveOutlinedIcon className="sub"/>
                    </div>   
                </div>
                <div className="detail-info">
                    <b>Protein:</b> <p>What is lorem ipsum</p> <br/>
                    <b>Additives:</b> <p>What is lorem ipsum</p> <br/>
                    <b>Baking material:</b> <p>What is lorem ipsum</p> <br/>
                    <b>Food decration:</b> <p>What is lorem ipsum</p> <br/>
    
                </div>
                <div className="side-dishes"> 
                    <span>Side dishes (<b>*</b>): </span> <p >Selected quantity 0</p> <br/>
                    <article>Please select one of the properties below </article>
                    <div className="dishes">
                        <input className="check-box-dish" id="check-dish" type="checkbox" name="default-check" value="vegetables"/>
                        <label for="check-dish">Vegetables</label>
                    </div>
                </div>
                <div className="payment">
                   <ShoppingCartOutlinedIcon className="cart-payment"/> 
                   <p>Kr 123,00</p>
                </div>
            </div>
        </div>
        
        
      </div>
    </div>
  );
};

export default Popup;