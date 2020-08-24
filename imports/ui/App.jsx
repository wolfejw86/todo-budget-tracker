import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import { Hello } from "./Hello";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { UserProvider, UserContext } from "./contexts/UserContext";
import { Logout } from "./pages/Logout";
import { Family } from "./pages/Family";
import { ListsPage } from "./pages/Lists/ListsPage";

const Routing = () => {
  const { user, getEmail, family } = useContext(UserContext);

  return (
    <Router>
      <div>
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/">Dashboard</NavLink>
              </li>
              {user && (
                <li>
                  <NavLink to="/family">Manage Family</NavLink>
                </li>
              )}
              <li>
                <NavLink to="/tasks">Todo Lists</NavLink>
              </li>
              {!user && (
                <li>
                  <NavLink to="/signup">Signup</NavLink>
                </li>
              )}
              {!user && (
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              )}
              {user && (
                <li>
                  <NavLink to="/logout">Logout</NavLink>
                </li>
              )}
            </ul>
            {user && <div>{getEmail()}</div>}
            {family && <div>{family.name}</div>}
          </nav>
        </header>
        <Switch>
          <Route exact path="/" component={Hello} />
          <Route exact path="/tasks" component={ListsPage} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/family" component={Family} />
        </Switch>
      </div>
    </Router>
  );
};

export const App = () => {
  return (
    <div>
      <UserProvider>
        <Routing />
      </UserProvider>
    </div>
  );
};
