// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import your main App component
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter for routing
import './index.css'; // Import your main CSS file for styling

// Render the application
ReactDOM.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById('root') // This refers to the root div in public/index.html
);
