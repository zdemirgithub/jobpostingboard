import React from 'react';
import { Typography, Button, Container } from '@mui/material';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
   const history = useHistory();

   const handleLogout = () => {
      localStorage.removeItem('token'); // Clear token
      history.push('/login'); // Redirect to login
   };

   return (
      <Container>
         <Typography variant="h4" component="h1" align="center" style={{ marginTop: '20px' }}>
            Welcome to the Dashboard
         </Typography>
         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={() => history.push('/post-job')}>
               Post a Job
            </Button>
            <Button variant="contained" color="secondary" onClick={handleLogout} style={{ marginLeft: '10px' }}>
               Logout
            </Button>
         </div>
      </Container>
   );
};

export default Dashboard;
