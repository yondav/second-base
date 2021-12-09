import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  Suspense,
} from 'react';
import { Routes, Route } from 'react-router-dom';
import { DataContext } from './context/context.data';
import useDataContext from './hooks/useDataContext';

import Nav from './components/nav';
import { consoleMessages } from './utils/console';
import { AppWrapper } from './components/styled';

const Login = React.lazy(() => import('./pages/admin/login'));
const Portal = React.lazy(() => import('./pages/admin/portal'));
const About = React.lazy(() => import('./pages/client/about'));
const Artists = React.lazy(() => import('./pages/client/artists'));
const Booking = React.lazy(() => import('./pages/client/booking'));
const Gear = React.lazy(() => import('./pages/client/gear'));
const Home = React.lazy(() => import('./pages/client/home'));

const App = () => {
  const navRef = useRef();
  const { state } = useContext(DataContext);
  const { getStudio, getUser, getGear } = useDataContext();
  const [wrapperHeight, setWrapperHeight] = useState();

  const fetch = async () => {
    await getStudio();
    await getUser();
    await getGear();
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (!window.scrollY) {
      setWrapperHeight(`calc(100vh - ${navRef.current.clientHeight}px)`);
    }
  }, [navRef, window.scrollY]);

  useEffect(() => state && consoleMessages.state(state), [state]);
  return (
    <>
      <Nav innerRef={navRef} />
      <AppWrapper style={{ height: wrapperHeight }}>
        <Suspense fallback=''>
          <Routes>
            <Route path='/' element={<Home />}>
              <Route path='about' element={<About />} />
              <Route path='artists' element={<Artists />} />
              <Route path='booking' element={<Booking />} />
              <Route path='gear' element={<Gear />} />
              <Route path='admin/portal' element={<Portal />} />
            </Route>
            <Route path='login' element={<Login />} />
            <Route path='*' element={<div>404</div>} />
          </Routes>
        </Suspense>
      </AppWrapper>
    </>
  );
};

export default App;
