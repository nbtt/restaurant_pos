import { Component } from "react";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import '../style/NewFood.css'

export default class NewFood extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            qty: 1,
            image: '',
            name: '',
            category: '',
            categoryImage: '',
            price: null,
        };
        this.handleImage = this.handleImage.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.handleCategoryImage = this.handleCategoryImage.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
    }

    handleCategoryImage(event) {
        this.setState({
            categoryImage: event.target.value
        });
    }
    handleImage(event) {
        this.setState({
            image: event.target.value
        });
    }
    handleName(event) {
        this.setState({
            name: event.target.value
        });
    }
    handleCategory(event) {
        this.setState({
            category: event.target.value
        });
    }
    handlePrice(event) {
        this.setState({
            price: event.target.value
        });
    }

    render() {
        const {disableAddNew, updateList} = this.props
        return (
        <div className="popup-background">
            <div className="box">
                <div className = "header-bar">
                    <p className="header-content">THÊM MÓN ĂN MỚI</p>
                    <span className="close-icon" onClick={() => disableAddNew()}>x</span>
                    {/* {props.content} */}
                </div>        
                <div className = "body">
                    <div className="img">
                        <div>
                            <label style={{fontWeight: 'bold', marginLeft: '5px'}}>
                                Link Category Image
                            </label>
                            <input 
                                style={{width: '12vw', marginLeft: '5px', marginTop: '10px'}}
                                type="text" 
                                value={this.state.categoryImage}
                                onChange={this.handleCategoryImage}
                            />
                        </div>
                        <div>
                            <label style={{fontWeight: 'bold', marginLeft: '5px'}}>
                                Link Image
                            </label>
                            <input 
                                style={{width: '12vw', marginLeft: '5px', marginTop: '10px'}}
                                type="text" 
                                value={this.state.image}
                                onChange={this.handleImage}
                            />
                        </div>
                    </div>
                    <div className="info">
                        <div className="header-info">
                            <table className="info-table">
                                <thead>
                                    <tr>
                                        <th>SKU</th>
                                        <th>Category</th>
                                        <th>Name</th>
                                        <th>Unit Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input type="text" style={{width: '5vw'}}/>
                                        </td>
                                        <td>
                                            <input value={this.state.category} onChange={this.handleCategory} type="text" style={{width: '5vw'}}/>
                                        </td>
                                        <td>
                                            <input value={this.state.name} onChange={this.handleName} type="text" style={{width: '5vw'}}/>
                                        </td>
                                        <td>
                                           <input value={this.state.price} onChange={this.handlePrice} type="text" style={{width: '3vw'}}/> $
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
                            <b>Protein</b> <br/>
                            <input style={{width: '27vw'}} type="text"/> <br/>
                            <b>Additives</b> <br/>
                            <input style={{width: '27vw'}} type="text"/> <br/>
                            <b>Baking material</b> <br/>
                            <input style={{width: '27vw'}} type="text"/> <br/>
                            <b>Food decoration</b> <br/>
                            <input style={{width: '27vw'}} type="text"/> <br/>
                        </div>
                        <div className="footer-bar" style={{display: 'flex', justifyContent: 'center', marginTop: '13vh'}}>
                            <button onClick={() => {disableAddNew(); updateList(this.state)}}>OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}