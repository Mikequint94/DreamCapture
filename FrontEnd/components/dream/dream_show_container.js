import DreamShow from './dream_show';

import {requestDream, receiveDream} from '../../actions/dream_actions';
import {connect} from 'react-redux';


const mapStateToProps = state => ({
  dreams: state.entities.dreams
});

const mapDispatchToProps = dispatch => ({
  requestDream: dreamId => dispatch(requestDream(dreamId)),
  receiveDream: dreamId => dispatch(receiveDream(dreamId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DreamShow);
