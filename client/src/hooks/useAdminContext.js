import { useContext, useState } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/context.auth';
import { consoleColors } from '../utils/console';

export default function useAdminContext() {
  const admin = useContext(AdminContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem('authToken');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const getAdmin = async () => {
    try {
      const res = await axios.get('/api/v1/users');

      return { res };
    } catch (err) {
      console.error(err.message);
    }
  };

  const verifyToken = async () => {
    try {
      const res = await axios.post('/api/v1/verify', { token }, config);

      if (res.data.success) {
        admin.dispatch({ type: 'ISADMIN' });
        console.log('%cAuthorization verified', consoleColors.success);
      } else {
        localStorage.removeItem('authToken');
        admin.dispatch({ type: 'ISNOTADMIN' });
        console.log('%cAuthorization failed', consoleColors.fail);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        '/api/v1/login',
        {
          email: email,
          password: password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      let { res } = await getAdmin();

      if (data._id === res.data[0]._id) {
        localStorage.setItem('authToken', data.token);
        setIsLoggedIn(true);
      }

      admin.dispatch({ type: 'ISADMIN' });
      console.log('%cLogged in', consoleColors.success);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    admin.dispatch({ type: 'ISNOTADMIN' });
    console.log('%cLogged out', consoleColors.fail);
  };

  return { login, logout, isLoggedIn, verifyToken, getAdmin };
}
