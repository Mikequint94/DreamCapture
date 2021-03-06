import DreamIndexScreen from './dream_index';

import {requestUserDreams, requestSearchDreams} from '../../actions/dream_actions';
import {connect} from 'react-redux';


const mapStateToProps = state => ({
  dreams: state.entities.dreams,
  userId: state.session.user_id
});

const mapDispatchToProps = dispatch => ({
  requestUserDreams: (userId) => dispatch(requestUserDreams(userId)),
  requestSearchDreams: (userId, query) => dispatch(requestSearchDreams(userId, query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DreamIndexScreen);
