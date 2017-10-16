import DreamShow from './dream_show';

import {requestDream, receiveDream} from '../../actions/dream_actions';
import {requestKeyword, receiveKeyword, receiveAllKeywords, createKeyword, requestTopKeywords} from '../../actions/keyword_actions';
import {connect} from 'react-redux';

const mapStateToProps = (state, props) => ({
  dreams: state.entities.dreams,
  keywords: state.entities.keywords,
  currentUser: state.session.user_id,
  dreamDate: props.navigation.state.params.dreamDate,
  dreamTime: props.navigation.state.params.dreamTime
});

const mapDispatchToProps = dispatch => ({
  requestDream: dreamId => dispatch(requestDream(dreamId)),
  receiveDream: dreamId => dispatch(receiveDream(dreamId)),
  requestKeyword: keywordId => dispatch(requestKeyword(keywordId)),
  receiveKeyword: keywordId => dispatch(receiveKeyword(keywordId)),
  receiveAllKeywords: keywords => dispatch(receiveAllKeywords(keywords)),
  createKeyword: keyword => dispatch(createKeyword(keyword)),
  requestTopKeywords: userId => dispatch(requestTopKeywords(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DreamShow);
