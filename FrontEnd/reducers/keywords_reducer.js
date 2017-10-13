import {RECEIVE_ALL_KEYWORDS, RECEIVE_KEYWORD} from '../actions/keyword_actions';

const KeywordsReducer = (state = {}, action) => {
  let newState = Object.assign({}, state);
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_KEYWORDS:
      newState = action.keywords;
      return newState;
    case RECEIVE_KEYWORD:
      newState[action.keyword.id] = action.keyword;
      return newState;
    default:
      return state;
  }
};

export default KeywordsReducer;
