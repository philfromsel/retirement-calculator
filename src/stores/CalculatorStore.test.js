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
    expect(store().averageAnnual401KFees).toEqual(InitialValues.averageAnnual401KFees);
    expect(store().averageAnnual401KGrowth).toEqual(InitialValues.averageAnnual401KGrowth);
    expect(store().averageRaise).toEqual(InitialValues.averageRaise);
    expect(store().averageEmployerESOPContribution).toEqual(InitialValues.averageEmployerESOPContribution);
    expect(store().averageShareGrowth).toEqual(InitialValues.averageShareGrowth);
    expect(store().initYear).toEqual(InitialValues.initYear);
    expect(store().monthlyEmployeeContribution).toEqual(InitialValues.monthlyEmployeeContribution);
    expect(store().selectedTab).toEqual(InitialValues.selectedTab);
    expect(store().startDate).toEqual(InitialValues.startDate);
    expect(store().starting401KBalance).toEqual(InitialValues.starting401KBalance);
    expect(store().startingSalary).toEqual(InitialValues.startingSalary);
    expect(store().startingESOPAccountValue).toEqual(InitialValues.startingESOPAccountValue);
    expect(store().yearsToCalculate).toEqual(InitialValues.yearsToCalculate);
  });

  it("should handle settings updates", () => {
    store().handleInputsUpdate("initYear", 1919);
    expect(store().initYear).toEqual(1919);
  });

  it("should handle tab changes", () => {
    store().handleTabChange(null, 2);
    expect(store().selectedTab).toEqual(2);
  });

  it("should generate 401k values", () => {
    store().handleInputsUpdate("initYear", 2020);
    store().handleInputsUpdate("yearsToCalculate", 1);
    store().handleInputsUpdate("startingSalary", 31200);
    expect(store().dataPoints401k).toEqual(
      [
        { "x": `1/1/${store().initYear}`, "y": 0 },
        { "x": `1/1/${store().initYear + 1}`, "y": 980.72 }
    ]);
  });

  it("should generate ESOP values", () => {
    store().handleInputsUpdate("yearsToCalculate", 2);
    store().handleInputsUpdate("averageEmployerESOPContribution", 15);
    store().handleInputsUpdate("startingSalary", 31200);
    expect(store().dataPointsESOP).toEqual(
      [
        { "x": `1/1/${store().initYear}`, "y": 0 },
        { "x": `1/1/${store().initYear + 1}`, "y": 0 },
        { "x": `1/1/${store().initYear + 2}`, "y": 4965.01 }
      ]);
  });


});