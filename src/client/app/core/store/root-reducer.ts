import { combineReducers } from "redux";
import { admin } from "../../components/admin/store/admin.reducer";

function client(state = {}, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}

export const rootReducer =
  combineReducers({
    client,
    admin,
  });
