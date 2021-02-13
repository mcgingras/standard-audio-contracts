import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Dapp } from "./components/Dapp";
import Form from './components/Form';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/new">
            <Form />
          </Route>
          <Route path="/dapp">
            <Dapp />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;