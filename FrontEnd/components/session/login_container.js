import { connect } from 'react-redux';
import { login, clearSessionErrors } from '../../actions/session_actions';
import LoginScreen from './login.js';

const mapStateToProps = ({errors}) => ({
  errors: errors.session.errors
  });

const mapDispatchToProps = (dispatch) => ({
  login: user => dispatch(login(user)),
  clearErrors: () => dispatch(clearSessionErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
