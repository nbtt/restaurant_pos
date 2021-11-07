import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function BasicTextFields() {
  return (
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
      <TextField centered required id="standard-basic" label="Card number" variant="standard" style={{width: '20vw', minWidth: '200px'}}/>
      <TextField required id="standard-basic" label="CVV" variant="standard" />
      <TextField required id="standard-basic" label="MM/YY" variant="standard" />
    </Box>
  );
}
