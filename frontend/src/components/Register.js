import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';
import api from '../api';

const Register = () => {
   const [formData, setFormData] = useState({ name: '', email: '', password: '', mobile: '' });
   const [errorMessage, setErrorMessage] = useState('');

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setErrorMessage('');
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await api.post('/register', formData);
         alert('Registration successful! Check your email to verify.');
      } catch (err) {
         setErrorMessage(err.response.data);
      }
   };

   return (
      <Container component="main" maxWidth="xs">
         <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5" component="h1" align="center">
               Register
            </Typography>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
               <TextField
                  name="name"
                  label="Company Name"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  required
               />
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
                  inputProps={{ minLength: 6 }}
               />
               <TextField
                  name="mobile"
                  label="Mobile"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  required
               />
               {errorMessage && <Typography color="error">{errorMessage}</Typography>}
               <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                  Register
               </Button>
            </form>
         </Paper>
      </Container>
   );
};

export default Register;
