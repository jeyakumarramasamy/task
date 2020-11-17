import { all } from 'redux-saga/effects';
import { loginWatcher } from './sagas/login';
import { homeWatcher } from './sagas/home';

export default function* rootWatchers() {
  yield all([
    loginWatcher(),
    homeWatcher(),
  ]);
}
