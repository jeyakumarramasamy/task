import { LOAD_ALL_USERS_SUCCESS, LOGGED_USER_DETAILS, LOGIN_REQUESTING } from '../actionTypes/login';

const loginState = {
    loggedIn: null,
};

export default function (state = loginState, action) {
    switch (action.type) {
        case LOAD_ALL_USERS_SUCCESS: {
            const { payload } = action;
            return {
                ...state,
                users: payload,
            };
        }
        case LOGIN_REQUESTING: {
            console.log('ener');
            return {
                ...state,
                loggedIn: null,
            };
        };
        case LOGGED_USER_DETAILS: {
            const { payload } = action;
            const { userName, password } = payload;
            const { users } = state;
            const loggedInUser = users ? users.find((item) =>
                item.name === userName && item.birth_year === password
            ) : null;
            return {
                ...state,
                loggedIn: !!loggedInUser,
                loggedInUser,
            };
        }
    }
    return state;
};
