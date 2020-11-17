import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootWatchers from './rootSaga';
import rootReducer from './rootReducer';

const sagaMiddleware = createSagaMiddleware();

// Get the application-wide store instance, prepopulating with state from the server where available.
function configureStore(preloadedState = {}) {
  const store = createStore(
    rootReducer,
    preloadedState,
    (applyMiddleware(sagaMiddleware)),
  );
  sagaMiddleware.run(rootWatchers);
  return store;
}

export const store = configureStore();
