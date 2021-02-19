import {
  getContributionPercentage,
  getPlanEntryDate,
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

describe("getYearsOfService", () => {
  it("should return zero if the employee hasn't started yet", () => {
    expect(getYearsOfService(new Date(2020, 0, 1), 2019)).toEqual(0);
  });

  it("should return 1 for 2019 if they started on or before July 10th", () => {
    expect(getYearsOfService(new Date(2019, 6, 9), 2019)).toEqual(1);
    expect(getYearsOfService(new Date(2019, 6, 10), 2019)).toEqual(1);
  });

  it("should return 0 for 2019 if they started on or after July 11", () => {
    expect(getYearsOfService(new Date(2019, 6, 11), 2019)).toEqual(0);
  });

  it("should return 3 for 2017 if they started before July 11th", () => {
    expect(getYearsOfService(new Date(2017, 6, 10), 2019)).toEqual(3);
  });

  it("should return 2 for 2017 if they started on July 11th", () => {
    expect(getYearsOfService(new Date(2017, 6, 11), 2019)).toEqual(2);
  });

  it("should return 4 for 2016 if they started before July 12th", () => {
    expect(getYearsOfService(new Date(2016, 6, 11), 2019)).toEqual(4);
  });

  it("should return 3 for 2016 if they started on July 12th", () => {
    expect(getYearsOfService(new Date(2016, 6, 12), 2019)).toEqual(3);
  });

  it("should return 10 for 2010 if they started before July 12th", () => {
    expect(getYearsOfService(new Date(2010, 6, 12), 2019)).toEqual(10);
  });

  it("should return 9 for 2016 if they started on July 13th", () => {
    expect(getYearsOfService(new Date(2010, 6, 13), 2019)).toEqual(9);
  });

  it("should return 6 for the any year earlier than six years ago", () => {
    expect(getYearsOfService(new Date(2013, 11, 31), 2019)).toEqual(6);
  });
});
