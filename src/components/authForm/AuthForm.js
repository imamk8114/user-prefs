import React, { useState } from 'react';
import './AuthForm.css'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const AuthForm = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({ name:'',email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignUp?'create-user':'login';
    try {
        const response = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const json = await response.json()
        console.log(response)
        if (json.success || response.ok){
            const getUser = await fetch(`http://localhost:5000/api/auth/get-user`,{
                method: 'GET',
                headers: {
                'auth-token': json.authtoken,
                },
            })
            const user = await getUser.json();
            onLogin(user)
            localStorage.setItem('token', json.authtoken); 
        }
        else{
            alert("Invalid credentials");
        }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const toggleView = () => {
    setIsSignUp(!isSignUp);
  };

  const textStyle = createTheme({
    palette: {
      primary: grey,
    },
  });

  return (
    <Container component="main" maxWidth="sm">
        <Box
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              px: 4,
              py: 6,
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
        >
        <Typography component="h1" variant="h5">
            {isSignUp ? 'Sign Up' : 'Sign In'}
        </Typography>
        <ThemeProvider theme={textStyle}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {isSignUp && <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleInputChange}
              />}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <Button
                className='auth-button'
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, color:'#fff' }}
              >
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </Button>
            </Box>
            <p className="auth-text">
                {isSignUp? "Already have an account?": "Don't have an account?"}
                <button type="button" onClick={toggleView} className="auth-toggle">
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
            </p>
      </ThemeProvider>
      </Box>
    </Container>
  );
};

export default AuthForm;
