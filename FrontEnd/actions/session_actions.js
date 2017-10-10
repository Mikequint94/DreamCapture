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

export const login = user => dispatch => (
  fetch( SIGNIN_URL,  {
    method: 'POST',
    body: JSON.stringify( {user: user} )
  })
);
//
// export const login = (user) => dispatch => (
//   axios.post(SIGNIN_URL, { user: user })
//     .then((response) => {
//       console.log('user' + user);
//       console.log(response);
//     })
//     .catch((error) => {
//       console.log("Can\'t log in");
//       console.log(error);
//       console.log({['user']: user});
//     })
//   );

  // APIUtil.login(user).then(
  //   user => (dispatch(receiveCurrentUser(user))),
  //   error => (dispatch(receiveErrors(error.responseJSON))
  // ));



// export const logout = () => dispatch => (
//   APIUtil.logout().then(user => (dispatch(receiveCurrentUser(null))
//   ))
// );
//
// export const signup = user => dispatch => (
//   APIUtil.signup(user).then(
//     user => (dispatch(receiveCurrentUser(user))),
//     error => (dispatch(receiveErrors(error.responseJSON))
//   ))
// );