import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { BsInstagram } from 'react-icons/bs';
import { AdminContext } from '../../context/context.auth';
import useAdminContext from '../../hooks/useAdminContext';

const NavExpand = () => {
  const admin = useContext(AdminContext);
  const { logout } = useAdminContext();

  return (
    <motion.div
      className='expanded-nav-menu'
      initial={{ height: 0, opacity: 0, rotateY: -180 }}
      animate={{ height: '100vh', opacity: 1, rotateY: 0 }}
      exit={{ height: 0, opacity: 0, rotateY: -180 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <Nav.Link as={Link} to='/about'>
        About
      </Nav.Link>
      <Nav.Link as={Link} to='/gear'>
        Gear
      </Nav.Link>
      <Nav.Link as={Link} to='/artists'>
        Artists
      </Nav.Link>
      <Nav.Link as={Link} to='/booking'>
        Booking
      </Nav.Link>
      {admin.state.admin ? (
        <>
          <Nav.Link as={Link} to='/admin/portal'>
            Portal
          </Nav.Link>
          <span
            className='nav-link'
            style={{ cursor: 'pointer' }}
            onClick={logout}
          >
            Log out
          </span>
        </>
      ) : (
        <Nav.Link
          href='https://www.instagram.com/secondbasebk/'
          style={{ marginLeft: '4rem' }}
        >
          <BsInstagram size={'1.5em'} />
        </Nav.Link>
      )}
    </motion.div>
  );
};

export default NavExpand;
