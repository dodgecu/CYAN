import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { connectRouter } from "connected-react-router";

import authorizationReducer from "./pages/authorization/authorization.reducer";
import sensorsReducer from "./common/sensors/sensors.reducer";
import setType from "./common/custom-select/create-flower.reducer";

export default history =>
  combineReducers({
    authReducer: authorizationReducer,
    form: formReducer,
    flowerType: setType,
    sensors: sensorsReducer,

    router: connectRouter(history)
  });
