import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ButtonAppBar() {
  return (
      <AppBar position="static" style={{backgroundColor: "white", color: "black"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Back
          </Typography>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PAYMENT
          </Typography>

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
  );
}
