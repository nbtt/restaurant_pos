import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core/styles';
import BasicTabs from './tab-pay';
import { Button } from '@mui/material';
import Link from '@mui/material/Link';



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

export default function FullWidthGrid() {
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
                        <img src= {logo} style={{width: "10vw"}}></img> 
                    </Item>
                </Grid>
                <Grid item xs={12} >
                   <BasicTabs/>
                </Grid>
                <Grid item xs={12} md={12} >
                    <Link href="#" alignItems="center" underline="none">
                        <Button variant="text" style={{position: 'relative', left: '50%', transform: 'translateX(-50%)'}}>
                            PAY 25000VND
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={12} md={8} ></Grid>
                <Grid item xs={12} md={4} >
                    <Link href="#" alignItems="center" underline="none">
                        <Button variant="text" style={{position: 'relative', left: '50%', transform: 'translateX(-50%)'}}>
                            CANCEL
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </div>
  );
}