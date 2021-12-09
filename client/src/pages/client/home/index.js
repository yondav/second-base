import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const Home = () => {
  const { pathname } = useLocation();

  useEffect(() => console.log(pathname), [pathname]);
  return <>{pathname === '/' ? <div>HOME</div> : <Outlet />}</>;
};

export default Home;
