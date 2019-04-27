import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import ProtectedRoute from "./protected.route";

import routes from "./constants/routes";
import store, { history } from "./store";

//COMPONENTS
import CreateFlower from "./pages/create-flower-page/create-flower.component";
import FlowerDetails from "./pages/flower-details/flower-details.component";
import LogIn from "./pages/authorization/log-in/log-in.component";
import SignUp from "./pages/authorization/sign-up/sign-up.component";
import Dashboard from "./pages/dashboard/dashboard.component";
import Home from "./pages/home/home.component";

//STYLES
import "./App.scss";

class App extends Component {
  render() {
    const isRegistered = store.getState().authReducer.isRegistered;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route exact path={routes.home} component={Home} />
          <Route exact path={routes.logIn} component={LogIn} />
          <Route exact path={routes.signUp} component={SignUp} />
          <ProtectedRoute
            exact
            path={routes.flowerDetails}
            component={FlowerDetails}
          />
          <ProtectedRoute exact path={routes.dashboard} component={Dashboard} />
          <ProtectedRoute
            exact
            path={routes.createFlower}
            component={CreateFlower}
          />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
