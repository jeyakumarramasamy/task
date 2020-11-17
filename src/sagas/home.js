import { put, call, all, throttle } from 'redux-saga/effects';
import toastr from 'toastr';
import envConfig from 'envConfig'; // eslint-disable-line
import * as homeActions from '../actionCreators/home';
import { GET_PLANET } from '../actionTypes/home';
import { doGet } from '../utils/fetchWrapper';
import MESSAGES from '../constants/Messages';


const getPlanetsApi = (value) =>
  doGet(`${envConfig.apiEndPoints.getPlanets}?search=${value}`)
    .then((response) => response);

export function* loadPlanets({ payload }) {
  try {
    let response = yield call(getPlanetsApi, payload);
    if (response && response.results) {
      yield put(homeActions.getPlanetSuccess(response.results));
    } else {
      toastr.error(MESSAGES.SOMETHING_WENT_WRONG);
    }
  } catch (error) {
    toastr.error('Error occured: ' + error);
  }
}

export function* homeWatcher() {
  yield all([
    throttle(1000, GET_PLANET, loadPlanets),
  ]);
}
