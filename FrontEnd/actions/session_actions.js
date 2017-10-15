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
      console.log('login success');
      onSignIn();
      return 'signedin';
    })
    .catch((error) => {
      console.log("Can\'t log in");
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
      console.log(response);
      dispatch(receiveCurrentUser({
        email: null,
        user_id: null
      }));
      dispatch(clearSessionErrors());
      console.log('logged out');
      return onSignOut();
    })
    .catch((error) => {
      console.log("Can\'t log out");
      console.log(error.response);
      // dispatch(receiveSessionErrors(error.response.data));
    });
  };

export const signup = (user) => dispatch => (
  axios.post(USERS_URL, { user })
    .then((response) => {
      console.log(response);
      dispatch(receiveCurrentUser(response.data));
      dispatch(clearSessionErrors());
      console.log('signup success');
      onSignIn();
      return 'signedin';
    })
    .catch((error) => {
      console.log('signup axios error');
      console.log(error.response);
      dispatch(receiveSessionErrors(error.response.data));
    })
  );

  // AsyncStorage code adapted from
  // https://github.com/spencercarli/react-navigation-auth-flow

  const USER_LOGGED_IN = 'dreamcapture_user_logged_in';

  export const onSignIn = () => {
    console.log('user logged in set to true');
    return AsyncStorage.setItem(USER_LOGGED_IN, 'true');
  };

  export const onSignOut = () => {
    console.log('user logged in removed');
    return AsyncStorage.removeItem(USER_LOGGED_IN);
  };

  export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
     AsyncStorage.getItem(USER_LOGGED_IN)
       .then(res => {
         if (res !== null) {
           console.log('async storage true');
           resolve(true);
         } else {
           console.log('async storage false');
           resolve(false);
         }
       })
       .catch(err => reject(err));
   });
  };
