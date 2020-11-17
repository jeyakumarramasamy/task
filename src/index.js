import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './configureStore';
import Routes from './routes';
import '../assets/sass/index.scss';

function renderApp() {
  // This code starts up the React app when it runs in a browser. It sets up the routing configuration
  // and  injects the app into a DOM element.
  ReactDOM.render(
    <Provider store={store}>
      <Routes />
    </Provider>,
    document.getElementById('root')
  );
}

renderApp();
