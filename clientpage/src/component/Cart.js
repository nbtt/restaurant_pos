import { Component } from "react";
import {Link} from 'react-router-dom'
import '../style/cart.css'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Grid from "@material-ui/core/Grid";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import { CartContext } from "../contexts/CartContext";
import { Button } from '@mui/material';

export default class Cart extends Component {
    render() {
        return (
            <CartContext.Consumer>
                {({cartItems, editQuantity, deleteFood, total}) => (
                    <div className='cart'>
                        <span className="cartbutton inCart">
                            <ShoppingCartIcon/>
                            <span>Your Cart</span>
                        </span>
                        <div className="listItem">
                                    <Grid container>
                                        {cartItems.map((cartItem) => (
                                            <Grid item xs={12}>
                                                <CartItem cartItem={cartItem} editQuantity={editQuantity} deleteFood={deleteFood}/>
                                            </Grid>
                                        ))}
                                    </Grid>
                        </div>
                        <div className='payment'>
                            <div className='orderPrice'>
                                <span className='orderPriceText'>Total: </span>
                                <span className='itemprice'>
                                    <div className='Price'>
                                        {total} VND
                                    </div>
                                    <div style={{fontSize: '11px'}}>
                                        {/* (Incl tax bla bla abc xyz) */}
                                    </div>
                                </span>
                            </div>
                            <div>
                                <Button disabled={cartItems.length === 0} component={Link} to={'/payment'} className='paymentButton'>
                                    PAYMENT
                                </Button>
                            </div>
                        </div>
                    </div>   
                )}
            </CartContext.Consumer>
        )
    }
}

class CartItem extends Component {
    render() {
        const {cartItem, editQuantity, deleteFood} = this.props
        return (
            <div className="item">
                <img src={cartItem.food.image} alt=''></img>
                <div className="iteminfo">
                    <h3 className= 'itemhead'>
                       <span className="itemname">{cartItem.food.name}</span>
                       <span className='removeitem' onClick={() => deleteFood(cartItem.food)}>X</span> 
                    </h3>
                    <div className='itembody'>
                        <span className="control">
                            <RemoveOutlinedIcon className='sub' onClick={() => editQuantity(cartItem.food, -1)}/>
                                <span>{cartItem.qty}</span>
                            <AddOutlinedIcon className='add' onClick={() => editQuantity(cartItem.food, 1)}/>
                        </span>
                        <span className='itemprice'>
                            <div className='Price'>
                                {cartItem.food.price * cartItem.qty} VND
                            </div>
                            <div style={{fontSize: '11px'}}>
                                {/* (Incl tax bla bla abc xyz) */}
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}