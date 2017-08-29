import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import axios from "axios";

import configureStore from "./stores/configureStore";
import * as actions from "./actions";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

let store = configureStore();
// store.dispatch(actions.setApplications([{ app: 1 }, { prop: 2 }]));
axios.get("/api/applications").then(resp => resp.data).then(data => {
  store.dispatch(actions.setApplications(data));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
