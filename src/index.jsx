import React from "react";
import ReactDOM from "react-dom";
import "mobx-react-lite/batchingForReactDom";
import { Provider } from "mobx-react";
import "./index.css";
import App from "./views/App";
import stores from "./stores";

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById("root")
);