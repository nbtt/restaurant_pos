import { Component } from "react";
import '../style/ListFood.css'
import Grid from "@material-ui/core/Grid";
// import { ShoppingCartOutlined } from "@material-ui/icons";

export default class ListFood extends Component{
    render() {
        const { foods, setFoodDescription } = this.props
        return (
            <div>
                <Grid container spacing={3}>
                    {foods.map((food) => (
                        <Grid item key={food.id} xs={12} sm={6} md={4} lg={3}>
                            <Food food={food} setFoodDescription={setFoodDescription}></Food>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
}

class Food extends Component{
    render() {
        const {food, setFoodDescription} = this.props
        return (
            <div className="Food" onClick={() => setFoodDescription(food.id)}>
                <img src={food.image} alt={food.name} />
                <h3 className="NameFood">{food.name}</h3>
                <div className="BottomFood">
                    <span className="Price">{food.price} VND</span>
                    {/* <ShoppingCartOutlined className="IconCart" fontSize="small"/> */}
                </div>
            </div>
        );
    }
}