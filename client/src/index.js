import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AdminProvider } from './context/context.auth';
import { GlobalProvider } from './context/context.data';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <AdminProvider>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </AdminProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
