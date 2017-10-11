import {combineReducers} from 'redux';
import DreamsReducer from './dreams_reducer';

const EntitiesReducer = combineReducers({
  dreams: DreamsReducer,
});

export default EntitiesReducer;
