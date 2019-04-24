import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import rootReducer from "./rootReducer";
import { saveState, loadState } from "./localStorage";

export const history = createBrowserHistory();

const initialState = loadState();
const middleware = [thunk, routerMiddleware(history)];

const store = createStore(
  rootReducer(history),
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(() => {
  saveState({
    authReducer: store.getState().authReducer
  });
});

export default store;
