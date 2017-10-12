import KeywordShow from './keyword_show';

import {requestKeyword, receiveKeyword, receiveAllKeywords} from '../../actions/keyword_actions';
import {connect} from 'react-redux';


const mapStateToProps = state => ({
  keywords: state.entities.keywords,
});

const mapDispatchToProps = dispatch => ({
  requestKeyword: keywordId => dispatch(requestKeyword(keywordId)),
  receiveKeyword: keywordId => dispatch(receiveKeyword(keywordId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeywordShow);
