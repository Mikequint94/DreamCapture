import axios from 'axios';
import {API_URL} from '../api/api_index';

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
  axios.get(`${API_URL}/api/keywords/${keywordId}`)
    .then(keyword => dispatch(receiveKeyword(keyword.data)))
    .catch(err => dispatch(receiveErrors(err)))
);
export const requestTopKeywords = userId => dispatch => (
  axios.get(`${API_URL}/api/users/${userId}/keywords`)
    .then(keywords => dispatch(receiveAllKeywords(keywords.data)))
    .catch(err => dispatch(receiveErrors(err)))
);

export const createKeyword = keyword => dispatch => (
  axios.post(`${API_URL}/api/keywords`, { keyword })
    .then(data => dispatch(receiveKeyword(data.data)))
    .catch(err => dispatch(receiveErrors(err)))
);
