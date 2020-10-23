import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AuthState from "./context/auth/authState";

import Login from "./components/Login";
import Home from "./components/Home";

const App = () => {
  return (
    <AuthState>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </Router>
    </AuthState>
  );
};

export default App;
