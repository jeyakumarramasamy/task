import {
  LOAD_ALL_USERS,
  LOAD_ALL_USERS_SUCCESS, LOGGED_USER_DETAILS, LOGIN_REQUESTING,
} from '../actionTypes/login';

export const loadUsers = () => ({
  type: LOAD_ALL_USERS,
});

export const loadUserSuccess = (payload) => ({
  type: LOAD_ALL_USERS_SUCCESS,
  payload,
})

export const loginUser = (value) => ({
  type: LOGIN_REQUESTING,
  payload: value,
});

export const loginUserSuccess = (value) => ({
  type: LOGGED_USER_DETAILS,
  payload: value,
});

