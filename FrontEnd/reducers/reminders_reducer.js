import {RECEIVE_REMINDER} from '../actions/reminder_actions';

const RemindersReducer = (state = {}, action) => {
  let newState = Object.assign({}, state);
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_REMINDER:
      newState['time'] = action.reminder.time;
      newState['set'] = action.reminder.set;
      return newState;
    default:
      return state;
  }
};

export default RemindersReducer;
