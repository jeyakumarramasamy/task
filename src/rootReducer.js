import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import login from './reducers/login';
import loader from './reducers/loader';
import home from './reducers/home';

const rootReducer = combineReducers({
  loginState: login,
  loaderState: loader,
  homeState: home,
});

export default rootReducer;
