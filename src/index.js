import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { createStore, combineReducers } from "redux";
import reducer from "./store/reducer";
import { Provider } from "react-redux";
import { reducer as formReducer } from "redux-form";

const plantReducers = {
  main: reducer,
  form: formReducer
};

const reducers = combineReducers(plantReducers);

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
