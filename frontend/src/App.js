// src/App.js
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home'; // Replace with your actual components
import Login from './components/Login'; // Replace with your actual components
import Register from './components/Register'; // Replace with your actual components
import Dashboard from './components/Dashboard'; // Replace with your actual components

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={Dashboard} />
      {/* Add more routes as needed */}
    </Switch>
  );
}

export default App;
