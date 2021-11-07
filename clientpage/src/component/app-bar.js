import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

export default function ButtonAppBar() {
  return (
      <AppBar position="static" style={{backgroundColor: "white", color: "black"}}>
        <Toolbar style={{height: '100%'}}>
          
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              component={Link} to={'/'}
            >
              <ArrowBackIcon/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} component={Link} to={'/'} style={{textDecoration: 'none '}}>
              Back
            </Typography>
          

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PAYMENT
          </Typography>
        </Toolbar>
      </AppBar>
  );
}
