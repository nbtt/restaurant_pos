import React, { Component } from "react";
import Slider from "react-slick";
import Select from 'react-select';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ListProduct from "./ListProduct"
import '../style/slick.css'
import data from '../data/data'
import Popup from './Popup'
import queryTypes from '../data/types'

export default class Slick extends Component {
    constructor(props) {
        super(props)
        this.setType = this.setType.bind(this)
        this.state = { type: 0 };
    }

    setType(id) {
        this.setState({type: id})
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
            slidesToShow: 8,
            slidesToScroll: 8,
            nextArrow: <NextBtn />,
            prevArrow: <PrevBtn />,
            // responsive: [
            // {
            //     breakpoint: 1200,
            //     settings: {
            //         slidesToShow: 5,
            //         slidesToScroll: 5,
            //     }
            // },
            // {
            //     breakpoint: 1000,
            //     settings: {
            //         slidesToShow: 4,
            //         slidesToScroll: 4,
            //     }
            // },
            // {
            //     breakpoint: 800,
            //     settings: {
            //         slidesToShow: 3,
            //         slidesToScroll: 3
            //     }
            // },
            // {
            //     breakpoint: 650,
            //     settings: {
            //         slidesToShow: 2,
            //         slidesToScroll: 2
            //     }
            // }]
        };
        const options = [
            { value: 'lowtohigh', label: 'Thấp đến Cao' },
            { value: 'hightolow', label: 'Cao đến Thấp' }
        ]
        
        return (
            <div>
                <div className='slick'>
                    <Slider className='slider' {...settings}>
                        {queryTypes().map((item) => <Slide key={item.id} item={item} setType={this.setType} type={this.state.type}/>)}
                    </Slider>
                    <div className="kind-of-food">
                        <div className="name-of-kind-food">
                            <h2 style={{marginTop: '1vh'}}>{queryTypes()[this.state.type].name }</h2>
                        </div> 
                        <div className="modify">   
                            <label>
                                Sắp xếp theo:
                                <button className="sort-by-name">Tên</button>
                            </label>
                            <Select options={options} className="price" placeholder="Giá" isSearchable/>
                        </div>
                    </div>
                </div>

                <div className = 'hidden'>
                    <Popup/>
                </div>
                <div className='listProduct'>
                    <ListProduct products={data(this.state.type)}/>
                </div>
            </div>
        );
    }
}

class Slide extends Component {
    render() {
        const {item, setType, type } = this.props
        return (
            <div>
                <div className={'slide'+ (type === item.id ? ' active' : '')} onClick={() => setType(item.id)}>
                    <img src={item.img} alt={item.name} />
                    <span>{item.name}</span>
                </div>
            </div>
        );
    }
}


