import { ClientState, initialState } from './client.state';

export function client(state = initialState(), action: any): ClientState {
  switch (action.type) {
    default:
      return state;
  }
}
