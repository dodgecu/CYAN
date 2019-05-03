import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import ProtectedRoute from "./protected.route";
import ReactDOM from "react-dom";

import routes from "./constants/routes";
import store, { history } from "./store";

//COMPONENTS
import CreateFlower from "./pages/create-flower-page/create-flower.component";
import FlowerDetails from "./pages/flower-details/flower-details.component";
import LogIn from "./pages/authorization/log-in/log-in.component";
import SignUp from "./pages/authorization/sign-up/sign-up.component";
import Dashboard from "./pages/dashboard/dashboard.component";
import Home from "./pages/home/home.component";
import NotFound from "./pages/not-found/not-found.component";
import SignUpSuccess from "./pages/authorization/sign-up-success/sign-up-success.component";
import Spinner from "./common/components/spinner/spinner.component";

//STYLES
import "./App.scss";
import { UserProfile } from "./pages/authorization/user-profile";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path={routes.home} component={Home} />
            <Route exact path={routes.logIn} component={LogIn} />
            <Route exact path={routes.signUp} component={SignUp} />
            <ProtectedRoute
              exact
              path={routes.flowerDetails}
              component={FlowerDetails}
            />
            <ProtectedRoute
              exact
              path={routes.dashboard}
              component={Dashboard}
            />
            <ProtectedRoute
              exact
              path={routes.createFlower}
              component={CreateFlower}
            />
            <Route
              exact
              path={routes.signUpSuccess}
              component={SignUpSuccess}
            />
            <ProtectedRoute
              exact
              path={routes.userProfile}
              component={UserProfile}
            />
            <Route exact path={routes.notFound} component={NotFound} />
          </Switch>
        </ConnectedRouter>

        {store.getState().authReducer.isLoading &&
          ReactDOM.createPortal(<Spinner />, document.getElementById("portal"))}
      </Provider>
    );
  }
}

export default App;
