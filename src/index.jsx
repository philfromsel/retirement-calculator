import React from "react";
import ReactDOM from "react-dom";
import "mobx-react-lite/batchingForReactDom";
import { Provider } from "mobx-react";
import "./index.css";
import App from "./views/App";
import CalculatorStore from "./stores/CalculatorStore";

ReactDOM.render(
  <Provider calculatorStore={CalculatorStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);