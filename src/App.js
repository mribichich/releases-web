import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NotFound from "./components/NotFound";
import Applications from "./containers/Applications";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Applications} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
