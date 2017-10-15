import { connect } from 'react-redux';
import { signup, clearSessionErrors } from '../../actions/session_actions';
import SignupScreen from './signup.js';

const mapStateToProps = ({errors}) => ({
  errors: errors.session.errors
  });

const mapDispatchToProps = (dispatch) => ({
  signup: user => dispatch(signup(user)),
  clearErrors: () => dispatch(clearSessionErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupScreen);
