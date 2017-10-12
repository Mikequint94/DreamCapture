import {
  RECEIVE_SESSION_ERRORS, CLEAR_SESSION_ERRORS
} from '../actions/session_actions';

const initialState = {
  errors: []
};

export default (state = initialState, action) => {
  Object.freeze(state);
  const newState = Object.assign({});

  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      newState.errors = action.errors;
      return newState;
    case CLEAR_SESSION_ERRORS:
      newState.errors = [];
      return newState;
    default:
      return state;
  }
};
