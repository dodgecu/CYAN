import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./pages/log-in/authReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer
});
