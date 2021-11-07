import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BasicTextFields from './text-field';
import { makeStyles } from '@material-ui/core/styles';
import { margin } from '@mui/system';
import QrCode2TwoToneIcon from '@mui/icons-material/QrCode2TwoTone';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root:{
      flexGrow: 1
  },
  tabpanel: {
    marginLeft: "10%",
    marginRight: "auto"

}
}));
export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
        <Box  >
          <Tabs value={value} 
            onChange={handleChange} 
            aria-label="basic tabs example"
            textColor="secondary"
            indicatorColor="secondary"
            centered
          >
              <Tab label="Visa" {...a11yProps(0)} />
              <Tab label="Momo" {...a11yProps(1)} />
              <Tab label="Cash" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel  className={classes.tabpanel}
          value={value} 
          index={0} 
        >
          < BasicTextFields className ={classes.textFieldBox}/>
          
        </TabPanel>
        <TabPanel value={value} index={1}>
          <QrCode2TwoToneIcon style={{fontSize: '7rem', position: 'relative', left: '50%', transform: 'translateX(-50%)'}}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box height="10vh" marginTop="5vh">
            <Typography variant='h5' textAlign='center'>You are so corny for payment via cash</Typography>
          </Box>
        </TabPanel>
    </Box>
  );
}
