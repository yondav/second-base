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
    state.loading = true;

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
    state.loading = true;

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
      console.log('%cerror:', consoleColors.fail, 'user has not been fetched');
    }
  };

  const updateUser = async (userId, update, img) => {
    state.loading = true;
    try {
      let image;
      if (img) {
        if (state.data.user.image.length > 0)
          await api({
            url: `/api/v1/images/user/${state.data.user.image[0]._id}`,
            method: 'delete',
          });

        const newImage = await api({
          url: `/api/v1/images/user/${userId}`,
          method: 'post',
          data: img,
        });

        if (newImage.data) {
          image = newImage.data;
          dispatch({ type: 'ADD_USER_IMAGE', payload: image });
          console.log(
            '%csuccess:',
            consoleColors.success,
            'user image has been updated',
            '\n',
            newImage.data
          );
        }
      }

      const res = await api({
        url: `/api/v1/users/${userId}`,
        method: 'put',
        data: update,
      });

      if (res.data) {
        const { first_name, last_name, email, bio } = res.data;
        dispatch({
          type: 'UPDATE_USER',
          payload: {
            first_name,
            last_name,
            email,
            bio,
          },
        });
        console.log(
          '%csuccess:',
          consoleColors.success,
          'user has been updated',
          '\n',
          res.data
        );

        return state.data.user;
      }
    } catch (err) {
      console.log(
        '%cerror:',
        consoleColors.fail,
        'user has not been updated',
        '\n',
        err.message
      );
    }
  };

  const updateGeneral = async update => {
    initialState.loading = true;

    try {
      const res = await api({
        url: '/api/v1/secondBase',
        method: 'put',
        data: update,
      });

      if (res.data) {
        dispatch({ type: 'UPDATE_GENERAL', payload: res.data });
        console.log(
          '%csuccess:',
          consoleColors.success,
          'general info has been updated',
          '\n',
          res.data
        );

        return res.data;
      }
    } catch (err) {
      dispatch({ type: 'UPDATE_GENERAL', error: 'Something went wrong' });
      console.log(
        '%cerror:',
        consoleColors.fail,
        'general info has not been fetched',
        '\n',
        err
      );
    }
  };

  const deleteImage = async (imgId, type) => {
    state.loading = true;

    try {
      const { data } = await api({
        url: `/api/v1/images/${type}/${imgId}`,
        method: 'delete',
      });

      console.log(data);
      if (data.success) {
        dispatch({ type: 'DELETE_IMAGE', payload: { type, id: data._id } });
        console.log(
          '%csuccess:',
          consoleColors.success,
          'image has been deleted',
          '\n',
          data
        );
      }
    } catch (err) {
      console.log(
        '%cerror:',
        consoleColors.fail,
        'image has not been deleted',
        '\n',
        err.message
      );
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        state,
        getStudio,
        getUser,
        updateUser,
        updateGeneral,
        deleteImage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
