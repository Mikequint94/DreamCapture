import {combineReducers} from 'redux';
import DreamsReducer from './dreams_reducer';
import KeywordsReducer from './keywords_reducer';

const EntitiesReducer = combineReducers({
  dreams: DreamsReducer,
  keywords: KeywordsReducer
});

export default EntitiesReducer;
