import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';

import Typography from '@mui/material/Typography';

export default function ProductList() {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', overflow: 'auto', maxHeight: 400 }}>
        <ListItem>
            <ListItemText primary="   Total cost " />
            <Typography>200000VND</Typography>
        </ListItem>
        <hr/>
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <ImageIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText 
                primary="Photos" 
                secondary={
                    <React.Fragment>
                        <Typography> Price </Typography>
                        <Typography variant="body2">Quantity</Typography>
                    </React.Fragment>
                }/>
                <Typography>Cost</Typography>
        </ListItem>
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <ImageIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText 
                primary="Photos" 
                secondary={
                    <React.Fragment>
                        <Typography> Price </Typography>
                        <Typography variant="body2">Quantity</Typography>
                    </React.Fragment>
                }/>
                <Typography>Cost</Typography>
        </ListItem>
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <ImageIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText 
                primary="Photos" 
                secondary={
                    <React.Fragment>
                        <Typography> Price </Typography>
                        <Typography variant="body2">Quantity</Typography>
                    </React.Fragment>
                }/>
                <Typography>Cost</Typography>
        </ListItem>
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <ImageIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText 
                primary="Photos" 
                secondary={
                    <React.Fragment>
                        <Typography> Price </Typography>
                        <Typography variant="body2">Quantity</Typography>
                    </React.Fragment>
                }/>
                <Typography>Cost</Typography>
        </ListItem>
    </List>
  );
}
