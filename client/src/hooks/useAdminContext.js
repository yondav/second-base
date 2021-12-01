import { useContext } from 'react';
import Cookies from 'js-cookie';
import { AdminContext } from '../context/context.auth';
import { consoleColors } from '../utils/console';
import api from '../utils/api';

export default function useAdminContext() {
  const admin = useContext(AdminContext);
  const token = Cookies.get('token_secondBase');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const getAdmin = async () => {
    try {
      const res = await api({ url: '/api/v1/users', method: 'get' });

      return { res };
    } catch (err) {
      console.error(err.message);
    }
  };

  const verifyToken = async () => {
    try {
      const { data } = await api({
        url: '/api/v1/verify',
        method: 'post',
        config,
        data: { token },
      });

      if (data && data.success) {
        admin.dispatch({ type: 'ISADMIN' });
        console.log('%cAuthorization verified', consoleColors.success);
        return { verified: true };
      } else {
        Cookies.remove('token_secondBase');
        admin.dispatch({ type: 'ISNOTADMIN' });
        console.log('%cAuthorization failed', consoleColors.fail);
        return { verified: false };
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await api({
        url: '/api/v1/login',
        method: 'post',
        config: { headers: { 'Content-Type': 'application/json' } },
        data: {
          email: email,
          password: password,
        },
      });

      if (token) {
        await verifyToken();
      }

      admin.dispatch({ type: 'ISADMIN' });
      console.log('%cLogged in', consoleColors.success);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = () => {
    Cookies.remove('token_secondBase');
    admin.dispatch({ type: 'ISNOTADMIN' });
    console.log('%cLogged out', consoleColors.fail);
  };

  const getResetToken = async email => {
    try {
      const { data } = await api({
        url: '/api/v1/passwordresetrequest',
        method: 'post',
        data: { email },
      });

      if (data) {
        console.log('%cReset token request succeeded', consoleColors.success);
        return data;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const passwordReset = async (token, password) => {
    try {
      const { data } = await api({
        url: `/api/v1/passwordreset/${token}`,
        method: 'put',
        config,
        data: { password },
      });

      return data.data;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    token,
    login,
    logout,
    verifyToken,
    getAdmin,
    getResetToken,
    passwordReset,
  };
}
