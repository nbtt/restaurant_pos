import React, { Component, useState } from 'react'
import ButtonAppBar from './app-bar';
import '../style/payment.css'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core/styles';
import BasicTabs from './tab-pay';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { CartContext } from "../contexts/CartContext";
import logo from '../Logo BK.png'
import {useNavigate} from 'react-router-dom';

export default class Payment extends Component {
    render(){
        return (
            <div className="container">
                <ButtonAppBar/>
                <div className = "payment-field" >
                    <div className="payment-box">
                        <FullWidthGrid/>
                    </div>
                </div>
            </div>
            
        );
    }
}

const useStyles = makeStyles(theme => ({
    root:{
        flexGrow: 1
    },
    paper:{
        padding: theme.spacing(2),
        textAlign: "center"
    }
}));

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    
  }));

function FullWidthGrid() {
    const classes = useStyles();
    const [submited, setsubmited] = useState(false)
    const [typePayment, setTypePayment] = useState(0)
    const [phoneNumer, setPhoneNumber] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [CVV, setCVV] = useState("")
    const [date, setDate] = useState("")
    
    const validCardNumber = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const validPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    const validCVV = /^[0-9]{3}$/;
    const validDate = /^((0[1-9])|(1[0-2]))\/(([2-9][1-9]))$/;

    const isValidPhoneNumber = function(phoneNumber) {
        return (validPhoneNumber.test(phoneNumber)) && (phoneNumber !== "")
      } 
    
      const isValidCardNumber = function(cardNumber) {
        return (validCardNumber.test(cardNumber)) && (cardNumber !== "")
      }
    
      const isValidCVV = function(CVV) {
        return (validCVV.test(CVV)) && (CVV !== "")
      }
    
      const isValidDate = function(date) {
        return (validDate.test(date)) && (date !== "")
      }

    const navigate = useNavigate();

    const submit = function(cartItems) {
        setsubmited(true)
        
        if (isValidPhoneNumber(phoneNumer) && (typePayment !== 0 || (isValidCardNumber(cardNumber) && isValidCVV(CVV) && isValidDate(date)))) {
            var listDish = []
            for (var i = 0; i < cartItems.length; i++) {
                var dish = {
                    typeID: cartItems[i].typeID,
                    foodID: cartItems[i].food.id,
                    quantity: cartItems[i].qty
                }
                listDish.push(dish)
            }
            
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({phoneNumber: phoneNumer, listDish: listDish})
            };

            fetch('/api/dishes_management/add', requestOptions)
            navigate("/payment-done");
        }
    }

    return (
        <CartContext.Consumer>
        {({total, cartItems}) => (
            <div className={classes.root}>
            <Grid container spacing={2}>    
                <Grid item xs={2}/>
                <Grid item xs={8}  style={{height: "10vh", display: "flex"}}>
                    <Item style={{boxShadow: "none", flexGrow: "1"}}> BK FOOD </Item>
                    <Item style={{boxShadow: "none", flexGrow: "1"}}> {total}VND </Item>
                </Grid>
                <Grid item xs={2}/>

                <Grid item xs={12} >
                    <Item style={{boxShadow: "none", flexGrow: "1"}}> 
                        <img src= {logo} style={{width: "10vw"}} alt=""></img> 
                    </Item>
                </Grid>
                <Grid item xs={12} >
                   <BasicTabs phoneNumberState={[phoneNumer, setPhoneNumber]} cardNumberState={[cardNumber, setCardNumber]} 
                                CVVState={[CVV, setCVV]} dateState={[date, setDate]} submited={submited} setTypePayment={setTypePayment}/>
                </Grid>
                <Grid item xs={12} md={12} >
                        <Button variant="text" style={{position: 'relative', left: '50%', transform: 'translateX(-50%)', textDecoration: 'none'}} onClick={() => submit(cartItems)}>
                            PAY {total}VND
                        </Button>
                    
                </Grid>
                <Grid item xs={12} md={8} ></Grid>
                <Grid item xs={12} md={4} >
                 
                        <Button component={Link} to={'/'} variant="text" style={{position: 'relative', left: '50%', transform: 'translateX(-50%)', textDecoration: 'none'}}>
                            CANCEL
                        </Button>

                </Grid>
            </Grid>
        </div> )}
        </CartContext.Consumer>
  );
}
