import React, { useEffect, useContext, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { DataContext } from './context/context.data';
import useDataContext from './hooks/useDataContext';
import { consoleColors } from './utils/console';

import Navigation from './components/navigation';
import AdminRoute from './components/adminRoute';

const Login = React.lazy(() => import('./pages/admin/login'));
const Portal = React.lazy(() => import('./pages/admin/portal'));
const About = React.lazy(() => import('./pages/client/about'));
const Artists = React.lazy(() => import('./pages/client/artists'));
const Booking = React.lazy(() => import('./pages/client/booking'));
const Gear = React.lazy(() => import('./pages/client/gear'));
const Home = React.lazy(() => import('./pages/client/home'));

const App = () => {
  const { state } = useContext(DataContext);
  const { getStudio, getUser } = useDataContext();

  useEffect(() => {
    getStudio();
    getUser();
  }, []);

  useEffect(
    () => state && console.log('%cstate', consoleColors.state, '\n', state),
    [state.loading, state.data]
  );

  return (
    <div className='wrapper'>
      <Navigation />
      <Suspense fallback=''>
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
      </Suspense>
    </div>
  );
};

export default App;
