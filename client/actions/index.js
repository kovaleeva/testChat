import axios from 'axios';
import actionTypes from './actionTypes';
import WSService from '../sockets';

export const fetchUsersOnline = usersOnline => ({
  type: actionTypes.FETCH_ONLINE,
  usersOnline,
});

export const fetchUserList = () => WSService.send(actionTypes.FETCH_USER_LIST, {});

export const fetchMessages = messages => ({
  type: actionTypes.FETCH_MESSAGES,
  messages,
});

export const sendMessage = message => ({
  type: actionTypes.SEND_MESSAGE,
  message,
});

export const login = response => ({
  type: actionTypes.LOGIN_USER,
  token: response.token,
  user: response.user
});

export const loginAsync = user => (dispatch) => {
  axios.post('/users', user)
    .then((response) => {
      dispatch(login(response.data));
    })
    .catch(error => error);
};

export const logout = user => ({
  type: actionTypes.LOGOUT_USER,
  user: user,
});

export const logoutAsync = user => (dispatch) => {
  axios.post('/logout', user)
    .then(() => {
      dispatch(logout(user));
    })
    .catch(error => error);
};

export const muteUser = (user) => ({
  type: actionTypes.MUTE_USER,
  user
});

export const fetchMuteUser = (user) => ({
  type: actionTypes.FETCH_MUTE_USER,
  user
});

export const unMuteUser = (user) => ({
  type: actionTypes.UNMUTE_USER,
  user
});

export const fetchUnMuteUser = (user) => ({
  type: actionTypes.FETCH_UNMUTE_USER,
  user
});


export const banUser = user => ({
  type: actionTypes.BAN_USER,
  user
});
