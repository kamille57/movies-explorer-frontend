import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/pages/index.css';
import App from '../src/components/App/App.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
