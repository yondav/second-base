import { useContext } from 'react';
import { DataContext } from '../context/context.data';
import { consoleMessages } from '../utils/console';
import api from '../utils/api';

export default function useDataContext() {
  const { state, dispatch } = useContext(DataContext);

  // actions for general studio info
  const getStudio = async () => {
    try {
      const res = await api({ url: '/api/v1/secondBase', method: 'get' });

      if (res.data) {
        dispatch({ type: 'GET_STUDIO', payload: res.data });
        consoleMessages.success('data has been fetched');
      }
    } catch (err) {
      consoleMessages.fail('data has not been fetched');
    }
  };

  const updateGeneral = async update => {
    try {
      const res = await api({
        url: '/api/v1/secondBase',
        method: 'put',
        data: update,
      });

      if (res.data) {
        console.log(res.data);
        dispatch({ type: 'UPDATE_GENERAL', payload: res.data });
        consoleMessages.success('general info has been updated');

        return res.data;
      }
    } catch (err) {
      dispatch({ type: 'UPDATE_GENERAL', error: 'Something went wrong' });
      consoleMessages.fail('general info has not been updated');
    }
  };

  const addService = async services => {
    try {
      let post = async () => {
        const promises = services.map(
          async serv =>
            await api({ url: '/api/v1/services', method: 'post', data: serv })
        );

        const values = await Promise.all(promises);

        return values.map(val => val.data);
      };

      let data = await post();

      if (services.length) {
        dispatch({ type: 'ADD_SERVICE', payload: data });
        consoleMessages.success(`service has been added`);
      }
    } catch (err) {
      consoleMessages.fail('service has not been added');
    }
  };

  const updateService = async services => {
    try {
      let put = async () => {
        const promises = services.map(
          async serv =>
            await api({
              url: `/api/v1/services/${serv._id}`,
              method: 'put',
              data: serv,
            })
        );

        const values = await Promise.all(promises);

        return values.map(val => val.data);
      };

      let data = await put();

      if (data.length) {
        dispatch({ type: 'UPDATE_SERVICE', payload: data });
        consoleMessages.success(`service has been updated`);
      }
    } catch (err) {
      consoleMessages.fail('service has not been updated');
    }
  };

  const deleteService = async serviceId => {
    console.log('SERVICE ID***\n', serviceId);
    try {
      const { data } = await api({
        url: `/api/v1/services/${serviceId}`,
        method: 'delete',
      });

      if (data.success) {
        dispatch({
          type: 'DELETE_SERVICE',
          payload: data.data._id,
        });
        consoleMessages.success('service has been deleted');
      }
    } catch (err) {
      consoleMessages.fail('service has not been deleted');
    }
  };

  // actions for gear
  const getGear = async () => {
    try {
      const { data } = await api({ url: '/api/v1/studio_gear', method: 'get' });

      if (data) {
        dispatch({ type: 'GET_GEAR', payload: data });
        consoleMessages.success('gear has been fetched');
      }
    } catch (err) {
      consoleMessages.fail('gear has not been fetched');
    }
  };

  // actions for user/about - not auth
  const getUser = async () => {
    try {
      const { data } = await api({ url: '/api/v1/users', method: 'get' });

      if (data) {
        dispatch({ type: 'GET_USER', payload: data[0] });
        consoleMessages.success('user has been fetched');
      }
    } catch (err) {
      consoleMessages.fail('user has not been fetched');
    }
  };

  const updateUser = async (userId, update) => {
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
        consoleMessages.success('user has been updated');

        return state.data.user;
      }
    } catch (err) {
      consoleMessages.fail('user has not been updated');
    }
  };

  // actions for images
  const addImage = async ({ imgs, collection, subCollection, parentId }) => {
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

      if (images.length) {
        dispatch({
          type: 'ADD_IMAGE',
          payload: { collection, subCollection, data: images },
        });
        consoleMessages.success('image has been added');
      }
    } catch (err) {
      consoleMessages.fail('image has not been added');
      console.log(err);
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

        return values.map(val => val.data);
      };

      let images = await put();

      if (images.length) {
        dispatch({
          type: 'UPDATE_IMAGE',
          payload: { collection, subCollection, data: images },
        });
        consoleMessages.success('image has been updated');
      }
    } catch (err) {}
  };

  const deleteImage = async ({ imgId, collection, subCollection }) => {
    try {
      const { data } = await api({
        url: `/api/v1/images/${collection}/${imgId}`,
        method: 'delete',
      });

      if (data.success) {
        dispatch({
          type: 'DELETE_IMAGE',
          payload: { collection, subCollection, id: data.data._id },
        });
        consoleMessages.success('image has been deleted');
      }
    } catch (err) {
      consoleMessages.fail('image has not been deleted');
    }
  };

  return {
    getStudio,
    updateGeneral,
    addService,
    updateService,
    deleteService,
    getGear,
    getUser,
    updateUser,
    addImage,
    updateImage,
    deleteImage,
  };
}
