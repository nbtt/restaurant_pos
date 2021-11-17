import { Component } from "react";
import ListFoodType from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ListFood from "./ListFood"
import '../style/Menu.css'
// import data from '../data/data'
import FoodDescription from './FoodDescription'
// import queryTypes from '../data/types'


export default class Menu extends Component {
    constructor(props) {
        super(props)
        this.setFoodType = this.setFoodType.bind(this)
        this.setFoodDescription = this.setFoodDescription.bind(this)
        this.state = { typeID: 0,
                       foodID: -1,
                       types: [],
                       foods: []};
        
        fetch('/api/dishes_management/types/all').then(
            (u) => u.json()
        ).then(
            (data) => {this.setState({types: data})}
        );

        fetch('/api/dishes_management/dishes?id=' + 0).then(
            (u) => u.json()
        ).then(
            (data) => {this.setState({foods: data})}
        );
    }

    setFoodType(id) {
        this.setState({typeID: id})

        fetch('/api/dishes_management/dishes?id=' + id).then(
            (u) => u.json()
        ).then(
            (data) => {this.setState({foods: data})}
        );
    }

    setFoodDescription(id) {
        this.setState({foodID: id})
    }
    

    render() {
        const NextBtn = (props) => (
            <button {...props} className={'next_button'}/>
        );
        const PrevBtn = (props) => (
            <button {...props} className={'prev_button'}/>
        );
        const settings = {
            infinite: false,
            speed: 300,
            slidesToShow: 6,
            slidesToScroll: 6,
            nextArrow: <NextBtn />,
            prevArrow: <PrevBtn />,
            responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }]
        };
        return (
            <div>
                <div className='Menu'>
                    <ListFoodType className='ListFoodType' {...settings}>
                        {this.state.types.map((item) => <FoodType key={item.id} item={item} setFoodType={this.setFoodType} type={this.state.typeID}/>)}
                    </ListFoodType>
                    {/* <h2 style={{ textAlign: "left", margin: "10px 20px 10px 20px" }}>{this.state.types[this.state.typeID].name}</h2> */}
                </div>
                <div className='ListFood'>
                    <ListFood foods={this.state.foods} setFood={this.setFoodDescription}/>
                </div>
                <div>
                    {this.state.foodID !== -1 ? <FoodDescription food={this.state.foods.find(element => element.id === this.state.foodID)} setFood={this.setFoodDescription} typeID={this.state.typeID}/> : <div/>}
                </div>
            </div>
        );
    }
}

class FoodType extends Component {
    render() {
        const {item, setFoodType, type } = this.props
        return (
            <div>
                <div className={'FoodType'+ (type === item.id ? ' active' : '')} onClick={() => setFoodType(item.id)}>
                    <img src={item.img} alt={item.name} />
                    <span>{item.name}</span>
                </div>
            </div>
        );
    }
}


