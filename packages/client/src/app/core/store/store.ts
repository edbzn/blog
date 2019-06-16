import { AnyAction, applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

import { rootEpic } from './root-epic';
import { rootReducer } from './root-reducer';
import { AppState } from './state';

const epicMiddleware = createEpicMiddleware();
const middlewares = [epicMiddleware, logger];

function configureStore(): Store<AppState, AnyAction> {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

  epicMiddleware.run(rootEpic);

  return store;
}

export const store = configureStore();
