import React, { createContext, useReducer } from 'react';

import api from '../utils/api';
import dataReducer from './context.data.reducer';

import { consoleColors } from '../utils/console';

const initialState = {
  loading: true,
  error: '',
  data: { studio: {}, user: {} },
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const getStudio = async () => {
    initialState.loading = true;

    const res = await api({ url: '/api/v1/secondBase', method: 'get' });

    if (res.data) {
      dispatch({ type: 'GET_STUDIO', payload: res.data });
      console.log(
        '%csuccess:',
        consoleColors.success,
        'data has been fetched',
        '\n',
        res.data
      );
    } else {
      dispatch({ type: 'GET_STUDIO', error: 'Something went wrong' });
      console.log('%cerror:', consoleColors.fail, 'data has not been fetched');
    }
  };

  const getUser = async () => {
    initialState.loading = true;

    const res = await api({ url: '/api/v1/users', method: 'get' });

    if (res.data) {
      dispatch({ type: 'GET_USER', payload: res.data[0] });
      console.log(
        '%csuccess:',
        consoleColors.success,
        'user has been fetched',
        '\n',
        res.data
      );
    } else {
      dispatch({ type: 'GET_STUDIO', error: 'Something went wrong' });
      console.log('%cerror:', consoleColors.fail, 'user has not been fetched');
    }
  };

  const updateUser = async (userId, update) => {
    initialState.loading = true;

    try {
      const res = await api({
        url: `/api/v1/users/${userId}`,
        method: 'put',
        data: update,
      });

      if (res.data) {
        dispatch({ type: 'UPDATE_USER', payload: res.data });
        console.log(
          '%csuccess:',
          consoleColors.success,
          'user has been updated',
          '\n',
          res.data
        );
      }
    } catch (err) {
      dispatch({ type: 'UPDATE_USER', error: 'Something went wrong' });
      console.log(
        '%cerror:',
        consoleColors.fail,
        'user has not been fetched',
        '\n',
        err
      );
    }
  };

  const createGear = async (type, gear) => {
    const res = await api({
      url: `/api/v1/gear/${type}`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: gear,
    });

    if (res) {
      dispatch({ type: 'CREATE_GEAR', payload: res.data });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        state,
        getStudio,
        getUser,
        updateUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
