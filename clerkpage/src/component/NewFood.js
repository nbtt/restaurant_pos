import { Component } from "react";
import '../style/FoodDescription.css'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import '../style/NewFood.css'

export default class NewFood extends Component {
    constructor(props) {
        super(props)
        this.state = { qty: 1 };
    }

    render() {
        const {setFoodID, updateList} = this.props
        return (
        <div className="popup-background">
            <div className="box">
                <div className = "header-bar">
                    <p className="header-content">THÊM MÓN ĂN MỚI</p>
                    <span className="close-icon" onClick={() => setFoodID(-2)}>x</span>
                    {/* {props.content} */}
                </div>        
                <div className = "body">
                    <div className="img">
                        <img src="abc" alt='name' className="pop-img"></img>
                    </div>
                    <div className="info">
                        <div className="header-info">
                            <table className="info-table">
                                <thead>
                                    <tr>
                                        <th>SKU</th>
                                        <th>Name</th>
                                        <th className="last-col">Unit Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input type="text" style={{width: '6vw'}}/>
                                        </td>
                                        <td>
                                            <input type="text" style={{width: '6vw'}}/>
                                        </td>
                                        <td className="last-col-row">
                                           <input type="text" style={{width: '3vw'}}/> $
                                        </td>
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
                            <b>Protein:</b> <input type="text"/> <br/>
                            <b>Additives:</b> <input type="text"/> <br/>
                            <b>Baking material:</b> <input type="text"/> <br/>
                            <b>Food decration:</b> <input type="text"/> <br/>
                        </div>
                        <div className="side-dishes"> 
                            <span>Side dishes (<b>*</b>): </span> <p >Selected quantity 0</p> <br/>
                            <article>Please select one of the properties below </article>
                            <div className="dishes">
                                <input className="check-box-dish" id="check-dish" type="checkbox" name="default-check" value="vegetables"/>
                                <label for="check-dish">Vegetables</label>
                            </div>
                        </div>
                        <div className="footer-bar" style={{justifyContent: 'center', display: 'flex'}}>
                            <button onClick={() => {setFoodID(-2); updateList()}}>OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}