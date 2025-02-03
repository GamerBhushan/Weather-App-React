// import * as React from 'react';
import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SendIcon from '@mui/icons-material/Send';
// import Stack from '@mui/material/Stack';

export const WeatherAppMUI = ()  => {
  return (
    ButtonAppBar()
  );
}


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
          variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Weather App
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

