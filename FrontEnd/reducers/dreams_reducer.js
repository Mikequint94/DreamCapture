import {RECEIVE_ALL_DREAMS, RECEIVE_DREAM} from '../actions/dream_actions';

const DreamReducer = (state = {}, action) => {
  let newState = Object.assign({}, state);
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_DREAMS:
      newState = action.dreams;
      return newState;
    case RECEIVE_DREAM:
      newState[action.dream.id] = action.dream;
      return newState;
    default:
      return state;
  }
};

export default DreamReducer;
