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

    default:
      return state;
  }
}
