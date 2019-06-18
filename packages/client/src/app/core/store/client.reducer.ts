import { ClientState, initialState } from './client.state';
import { LOAD_ARTICLES_SUCCESS } from './client.actions';

export function client(state = initialState(), action: any): ClientState {
  switch (action.type) {
    case LOAD_ARTICLES_SUCCESS:
      const articles = [...state.articles, ...action.payload.collection];
      return {
        ...state,
        articles,
        loading: false,
        moreResult: action.payload.total > articles.length,
      };

    default:
      return state;
  }
}
