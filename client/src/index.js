import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AdminProvider } from './context/context.auth';
import { DataProvider } from './context/context.data';
import App from './App';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css';
import './assets/styles.css';

ReactDOM.render(
  <BrowserRouter>
    <AdminProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </AdminProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
