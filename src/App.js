import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import AuthForm from './components/authForm/AuthForm';
import {Button} from '@mui/material'

const GUEST_USER = {name:'Guest', color:'default'};
export const UserContext = createContext(GUEST_USER);

function App() {
  const [theme, setTheme] = useState('default');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] =useState(GUEST_USER);


  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    document.documentElement.style.setProperty('--primary-color', getThemeColor(selectedTheme));
  };

  const getThemeColor = (selectedTheme) => {
    // Define your theme color mappings here
    const themeColors = {
      default: '#2196F3',
      dark: '#333',
      red: '#FF5733',
      purple: '#663399',
    };

    return themeColors[selectedTheme] || themeColors.default;
  };

  const handleLogin = (user) => {
    setUser(user)
    handleThemeChange(user.color.toLowerCase())
    setIsLoggedIn(true);
  };

  const handleLogout = () =>{
    setIsLoggedIn(false)
    setUser(GUEST_USER)
    handleThemeChange('default')
  }

  const handlePrefs = async(e) =>{
    e.preventDefault();
    try{
      const response = await fetch(`http://localhost:5000/api/auth/update-color`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({color:theme}),
        });
        const prefs = await response.json();
        console.log(prefs)
    }catch(error){
      console.error(error)
    }
  }

  return (
    <div className={`App ${theme}`}>
      <UserContext.Provider value={user}>
      <Header onThemeChange={handleThemeChange} />
      <main>
        {isLoggedIn ? (
          // Display authenticated content here
          <p>Welcome, {user.name?.charAt(0).toUpperCase() + user.name?.slice(1)} you are logged in!</p>
        ) : (
          <AuthForm onLogin={handleLogin} />
        )}
      </main>
      {isLoggedIn && <><Button onClick={handlePrefs} variant="contained">Save Prefs</Button> <Button onClick={handleLogout} variant="contained">Logout</Button></>}
      </UserContext.Provider>
    </div>
  );
}

export default App;
