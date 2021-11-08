import { useContext, useState } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/context.auth';

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
      console.error(err);
    }
  };

  const verifyToken = async () => {
    try {
      const res = await axios.post('/api/v1/verify', { token }, config);

      if (res) {
        admin.dispatch({ type: 'ISADMIN' });
      }
    } catch (err) {
      localStorage.removeItem('authToken');
      admin.dispatch({ type: 'ISNOTADMIN' });
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
      console.log(admin);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    admin.dispatch({ type: 'ISNOTADMIN' });
  };

  return { login, logout, isLoggedIn, verifyToken };
}
