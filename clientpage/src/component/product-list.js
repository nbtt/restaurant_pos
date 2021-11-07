import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Box from '@mui/material/Box';
import { CartContext } from "../contexts/CartContext";

import Typography from '@mui/material/Typography';

export default function ProductList() {
  return (
    <CartContext.Consumer>
    {({cartItems, editQuantity, deleteFood, total}) => (
        <List sx={{ width: '100%', bgcolor: 'background.paper', overflow: 'auto', maxHeight: 400 }}>
            <ListItem>
                <ListItemText primary="   Total cost " />
                <Typography>{total} VND</Typography>
            </ListItem>
            <hr/>
                {
                    cartItems.map((cartItem) => (
                        <ListItem>
                            <ListItemAvatar>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    '& > :not(style)': {
                                    m: 1,
                                    width: 128,
                                    height: 128,
                                    },
                                }}
                                >
                                <img src={cartItem.food.image} alt=''/>
                                </Box>
                                
                            </ListItemAvatar>
                            <ListItemText 
                                primary={cartItem.food.name}
                                secondary={
                                    <React.Fragment>
                                        <Typography> {cartItem.food.price} VND</Typography>
                                        <Typography variant="body2">{cartItem.qty}</Typography>
                                    </React.Fragment>
                                }/>
                                <Typography>{cartItem.food.price * cartItem.qty} VND</Typography>
                        </ListItem>
                    ))
                }
            
        </List>
        )}
    </CartContext.Consumer>
  );
}
