import React, { Component } from "react";
import { TextField, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { observer } from "mobx-react";
import { DebounceInput } from 'react-debounce-input';

import Constants from "../common/Constants";

class ProjectionInputs extends Component {
  onChange = (e) => {
    e.preventDefault();
    let inputValue = Number(document.getElementById(e.target.id).value);
    if (inputValue < Number(e.target.min)) {
      inputValue = Number(e.target.min);
    } else if (inputValue > Number(e.target.max)) {
      inputValue = Number(e.target.max);
    }
    const { store } = this.props;
    store.handleInputsUpdate(e.target.id.toString(), inputValue);
  };

  handleStartDateChange = (date) => {
    const { store } = this.props;
    store.handleInputsUpdate("startDate", date);
  };

  render() {
    const { store } = this.props;

    return (
      <>
        <form onSubmit={this.onChange}>
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
              onChange={this.handleStartDateChange}
              onSelect={this.handleSelect}
              scrollableYearDropdown
              selected={store.startDate}
              showMonthDropdown
              showYearDropdown
            />
            <br />
            <br />
          </>
          {store.selectedTabName !== Constants.ONLY_401K && (
            <>
              <DebounceInput
                element={TextField}
                debounceTimeout={500}
                data-testid="startingSalary"
                id="startingSalary"
                type="number"
                label="Employee Salary ($)"
                value={store.startingSalary.toString()}
                InputProps={{
                  inputProps: {
                    min: 0,
                    max: 500000,
                    step: 1000,
                  },
                }}
                onChange={this.onChange}
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
                debounceTimeout={500}
                data-testid="startingESOPAccountValue"
                id="startingESOPAccountValue"
                type="number"
                label={`${store.initYear} ESOP Account Balance ($)`}
                value={store.startingESOPAccountValue.toString()}
                InputProps={{ inputProps: { min: 0, max: 5000000, step: 100 } }}
                onChange={this.onChange}
                fullWidth
              />
              <br />
              <Typography variant="caption" color="textSecondary">
                <i>
                  Employee ESOP account balance from the {store.initYear} report
                </i>
              </Typography>
              <br />
              <br />
              <DebounceInput
                element={TextField}
                debounceTimeout={200}
                data-testid="averageRaise"
                id="averageRaise"
                type="number"
                label="Average Annual Raise (%)"
                value={store.averageRaise.toString()}
                InputProps={{ inputProps: { min: 0, max: 10 } }}
                onChange={this.onChange}
                fullWidth
              />
              <br />
              <Typography variant="caption" color="textSecondary">
                <i>Average annual raise to apply to the employee&apos;s salary</i>
              </Typography>
              <br />
              <br />
              <DebounceInput
                element={TextField}
                debounceTimeout={200}
                data-testid="averageEmployerESOPContribution"
                id="averageEmployerESOPContribution"
                type="number"
                label="Annual Employer ESOP Contribution (%)"
                value={store.averageEmployerESOPContribution}
                InputProps={{ inputProps: { min: 5, max: 15 } }}
                onChange={this.onChange}
                fullWidth
                width="max-content"
              />
              <br />
              <Typography variant="caption" color="textSecondary">
                <i>
                  Percentage of employee&apos;s annual salary contributed
                  to the ESOP by the employer.
                </i>
              </Typography>
              <br />
              <br />
              <DebounceInput
                element={TextField}
                debounceTimeout={200}
                data-testid="averageShareGrowth"
                id="averageShareGrowth"
                type="number"
                label="Average Annual ESOP Returns (%)"
                value={store.averageShareGrowth.toString()}
                InputProps={{ inputProps: { min: 0, max: 20 } }}
                onChange={this.onChange}
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
                debounceTimeout={500}
                data-testid="starting401KBalance"
                id="starting401KBalance"
                type="number"
                label="Starting 401(k) Balance ($)"
                value={store.starting401KBalance.toString()}
                InputProps={{
                  inputProps: { min: 0, max: 3000000, step: 1000 },
                }}
                onChange={this.onChange}
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
                data-testid="monthlyEmployeeContribution"
                id="monthlyEmployeeContribution"
                type="number"
                label="Monthly Employee Contribution ($)"
                value={store.monthlyEmployeeContribution.toString()}
                InputProps={{ inputProps: { min: 0, max: 2165, step: 5 } }}
                onChange={this.onChange}
                fullWidth
              />
              <br />
              <Typography variant="caption" color="textSecondary">
                <i>
                  Dollar amount that the employee contributes to their 401(k)
                  account each month.
                </i>
              </Typography>
              <br />
              <br />
              <DebounceInput
                element={TextField}
                debounceTimeout={200}
                data-testid="averageAnnual401KGrowth"
                id="averageAnnual401KGrowth"
                type="number"
                label="Average Annual 401(k) Returns (%)"
                value={store.averageAnnual401KGrowth.toString()}
                InputProps={{ inputProps: { min: 0, max: 20 } }}
                onChange={this.onChange}
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
                debounceTimeout={500}
                data-testid="averageAnnual401KFees"
                id="averageAnnual401KFees"
                type="number"
                label="Average Annual 401(k) Fees (%)"
                value={store.averageAnnual401KFees.toString()}
                InputProps={{ inputProps: { min: 0, max: 2, step: 0.01 } }}
                onChange={this.onChange}
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
            debounceTimeout={200}
            data-testid="yearsToCalculate"
            id="yearsToCalculate"
            type="number"
            label="Years To Calculate"
            value={store.yearsToCalculate}
            InputProps={{ inputProps: { min: 1, max: 60 } }}
            onChange={this.onChange}
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
}

ProjectionInputs.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default observer(ProjectionInputs);
