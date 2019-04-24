import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { connectRouter } from "connected-react-router";

import logOutReducer from "./pages/log-out/log-out.reducer";
import authorizationReducer from "./pages/authorization/authorization.reducer";
export default history =>
  combineReducers({
    authReducer: authorizationReducer,
    form: formReducer,
    router: connectRouter(history),
    logout: logOutReducer
  });
