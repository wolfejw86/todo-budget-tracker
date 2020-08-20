import React from "react";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";

// route components
import { Hello } from "./Hello.jsx";
import { App } from "./App.jsx";

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={Hello} />
      <Route exact path="/tasks" component={App} />
      {/* <Route component= /> */}
    </Switch>
  </Router>
);
