import { Component } from "react";
import '../style/FoodDescription.css'

export default class FoodDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modify: false,
            idcategory: props.food.idcategory,
            categoryImage: props.food.categoryImage,
            image: props.food.image,
            sku: props.food.idcategory + props.food.id,
            category: props.food.category,
            name: props.food.name,
            price: props.food.price,
            protein: props.food.Description['Protein'],
            additives: props.food.Description['Additives'],
            bakingMaterial: props.food.Description['Baking materials'],
            foodDecoration: props.food.Description['Food decoration']
        };

        this.clickModify = this.clickModify.bind(this);
        this.finishModify = this.finishModify.bind(this);
        this.handleCategoryImage = this.handleCategoryImage.bind(this);
        this.handleImage = this.handleImage.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.handleIdCategory = this.handleIdCategory.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.handleProtein = this.handleProtein.bind(this);
        this.handleAdditives = this.handleAdditives.bind(this);
        this.handleBakingMaterial = this.handleBakingMaterial.bind(this);
        this.handleFoodDecoration = this.handleFoodDecoration.bind(this);
    }

    // Modify
    clickModify() {
        this.setState({
            modify: true
        })
    }
    finishModify() {
        this.setState({
            modify: false
        })
    }

    // Handle
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
    handleIdCategory(event) {
        this.setState({
            idcategory: event.target.value
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
        const {food, disableFoodSelected, updateItem} = this.props
        console.log(food)
        return (
            <div className="popup-background">
                <div className="box">
                    <div className = "header-bar">
                        <p className="header-content">MÔ TẢ MÓN ĂN</p>
                        <span className="close-icon" onClick={() => disableFoodSelected()}>x</span>
                    </div>        
                    <div className = "body">
                        <div className="img">
                            <div>
                                {!this.state.modify ?
                                <div>
                                    <label style={{fontWeight: 'bold', marginLeft: '5px'}}>
                                        Category ID: {this.state.idcategory}
                                    </label>
                                </div> :
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
                                </div>}
                            </div>
                            <div>
                                {!this.state.modify ?
                                <div>
                                    <label style={{fontWeight: 'bold', marginLeft: '5px'}}>
                                        Category Image
                                    </label>
                                    <img src={this.state.categoryImage} alt='name' className="pop-img"></img>
                                </div> :
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
                                </div>}
                            </div>
                            <div>
                                {!this.state.modify ?
                                <div>
                                    <label style={{fontWeight: 'bold', marginLeft: '5px'}}>
                                        Dish Image
                                    </label>
                                    <img src={this.state.image} alt='name' className="pop-img"></img>
                                </div> :
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
                                </div>}
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
                                            <th className="last-col">Unit Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {this.state.sku}
                                            </td>
                                            <td>{!this.state.modify ?
                                                this.state.category :
                                                <input value={this.state.category} onChange={this.handleCategory} type="text" style={{width: '5vw'}}/>}
                                            </td>
                                            <td>{!this.state.modify ?
                                                this.state.name :
                                                <input value={this.state.name} onChange={this.handleName} type="text" style={{width: '5vw'}}/>}
                                            </td>
                                            <td className="last-col-row">
                                                {!this.state.modify ? 
                                                this.state.price :
                                                <input value={this.state.price} onChange={this.handlePrice} type="text" style={{width: '3vw'}}/>} VNĐ
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="detail-info">
                                {!this.state.modify ?
                                <div>
                                    <b>Protein:</b> <p style={{color: '#000000'}}>{this.state.protein}</p> <br/> <br/>
                                    <b>Additives:</b> <p style={{color: '#000000'}}>{this.state.additives}</p> <br/> <br/>
                                    <b>Baking material:</b> <p style={{color: '#000000'}}>{this.state.bakingMaterial}</p> <br/> <br/>
                                    <b>Food decoration:</b> <p style={{color: '#000000'}}>{this.state.foodDecoration}</p> <br/> <br/>
                                </div> :
                                <div>
                                    <b>Protein</b> <br/>
                                    <input style={{width: '27vw'}} value={this.state.protein} onChange={this.handleProtein} type="text"/> <br/>
                                    <b>Additives</b> <br/>
                                    <input style={{width: '27vw'}} value={this.state.additives} onChange={this.handleAdditives} type="text"/> <br/>
                                    <b>Baking material</b> <br/>
                                    <input style={{width: '27vw'}} value={this.state.bakingMaterial} onChange={this.handleBakingMaterial} type="text"/> <br/>
                                    <b>Food decoration</b> <br/>
                                    <input style={{width: '27vw'}} value={this.state.foodDecoration} onChange={this.handleFoodDecoration} type="text"/> <br/>
                                </div>
                                }
                                <div className="footer" style={{display: 'flex', justifyContent: 'center', marginTop: '5vh'}}>
                                    {!this.state.modify ? 
                                    <button onClick={this.clickModify}>Chỉnh Sửa</button> :
                                    <button onClick={() => {this.finishModify(); disableFoodSelected(); updateItem(food, this.state)}}>Hoàn tất</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}