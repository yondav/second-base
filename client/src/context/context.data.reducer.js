export default function dataReducer(state, action) {
  const { data } = state;
  const { studio, user, gear } = data;
  let list;
  let target;

  switch (action.type) {
    case 'GET_STUDIO':
      return {
        ...state,
        loading: false,
        data: { ...data, studio: action.payload },
      };

    case 'UPDATE_GENERAL':
      return {
        ...state,
        loading: false,
        data: { ...data, studio: { ...studio, ...action.payload } },
      };

    case 'ADD_SERVICE':
      return {
        ...state,
        loading: false,
        data: {
          ...data,
          studio: {
            ...studio,
            services: [...studio.services, ...action.payload],
          },
        },
      };

    case 'UPDATE_SERVICE':
      list = [...studio.services];
      action.payload.forEach(service => {
        let target = list.indexOf(list.find(serv => serv._id === service._id));
        if (target) list[target] = { ...list[target], ...service };
      });
      return {
        ...state,
        loading: false,
        data: { ...data, studio: { ...studio, services: list } },
      };

    case 'DELETE_SERVICE':
      list = [...studio.services];
      target = list.indexOf(
        list.find(service => service._id === action.payload)
      );
      list.splice(target, 1);
      return {
        ...state,
        loading: false,
        data: { ...data, studio: { ...studio, services: list } },
      };

    case 'GET_USER':
      return {
        ...state,
        loading: false,
        data: { ...data, user: action.payload },
      };

    case 'UPDATE_USER':
      return {
        ...state,
        loading: false,
        data: { ...data, user: { ...user, ...action.payload } },
      };

    case 'GET_GEAR':
      return {
        ...state,
        loading: false,
        data: { ...data, gear: action.payload },
      };

    case 'ADD_IMAGE':
      const addImage = () => {
        let { collection, subCollection, data } = action.payload;
        switch (collection) {
          case 'user':
            return {
              ...state,
              loading: false,
              data: {
                ...state.data,
                user: { ...user, images: [...user.images, ...data] },
              },
            };
          case 'studio':
            let imgsObj;
            switch (subCollection) {
              case 'home':
                imgsObj = {
                  ...studio.images,
                  home: [...studio.images.home, ...data],
                };
                break;
              case 'about':
                imgsObj = {
                  ...studio.images,
                  about: [...studio.images.about, ...data],
                };
                break;
              case 'gear':
                imgsObj = {
                  ...studio.images,
                  gear: [...studio.images.gear, ...data],
                };
                break;
              case 'artists':
                imgsObj = {
                  ...studio.images,
                  artists: [...studio.images.artists, ...data],
                };
                break;
              case 'booking':
                imgsObj = {
                  ...studio.images,
                  booking: [...studio.images.booking, ...data],
                };
                break;
              default:
                break;
            }
            return {
              ...state,
              loading: false,
              data: { ...data, studio: { ...studio, images: imgsObj } },
            };
          default:
            break;
        }
      };
      return addImage();

    case 'UPDATE_IMAGE':
      const updateImage = () => {
        let { collection, subCollection, data } = action.payload;
        let list;
        let dataSwap = () => {
          data.forEach(image => {
            let target = list.indexOf(list.find(img => img._id === image._id));
            if (list[target]) list[target] = { ...list[target], ...image };
          });
        };

        switch (collection) {
          case 'user':
            list = user.images;
            dataSwap();

            return {
              ...state,
              loading: false,
              data: {
                ...data,
                user: { ...user, images: list },
              },
            };

          case 'studio':
            list = studio.images[subCollection];
            dataSwap();

            let imgsObj;
            switch (subCollection) {
              case 'home':
                imgsObj = { ...studio.images, home: list };
                break;
              case 'about':
                imgsObj = { ...studio.images, about: list };
                break;
              case 'gear':
                imgsObj = { ...studio.images, gear: list };
                break;
              case 'artists':
                imgsObj = { ...studio.images, artists: list };
                break;
              case 'booking':
                imgsObj = { ...studio.images, booking: list };
                break;
              default:
                break;
            }
            return {
              ...state,
              loading: false,
              data: { ...data, studio: { ...studio, images: imgsObj } },
            };
          default:
            break;
        }
      };
      return updateImage();

    case 'DELETE_IMAGE':
      const deleteImage = () => {
        let { collection, subCollection, id } = action.payload;
        let list;

        const removeImg = arr => {
          let list = arr;
          let target = list.indexOf(list.find(img => img._id === id));
          list.splice(target, 1);

          return list;
        };

        switch (collection) {
          case 'user':
            list = removeImg(user.images);

            return {
              ...state,
              loading: false,
              data: {
                ...data,
                user: { ...user, images: list },
              },
            };

          case 'studio':
            list = removeImg(studio.images[subCollection]);

            let imgsObj;

            switch (subCollection) {
              case 'home':
                imgsObj = { ...studio.images, home: list };
                break;
              case 'about':
                imgsObj = { ...studio.images, about: list };
                break;
              case 'gear':
                imgsObj = { ...studio.images, gear: list };
                break;
              case 'artists':
                imgsObj = { ...studio.images, artists: list };
                break;
              case 'booking':
                imgsObj = { ...studio.images, booking: list };
                break;
              default:
                break;
            }
            return {
              ...state,
              loading: false,
              data: { ...data, studio: { ...studio, images: imgsObj } },
            };
          default:
            break;
        }
      };
      return deleteImage();

    default:
      return state;
  }
}
