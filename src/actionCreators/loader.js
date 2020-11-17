import * as CONSTANTS from '../actionTypes/loader';

export function showLoader() {
  return {
    type: CONSTANTS.SHOW_LOADER,
  };
}

export function hideLoader() {
  return {
    type: CONSTANTS.HIDE_LOADER,
  };
}

