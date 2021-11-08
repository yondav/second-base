import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation';
import Login from './pages/admin/login';

const App = () => {
  return (
    <div className='wrapper'>
      <Navigation />
      <Routes>
        <Route exact path='/login' element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
