// main.jsx: Entry point for the React application.
// This file sets up routing and mounts the App component into the root DOM element.

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Global styles
import { BrowserRouter } from 'react-router-dom';

// Render the root component of the application inside the BrowserRouter for client-side routing
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
