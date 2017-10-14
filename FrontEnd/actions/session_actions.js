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
      console.log(response);
      dispatch(receiveCurrentUser(response.data));
      dispatch(clearSessionErrors());
      onSignIn();
      console.log('login success');
    })
    .catch((error) => {
      console.log("Can\'t log in");
      console.log(error.response);
      dispatch(receiveSessionErrors(error.response.data));
    })
  );

export const logout = () => dispatch => {
  console.log("log out pushed");
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
      onSignOut();
      console.log('logged out');
    })
    .catch((error) => {
      console.log("Can\'t log out");
      console.log(error.response);
      dispatch(receiveSessionErrors(error.response.data));
    });
  };

export const signup = (user) => dispatch => (
  axios.post(USERS_URL, { user })
    .then((response) => {
      console.log(response);
      dispatch(receiveCurrentUser(response.data));
      dispatch(clearSessionErrors());
      onSignIn();
      console.log('signup success');
    })
    .catch((error) => {
      console.log('signup axios error');
      console.log(error.response);
      dispatch(receiveSessionErrors(error.response.data));
    })
  );

  const USER_LOGGED_IN = "user_logged_in";

  const onSignIn = () => AsyncStorage.setItem(USER_LOGGED_IN, "true");
  const onSignOut = () => AsyncStorage.removeItem(USER_LOGGED_IN);

  export const isSignedIn = () => {
    const userLoggedIn = AsyncStorage.getItem(USER_LOGGED_IN);
    if (userLoggedIn !== null) {
      console.log('async user logged in');
      return true;
    } else {
      console.log('async user logged out');
      return false;
    }
  };
