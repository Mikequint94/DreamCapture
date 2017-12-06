import {combineReducers} from 'redux';
import DreamsReducer from './dreams_reducer';
import DreamReducer from './dream_reducer';
import KeywordsReducer from './keywords_reducer';

const EntitiesReducer = combineReducers({
  dreams: DreamsReducer,
  currentDream: DreamReducer,
  keywords: KeywordsReducer
});

export default EntitiesReducer;
