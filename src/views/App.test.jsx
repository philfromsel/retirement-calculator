import React from "react";
import { Provider } from "mobx-react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import App from "./App";
import Constants from "../common/Constants";
import stores from "../stores";

describe("Application", () => {
  let getByTestId;
  const store = stores.calculatorStore;
  afterEach(cleanup);

  const renderComponent = () => {
    ({ getByTestId } = render(
      <Provider {...stores}>
        <App />
      </Provider>,
    ));
  };

  describe("when App component is rendered", () => {

    beforeEach(() => {
      renderComponent();
    });
  
    it("should render the disclaimer by default", () => {
      expect(getByTestId("disclaimer")).toBeTruthy();
    });

    it("should hide the disclaimer if it has been acknowledged", () => {
      fireEvent.click(getByTestId("acknowledge-button"));
      expect(store.acknowledgedDisclaimer).toEqual(true);
    });
  });

  describe("After the disclaimer is acknowledged", () => {

    beforeEach(() => {
      renderComponent();
    });

    it("should load the usage guide by default", () => {
      expect(getByTestId("usage-guide")).toBeInTheDocument();
    });

    // Need to refactor the Line chart to have a container for a test id
/*    it("should load the esop view when the tab is clicked", () => {
      expect(getByTestId("tab-ESOP Growth")).toBeInTheDocument();
      fireEvent.click(getByTestId("tab-ESOP Growth"));
      expect(getByTestId("chart-esop")).toBeInTheDocument();
    });*/


  });
});
