export default function dataReducer(state, action) {
  switch (action.type) {
    case 'GET_STUDIO':
      return {
        loading: false,
        error: '',
        data: action.payload,
      };

    case 'CREATE_GEAR':
      return {
        ...state,
        data: { ...state.data, studio_gear: { ...state.data.studio_gear } },
      };

    default:
      return state;
  }
}
