import React, { useState } from "react";
import { TextField, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { observer } from "mobx-react";
import { DebounceInput } from 'react-debounce-input';

import Constants from "../common/Constants";

const inputIds = {
  averageAnnual401kFees: "averageAnnual401kFees",
  averageAnnual401kGrowth: "averageAnnual401kGrowth",
  averageEmployerESOPContribution: "averageEmployerESOPContribution",
  averageRaise: "averageRaise",
  averageShareGrowth: "averageShareGrowth",
  currentEmployeeAge: "currentEmployeeAge",
  employee401kContribution: "employee401kContribution",
  starting401kBalance: "starting401kBalance",
  startingESOPAccountValue: "startingESOPAccountValue",
  startingSalary: "startingSalary",
  yearsToCalculate: "yearsToCalculate"
};

/**
 * @param {object} props - Input properties to the functional component
 * @returns {ProjectionInputs} - The projection inputs object to render
 */
function ProjectionInputs(props) {

  const { store } = props;

  const [averageAnnual401kFeesErr, setAverageAnnual401kFeesErr] = useState(false);
  const [averageAnnual401kGrowthErr, setAverageAnnual401kGrowthErr] = useState(false);
  const [averageEmployerESOPContributionErr, setAverageEmployerESOPContributionErr] = useState(false);
  const [averageRaiseErr, setAverageRaiseErr] = useState(false);
  const [averageShareGrowthErr, setAverageShareGrowthErr] = useState(false);
  const [currentEmployeeAgeErr, setCurrentEmployeeAgeErr] = useState(false);
  const [employee401kContributionErr, setEmployee401kContributionErr] = useState(false);
  const [starting401kBalanceErr, setStarting401kBalanceErr] = useState(false);
  const [startingESOPAccountValueErr, setStartingESOPAccountValueErr] = useState(false);
  const [startingSalaryErr, setSartingSalaryErr] = useState(false);
  const [yearsToCalculateErr, setYearsToCalculateErr] = useState(false);

  const setErrs = {};
  setErrs[inputIds.averageAnnual401kFees] = setAverageAnnual401kFeesErr;
  setErrs[inputIds.averageAnnual401kGrowth] = setAverageAnnual401kGrowthErr;
  setErrs[inputIds.averageEmployerESOPContribution] = setAverageEmployerESOPContributionErr;
  setErrs[inputIds.averageRaise] = setAverageRaiseErr;
  setErrs[inputIds.averageShareGrowth] = setAverageShareGrowthErr;
  setErrs[inputIds.currentEmployeeAge] = setCurrentEmployeeAgeErr;
  setErrs[inputIds.employee401kContribution] = setEmployee401kContributionErr;
  setErrs[inputIds.starting401kBalance] = setStarting401kBalanceErr;
  setErrs[inputIds.startingESOPAccountValue] = setStartingESOPAccountValueErr;
  setErrs[inputIds.startingSalary] = setSartingSalaryErr;
  setErrs[inputIds.yearsToCalculate] = setYearsToCalculateErr;

  const handleInput = (e) => {
    e.preventDefault();
    const inputValue = Number(e.target.value);
    const showErr = setErrs[e.target.id.toString()];
    if (e.target.value === "") {
      showErr(true);
    } else if (inputValue < Number(e.target.min)) {
      showErr(true);
    } else if (inputValue > Number(e.target.max)) {
      showErr(true);
    } else {
      store.handleInputsUpdate(e.target.id.toString(), inputValue);
      showErr(false);
    }
  };

  const handleStartDateChange = (date) => {
    store.handleInputsUpdate("startDate", date);
  };

  return (
    <>
      <form onSubmit={handleInput}>
        <>
          <Typography variant="caption" color="textSecondary">
            Employee Start Date (FT)
          </Typography>
          <br />
          <DatePicker
            data-testid="startDatePicker"
            disabledKeyboardNavigation
            dropdownMode="select"
            id="startDate"
            maxDate={new Date(store.initYear + 1, 11, 31)}
            minDate={new Date(1982, 0, 1)}
            onChange={handleStartDateChange}
//            onSelect={this.handleSelect}
            scrollableYearDropdown
            selected={store.startDate}
            showMonthDropdown
            showYearDropdown
          />
          <br />
          <br />
          <DebounceInput
            element={TextField}
            debounceTimeout={300}
            data-testid={inputIds.startingSalary}
            error={startingSalaryErr}
            helperText={startingSalaryErr ? "Please enter a value between 0 and 1000000" : ""}
            id={inputIds.startingSalary}
            type="number"
            label="Employee Salary ($)"
            value={startingSalaryErr ? "" : store.startingSalary.toString()}
            InputProps={{
              inputProps: {
                min: 0,
                max: 1000000,
                step: 1000,
              },
            }}
            onChange={handleInput}
            fullWidth
          />
          <br />
          <Typography variant="caption" color="textSecondary">
            <i>Current employee salary.</i>
          </Typography>
          <br />
          <br />
          <DebounceInput
              element={TextField}
              debounceTimeout={300}
              data-testid={inputIds.averageRaise}
              error={averageRaiseErr}
              helperText={averageRaiseErr ? "Please enter a value between 0 and 10" : ""}
              id={inputIds.averageRaise}
              type="number"
              label="Average Annual Raise (%)"
              value={averageRaiseErr ? "" : store.averageRaise.toString()}
              InputProps={{ inputProps: { min: 0, max: 10 } }}
              onChange={handleInput}
              fullWidth
            />
            <br />
            <Typography variant="caption" color="textSecondary">
              <i>Average annual raise to apply to the employee&apos;s salary</i>
            </Typography>
            <br />
            <br />
        </>
        {store.selectedTabName !== Constants.ONLY_401K && (
          <>
            <DebounceInput
              element={TextField}
              debounceTimeout={300}
              data-testid={inputIds.startingESOPAccountValue}
              error={startingESOPAccountValueErr}
              helperText={startingESOPAccountValueErr ? "Please enter a value between 0 and 10000000" : ""}
              id={inputIds.startingESOPAccountValue}
              type="number"
              style={{"whiteSpace": "nowrap"}}
              label="Current ESOP Account Balance ($)"
              value={startingESOPAccountValueErr ? "" : store.startingESOPAccountValue.toString()}
              InputProps={{ inputProps: { min: 0, max: 10000000, step: 100 } }}
              onChange={handleInput}
              fullWidth
            />
            <br />
            <Typography variant="caption" color="textSecondary">
              <i>
                Employee ESOP account balance from the current report
              </i>
            </Typography>
            <br />
            <br />
            <DebounceInput
              element={TextField}
              debounceTimeout={300}
              data-testid={inputIds.averageEmployerESOPContribution}
              error={averageEmployerESOPContributionErr}
              helperText={averageEmployerESOPContributionErr ? "Please enter a value between 5 and 15" : ""}
              id={inputIds.averageEmployerESOPContribution}
              type="number"
              label="Annual Employer Contribution (%)"
              value={averageEmployerESOPContributionErr ? "" : store.averageEmployerESOPContribution}
              InputProps={{ inputProps: { min: 5, max: 15 } }}
              onChange={handleInput}
              fullWidth
            />
            <br />
            <Typography variant="caption" color="textSecondary">
              <i>
                Percentage of employee&apos;s annual salary contributed by the employer
                to the ESOP.
              </i>
            </Typography>
            <br />
            <br />
            <DebounceInput
              element={TextField}
              debounceTimeout={300}
              data-testid={inputIds.averageShareGrowth}
              error={averageShareGrowthErr}
              helperText={averageShareGrowthErr ? "Please enter a value between 0 and 20" : ""}
              id={inputIds.averageShareGrowth}
              type="number"
              style={{"whiteSpace": "nowrap"}}
              label="Average Annual ESOP Growth (%)"
              value={averageShareGrowthErr ? "" : store.averageShareGrowth.toString()}
              InputProps={{ inputProps: { min: 0, max: 20 } }}
              onChange={handleInput}
              fullWidth
            />
            <br />
            <Typography variant="caption" color="textSecondary">
              <i>
                Average year-over-year return on an employee&apos;s ESOP
                account.
              </i>
            </Typography>
            <br />
            <br />
          </>
        )}
        {store.selectedTabName !== Constants.ESOP_GROWTH && (
          <>
            <DebounceInput
              element={TextField}
              debounceTimeout={300}
              data-testid={inputIds.currentEmployeeAge}
              error={currentEmployeeAgeErr}
              helperText={currentEmployeeAgeErr ? "Please enter a value between 18 and 120" : ""}
              id={inputIds.currentEmployeeAge}
              type="number"
              label="Current Age"
              value={currentEmployeeAgeErr ? "" : store.currentEmployeeAge}
              InputProps={{ inputProps: { min: 18, max: 120 } }}
              onChange={handleInput}
              fullWidth
            />
            <Typography variant="caption" color="textSecondary">
              <i>Current employee age.</i>
            </Typography>
            <br />
            <br />
            <DebounceInput
              element={TextField}
              debounceTimeout={300}
              data-testid={inputIds.starting401kBalance}
              error={starting401kBalanceErr}
              helperText={starting401kBalanceErr ? "Please enter a value between 0 and 10000000" : ""}
              id={inputIds.starting401kBalance}
              type="number"
              label="Starting 401(k) Balance ($)"
              value={starting401kBalanceErr ? "" : store.starting401kBalance.toString()}
              InputProps={{
                inputProps: { min: 0, max: 10000000, step: 1000 },
              }}
              onChange={handleInput}
              fullWidth
            />
            <br />
            <Typography variant="caption" color="textSecondary">
              <i>
                Employee&apos;s 401(k) account balance as of January 1st
                of the current year.
              </i>
            </Typography>
            <br />
            <br />
            <DebounceInput
              element={TextField}
              debounceTimeout={300}
              data-testid={inputIds.employee401kContribution}
              error={employee401kContributionErr}
              helperText={employee401kContributionErr ? "Please enter a value between 0 and 100" : ""}
              id={inputIds.employee401kContribution}
              type="number"
              label="Employee 401(k) Contribution (%)"
              value={employee401kContributionErr ? "" : store.employee401kContribution.toString()}
              InputProps={{ inputProps: { min: 0, max: 100, step: 1 } }}
              onChange={handleInput}
              fullWidth
            />
            <br />
            <Typography variant="caption" color="textSecondary">
              <i>
                Percentage of their salary that the employee contributes to their 401(k)
                account per year, up to their age-determined max.
              </i>
            </Typography>
            <br />
            <br />
            <DebounceInput
              element={TextField}
              debounceTimeout={300}
              data-testid={inputIds.averageAnnual401kGrowth}
              error={averageAnnual401kGrowthErr}
              helperText={averageAnnual401kGrowthErr ? "Please enter a value between 0 and 20" : ""}
              id={inputIds.averageAnnual401kGrowth}
              type="number"
              style={{"whiteSpace": "nowrap"}}
              label="Average Annual 401(k) Growth (%)"
              value={averageAnnual401kGrowthErr ? "" : store.averageAnnual401kGrowth.toString()}
              InputProps={{ inputProps: { min: 0, max: 20 } }}
              onChange={handleInput}
              fullWidth
            />
            <br />
            <Typography variant="caption" color="textSecondary">
              <i>
                Average year-over-year return on an employee&apos;s 401(k)
                account.
              </i>
            </Typography>
            <br />
            <br />
            <DebounceInput
              element={TextField}
              debounceTimeout={300}
              data-testid={inputIds.averageAnnual401kFees}
              error={averageAnnual401kFeesErr}
              helperText={averageAnnual401kFeesErr ? "Please enter a value between 0 and 2" : ""}
              id={inputIds.averageAnnual401kFees}
              type="number"
              label="Average Annual 401(k) Fees (%)"
              value={averageAnnual401kFeesErr ? "" : store.averageAnnual401kFees.toString()}
              InputProps={{ inputProps: { min: 0, max: 2, step: 0.01 } }}
              onChange={handleInput}
              fullWidth
            />
            <br />
            <Typography variant="caption" color="textSecondary">
              <i>
                401k administration and fund fees. These are subtracted from
                the average rate of return.
              </i>
            </Typography>
            <br />
            <br />
          </>
        )}
        <DebounceInput
          element={TextField}
          debounceTimeout={300}
          data-testid={inputIds.yearsToCalculate}
          error={yearsToCalculateErr}
          helperText={yearsToCalculateErr ? "Please enter a value between 1 and 60" : ""}
          id={inputIds.yearsToCalculate}
          type="number"
          label="Years To Calculate"
          value={yearsToCalculateErr ? "" : store.yearsToCalculate}
          InputProps={{ inputProps: { min: 1, max: 60 } }}
          onChange={handleInput}
          fullWidth
        />
        <Typography variant="caption" color="textSecondary">
          <i>Years of growth to calculate.</i>
        </Typography>
        <br />
      </form>
    </>
  );
}

ProjectionInputs.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default observer(ProjectionInputs);
