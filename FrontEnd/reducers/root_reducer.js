import {combineReducers} from 'redux';
import SessionReducer from './session_reducer';
import EntitiesReducer from './entities_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  entities: EntitiesReducer
});

export default RootReducer;
