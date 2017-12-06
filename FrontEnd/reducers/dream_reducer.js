import {RECEIVE_DREAM} from '../actions/dream_actions';

const DreamsReducer = (state = {}, action) => {
  let newState = Object.assign({}, state);
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_DREAM:
      newState[action.dream.id] = action.dream;
      return newState;
    default:
      return state;
  }
};

export default DreamsReducer;
