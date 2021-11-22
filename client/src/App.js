import React, { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { GlobalContext } from './context/context.data';

import Navigation from './components/navigation';
import AdminRoute from './components/adminRoute';
import Login from './pages/admin/login';
import Portal from './pages/admin/portal';
import About from './pages/client/about';
import Artists from './pages/client/artists';
import Booking from './pages/client/booking';
import Gear from './pages/client/gear';
import Home from './pages/client/home';

const App = () => {
  const { state, getStudio, getUser } = useContext(GlobalContext);

  useEffect(() => {
    getStudio();
    getUser();
  }, [state.loading]);

  return (
    <div className='wrapper'>
      <Navigation />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/artists' element={<Artists />} />
        <Route exact path='/booking' element={<Booking />} />
        <Route exact path='/gear' element={<Gear />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/admin/portal' element={<AdminRoute />}>
          <Route exact path='/admin/portal' element={<Portal />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
