import axios from 'axios';
import {SIGNIN_URL, SIGNUP_URL} from '../api/api_index';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

// export const receiveErrors = errors => ({
//   type: RECEIVE_SESSION_ERRORS,
//   errors
// });
//


export const login = (user) => dispatch => (
  axios.post(SIGNIN_URL, { user })
    .then((response) => {
      console.log('success');
      console.log(response);
    })
    .catch((error) => {
      console.log("Can\'t log in");
      console.log(error.response);
    })
  );

export const signup = (user) => dispatch => (
  axios.post(SIGNUP_URL, { user })
    .then((response) => {
      console.log('success');
      console.log(response);
    })
    .catch((error) => {
      console.log(error.response);
    })
  );


// export const logout = () => dispatch => (
//   APIUtil.logout().then(user => (dispatch(receiveCurrentUser(null))
//   ))
// );
//
