export default function dataReducer(state, action) {
  switch (action.type) {
    case 'GET_STUDIO':
      return {
        loading: false,
        data: { ...state.data, studio: action.payload },
      };

    case 'GET_USER':
      return {
        ...state,
        loading: false,
        data: { ...state.data, user: action.payload },
      };

    case 'UPDATE_USER':
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          user: { ...state.data.user, ...action.payload },
        },
      };

    case 'UPDATE_GENERAL':
      const { email, address } = action.payload;

      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          studio: { ...state.data.studio, email, address },
        },
      };

    case 'ADD_SERVICE':
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          studio: {
            ...state.data.studio,
            services: [...state.data.studio.services, ...action.payload],
          },
        },
      };

    case 'DELETE_SERVICE':
      let list = [...state.data.studio.services];
      let target = list.indexOf(
        list.find(service => service._id === action.payload)
      );
      list.splice(target, 1);
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          studio: { ...state.data.studio, services: list },
        },
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
                user: {
                  ...state.data.user,
                  images: [...state.data.user.images, ...data],
                },
              },
            };
          case 'studio':
            let imgsObj;
            switch (subCollection) {
              case 'home':
                imgsObj = {
                  ...state.data.studio.images,
                  home: [...state.data.studio.images.home, ...data],
                };
                break;
              case 'about':
                imgsObj = {
                  ...state.data.studio.images,
                  about: [...state.data.studio.images.about, ...data],
                };
                break;
              case 'gear':
                imgsObj = {
                  ...state.data.studio.images,
                  gear: [...state.data.studio.images.gear, ...data],
                };
                break;
              case 'artists':
                imgsObj = {
                  ...state.data.studio.images,
                  artists: [...state.data.studio.images.artists, ...data],
                };
                break;
              case 'booking':
                imgsObj = {
                  ...state.data.studio.images,
                  booking: [...state.data.studio.images.booking, ...data],
                };
                break;
              default:
                break;
            }
            return {
              ...state,
              loading: false,
              data: {
                ...state.data,
                studio: {
                  ...state.data.studio,
                  images: imgsObj,
                },
              },
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
            if (list[target]) {
              list[target] = { ...list[target], ...image };
            }
          });
        };

        switch (collection) {
          case 'user':
            list = state.data.user.images;
            dataSwap();

            return {
              ...state,
              loading: false,
              data: {
                ...state.data,
                user: { ...state.data.user, images: list },
              },
            };

          case 'studio':
            list = state.data.studio.images[subCollection];
            dataSwap();

            let imgsObj;
            switch (subCollection) {
              case 'home':
                imgsObj = { ...state.data.studio.images, home: list };
                break;
              case 'about':
                imgsObj = { ...state.data.studio.images, about: list };
                break;
              case 'gear':
                imgsObj = { ...state.data.studio.images, gear: list };
                break;
              case 'artists':
                imgsObj = { ...state.data.studio.images, artists: list };
                break;
              case 'booking':
                imgsObj = { ...state.data.studio.images, booking: list };
                break;
              default:
                break;
            }
            return {
              ...state,
              loading: false,
              data: {
                ...state.data,
                studio: {
                  ...state.data.studio,
                  images: imgsObj,
                },
              },
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
            list = removeImg(state.data.user.images);

            return {
              ...state,
              loading: false,
              data: {
                ...state.data,
                user: { ...state.data.user, images: list },
              },
            };

          case 'studio':
            list = removeImg(state.data.studio.images[subCollection]);

            let imgsObj;

            switch (subCollection) {
              case 'home':
                imgsObj = { ...state.data.studio.images, home: list };
                break;
              case 'about':
                imgsObj = { ...state.data.studio.images, about: list };
                break;
              case 'gear':
                imgsObj = { ...state.data.studio.images, gear: list };
                break;
              case 'artists':
                imgsObj = { ...state.data.studio.images, artists: list };
                break;
              case 'booking':
                imgsObj = { ...state.data.studio.images, booking: list };
                break;
              default:
                break;
            }
            return {
              ...state,
              loading: false,
              data: {
                ...state.data,
                studio: {
                  ...state.data.studio,
                  images: imgsObj,
                },
              },
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
