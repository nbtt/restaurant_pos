import React, { Component } from 'react'
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
    const logo = 'https://shipdoandemff.com/wp-content/uploads/2018/05/Hamburger-bò.png'
    return (
        <CartContext.Consumer>
        {({total}) => (
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
                   <BasicTabs/>
                </Grid>
                <Grid item xs={12} md={12} >
                    
                        <Button component={Link} to={'/payment-done'} variant="text" style={{position: 'relative', left: '50%', transform: 'translateX(-50%)', textDecoration: 'none'}}>
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
