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
        data: { ...state.data, user: action.payload },
      };

    case 'UPDATE_USER':
      return {
        ...state,
        data: { ...state.data, user: action.payload },
      };

    // case 'CREATE_GEAR':
    //   return {
    //     ...state,
    //     data: { ...state.data, studio_gear: { ...state.data.studio_gear } },
    //   };

    default:
      return state;
  }
}
