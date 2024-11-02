import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';
import api from '../api';

const PostJob = () => {
   const [jobData, setJobData] = useState({ title: '', description: '', experienceLevel: '', endDate: '' });
   const [successMessage, setSuccessMessage] = useState('');
   const [errorMessage, setErrorMessage] = useState('');

   const handleChange = (e) => {
      setJobData({ ...jobData, [e.target.name]: e.target.value });
      setSuccessMessage('');
      setErrorMessage('');
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await api.post('/job', jobData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
         });
         setSuccessMessage('Job posted successfully!');
         setJobData({ title: '', description: '', experienceLevel: '', endDate: '' }); // Reset form
      } catch (err) {
         setErrorMessage(err.response.data);
      }
   };

   return (
      <Container component="main" maxWidth="xs">
         <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5" component="h1" align="center">
               Post a Job
            </Typography>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
               <TextField
                  name="title"
                  label="Job Title"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  required
               />
               <TextField
                  name="description"
                  label="Job Description"
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={4}
                  onChange={handleChange}
                  required
               />
               <TextField
                  name="experienceLevel"
                  label="Experience Level"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  required
               />
               <TextField
                  name="endDate"
                  label="End Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  required
               />
               {successMessage && <Typography color="primary">{successMessage}</Typography>}
               {errorMessage && <Typography color="error">{errorMessage}</Typography>}
               <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                  Post Job
               </Button>
            </form>
         </Paper>
      </Container>
   );
};

export default PostJob;
