import {
  RECEIVE_DREAM_ERRORS, CLEAR_DREAM_ERRORS
} from '../actions/dream_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  const newState = Object.assign({});

  switch (action.type) {
    case RECEIVE_DREAM_ERRORS:
      newState.errors = action.errors;
      return newState;
    case CLEAR_DREAM_ERRORS:
      newState.errors = [];
      return newState;
    default:
      return state;
  }
};
