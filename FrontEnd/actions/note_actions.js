import axios from 'axios';
import {API_URL} from '../api/api_index';

export const RECEIVE_NOTE = 'RECEIVE_NOTE';

export const RECEIVE_NOTE_ERRORS = "RECEIVE_NOTE_ERRORS";
export const CLEAR_NOTE_ERRORS = "CLEAR_NOTE_ERRORS";

export const receiveErrors = (errors) => ({
  type: RECEIVE_NOTE_ERRORS,
  errors
});

export const clearErrors = () => ({
  type: CLEAR_NOTE_ERRORS,
});

export const receiveNote = note => ({
  type: RECEIVE_NOTE,
  note
});

export const createNote = note => dispatch => (
  axios.post(`${API_URL}/api/notes`, { note })
    .catch(err => dispatch(receiveErrors(err)))
);
