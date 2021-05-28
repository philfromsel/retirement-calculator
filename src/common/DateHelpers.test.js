import {
  getContributionPercentage,
  getPlanEntryDate,
  getVestingDayByStartDate,
  getVestingDayByYear,
  getYearsOfService,
} from "./DateHelpers";

describe("getPlanEntryDate", () => {
  it("should handle start date of January 1st", () => {
    expect(getPlanEntryDate(new Date(2016, 0, 1))).toEqual(
      new Date(2017, 0, 1)
    );
  });

  it("should handle start date of January 2nd", () => {
    expect(getPlanEntryDate(new Date(2016, 0, 2))).toEqual(
      new Date(2017, 3, 1)
    );
  });

  it("should handle start date of March 31", () => {
    expect(getPlanEntryDate(new Date(2016, 2, 31))).toEqual(
      new Date(2017, 3, 1)
    );
  });

  it("should handle start date of April 1st", () => {
    expect(getPlanEntryDate(new Date(2016, 3, 1))).toEqual(
      new Date(2017, 3, 1)
    );
  });

  it("should handle start date of April 2nd", () => {
    expect(getPlanEntryDate(new Date(2016, 3, 2))).toEqual(
      new Date(2017, 6, 1)
    );
  });

  it("should handle start date of June 30", () => {
    expect(getPlanEntryDate(new Date(2016, 5, 30))).toEqual(
      new Date(2017, 6, 1)
    );
  });

  it("should handle start date of July 1st", () => {
    expect(getPlanEntryDate(new Date(2016, 6, 1))).toEqual(
      new Date(2017, 6, 1)
    );
  });

  it("should handle start date of July 2nd", () => {
    expect(getPlanEntryDate(new Date(2016, 6, 2))).toEqual(
      new Date(2017, 9, 1)
    );
  });

  it("should handle start date of September 30", () => {
    expect(getPlanEntryDate(new Date(2016, 8, 30))).toEqual(
      new Date(2017, 9, 1)
    );
  });

  it("should handle start date of October 1st", () => {
    expect(getPlanEntryDate(new Date(2016, 9, 1))).toEqual(
      new Date(2017, 9, 1)
    );
  });

  it("should handle start date of October 2nd", () => {
    expect(getPlanEntryDate(new Date(2016, 9, 2))).toEqual(
      new Date(2018, 0, 1)
    );
  });

  it("should handle start date of December 31", () => {
    expect(getPlanEntryDate(new Date(2016, 11, 31))).toEqual(
      new Date(2018, 0, 1)
    );
  });
});

describe("getContributionPercentage", () => {
  it("should handle a date in the previous year", () => {
    expect(getContributionPercentage(new Date(2018, 9, 1), 2019)).toEqual(1);
  });

  it("should handle a date of January 1st of the current year", () => {
    expect(getContributionPercentage(new Date(2019, 0, 1), 2019)).toEqual(1);
  });

  it("should handle a date of April 1st of the current year", () => {
    expect(getContributionPercentage(new Date(2019, 3, 1), 2019)).toEqual(0.75);
  });

  it("should handle a date of July 1st of the current year", () => {
    expect(getContributionPercentage(new Date(2019, 6, 1), 2019)).toEqual(0.5);
  });

  it("should handle a date of October 1st of the current year", () => {
    expect(getContributionPercentage(new Date(2019, 9, 1), 2019)).toEqual(0.25);
  });

  it("should handle a date of January 1st of the next year", () => {
    expect(getContributionPercentage(new Date(2020, 0, 1), 2019)).toEqual(0);
  });
});

describe("getVestingDayByStartDate", () => {
  it("should return correctly for different starting days", () => {
    expect(getVestingDayByStartDate(new Date(2020, 0, 1))).toEqual(new Date(2020, 5, 23));
    expect(getVestingDayByStartDate(new Date(2020, 6, 10))).toEqual(new Date(2020, 11, 31));
    expect(getVestingDayByStartDate(new Date(2019, 1, 13))).toEqual(new Date(2019, 7, 6));
    expect(getVestingDayByStartDate(new Date(2019, 6, 10))).toEqual(new Date(2019, 11, 31));
    expect(getVestingDayByStartDate(new Date(2018, 2, 5))).toEqual(new Date(2018, 7, 24));
    expect(getVestingDayByStartDate(new Date(2018, 6, 10))).toEqual(new Date(2018, 11, 31));
    expect(getVestingDayByStartDate(new Date(2017, 3, 25))).toEqual(new Date(2017, 9, 16));
    expect(getVestingDayByStartDate(new Date(2017, 6, 10))).toEqual(new Date(2017, 11, 29));
    expect(getVestingDayByStartDate(new Date(2016, 1, 26))).toEqual(new Date(2016, 7, 18));
    expect(getVestingDayByStartDate(new Date(2016, 6, 10))).toEqual(new Date(2016, 11, 31));
  });
});

describe("getVestingDayByYear", () => {
  it("should return June 24th for non-leap years starting on a Tuesday-Saturday", () => {
    expect(getVestingDayByYear(2019)).toEqual(new Date(2019, 5, 24));
  });

  it("should return June 23th for non-leap years starting on a Sunday", () => {
    expect(getVestingDayByYear(2017)).toEqual(new Date(2017, 5, 23));
  });

  it("should return June 22th for non-leap years starting on a Monday", () => {
    expect(getVestingDayByYear(2018)).toEqual(new Date(2018, 5, 22));
  });

  it("should return June 23th for leap years starting on a Tuesday-Saturday", () => {
    expect(getVestingDayByYear(2016)).toEqual(new Date(2016, 5, 23));
  });

  it("should return June 22th for leap years starting on a Sunday", () => {
    expect(getVestingDayByYear(2012)).toEqual(new Date(2012, 5, 22));
  });

  it("should return June 21st for leap years starting on a Monday", () => {
    expect(getVestingDayByYear(1996)).toEqual(new Date(1996, 5, 21));
  });
});

describe("getYearsOfService", () => {
  it("should return zero if the employee hasn't started yet", () => {
    expect(getYearsOfService(new Date(2020, 0, 1), 2019)).toEqual(0);
  });

  // 15th is a Thursday
  it("should return a year of service for 2022 if they started on or before June 24th", () => {
    expect(getYearsOfService(new Date(2022, 5, 23), 2022)).toEqual(1);
    expect(getYearsOfService(new Date(2022, 5, 24), 2022)).toEqual(1);
    expect(getYearsOfService(new Date(2022, 5, 25), 2022)).toEqual(0);
    expect(getYearsOfService(new Date(2022, 5, 24), 2032)).toEqual(11);
  });

  // 15th is a Friday
  it("should return a year of service for 2023 if they started on or before June 26th", () => {
    expect(getYearsOfService(new Date(2023, 5, 25), 2023)).toEqual(1);
    expect(getYearsOfService(new Date(2023, 5, 26), 2023)).toEqual(1);
    expect(getYearsOfService(new Date(2023, 5, 27), 2023)).toEqual(0);
    expect(getYearsOfService(new Date(2023, 5, 26), 2054)).toEqual(32);
  });

  // 15th is a Saturday
  it("should return a year of service for 2018 if they started on or before June 25th", () => {
    expect(getYearsOfService(new Date(2018, 5, 24), 2018)).toEqual(1);
    expect(getYearsOfService(new Date(2018, 5, 25), 2018)).toEqual(1);
    expect(getYearsOfService(new Date(2018, 5, 26), 2018)).toEqual(0);
    expect(getYearsOfService(new Date(2018, 5, 25), 2021)).toEqual(4);
  });

  // 15th is a Sunday
  it("should return a year of service for 2024 if they started on or before June 24th", () => {
    expect(getYearsOfService(new Date(2024, 5, 23), 2024)).toEqual(1);
    expect(getYearsOfService(new Date(2024, 5, 24), 2024)).toEqual(1);
    expect(getYearsOfService(new Date(2024, 5, 25), 2024)).toEqual(0);
    expect(getYearsOfService(new Date(2024, 5, 24), 2029)).toEqual(6);
  });
});
