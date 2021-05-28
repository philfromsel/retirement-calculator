import CalculatorStore from "./CalculatorStore";
import InitialValues from "../common/Defaults";

describe("CalculatorStore", () => {
  let storeObj;
  beforeEach(() => {
    storeObj = undefined;
  });

  const store = () => {
    if (!storeObj) {
      storeObj = CalculatorStore;
    }
    return storeObj;
  };

  it("should initialize with the configured defaults", () => {
    expect(store().acknowledgedDisclaimer).toBe(InitialValues.acknowledgedDisclaimer);
    expect(store().averageAnnual401kFees).toEqual(InitialValues.averageAnnual401kFees);
    expect(store().averageAnnual401kGrowth).toEqual(InitialValues.averageAnnual401kGrowth);
    expect(store().averageRaise).toEqual(InitialValues.averageRaise);
    expect(store().averageEmployerESOPContribution).toEqual(InitialValues.averageEmployerESOPContribution);
    expect(store().averageShareGrowth).toEqual(InitialValues.averageShareGrowth);
    expect(store().initYear).toEqual(InitialValues.initYear);
    expect(store().employee401kContribution).toEqual(InitialValues.employee401kContribution);
    expect(store().selectedTab).toEqual(InitialValues.selectedTab);
    expect(store().startDate).toEqual(InitialValues.startDate);
    expect(store().starting401kBalance).toEqual(InitialValues.starting401kBalance);
    expect(store().startingSalary).toEqual(InitialValues.startingSalary);
    expect(store().startingESOPAccountValue).toEqual(InitialValues.startingESOPAccountValue);
    expect(store().yearsToCalculate).toEqual(InitialValues.yearsToCalculate);
  });

  it("should handle settings updates", () => {
    store().handleInputsUpdate("initYear", 2020);
    expect(store().initYear).toEqual(2020);
  });

  it("should handle tab changes", () => {
    store().handleTabChange(null, 2);
    expect(store().selectedTab).toEqual(2);
  });

  it("should generate 401k values", () => {
    store().handleInputsUpdate("initYear", 2021);
    store().handleInputsUpdate("startDate", new Date(2021, 0, 1));
    store().handleInputsUpdate("startingSalary", 32240);
    store().handleInputsUpdate("yearsToCalculate", 3);
    expect(store().dataPoints401k).toEqual(
      [
        { "x": `1/1/${store().initYear}`, "y": 0 },
        { "x": `1/1/${store().initYear + 1}`, "y": 989.31 },
        { "x": `1/1/${store().initYear + 2}`, "y": 2055.89 },
        { "x": `1/1/${store().initYear + 3}`, "y": 3204.34 }
    ]);
  });

  it("should generate ESOP values", () => {
    store().handleInputsUpdate("averageEmployerESOPContribution", 15);
    store().handleInputsUpdate("averageShareGrowth", 10);
    expect(store().dataPointsESOP).toEqual(
      [
        { "x": `1/1/${store().initYear}`, "y": 0 },
        { "x": `1/1/${store().initYear + 1}`, "y": 0 },
        { "x": `1/1/${store().initYear + 2}`, "y": 4981.08 },
        { "x": `1/1/${store().initYear + 3}`, "y": 10609.7 }
      ]);
  });


});