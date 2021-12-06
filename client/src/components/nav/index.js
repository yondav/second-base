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
import { ImgContainer, NavLink } from '../styled';

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
    <nav className='d-flex justify-content-between align-items-center py-4 px-5'>
      <ImgContainer as={Link} to='/' style={{ flexBasis: logoSize }}>
        <img src={logo} alt='secondBase' className='w-100' />
      </ImgContainer>
      {!isDesktop ? (
        <div className='d-flex flex-column align-items-center justify-content-center'>
          <NavCollapse navExpand={navExpand} setNavExpand={setNavExpand} />
          <AnimatePresence>{navExpand && <NavExpand />}</AnimatePresence>
        </div>
      ) : (
        <div
          className='d-flex justify-content-around align-items-center'
          style={{ flexBasis: '50%' }}
        >
          <NavLink as={Link} to='/about'>
            About
          </NavLink>
          <NavLink as={Link} to='/gear'>
            Gear
          </NavLink>
          <NavLink as={Link} to='/artists'>
            Artists
          </NavLink>
          <NavLink as={Link} to='/booking'>
            Booking
          </NavLink>

          {admin.state.admin && (
            <>
              <NavLink as={Link} to='/admin/portal'>
                Portal
              </NavLink>
              <NavLink as={Link} to='/login' onClick={logout}>
                Log out
              </NavLink>
            </>
          )}
          <NavLink
            href='https://www.instagram.com/secondbasebk/'
            style={{ marginLeft: '2rem' }}
            target='_blank'
            rel='noopener noreferrer'
          >
            <BsInstagram size={'1.5em'} />
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Nav;
