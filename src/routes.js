import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import AsyncComponent from './asyncComponent';
import Loader from './components/Loader';
import { RouteConstants } from './constants/RouteConstants';

const HomeContainer = () => import(/* webpackChunkName: "home" */ './containers/home');
const LoginContainer = () => import(/* webpackChunkName: "login" */ './containers/login');

const history = createBrowserHistory();

const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} component={(props) => (
    sessionStorage.getItem('isLoggedIn')
      ? <AsyncComponent
        {...props}
        moduleProvider={component}
      />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
);

const PublicRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    component={(props) => (
      <AsyncComponent
        {...props}
        moduleProvider={component}
      />
    )}
  />
);

export class Routes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <PublicRoute path={RouteConstants.LOGIN} component={LoginContainer} />
          <PrivateRoute exact path="/" component={HomeContainer} />
          <PrivateRoute path={RouteConstants.HOME} component={HomeContainer} />
        </Switch>
        <Loader />
      </Router>
    );
  }
}

export default Routes;

