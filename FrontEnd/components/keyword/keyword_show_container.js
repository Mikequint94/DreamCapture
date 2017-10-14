import KeywordShow from './keyword_show';

import {requestDream} from '../../actions/dream_actions';
import {connect} from 'react-redux';


const mapStateToProps = state => ({
  dreams: state.entities.dreams
});

const mapDispatchToProps = dispatch => ({
  requestDream: dreamId => dispatch(requestDream(dreamId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeywordShow);
