import React, { createContext, useReducer } from 'react';

import api from '../utils/api';
import dataReducer from './context.data.reducer';

import { consoleColors } from '../utils/console';

const initialState = {
  loading: true,
  data: { studio: {}, user: {} },
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const getStudio = async () => {
    state.loading = true;
    try {
      const res = await api({ url: '/api/v1/secondBase', method: 'get' });

      if (res.data) {
        dispatch({ type: 'GET_STUDIO', payload: res.data });
        console.log(
          '%csuccess:',
          consoleColors.success,
          'data has been fetched',
          '\n'
        );
      }
    } catch (err) {
      console.log(
        '%cerror:',
        consoleColors.fail,
        'data has not been fetched',
        err.message
      );
    }
  };

  const getUser = async () => {
    state.loading = true;

    try {
      const res = await api({ url: '/api/v1/users', method: 'get' });

      if (res.data) {
        dispatch({ type: 'GET_USER', payload: res.data[0] });
        console.log(
          '%csuccess:',
          consoleColors.success,
          'user has been fetched',
          '\n'
        );
      }
    } catch (err) {
      console.log(
        '%cerror:',
        consoleColors.fail,
        'user has not been fetched',
        err.message
      );
    }
  };

  const updateUser = async (userId, update) => {
    state.loading = true;
    try {
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
          '\n'
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

  const updateGeneral = async (update, imgs) => {
    state.loading = true;

    try {
      const res = await api({
        url: '/api/v1/secondBase',
        method: 'put',
        data: update,
      });

      if (res.data) {
        console.log(res.data);
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
        'general info has not been updated',
        '\n',
        err
      );
    }
  };

  const addImage = async ({ imgs, collection, subCollection, parentId }) => {
    state.loading = true;

    console.log({ imgs, collection, subCollection, parentId });
    try {
      let post = async () => {
        const promises = !subCollection
          ? imgs.map(
              async img =>
                await api({
                  url: `/api/v1/images/${collection}/${parentId}`,
                  method: 'post',
                  data: img,
                })
            )
          : imgs.map(
              async img =>
                await api({
                  url: `/api/v1/images/${collection}/${subCollection}/${parentId}`,
                  method: 'post',
                  data: img,
                })
            );

        const values = await Promise.all(promises);

        return values.map(val => val.data);
      };

      let images = await post();

      console.log(images);
      if (images.length) {
        dispatch({
          type: 'ADD_IMAGE',
          payload: { collection, subCollection, data: images },
        });
        console.log(
          '%csuccess:',
          consoleColors.success,
          `image has been added`,
          '\n'
        );
      }
    } catch (err) {
      console.log(
        '%cerror:',
        consoleColors.fail,
        'image has not been added',
        '\n',
        err.message
      );
    }
  };

  const updateImage = async ({ imgs, collection, subCollection }) => {
    try {
      let put = async () => {
        const promises = imgs.map(
          async img =>
            await api({
              url: `/api/v1/images/${collection}/${img._id}`,
              method: 'put',
              data: img,
            })
        );

        const values = await Promise.all(promises);

        console.log('VALUES::::', values);
        return values.map(val => val.data);
      };

      let images = await put();

      console.log(images);
      if (images.length) {
        dispatch({
          type: 'UPDATE_IMAGE',
          payload: { collection, subCollection, data: images },
        });
        console.log(
          '%csuccess:',
          consoleColors.success,
          `image has been updated`,
          '\n'
        );
      }
    } catch (err) {}
  };

  const deleteImage = async ({ imgId, collection, subCollection }) => {
    state.loading = true;

    try {
      const { data } = await api({
        url: `/api/v1/images/${collection}/${imgId}`,
        method: 'delete',
      });

      console.log(data);
      if (data.success) {
        dispatch({
          type: 'DELETE_IMAGE',
          payload: { collection, subCollection, id: data._id },
        });
        console.log(
          '%csuccess:',
          consoleColors.success,
          'image has been deleted',
          '\n'
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
        addImage,
        updateImage,
        deleteImage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
