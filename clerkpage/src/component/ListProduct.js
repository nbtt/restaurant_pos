import React, { Component } from "react";
import '../style/listProduct.css'
import Grid from "@material-ui/core/Grid";

export default class ListProduct extends Component{
    render() {
        const { products } = this.props
        return (
            <div className="products">
                <Grid container spacing={4}>
                    {products.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                            <Product product={product}></Product>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
}

class Product extends Component{
    render() {
        const {product} = this.props
        return (
            <div className="product">
                <img src={product.image} alt={product.name} />
                <h3 className="nameProduct">{product.name}</h3>
                <div className="bottomProduct">
                    <span className="price"> $ {product.price}</span>
                </div>
            </div>
        );
    }
}