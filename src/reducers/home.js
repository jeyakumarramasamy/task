import { GET_PLANET, GET_PLANET_SUCCESS } from '../actionTypes/home';

const homeState = {};

export default function (state = homeState, action) {
    switch (action.type) {
        case GET_PLANET: {
            return {
                ...state,
            };
        }
        case GET_PLANET_SUCCESS: {
            return {
                ...state,
                loggedIn: null,
                planets: action.payload,
            };
        };
    }
    return state;
};
