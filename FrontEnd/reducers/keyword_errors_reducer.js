import {
  RECEIVE_KEYWORD_ERRORS, CLEAR_KEYWORD_ERRORS
} from '../actions/keyword_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  const newState = Object.assign({});

  switch (action.type) {
    case RECEIVE_KEYWORD_ERRORS:
      newState.errors = action.errors;
      return newState;
    case CLEAR_KEYWORD_ERRORS:
      newState.errors = [];
      return newState;
    default:
      return state;
  }
};
