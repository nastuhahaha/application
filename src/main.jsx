import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { MoneyTrackerProvider } from './contexts/MoneyTrackerContext';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MoneyTrackerProvider>
        <App />
      </MoneyTrackerProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
