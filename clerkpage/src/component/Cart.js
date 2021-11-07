import React, { Component } from "react";
import '../style/cart.css'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Grid from "@material-ui/core/Grid";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';

export default class Cart extends Component {
    render() {
        return (
            <div className='cart'>
                <span className="cartbutton inCart">
                    <ShoppingCartIcon/>
                    <span>Your Cart</span>
                </span>
                <div className="listItem">
                    <Grid container>
                        <Grid item xs={12}>
                            <CartItem/>
                        </Grid>
                        <Grid item xs={12}/>
                    </Grid>
                </div>

            </div>
        )
    }
}

class CartItem extends Component {
    render() {
        const src = 'https://shipdoandemff.com/wp-content/uploads/2018/05/Hamburger-bò.png'
        return (
            <div className="item">
                <img src={src} alt='name'></img>
                <div className="iteminfo">
                    <h3 className= 'itemhead'>name</h3>
                    <div className='itembody'>
                        <span className="control">
                            <RemoveOutlinedIcon className='sub'/>
                            <span>1</span>
                            <AddOutlinedIcon className='add'/>
                        </span>
                        <span className='itemprice'>
                            <div className='price'>
                                $ price
                            </div>
                            <div style={{fontSize: '11px'}}>
                                (tax bla bla abc xyz)
                            </div>
                            
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}