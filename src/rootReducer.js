import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { connectRouter } from "connected-react-router";

import signUpReducer from "./pages/sign-up/sign-up.reducer";
import logInReducer from "./pages/log-in/log-in.reducer";
import logOutReducer from "./pages/log-out/log-out.reducer";

export default history =>
  combineReducers({
    signup: signUpReducer,
    login: logInReducer,
    form: formReducer,
    router: connectRouter(history),
    logout: logOutReducer
  });
