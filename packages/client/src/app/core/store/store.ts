import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';

import { rootEpic } from './root-epic';
import { rootReducer } from './root-reducer';
import { lazyReducerEnhancer } from 'pwa-helpers';

const epicMiddleware = createEpicMiddleware();

function configureStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(epicMiddleware), lazyReducerEnhancer(combineReducers))
  );

  epicMiddleware.run(rootEpic);

  return store;
}

export const store = configureStore();
