import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import DreamErrorsReducer from './dream_errors_reducer';
import KeywordErrorsReducer from './keyword_errors_reducer';

export default combineReducers({
  session: sessionErrorsReducer,
  dream: DreamErrorsReducer,
  keyword: KeywordErrorsReducer
});
