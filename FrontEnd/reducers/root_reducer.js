import {combineReducers} from 'redux';
import SessionReducer from './session_reducer';
import EntitiesReducer from './entities_reducer';
import ErrorsReducer from './errors_reducer';


const RootReducer = combineReducers({
  session: SessionReducer,
  entities: EntitiesReducer,
  errors: ErrorsReducer
});

export default RootReducer;
