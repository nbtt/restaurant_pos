import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@material-ui/core/styles';
import QrCode2TwoToneIcon from '@mui/icons-material/QrCode2TwoTone';
import { useState } from 'react'

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

  },
  superCenter: {
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)'
  }


}));

export default function BasicTabs(props) {
  const [value, setValue] = useState(0);
  
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const validCardNumber = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const validPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  const validCVV = /^[0-9]{3}$/;
  const validDate = /^((0[1-9])|(1[0-2]))\/(([2-9][1-9]))$/;

  const isValidPhoneNumber = function(phoneNumber) {
    return (validPhoneNumber.test(phoneNumber)) || (phoneNumber === "" && !props.submited)
  } 

  const isValidCardNumber = function(cardNumber) {
    return (validCardNumber.test(cardNumber)) || (cardNumber === "" && !props.submited)
  }

  const isValidCVV = function(CVV) {
    return (validCVV.test(CVV)) || (CVV === "" && !props.submited)
  }

  const isValidDate = function(date) {
    return (validDate.test(date)) || (date === "" && !props.submited)
  }

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
              <Tab label="Visa" {...a11yProps(0)} onClick={() => props.setTypePayment(0)}/>
              <Tab label="Momo" {...a11yProps(1)} onClick={() => props.setTypePayment(1)}/>
              <Tab label="Cash" {...a11yProps(2)} onClick={() => props.setTypePayment(2)}/>
          </Tabs>
        </Box>

        <TabPanel className={classes.tabpanel} value={value} index={0}>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '20ch' },
            }}
            noValidate
            autoComplete="off"
            alignItems="center"
            justifyContent ="center"
          >
            <TextField error={!isValidPhoneNumber(props.phoneNumberState[0])} centered required id="standard-basic" label="Phone number" variant="standard" style={{width: '10vw', minWidth: '200px'}} onChange={(e) => props.phoneNumberState[1](e.target.value.replace(/\s/g, ''))}/>
            <TextField error={!isValidCardNumber(props.cardNumberState[0])} centered required id="standard-basic" label="Card number" variant="standard" style={{width: '10vw', minWidth: '200px'}} onChange={(e) => props.cardNumberState[1](e.target.value.replace(/\s/g, ''))}/>
            <TextField error={!isValidCVV(props.CVVState[0])} required id="standard-basic" label="CVV" variant="standard" style={{width: '10vw', minWidth: '200px'}} onChange={(e) => props.CVVState[1](e.target.value.replace(/\s/g, ''))}/>
            <TextField error={!isValidDate(props.dateState[0])} required id="standard-basic" label="MM/YY" variant="standard" style={{width: '10vw', minWidth: '200px'}} onChange={(e) => props.dateState[1](e.target.value.replace(/\s/g, ''))}/>
          </Box>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <TextField error={!isValidPhoneNumber(props.phoneNumberState[0])} centered required id="standard-basic" label="Phone number" variant="standard" className={classes.superCenter} style={{width: '90%', minWidth: '200px'}} onChange={(e) => props.phoneNumberState[1](e.target.value.replace(/\s/g, ''))}/>
          <QrCode2TwoToneIcon style={{fontSize: '7rem', position: 'relative', left: '50%', transform: 'translateX(-50%)'}}/>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Box height="10vh" marginTop="50px">
          <TextField error={!isValidPhoneNumber(props.phoneNumberState[0])} centered required id="standard-basic" label="Phone number" variant="standard" className={classes.superCenter} style={{width: '90%', minWidth: '200px', marginBottom: '3vh'}} onChange={(e) => props.phoneNumberState[1](e.target.value.replace(/\s/g, ''))}/>
            <Typography variant='h5' textAlign='center' >Please prepare cash</Typography>
          </Box>
        </TabPanel>
    </Box>
  );
}

