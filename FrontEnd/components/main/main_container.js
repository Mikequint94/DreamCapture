import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import MainScreen from './main.js';

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(MainScreen);
