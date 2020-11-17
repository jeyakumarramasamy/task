import { put, takeLatest, call, all } from 'redux-saga/effects';
import toastr from 'toastr';
import envConfig from 'envConfig'; // eslint-disable-line
import * as loginActions from '../actionCreators/login';
import { LOAD_ALL_USERS, LOGIN_REQUESTING } from '../actionTypes/login';
import { doGet } from '../utils/fetchWrapper';
import MESSAGES from '../constants/Messages';


const loadAllUsersApi = () =>
  doGet(envConfig.apiEndPoints.getPeople)
    .then((response) => response);

export function* loadAllUsers({ payload }) {
  try {
    let response = yield call(loadAllUsersApi, payload);
    if (response && response.results) {
      yield put(loginActions.loadUserSuccess(response.results));
    } else {
      toastr.error(MESSAGES.SOMETHING_WENT_WRONG);
    }
  } catch (error) {
    toastr.error('Error occured: ' + error);
  }
}

export function* loginUser({ payload }) {
  yield put(loginActions.loginUserSuccess(payload));
}


export function* loginWatcher() {
  yield all([
    takeLatest(LOAD_ALL_USERS, loadAllUsers),
    takeLatest(LOGIN_REQUESTING, loginUser),
  ]);
}
