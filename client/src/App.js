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

import { toggleStickyNav } from './utils/helperFuncs';
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

const Profile = React.lazy(() =>
  import('./components/portal/portal.profile.component')
);
const Studio = React.lazy(() =>
  import('./components/portal/portal.studio.component')
);

const App = () => {
  const navRef = useRef();
  const { state } = useContext(DataContext);
  const { getStudio, getUser, getGear } = useDataContext();
  const [sticky, setSticky] = useState(false);

  const fetch = async () => {
    await getStudio();
    await getUser();
    await getGear();
  };

  useEffect(() => fetch(), []);

  useEffect(() => {
    window.addEventListener('scroll', e => {
      if (window.scrollY > window.innerHeight) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
  }, [navRef, window.scrollY, sticky]);

  useEffect(() => console.log(sticky), [sticky]);

  useEffect(() => state && consoleMessages.state(state), [state]);
  return (
    <>
      <Nav sticky={sticky} innerRef={navRef} />
      <AppWrapper>
        {/* <div style={{ marginTop: wrapperHeight }}> */}
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/' element={<Home />}>
              <Route path='about' element={<About />} />
              <Route path='artists' element={<Artists />} />
              <Route path='booking' element={<Booking />} />
              <Route path='gear' element={<Gear />} />
              <Route path='admin/portal/' element={<Portal />}>
                <Route path='profile' element={<Profile />} />
                <Route path='studio' element={<Studio />} />
                <Route path='artists' element={<Profile />} />
                <Route path='photos' element={<Profile />} />
              </Route>
            </Route>
            <Route path='login' element={<Login />} />
            <Route path='*' element={<div>404</div>} />
          </Routes>
        </Suspense>
        {/* </div> */}
      </AppWrapper>
    </>
  );
};

export default App;
