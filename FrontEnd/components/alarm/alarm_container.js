import Alarm from './alarm';

import {receiveReminder} from '../../actions/reminder_actions';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  reminder: state.reminders,
  userId: state.session.user_id
});

const mapDispatchToProps = dispatch => ({
  receiveReminder: (reminder) => dispatch(receiveReminder(reminder))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Alarm);
