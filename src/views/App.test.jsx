import React from "react";
import { Provider } from "mobx-react";
import { render, cleanup } from "@testing-library/react";
import App from "./App";
import Constants from "../common/Constants";

describe("Application", () => {
  let props;
  let getByTestId;

  const store = {
    averageAnnual401kFees: 0.25,
    averageAnnual401kGrowth: 0,
    averageRaise: 0,
    averageEmployerESOPContribution: 5,
    averageShareGrowth: 0,
    initYear: 2019,
    employee401kContribution: 75,
    selectedTab: 0,
    startDate: new Date(new Date(Date.now()).getFullYear() - 1, 0, 1),
    starting401kBalance: 0,
    startingSalary: 30160,
    startingESOPAccountValue: 0,
    yearsToCalculate: 30,
    handleInputsUpdate: jest.fn(),
    handleTabChange: jest.fn(),
    tabs: [
      Constants.USAGE_GUIDE,
      Constants.ESOP_GROWTH,
      Constants.ONLY_401K,
      Constants.COMBINED_INVESTMENTS,
    ],
    selectedTabName: jest.fn(),
  };

  afterEach(cleanup);

  const renderComponent = () => {
    ({ getByTestId } = render(
      <Provider calculatorStore={store}>
        <App {...props} />
      </Provider>
    ));
  };

  describe("when App component is rendered", () => {
    beforeEach(() => {
      renderComponent();
    });

    it("should render the disclaimer by default", () => {
      expect(getByTestId("disclaimer")).toBeInTheDocument();
    });
  });
});
