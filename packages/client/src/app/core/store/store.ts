import { AnyAction, applyMiddleware, createStore, Store, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

import { rootEpic } from './root-epic';
import { rootReducer } from './root-reducer';
import { AppState } from './state';

const epicMiddleware = createEpicMiddleware();
const middlewares = [epicMiddleware];
const devMiddlewares = [logger];

function configureStore(): Store<AppState, AnyAction> {
  const store = createStore(
    rootReducer,
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares, ...devMiddlewares))
  );

  epicMiddleware.run(rootEpic);

  return store;
}

export const store = configureStore();
