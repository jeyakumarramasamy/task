import * as CONSTANTS from '../actionTypes/home';

export function getPlanets(payload) {
  return {
    type: CONSTANTS.GET_PLANET,
    payload,
  };
}

export function getPlanetSuccess(payload) {
  return {
    type: CONSTANTS.GET_PLANET_SUCCESS,
    payload,
  };
}

