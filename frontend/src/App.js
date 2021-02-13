import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Dapp } from "./components/Dapp";
import Form from './components/Form';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/new">
            <Form />
          </Route>
          <Route path="/">
            <Dapp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;