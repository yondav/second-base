import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BsInstagram } from 'react-icons/bs';
import { AdminContext } from '../../context/context.auth';
import useAdminContext from '../../hooks/useAdminContext';

const NavExpand = ({ setNavExpand }) => {
  const admin = useContext(AdminContext);
  const { logout } = useAdminContext();

  const navigate = (e, str) => {
    setNavExpand(false);

    if (str) logout();
  };

  return (
    <motion.div
      className='w-full relative flex flex-col items-center'
      initial={{ opacity: 0, rotateY: -180 }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={{ opacity: 0, rotateY: -180 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <Link to='/about' onClick={navigate}>
        About
      </Link>
      <Link to='/gear' onClick={navigate}>
        Gear
      </Link>
      <Link to='/artists' onClick={navigate}>
        Artists
      </Link>
      <Link to='/booking' onClick={navigate}>
        Booking
      </Link>
      {admin.state.admin ? (
        <>
          <Link to='/admin/portal' onClick={navigate}>
            Portal
          </Link>
          <Link to='/login' onClick={() => navigate('logout')}>
            Log out
          </Link>
        </>
      ) : (
        <a href='https://www.instagram.com/secondbasebk/' onClick={navigate}>
          <BsInstagram size={'1.5em'} />
        </a>
      )}
    </motion.div>
  );
};

export default NavExpand;
