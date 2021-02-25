import { getPlanEntryDate, getContributionPercentage } from "./DateHelpers";

/**
 * @param {number} count - the given number of years to project
 * @returns {number} - the bounded number if it was outside the allowed range
 */
function getYearCount(count) {
  let totalYears = 1;
  if (count < 1) {
    totalYears = 1;
  } else if (count > 50) {
    totalYears = 50;
  } else {
    totalYears = count;
  }
  return totalYears;
}

/**
 * @param {number} annualReturn - average annual return
 * @param {number} compoundingPeriods - number of compounding interest periods
 * @returns {number} - the actual APY to use
 */
function getAPY(annualReturn, compoundingPeriods) {
  return (
    compoundingPeriods * ((1 + annualReturn) ** (1 / compoundingPeriods) - 1)
  );
}

/**
 * @param {number} value - initial value
 * @param {number} decimals - number of decimals to round to
 * @returns {number} - the given number, rounded to the specified number of decimals
 */
function round(value, decimals) {
  if (value === 0) {
    return 0;
  }
  return Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`);
}

/**
 * @param {string} startDate - Employee start date
 * @param {number} initValue - Initial 401k balance
 * @param {number} avgGrowth - Average annual growth to project
 * @param {number} monthlyContribution - Amount the employee contributes per year
 * @param {number} avgFees - Average fees paid per year
 * @param {number} initYear - Initial year to use in the calculations
 * @param {number} totalYears - Total years to calculate
 * @returns {Array} - Data points calculated from the input data
 */
function generate401kGrowthData(
  startDate,
  initValue,
  avgGrowth,
  monthlyContribution,
  avgFees,
  initYear,
  totalYears
) {
  const dataPoints = [{ y: initValue }];
  if (initYear <= startDate.getFullYear()) {
    // Month is +1 because getMonth returns the zero-based month index value.
    dataPoints[0].x = `${
      startDate.getMonth() + 1
    }/${startDate.getDate()}/${startDate.getFullYear()}`;
  } else {
    dataPoints[0].x = `1/1/${initYear}`;
  }

  const years = getYearCount(totalYears);
  const compoundPerYear = 12;

  // Compounding monthly, for simplicity
  const apy = getAPY(avgGrowth - avgFees, compoundPerYear);

  for (let i = 1; i <= years; i += 1) {
    let lastBalance = dataPoints[i - 1].y;
    const startMonth = new Date(dataPoints[i - 1].x).getMonth(); // 0 if January
    for (let j = startMonth; j < compoundPerYear; j += 1) {
      lastBalance += lastBalance * (apy / compoundPerYear);
      lastBalance += monthlyContribution;
    }

    dataPoints[i] = {
      x: `1/1/${initYear + i}`,
      y: round(lastBalance, 2),
    };
  }

  return dataPoints;
}

/**
 * @param {string} startDate - Employee start date
 * @param {number} initValue - Initial ESOP Account balance
 * @param {number} avgGrowth - Average annual growth to project
 * @param {number} initSalary - Current employee salary
 * @param {number} avgRaise - Average annual raise to project
 * @param {number} contribution - Average Employer contribution to the ESOP
 * @param {number} inputInitYear - Initial year to use in the calculations
 * @param {number} totalYears - Total years to calculate
 * @returns {Array} - Data points calculated from the input data
 */
function generateESOPGrowthData(
  startDate,
  initValue,
  avgGrowth,
  initSalary,
  avgRaise,
  contribution,
  inputInitYear,
  totalYears
) {
  const dataPoints = [{}];
  let initYear = inputInitYear;
  if (initYear <= startDate.getFullYear()) {
    initYear = startDate.getFullYear();
    // Month is +1 because getMonth returns the zero-based month index value.
    dataPoints[0].x = `${
      startDate.getMonth() + 1
    }/${startDate.getDate()}/${startDate.getFullYear()}`;
  } else {
    dataPoints[0].x = `1/1/${initYear}`;
  }
  dataPoints[0].y = initValue;

  let salary = initSalary;

  for (let i = 1; i <= getYearCount(totalYears); i += 1) {
    salary += salary * avgRaise;

    // Add the growth component
    let value = dataPoints[i - 1].y * (1 + avgGrowth);

    // Add the contribution
    value +=
      salary *
      contribution *
      getContributionPercentage(getPlanEntryDate(startDate), initYear - 1 + i);

    dataPoints[i] = {
      x: `1/1/${initYear + i}`,
      y: round(value, 2),
    };
  }

  return dataPoints;
}

/**
 * @param {number} initVestedYears - the number of vested years the employee already has
 * @param {number} index - the year index of the data set
 * @returns {number} - the percentage that an employee is vested at for a given year index
 */
function getVestedValue(initVestedYears, index) {
  let vestedPercentage = 0;
  if (initVestedYears + index > 4) {
    vestedPercentage = 100;
  }
  else if (initVestedYears + index > 0) {
    vestedPercentage = 20*(initVestedYears + index);
  }

  return vestedPercentage;
}

export {
  generate401kGrowthData,
  generateESOPGrowthData,
  getAPY,
  getVestedValue,
  getYearCount,
  round,
};
