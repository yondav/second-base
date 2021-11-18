import React, { createContext, useReducer } from 'react';

import api from '../utils/api';
import dataReducer from './context.dataReducer';

import { consoleColors } from '../utils/console';

const initialState = {
  loading: true,
  error: '',
  data: {},
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const getStudio = async () => {
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
        loading: state.loading,
        error: state.error,
        data: state.data,
        getStudio,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
