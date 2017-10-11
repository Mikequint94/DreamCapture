import {RECEIVE_CURRENT_USER} from '../actions/session_actions';
// import merge from 'lodash/merge';

const _nullUser = {
  email: null,
  user_id: null
};

const SessionReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      const currentUser = action.user;
      return {
        email: currentUser.email,
        user_id: currentUser.id
      };
    default:
      return state;
  }
};

export default SessionReducer;
