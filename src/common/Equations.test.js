import {
  generate401kGrowthData,
  generateESOPGrowthData,
  getAPY,
  getVestedValue,
  getYearCount,
  round,
} from "./Equations";

describe("getYearCount", () => {
  it("sets a lower bound of 1", () => {
    expect(getYearCount(0)).toEqual(1);
  });

  it("sets an upper bound of 50", () => {
    expect(getYearCount(51)).toEqual(50);
  });

  it("returns any value in the bounds", () => {
    expect(getYearCount(1)).toEqual(1);
    expect(getYearCount(25)).toEqual(25);
    expect(getYearCount(50)).toEqual(50);
  });
});

describe("getAPY", () => {
  it("works for negative growth", () => {
    expect(round(getAPY(-0.1, 12), 7)).toEqual(-0.1048993);
    expect(round(getAPY(-0.1, 365), 7)).toEqual(-0.1053453);
  });

  it("works for no growth", () => {
    expect(getAPY(0, 12)).toEqual(0);
  });

  it("works for positive growth compounded monthly", () => {
    expect(round(getAPY(0.01, 12), 6)).toEqual(0.009954);
    expect(round(getAPY(0.05, 12), 6)).toEqual(0.048889);
    expect(round(getAPY(0.1, 12), 6)).toEqual(0.09569);
    expect(round(getAPY(0.15, 12), 6)).toEqual(0.140579);
  });

  it("works for positive growth compounded daily", () => {
    expect(round(getAPY(0.01, 365), 6)).toEqual(0.00995);
    expect(round(getAPY(0.05, 365), 6)).toEqual(0.048793);
    expect(round(getAPY(0.1, 365), 6)).toEqual(0.095323);
    expect(round(getAPY(0.15, 365), 6)).toEqual(0.139789);
  });
});

describe("generate401kGrowthData", () => {
  it("works for zero values", () => {
    expect(
      generate401kGrowthData(new Date(2019, 0, 1), 0, 0, 0, 0, 2019, 0)
    ).toEqual([
      { x: "1/1/2019", y: 0 },
      { x: "1/1/2020", y: 0 },
    ]);
    expect(
      generate401kGrowthData(new Date(2019, 0, 1), 0, 0, 0, 0, 2019, 10)
    ).toEqual([
      { x: "1/1/2019", y: 0 },
      { x: "1/1/2020", y: 0 },
      { x: "1/1/2021", y: 0 },
      { x: "1/1/2022", y: 0 },
      { x: "1/1/2023", y: 0 },
      { x: "1/1/2024", y: 0 },
      { x: "1/1/2025", y: 0 },
      { x: "1/1/2026", y: 0 },
      { x: "1/1/2027", y: 0 },
      { x: "1/1/2028", y: 0 },
      { x: "1/1/2029", y: 0 },
    ]);
  });

  it("works for different start dates", () => {
    // start date before the initYear value does not impact generated dates
    expect(
      generate401kGrowthData(new Date(2018, 1, 1), 1000, 0.05, 100, 0, 2019, 0)
    ).toEqual([
      { x: "1/1/2019", y: 1000 },
      { x: "1/1/2020", y: 2277.26 },
    ]);
    // start date with a year that matches the initYear value results in the first entry being
    // partway through the year
    expect(
      generate401kGrowthData(new Date(2019, 6, 24), 1000, 0.05, 100, 0, 2019, 3)
    ).toEqual([
      { x: "7/24/2019", y: 1000 },
      { x: "1/1/2020", y: 1630.84 },
      { x: "1/1/2021", y: 2939.64 },
      { x: "1/1/2022", y: 4313.88 },
    ]);
  });

  it("works for different starting balances", () => {
    expect(
      generate401kGrowthData(new Date(2019, 0, 1), 0, 0.01, 100, 0, 2019, 5)
    ).toEqual([
      { x: "1/1/2019", y: 0 },
      { x: "1/1/2020", y: 1205.49 },
      { x: "1/1/2021", y: 2423.04 },
      { x: "1/1/2022", y: 3652.76 },
      { x: "1/1/2023", y: 4894.78 },
      { x: "1/1/2024", y: 6149.22 },
    ]);
    expect(
      generate401kGrowthData(new Date(2019, 0, 1), 1000, 0.01, 100, 0, 2019, 5)
    ).toEqual([
      { x: "1/1/2019", y: 1000 },
      { x: "1/1/2020", y: 2215.49 },
      { x: "1/1/2021", y: 3443.14 },
      { x: "1/1/2022", y: 4683.06 },
      { x: "1/1/2023", y: 5935.38 },
      { x: "1/1/2024", y: 7200.22 },
    ]);
  });

  it("works for different growth rates", () => {
    expect(
      generate401kGrowthData(new Date(2019, 0, 1), 1000, 0.15, 100, 0, 2019, 5)
    ).toEqual([
      { x: "1/1/2019", y: 1000 },
      { x: "1/1/2020", y: 2430.42 },
      { x: "1/1/2021", y: 4075.4 },
      { x: "1/1/2022", y: 5967.13 },
      { x: "1/1/2023", y: 8142.62 },
      { x: "1/1/2024", y: 10644.43 },
    ]);
  });

  it("works for different contributions", () => {
    expect(
      generate401kGrowthData(new Date(2019, 0, 1), 1000, 0.15, 10, 0, 2019, 5)
    ).toEqual([
      { x: "1/1/2019", y: 1000 },
      { x: "1/1/2020", y: 1278.04 },
      { x: "1/1/2021", y: 1597.79 },
      { x: "1/1/2022", y: 1965.5 },
      { x: "1/1/2023", y: 2388.37 },
      { x: "1/1/2024", y: 2874.67 },
    ]);
  });

  it("works for different fees", () => {
    expect(
      generate401kGrowthData(
        new Date(2019, 0, 1),
        1000,
        0.15,
        10,
        0.0125,
        2019,
        5
      )
    ).toEqual([
      { x: "1/1/2019", y: 1000 },
      { x: "1/1/2020", y: 1264.89 },
      { x: "1/1/2021", y: 1566.2 },
      { x: "1/1/2022", y: 1908.94 },
      { x: "1/1/2023", y: 2298.81 },
      { x: "1/1/2024", y: 2742.28 },
    ]);
  });

  it("works for maximum years (50)", () => {
    expect(
      generate401kGrowthData(
        new Date(2019, 0, 1),
        10000,
        0.07,
        100,
        0.0125,
        2019,
        50
      )
    ).toEqual([
      { x: "1/1/2019", y: 10000 },
      { x: "1/1/2020", y: 11806.31 },
      { x: "1/1/2021", y: 13716.48 },
      { x: "1/1/2022", y: 15736.48 },
      { x: "1/1/2023", y: 17872.63 },
      { x: "1/1/2024", y: 20131.61 },
      { x: "1/1/2025", y: 22520.48 },
      { x: "1/1/2026", y: 25046.71 },
      { x: "1/1/2027", y: 27718.2 },
      { x: "1/1/2028", y: 30543.3 },
      { x: "1/1/2029", y: 33530.85 },
      { x: "1/1/2030", y: 36690.18 },
      { x: "1/1/2031", y: 40031.17 },
      { x: "1/1/2032", y: 43564.27 },
      { x: "1/1/2033", y: 47300.52 },
      { x: "1/1/2034", y: 51251.61 },
      { x: "1/1/2035", y: 55429.88 },
      { x: "1/1/2036", y: 59848.4 },
      { x: "1/1/2037", y: 64520.99 },
      { x: "1/1/2038", y: 69462.25 },
      { x: "1/1/2039", y: 74687.64 },
      { x: "1/1/2040", y: 80213.49 },
      { x: "1/1/2041", y: 86057.07 },
      { x: "1/1/2042", y: 92236.66 },
      { x: "1/1/2043", y: 98771.57 },
      { x: "1/1/2044", y: 105682.24 },
      { x: "1/1/2045", y: 112990.27 },
      { x: "1/1/2046", y: 120718.52 },
      { x: "1/1/2047", y: 128891.14 },
      { x: "1/1/2048", y: 137533.69 },
      { x: "1/1/2049", y: 146673.18 },
      { x: "1/1/2050", y: 156338.19 },
      { x: "1/1/2051", y: 166558.94 },
      { x: "1/1/2052", y: 177367.38 },
      { x: "1/1/2053", y: 188797.31 },
      { x: "1/1/2054", y: 200884.46 },
      { x: "1/1/2055", y: 213666.62 },
      { x: "1/1/2056", y: 227183.76 },
      { x: "1/1/2057", y: 241478.13 },
      { x: "1/1/2058", y: 256594.43 },
      { x: "1/1/2059", y: 272579.92 },
      { x: "1/1/2060", y: 289484.57 },
      { x: "1/1/2061", y: 307361.24 },
      { x: "1/1/2062", y: 326265.82 },
      { x: "1/1/2063", y: 346257.41 },
      { x: "1/1/2064", y: 367398.52 },
      { x: "1/1/2065", y: 389755.24 },
      { x: "1/1/2066", y: 413397.47 },
      { x: "1/1/2067", y: 438399.13 },
      { x: "1/1/2068", y: 464838.39 },
      { x: "1/1/2069", y: 492797.9 },
    ]);
  });
});

describe("generateESOPGrowthData", () => {
  it("works for zero values", () => {
    expect(
      generateESOPGrowthData(new Date(2019, 0, 1), 0, 0, 0, 0, 0, 2019, 0)
    ).toEqual([
      { x: "1/1/2019", y: 0 },
      { x: "1/1/2020", y: 0 },
    ]);
    expect(
      generateESOPGrowthData(new Date(2019, 0, 1), 0, 0, 0, 0, 0, 2019, 10)
    ).toEqual([
      { x: "1/1/2019", y: 0 },
      { x: "1/1/2020", y: 0 },
      { x: "1/1/2021", y: 0 },
      { x: "1/1/2022", y: 0 },
      { x: "1/1/2023", y: 0 },
      { x: "1/1/2024", y: 0 },
      { x: "1/1/2025", y: 0 },
      { x: "1/1/2026", y: 0 },
      { x: "1/1/2027", y: 0 },
      { x: "1/1/2028", y: 0 },
      { x: "1/1/2029", y: 0 },
    ]);
  });

  it("works for different start dates", () => {
    expect(
      generateESOPGrowthData(
        new Date(2019, 0, 1),
        0,
        0,
        50000,
        0,
        0.15,
        2019,
        3
      )
    ).toEqual([
      { x: "1/1/2019", y: 0 },
      { x: "1/1/2020", y: 0 },
      { x: "1/1/2021", y: 7500 },
      { x: "1/1/2022", y: 15000 },
    ]);

    expect(
      generateESOPGrowthData(
        new Date(2019, 5, 17),
        0,
        0,
        50000,
        0,
        0.15,
        2019,
        3
      )
    ).toEqual([
      { x: "6/17/2019", y: 0 },
      { x: "1/1/2020", y: 0 },
      { x: "1/1/2021", y: 3750 },
      { x: "1/1/2022", y: 11250 },
    ]);

    expect(
      generateESOPGrowthData(
        new Date(2016, 0, 1),
        0,
        0,
        50000,
        0,
        0.15,
        2019,
        3
      )
    ).toEqual([
      { x: "1/1/2019", y: 0 },
      { x: "1/1/2020", y: 7500 },
      { x: "1/1/2021", y: 15000 },
      { x: "1/1/2022", y: 22500 },
    ]);

    expect(
      generateESOPGrowthData(
        new Date(2020, 11, 31),
        0,
        0,
        50000,
        0,
        0.15,
        2019,
        3
      )
    ).toEqual([
      { x: "12/31/2020", y: 0 },
      { x: "1/1/2021", y: 0 },
      { x: "1/1/2022", y: 0 },
      { x: "1/1/2023", y: 7500 },
    ]);
  });

  it("works for different starting balances", () => {
    expect(
      generateESOPGrowthData(
        new Date(2019, 0, 1),
        0,
        0.1,
        50000,
        0,
        0.15,
        2020,
        6
      )
    ).toEqual([
      { x: "1/1/2020", y: 0 },
      { x: "1/1/2021", y: 7500 },
      { x: "1/1/2022", y: 15750 },
      { x: "1/1/2023", y: 24825 },
      { x: "1/1/2024", y: 34807.5 },
      { x: "1/1/2025", y: 45788.25 },
      { x: "1/1/2026", y: 57867.08 },
    ]);

    expect(
      generateESOPGrowthData(
        new Date(2018, 0, 1),
        5000,
        0.1,
        50000,
        0,
        0.15,
        2020,
        6
      )
    ).toEqual([
      { x: "1/1/2020", y: 5000 },
      { x: "1/1/2021", y: 13000 },
      { x: "1/1/2022", y: 21800 },
      { x: "1/1/2023", y: 31480 },
      { x: "1/1/2024", y: 42128 },
      { x: "1/1/2025", y: 53840.8 },
      { x: "1/1/2026", y: 66724.88 },
    ]);
  });

  it("works for different growth rates", () => {
    expect(
      generateESOPGrowthData(
        new Date(2019, 0, 1),
        0,
        0.05,
        50000,
        0,
        0.15,
        2020,
        6
      )
    ).toEqual([
      { x: "1/1/2020", y: 0 },
      { x: "1/1/2021", y: 7500 },
      { x: "1/1/2022", y: 15375 },
      { x: "1/1/2023", y: 23643.75 },
      { x: "1/1/2024", y: 32325.94 },
      { x: "1/1/2025", y: 41442.24 },
      { x: "1/1/2026", y: 51014.35 },
    ]);

    expect(
      generateESOPGrowthData(
        new Date(2019, 0, 1),
        0,
        0.15,
        50000,
        0,
        0.15,
        2020,
        6
      )
    ).toEqual([
      { x: "1/1/2020", y: 0 },
      { x: "1/1/2021", y: 7500 },
      { x: "1/1/2022", y: 16125 },
      { x: "1/1/2023", y: 26043.75 },
      { x: "1/1/2024", y: 37450.31 },
      { x: "1/1/2025", y: 50567.86 },
      { x: "1/1/2026", y: 65653.04 },
    ]);
  });

  it("works for different initial salaries", () => {
    expect(
      generateESOPGrowthData(
        new Date(2019, 0, 1),
        0,
        0.1,
        77777,
        0,
        0.15,
        2020,
        6
      )
    ).toEqual([
      { x: "1/1/2020", y: 0 },
      { x: "1/1/2021", y: 11666.55 },
      { x: "1/1/2022", y: 24499.75 },
      { x: "1/1/2023", y: 38616.28 },
      { x: "1/1/2024", y: 54144.46 },
      { x: "1/1/2025", y: 71225.46 },
      { x: "1/1/2026", y: 90014.56 },
    ]);
  });

  it("works for different average raises", () => {
    expect(
      generateESOPGrowthData(
        new Date(2019, 0, 1),
        0,
        0.1,
        50000,
        0.03,
        0.15,
        2020,
        6
      )
    ).toEqual([
      { x: "1/1/2020", y: 0 },
      { x: "1/1/2021", y: 7725 },
      { x: "1/1/2022", y: 16454.25 },
      { x: "1/1/2023", y: 26295.13 },
      { x: "1/1/2024", y: 37365.96 },
      { x: "1/1/2025", y: 49797.11 },
      { x: "1/1/2026", y: 63732.21 },
    ]);
  });

  it("works for different contribution rates", () => {
    expect(
      generateESOPGrowthData(
        new Date(2019, 0, 1),
        0,
        0.1,
        50000,
        0,
        0.07,
        2020,
        6
      )
    ).toEqual([
      { x: "1/1/2020", y: 0 },
      { x: "1/1/2021", y: 3500 },
      { x: "1/1/2022", y: 7350 },
      { x: "1/1/2023", y: 11585 },
      { x: "1/1/2024", y: 16243.5 },
      { x: "1/1/2025", y: 21367.85 },
      { x: "1/1/2026", y: 27004.64 },
    ]);
  });

  it("works for different initial years", () => {
    expect(
      generateESOPGrowthData(
        new Date(2019, 0, 1),
        0,
        0.1,
        50000,
        0,
        0.15,
        2023,
        6
      )
    ).toEqual([
      { x: "1/1/2023", y: 0 },
      { x: "1/1/2024", y: 7500 },
      { x: "1/1/2025", y: 15750 },
      { x: "1/1/2026", y: 24825 },
      { x: "1/1/2027", y: 34807.5 },
      { x: "1/1/2028", y: 45788.25 },
      { x: "1/1/2029", y: 57867.08 },
    ]);
  });

  it("works for maximum years (50)", () => {
    expect(
      generateESOPGrowthData(
        new Date(2019, 0, 1),
        0,
        0.1,
        50000,
        0,
        0.15,
        2020,
        50
      )
    ).toEqual([
      { x: "1/1/2020", y: 0 },
      { x: "1/1/2021", y: 7500 },
      { x: "1/1/2022", y: 15750 },
      { x: "1/1/2023", y: 24825 },
      { x: "1/1/2024", y: 34807.5 },
      { x: "1/1/2025", y: 45788.25 },
      { x: "1/1/2026", y: 57867.08 },
      { x: "1/1/2027", y: 71153.79 },
      { x: "1/1/2028", y: 85769.17 },
      { x: "1/1/2029", y: 101846.09 },
      { x: "1/1/2030", y: 119530.7 },
      { x: "1/1/2031", y: 138983.77 },
      { x: "1/1/2032", y: 160382.15 },
      { x: "1/1/2033", y: 183920.37 },
      { x: "1/1/2034", y: 209812.41 },
      { x: "1/1/2035", y: 238293.65 },
      { x: "1/1/2036", y: 269623.02 },
      { x: "1/1/2037", y: 304085.32 },
      { x: "1/1/2038", y: 341993.85 },
      { x: "1/1/2039", y: 383693.24 },
      { x: "1/1/2040", y: 429562.56 },
      { x: "1/1/2041", y: 480018.82 },
      { x: "1/1/2042", y: 535520.7 },
      { x: "1/1/2043", y: 596572.77 },
      { x: "1/1/2044", y: 663730.05 },
      { x: "1/1/2045", y: 737603.06 },
      { x: "1/1/2046", y: 818863.37 },
      { x: "1/1/2047", y: 908249.71 },
      { x: "1/1/2048", y: 1006574.68 },
      { x: "1/1/2049", y: 1114732.15 },
      { x: "1/1/2050", y: 1233705.37 },
      { x: "1/1/2051", y: 1364575.91 },
      { x: "1/1/2052", y: 1508533.5 },
      { x: "1/1/2053", y: 1666886.85 },
      { x: "1/1/2054", y: 1841075.54 },
      { x: "1/1/2055", y: 2032683.09 },
      { x: "1/1/2056", y: 2243451.4 },
      { x: "1/1/2057", y: 2475296.54 },
      { x: "1/1/2058", y: 2730326.19 },
      { x: "1/1/2059", y: 3010858.81 },
      { x: "1/1/2060", y: 3319444.69 },
      { x: "1/1/2061", y: 3658889.16 },
      { x: "1/1/2062", y: 4032278.08 },
      { x: "1/1/2063", y: 4443005.89 },
      { x: "1/1/2064", y: 4894806.48 },
      { x: "1/1/2065", y: 5391787.13 },
      { x: "1/1/2066", y: 5938465.84 },
      { x: "1/1/2067", y: 6539812.42 },
      { x: "1/1/2068", y: 7201293.66 },
      { x: "1/1/2069", y: 7928923.03 },
      { x: "1/1/2070", y: 8729315.33 },
    ]);
  });
});

describe("getVestedValue", () => {
  it("works for permutations of values", () => {
    expect(getVestedValue(0,0)).toEqual(0);
    expect(getVestedValue(0,1)).toEqual(20);
    expect(getVestedValue(0,2)).toEqual(40);
    expect(getVestedValue(0,3)).toEqual(60);
    expect(getVestedValue(0,4)).toEqual(80);
    expect(getVestedValue(0,5)).toEqual(100);
    expect(getVestedValue(1,0)).toEqual(20);
    expect(getVestedValue(2,0)).toEqual(40);
    expect(getVestedValue(3,0)).toEqual(60);
    expect(getVestedValue(4,0)).toEqual(80);
    expect(getVestedValue(5,0)).toEqual(100);
    expect(getVestedValue(50,0)).toEqual(100);
    expect(getVestedValue(0,50)).toEqual(100);
    expect(getVestedValue(5,5)).toEqual(100);
  });
});