import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { connectRouter } from "connected-react-router";

import signUpReducer from "./pages/sign-up/signUp.reducer";
import logInReducer from "./pages/log-in/logIn.reducer";

export default history =>
  combineReducers({
    signup: signUpReducer,
    login: logInReducer,
    form: formReducer,
    router: connectRouter(history)
  });
