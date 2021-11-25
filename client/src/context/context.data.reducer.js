export default function dataReducer(state, action) {
  switch (action.type) {
    case 'GET_STUDIO':
      return {
        loading: false,
        error: '',
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

    case 'ADD_USER_IMAGE':
      return {
        ...state,
        data: {
          ...state.data,
          user: { ...state.data.user, image: [action.payload] },
        },
      };

    case 'UPDATE_GENERAL':
      return {
        ...state,
        data: { ...state.data, studio: action.payload },
      };

    case 'DELETE_IMAGE':
      if (action.payload.type === 'user') {
        let list = state.data.user.image;
        let targetImg = list.indexOf(
          list.find(img => img._id === action.payload.id)
        );
        list.splice(targetImg, 1);

        return {
          ...state,
          loading: false,
          data: { ...state.data, user: { ...state.data.user, image: list } },
        };
      }

    default:
      return state;
  }
}
