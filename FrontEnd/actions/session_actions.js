import axios from 'axios';
import { AsyncStorage } from "react-native";
import {SESSION_URL, USERS_URL} from '../api/api_index';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const login = (user) => dispatch => (
  axios.post(SESSION_URL, { user })
    .then(response => {
      console.log('login success');
      console.log(response);
      dispatch(receiveCurrentUser(response.data));
      onSignIn();
    })
    .catch((error) => {
      console.log("Can\'t log in");
      console.log(error.response);
    })
  );

export const logout = () => dispatch => (
  console.log("log out pushed"),
  axios({
    method: 'DELETE',
    url: SESSION_URL,
    params: {}
  })
    .then(response => {
      console.log('logged out');
      console.log(response);
      dispatch(receiveCurrentUser(null));
      onSignOut();
    })
    .catch((error) => {
      console.log("Can\'t log out");
      console.log(error.response);
    })
  );

export const signup = (user) => dispatch => (
  axios.post(USERS_URL, { user })
    .then((response) => {
      console.log('success');
      console.log(response);
      dispatch(receiveCurrentUser(response.data));
      onSignIn();
    })
    .catch((error) => {
      console.log('signup axios error');
      console.log(error.response);
    })
  );

  const USER_LOGGED_IN = "user_logged_in";

  const onSignIn = () => AsyncStorage.setItem(USER_LOGGED_IN, "true");
  const onSignOut = () => AsyncStorage.removeItem(USER_LOGGED_IN);

  export const isSignedIn = () => {
    const userLoggedIn = AsyncStorage.getItem(USER_LOGGED_IN);
    if (userLoggedIn !== null) {
      return true;
    } else {
      return false;
    }
  };
