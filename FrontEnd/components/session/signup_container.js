import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import SignupScreen from './signup.js';

const mapStateToProps = ({errors}) => ({
  errors: errors.session.errors
  });

const mapDispatchToProps = (dispatch) => ({
  signup: user => dispatch(signup(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupScreen);
