import { combineReducers } from 'redux';

import { admin } from './../../components/admin/store/admin.reducer';
// import { client } from './client.reducer';

export const rootReducer = combineReducers({
  // client,
  admin,
});
