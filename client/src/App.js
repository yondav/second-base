import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  Suspense,
} from 'react';
import { Routes, Route } from 'react-router-dom';
import pMinDelay from 'p-min-delay';

import { DataContext } from './context/context.data';
import useDataContext from './hooks/useDataContext';

import { consoleMessages } from './utils/console';

import Loading from './components/loading';
import Nav from './components/nav';
import { AppWrapper } from './components/styled';

// pages
const del = 1500;
const About = React.lazy(() => import('./pages/client/about'));
const Artists = React.lazy(() => import('./pages/client/artists'));
const Booking = React.lazy(() => import('./pages/client/booking'));
const Gear = React.lazy(() => import('./pages/client/gear'));
const Login = React.lazy(() => pMinDelay(import('./pages/admin/login'), del));
const Portal = React.lazy(() => pMinDelay(import('./pages/admin/portal'), del));
const Home = React.lazy(() => pMinDelay(import('./pages/client/home'), del));

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

  useEffect(() => fetch(), []);

  useEffect(() => {
    if (!window.scrollY)
      setWrapperHeight(`calc(100vh - ${navRef.current.clientHeight}px)`);
  }, [navRef, window.scrollY]);

  useEffect(() => state && consoleMessages.state(state), [state]);
  return (
    <>
      <Nav innerRef={navRef} />
      <AppWrapper style={{ height: wrapperHeight }}>
        <Suspense fallback={<Loading />}>
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
