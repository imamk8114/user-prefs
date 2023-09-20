// src/components/Header.js
import React, { useContext } from 'react';
import { UserContext } from '../../App'
import { MenuItem, Select, FormControl,InputLabel, Avatar } from '@mui/material';
import './Header.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';

function Header({ onThemeChange }) {
  const user = useContext(UserContext)
  const handleThemeChange = (event) => {
    const selectedTheme = event.target.value;
    onThemeChange(selectedTheme);
  };

  const textStyle = createTheme({
    palette: {
      primary: blueGrey,
    },
  });

  return (
    <header>
      <h1>User Preference Management</h1>
      <ThemeProvider theme={textStyle}>
      <FormControl variant="outlined" >
        <InputLabel id="theme-label">Select Theme</InputLabel>
        <Select
          labelId="theme-label"
          label="Select Theme"
          onChange={handleThemeChange}
          defaultValue={user.color}
        >
          <MenuItem value="default">Default</MenuItem>
          <MenuItem value="dark">Dark</MenuItem>
          <MenuItem value="red">Red</MenuItem>
          <MenuItem value="purple">Purple</MenuItem>
        </Select>
      </FormControl>
      </ThemeProvider>
      <div className='avatar'>
        <Avatar>{user?.name?.charAt(0)}</Avatar>
        <span>{`Hi, ${user.name?.charAt(0).toUpperCase() + user.name?.slice(1)}!`}</span>
      </div>
      
    </header>
  );
}

export default Header;