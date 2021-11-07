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
        <div className={classes.root}>
            <Grid container spacing={2}>    
                <Grid item xs={2}/>
                <Grid item xs={8}  style={{height: "10vh", display: "flex"}}>
                    <Item style={{boxShadow: "none", flexGrow: "1"}}> BK FOOD </Item>
                    <Item style={{boxShadow: "none", flexGrow: "1"}}> 25000VND </Item>
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
                    <Link to="/payment-done" alignItems="center" underline="none">
                        <Button variant="text" style={{position: 'relative', left: '50%', transform: 'translateX(-50%)'}}>
                            PAY 25000VND
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={12} md={8} ></Grid>
                <Grid item xs={12} md={4} >
                    <Link to="/" alignItems="center" underline="none">
                        <Button variant="text" style={{position: 'relative', left: '50%', transform: 'translateX(-50%)'}}>
                            CANCEL
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </div>
  );
}
