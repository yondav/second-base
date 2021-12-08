import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { DataContext } from '../../context/context.data';
import { AdminContext } from '../../context/context.auth';
import useAdminContext from '../../hooks/useAdminContext';
import useMediaQuery from '../../hooks/useMediaQuery';

import { BsInstagram } from 'react-icons/bs';

import { ImgContainer, NavBar } from '../styled';

const Nav = ({ innerRef }) => {
  const { state } = useContext(DataContext);
  const { isDesktop } = useMediaQuery();
  const { logout } = useAdminContext();
  const admin = useContext(AdminContext);
  const [navExpand, setNavExpand] = useState(false);

  const routes = {
    pages: [
      { to: '/about', page: 'About' },
      { to: '/gear', page: 'Gear' },
      { to: '/artists', page: 'Artists' },
      { to: '/booking', page: 'Booking' },
    ],
    admin: [
      { to: '/admin/portal', page: 'Portal' },
      {
        to: '/login',
        page: 'Log out',
        onClick: () => {
          logout();
          expandSetter();
        },
      },
    ],
  };

  const burgerTransition = (translate, rotate) => ({
    transform: `${
      navExpand ? `translatex(3.5px)` : `translatey(${translate})`
    } rotate(${navExpand ? rotate : '0'})`,
    transition: '300ms all ease-in-out',
  });

  const expandSetter = e => {
    !navExpand ? setNavExpand(true) : setNavExpand(false);
  };

  return (
    <NavBar.Bar ref={innerRef}>
      <ImgContainer as={Link} to='/' className='w-2/5 md:w-1/4 lg:1/5'>
        <img src={state.data.studio.logo} alt='secondBase' className='w-full' />
      </ImgContainer>
      {!isDesktop && (
        <NavBar.Collapse
          expand={navExpand}
          setter={expandSetter}
          animation={burgerTransition}
        />
      )}
      <AnimatePresence>
        {(navExpand || isDesktop) && (
          <NavBar.Links stacked={!isDesktop ? true : false}>
            {routes.pages.map((p, i) => (
              <Link key={i} to={p.to} onClick={expandSetter}>
                {p.page}
              </Link>
            ))}
            {admin.state.admin &&
              routes.admin.map((p, i) => (
                <Link key={i} to={p.to} onClick={p.onClick || expandSetter}>
                  {p.page}
                </Link>
              ))}
            <a
              href='https://www.instagram.com/secondbasebk/'
              className='lg:ml-8'
              target='_blank'
              rel='noopener noreferrer'
              onClick={expandSetter}
            >
              <BsInstagram size={'1.5em'} />
            </a>
          </NavBar.Links>
        )}
      </AnimatePresence>
    </NavBar.Bar>
  );
};

export default Nav;
