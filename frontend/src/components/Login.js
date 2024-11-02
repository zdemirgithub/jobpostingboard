import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';
import api from '../api';

const Login = () => {
   const [credentials, setCredentials] = useState({ email: '', password: '' });
   const [errorMessage, setErrorMessage] = useState('');

   const handleChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
      setErrorMessage('');
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await api.post('/login', credentials);
         localStorage.setItem('token', response.data.token); // Store token
         alert('Login successful!');
         window.location.href = '/dashboard'; // Redirect to dashboard
      } catch (err) {
         setErrorMessage(err.response.data);
      }
   };

   return (
      <Container component="main" maxWidth="xs">
         <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5" component="h1" align="center">
               Login
            </Typography>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
               <TextField
                  name="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  required
               />
               <TextField
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  required
               />
               {errorMessage && <Typography color="error">{errorMessage}</Typography>}
               <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                  Login
               </Button>
            </form>
         </Paper>
      </Container>
   );
};

export default Login;
