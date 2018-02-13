import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { users } from "./users.reducer";
import { alert } from "./alert.reducer";
import { companies } from "./companies.reducer";

const rootReducer = combineReducers({
  authentication: authentication,
  users: users,
  alert: alert,
  companies: companies
});

export default rootReducer;
