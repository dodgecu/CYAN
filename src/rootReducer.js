import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { connectRouter } from "connected-react-router";

import authorizationReducer from "./pages/authorization/authorization.reducer";
import sensorsReducer from "./common/sensors/sensors.reducer";

export default history =>
  combineReducers({
    authReducer: authorizationReducer,
    form: formReducer,
    sensors: sensorsReducer,
    router: connectRouter(history)
  });
