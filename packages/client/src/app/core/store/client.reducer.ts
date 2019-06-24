import { CLEAR_ARTICLES, LOAD_ARTICLES, LOAD_ARTICLES_SUCCESS } from './client.actions';
import { ClientState, initialState } from './client.state';
import { FAILURE } from './common.actions';

export function client(state = initialState(), action: any): ClientState {
  switch (action.type) {
    case LOAD_ARTICLES:
      return {
        ...state,
        loading: true,
        page: action.payload.page,
      };

    case LOAD_ARTICLES_SUCCESS:
      const articles = [...state.articles, ...action.payload.collection];
      return {
        ...state,
        loading: false,
        articles,
        moreResult: action.payload.total > articles.length,
      };

    case FAILURE:
      return {
        ...state,
        page: 1,
        loading: false,
        error: action.payload.message ? action.payload.message : action.payload,
      };

    case CLEAR_ARTICLES:
      return {
        ...state,
        page: 1,
        articles: [],
      };

    default:
      return state;
  }
}
