import { useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { AdminContext } from '../context/context.auth';
import { consoleColors, consoleMessages } from '../utils/console';
import api from '../utils/api';

export default function useAdminContext() {
  const { dispatch } = useContext(AdminContext);
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
        dispatch({ type: 'ADMIN' });
        console.log('%cAuthorization verified', consoleColors.greenBlock);
        return { verified: true };
      } else {
        Cookies.remove('token_secondBase');
        dispatch({ type: 'NOT_ADMIN' });
        console.log('%cAuthorization failed', consoleColors.redBlock);
        return { verified: false };
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const login = async (email, password) => {
    try {
      await api({
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

      dispatch({ type: 'ADMIN' });
      console.log('%cLogged in', consoleColors.greenBlock);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = () => {
    Cookies.remove('token_secondBase');
    dispatch({ type: 'NOT_ADMIN' });
    console.log('%cLogged out', consoleColors.redBlock);
  };

  const getResetToken = async email => {
    try {
      const { data } = await api({
        url: '/api/v1/passwordresetrequest',
        method: 'post',
        data: { email },
      });

      if (data) {
        console.log(
          '%cReset token request succeeded',
          consoleColors.greenBlock
        );
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

  useEffect(() => {
    if (!token) dispatch({ type: 'NOT_ADMIN' });
  }, [token]);

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
