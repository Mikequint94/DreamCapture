import axios from 'axios';
import { AsyncStorage } from "react-native";
import {SESSION_URL, USERS_URL} from '../api/api_index';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';

export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS
});

export const login = (user) => dispatch => (
  axios.post(SESSION_URL, { user })
    .then(response => {
      dispatch(receiveCurrentUser(response.data));
      dispatch(clearSessionErrors());
      onSignIn();
      return 'signedin';
    })
    .catch((error) => {
      dispatch(receiveSessionErrors(error.response.data));
    })
  );

export const logout = () => dispatch => {
  axios({
    method: 'DELETE',
    url: SESSION_URL,
    params: {}
  })
    .then(response => {
      dispatch(receiveCurrentUser({
        email: null,
        user_id: null
      }));
      dispatch(clearSessionErrors());
      return onSignOut();
    })
    .catch((error) => {
    });
  };

export const signup = (user) => dispatch => (
  axios.post(USERS_URL, { user })
    .then((response) => {
      dispatch(receiveCurrentUser(response.data));
      dispatch(clearSessionErrors());
      onSignIn();
      return 'signedin';
    })
    .catch((error) => {
      dispatch(receiveSessionErrors(error.response.data));
    })
  );

  // AsyncStorage code adapted from
  // https://github.com/spencercarli/react-navigation-auth-flow

  const USER_LOGGED_IN = 'dreamcapture_user_logged_in';

  export const onSignIn = () => {
    return AsyncStorage.setItem(USER_LOGGED_IN, 'true');
  };

  export const onSignOut = () => {
    return AsyncStorage.removeItem(USER_LOGGED_IN);
  };

  export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
     AsyncStorage.getItem(USER_LOGGED_IN)
       .then(res => {
         if (res !== null) {
           resolve(true);
         } else {
           resolve(false);
         }
       })
       .catch(err => reject(err));
   });
  };
