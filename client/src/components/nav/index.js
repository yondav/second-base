import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { DataContext } from '../../context/context.data';
import useAdminContext from '../../hooks/useAdminContext';
import useMediaQuery from '../../hooks/useMediaQuery';
import { AdminContext } from '../../context/context.auth';
import { BsInstagram } from 'react-icons/bs';
import NavCollapse from '../navCollapse';
import NavExpand from '../navExpand';

import './navigation.css';
import { ImgContainer, NavBar } from '../styled';

const Nav = () => {
  const {
    state: {
      data: {
        studio: { logo },
      },
    },
  } = useContext(DataContext);
  const { isDesktop, isTablet, isMobile } = useMediaQuery();
  const { logout } = useAdminContext();
  const admin = useContext(AdminContext);
  const [navExpand, setNavExpand] = useState(false);
  const [logoSize, setLogoSize] = useState();

  useEffect(() => {
    const nav = document.querySelector('nav');
    const navLink = document.querySelectorAll('.nav-link');

    if (navExpand) {
      nav.classList.add('expanded-nav');
      navLink.forEach(link => link.classList.add('expanded-nav-link'));
    } else {
      nav.classList.remove('expanded-nav');
      setTimeout(() => {
        navLink.forEach(link => link.classList.remove('expanded-nav-link'));
      }, 1000);
    }
  }, [navExpand]);

  useEffect(() => {
    if (isDesktop) setLogoSize('20%');
    if (isTablet) setLogoSize('25%');
    if (isMobile) setLogoSize('35%');
  }, [isDesktop, isTablet, isMobile]);

  return (
    <NavBar>
      <ImgContainer as={Link} to='/' style={{ flexBasis: logoSize }}>
        <img src={logo} alt='secondBase' className='w-full' />
      </ImgContainer>
      {!isDesktop ? (
        <>
          <NavCollapse navExpand={navExpand} setNavExpand={setNavExpand} />
          {navExpand && (
            <div className='exp-links'>
              <AnimatePresence>
                {navExpand && <NavExpand setNavExpand={setNavExpand} />}
              </AnimatePresence>
            </div>
          )}
        </>
      ) : (
        <div className='dt-links' style={{ flexBasis: '50%' }}>
          <Link to='/about'>About</Link>
          <Link to='/gear'>Gear</Link>
          <Link to='/artists'>Artists</Link>
          <Link to='/booking'>Booking</Link>

          {admin.state.admin && (
            <>
              <Link to='/admin/portal'>Portal</Link>
              <Link to='/login' onClick={logout}>
                Log out
              </Link>
            </>
          )}
          <a
            href='https://www.instagram.com/secondbasebk/'
            className='ml-8'
            target='_blank'
            rel='noopener noreferrer'
          >
            <BsInstagram size={'1.5em'} />
          </a>
        </div>
      )}
    </NavBar>
  );
};

export default Nav;
