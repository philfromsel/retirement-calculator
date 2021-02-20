import { computed, decorate, observable } from "mobx";
import {
  generate401kGrowthData,
  generateESOPGrowthData,
} from "../common/Equations";
import Constants from "../common/Constants";
import InitialValues from "../common/Defaults";

/**
 * The Mobx calculator store
 */
class CalculatorStore {
  acknowledgedDisclaimer = InitialValues.acknowledgedDisclaimer;

  averageAnnual401KFees = InitialValues.averageAnnual401KFees;

  averageAnnual401KGrowth = InitialValues.averageAnnual401KGrowth;

  averageEmployerESOPContribution = InitialValues.averageEmployerESOPContribution;

  averageRaise = InitialValues.averageRaise;

  averageShareGrowth = InitialValues.averageShareGrowth;

  initYear = InitialValues.initYear;

  monthlyEmployeeContribution = InitialValues.monthlyEmployeeContribution;

  selectedTab = InitialValues.selectedTab;

  startDate = InitialValues.startDate;

  starting401KBalance = InitialValues.starting401KBalance;

  startingSalary = InitialValues.startingSalary;

  startingESOPAccountValue = InitialValues.startingESOPAccountValue;

  yearsToCalculate = InitialValues.yearsToCalculate;

  /**
   * @param {string} setting  - the setting name to update
   * @param {any} value - The appropriate value to set
   */
  handleInputsUpdate = (setting, value) => {
    this[setting] = value;
  };

  /**
   * @param {event} event - Not used
   * @param {any} value - The index of the tab to select
   */
  handleTabChange = (event, value) => {
    this.selectedTab = value;
  };

  get dataPoints401k() {
    return generate401kGrowthData(
      this.startDate,
      this.starting401KBalance,
      this.averageAnnual401KGrowth / 100,
      this.monthlyEmployeeContribution,
      this.averageAnnual401KFees / 100,
      this.initYear,
      this.yearsToCalculate
    );
  }

  get dataPointsESOP() {
    return generateESOPGrowthData(
      this.startDate,
      this.startingESOPAccountValue,
      this.averageShareGrowth / 100,
      this.startingSalary,
      this.averageRaise / 100,
      this.averageEmployerESOPContribution / 100,
      this.initYear,
      this.yearsToCalculate
    );
  }

  tabs = [
    Constants.USAGE_GUIDE,
    Constants.ESOP_GROWTH,
    Constants.ONLY_401K,
    Constants.COMBINED_INVESTMENTS,
  ];

  get selectedTabName() {
    return this.tabs[this.selectedTab];
  }
}

decorate(CalculatorStore, {
  dataPoints401k: computed,
  dataPointsESOP: computed,
  acknowledgedDisclaimer: observable,
  averageAnnual401KFees: observable,
  averageAnnual401KGrowth: observable,
  averageEmployerESOPContribution: observable,
  averageRaise: observable,
  averageShareGrowth: observable,
  initYear: observable,
  monthlyEmployeeContribution: observable,
  selectedTab: observable,
  selectedTabName: computed,
  startDate: observable,
  starting401KBalance: observable,
  startingSalary: observable,
  startingESOPAccountValue: observable,
  yearsToCalculate: observable,
});

const store = new CalculatorStore();
export default store;
