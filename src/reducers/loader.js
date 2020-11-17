import * as CONSTANTS from '../actionTypes/loader';

const initialState = {
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.SHOW_LOADER: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case CONSTANTS.HIDE_LOADER: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};
