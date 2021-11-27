import { Component } from "react";
import '../style/NewFood.css'

export default class NewFood extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idcategory: '',
            categoryImage: '',
            image: '',
            category: '',
            name: '',
            price: null,
            protein: null,
            additives: null,
            bakingMaterial: null,
            foodDecoration: null
        };

        this.handleIdCategory = this.handleIdCategory.bind(this);
        this.handleCategoryImage = this.handleCategoryImage.bind(this);
        this.handleImage = this.handleImage.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.handleProtein = this.handleProtein.bind(this);
        this.handleAdditives = this.handleAdditives.bind(this);
        this.handleBakingMaterial = this.handleBakingMaterial.bind(this);
        this.handleFoodDecoration = this.handleFoodDecoration.bind(this);
    }

    // Handle
    handleIdCategory(event) {
        this.setState({
            idcategory: event.target.value
        });
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
    handleCategory(event) {
        this.setState({
            category: event.target.value
        });
    }
    handleName(event) {
        this.setState({
            name: event.target.value
        });
    }
    handlePrice(event) {
        this.setState({
            price: event.target.value
        });
    }
    handleProtein(event) {
        this.setState({
            protein: event.target.value
        });
    }
    handleAdditives(event) {
        this.setState({
            additives: event.target.value
        });
    }
    handleBakingMaterial(event) {
        this.setState({
            bakingMaterial: event.target.value
        });
    }
    handleFoodDecoration(event) {
        this.setState({
            foodDecoration: event.target.value
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
                    </div>        
                    <div className = "body">
                        <div className="img">
                            <div>
                                <label style={{fontWeight: 'bold', marginLeft: '5px'}}>
                                    Category ID
                                </label>
                                <input 
                                    style={{width: '12vw', marginLeft: '5px', marginTop: '10px'}}
                                    type="text" 
                                    value={this.state.idcategory}
                                    onChange={this.handleIdCategory}
                                />
                            </div>
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
                                            <th>Category</th>
                                            <th>Name</th>
                                            <th>Unit Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <input value={this.state.category} onChange={this.handleCategory} type="text" style={{width: '5vw'}}/>
                                            </td>
                                            <td>
                                                <input value={this.state.name} onChange={this.handleName} type="text" style={{width: '5vw'}}/>
                                            </td>
                                            <td>
                                            <input value={this.state.price} onChange={this.handlePrice} type="text" style={{width: '3vw'}}/> VNĐ
                                            </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="detail-info">
                                <b>Protein</b> <br/>
                                <input style={{width: '27vw'}} value={this.state.protein} onChange={this.handleProtein} type="text"/> <br/>
                                <b>Additives</b> <br/>
                                <input style={{width: '27vw'}} value={this.state.additives} onChange={this.handleAdditives} type="text"/> <br/>
                                <b>Baking material</b> <br/>
                                <input style={{width: '27vw'}} value={this.state.bakingMaterial} onChange={this.handleBakingMaterial} type="text"/> <br/>
                                <b>Food decoration</b> <br/>
                                <input style={{width: '27vw'}} value={this.state.foodDecoration} onChange={this.handleFoodDecoration} type="text"/> <br/>
                                <div className="footer" style={{display: 'flex', justifyContent: 'center', marginTop: '5vh'}}>
                                    <button onClick={() => {disableAddNew(); updateList(this.state)}}>OK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}