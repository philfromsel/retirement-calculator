/**
 * @param {string} startDate - employee start date
 * @returns {Date} the employee's ESOP entry date
 */
function getPlanEntryDate(startDate) {
  let entryYear = startDate.getFullYear() + 1;
  const entryDay = startDate.getDate();
  let entryMonth = startDate.getMonth();

  // Possible entry dates are January 1st, April 1st, July 1st, and October 1st.
  // IMPORTANT: Months are zero-based.
  if (entryDay > 1 || entryMonth > 0) {
    if (entryMonth < 3 || (entryMonth === 3 && entryDay === 1)) {
      entryMonth = 3;
    } else if (entryMonth < 6 || (entryMonth === 6 && entryDay === 1)) {
      entryMonth = 6;
    } else if (entryMonth < 9 || (entryMonth === 9 && entryDay === 1)) {
      entryMonth = 9;
    } else {
      // Go to January 1 of the following year
      entryMonth = 0;
      entryYear += 1;
    }
  }
  return new Date(entryYear, entryMonth, 1);
}

/**
 * @param {Date} entryDate - employee's ESOP Plan entry date
 * @param {number} year - year to use for contribution percentage calculation
 * @returns {number} The contribution percentage for the given year
 */
function getContributionPercentage(entryDate, year) {
  const entryYear = entryDate.getFullYear();
  const entryMonth = entryDate.getMonth();

  let contributionPercentage = 0;

  // Entry date is before current year
  if (entryYear < year) {
    contributionPercentage = 1;
  }
  if (entryYear === year) {
    switch (entryMonth) {
      case 3:
        // April 1st, so we'll just do three quarters of the regular contribution
        contributionPercentage = 0.75;
        break;
      case 6:
        // July 1st, so we'll just do half of the regular contribution
        contributionPercentage = 0.5;
        break;
      case 9:
        // October 1st, so we'll just do a quarter of the regular contribution
        contributionPercentage = 0.25;
        break;
      default:
        // January 1st, full contribution
        contributionPercentage = 1;
        break;
    }
  }
  return contributionPercentage;
}

/**
 * @param {Date} startDate - Employee start date
 * @param {number} year - Year to use to determine employee vesting schedule
 * @returns {number} the employee's total years of service
 */
function getYearsOfService(startDate, year) {
  const startYear = startDate.getFullYear();
  let serviceYears = 0;

  // If the last day of the year is a Sunday-Thursday, employee
  // must have started by July 10th to receive a vesting year
  let lastVestingDate = new Date(startYear, 6, 10);
  if (new Date(startYear, 11, 31).getDay() === 5) {
    // If December 31st was a Friday, they need to have started by July 12th
    lastVestingDate = new Date(startYear, 6, 12);
  } else if (new Date(startYear, 11, 31).getDay() === 6) {
    // If December 31st was a Saturday, they need to have started by July 11th
    lastVestingDate = new Date(startYear, 6, 11);
  }

  if (startYear <= year) {
    serviceYears = year - startYear;

    if (startDate <= lastVestingDate) {
      serviceYears += 1;
    }
  }
  return serviceYears;
}

export { getContributionPercentage, getPlanEntryDate, getYearsOfService };
