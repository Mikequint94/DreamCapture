import Record from './record';

import {createDream} from '../../actions/dream_actions';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  currentUser: state.session.user_id,
  dreams: state.entities.dreams
});

const mapDispatchToProps = dispatch => ({
  createDream: dream => dispatch(createDream(dream))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Record);
