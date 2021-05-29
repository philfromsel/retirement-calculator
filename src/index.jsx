import React from "react";
import ReactDOM from "react-dom";
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