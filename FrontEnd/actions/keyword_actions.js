import * as KeywordUtil from '../util/keyword_util';

export const RECEIVE_ALL_KEYWORDS = 'RECEIVE_ALL_KEYWORDS';
export const RECEIVE_KEYWORD = 'RECEIVE_KEYWORD';

export const RECEIVE_KEYWORD_ERRORS = "RECEIVE_KEYWORD_ERRORS";
export const CLEAR_KEYWORD_ERRORS = "CLEAR_KEYWORD_ERRORS";

export const receiveErrors = (errors) => ({
  type: RECEIVE_KEYWORD_ERRORS,
  errors
});

export const clearErrors = () => ({
  type: CLEAR_KEYWORD_ERRORS,
});

export const receiveAllKeywords = keywords => ({
  type: RECEIVE_ALL_KEYWORDS,
  keywords
});

export const receiveKeyword = keyword => ({
  type: RECEIVE_KEYWORD,
  keyword
});

export const requestKeyword = keywordId => dispatch => (
  KeywordUtil.fetchKeyword(keywordId)
    .then(keyword => dispatch(receiveKeyword(keyword)))
);
export const requestTopKeywords = userId => dispatch => (
  KeywordUtil.fetchTopKeywords(userId)
    .then(keywords => dispatch(receiveAllKeywords(keywords)),
    err => dispatch(receiveErrors(err)))
);

export const createKeyword = data => dispatch => (
  KeywordUtil.createKeyword(data)
    .then(keyword => dispatch(receiveKeyword(keyword)),
    err => dispatch(receiveErrors(err)))
);
