// import * as DreamUtil from '../util/dream_util';

import axios from 'axios';
import {API_URL} from '../api/api_index';

export const RECEIVE_ALL_DREAMS = 'RECEIVE_ALL_DREAMS';
export const RECEIVE_DREAM = 'RECEIVE_DREAM';

export const RECEIVE_DREAM_ERRORS = "RECEIVE_DREAM_ERRORS";
export const CLEAR_DREAM_ERRORS = "CLEAR_DREAM_ERRORS";

export const receiveErrors = (errors) => ({
  type: RECEIVE_DREAM_ERRORS,
  errors
});

export const clearErrors = () => ({
  type: CLEAR_DREAM_ERRORS,
});

export const receiveAllDreams = dreams => ({
  type: RECEIVE_ALL_DREAMS,
  dreams
});

export const receiveDream = dream => ({
  type: RECEIVE_DREAM,
  dream.data
});

export const requestDream = dreamId => dispatch => (
  axios.get(`${API_URL}/api/dreams/${dreamId}`)
    .then(dream => dispatch(receiveDream(dream)))
    .catch(err => dispatch(receiveErrors(err)))
);
export const requestUserDreams = userId => dispatch => (
  axios.get(`${API_URL}/api/users/${userId}/dreams`)
    .then(dreams => dispatch(receiveAllDreams(dreams.data)))
    .catch(err => dispatch(receiveErrors(err)))
);

export const createDream = dream => dispatch => (
  axios.post(`${API_URL}/api/dreams`, { dream })
    .then(data => dispatch(receiveDream(data)))
    .catch(err => dispatch(receiveErrors(err)))
);

export const updateDream = dream => dispatch => (
  axios.patch(`${API_URL}/api/dreams/${data.id}`, { dream })
    .then(data => dispatch(receiveDream(data)))
    .catch(err => (dispatch(receiveErrors(err))))
);
