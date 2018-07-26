import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import members from "./members";

export default combineReducers({
  router: routerReducer,
  members
});
