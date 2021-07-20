import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Signin from "./pages/login";
import Home from "./pages/home";
import Auth from "./pages/auth";
import './App.css';

function App() {
  return (
      <Router>
        <div>
          <Switch>
            <Route path="/auth/linkedin/callback">
              <Auth />
            </Route>
            <Route path="/signin">
              <Signin />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
