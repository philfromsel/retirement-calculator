import React from "react";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import {
  getYearsOfService,
  getPlanEntryDate,
  getVestingDayByStartDate,
  getVestingDayByYear
} from "../common/DateHelpers";
import { numFormatter, dateFormatter } from "../common/Formatters";

/**
 *
 * @param {any} props - props passed to the object
 * @returns {ProjectionESOP} - An ESOP Projection display
 */
function ProjectionESOP(props) {
  const { store } = props;

  const remainingYearsToVest = 7 - getYearsOfService(store.startDate, store.initYear);
  const vestedValues = [];
  const vestedPercentages = [];
  for (
    let i = 0;
    i <= remainingYearsToVest && i < store.dataPointsESOP.length;
    i += 1
  ) {
    const vestedYears = getYearsOfService(
      store.startDate,
      store.initYear + i - 1
    );
    let endOfYearPoint = {};
    endOfYearPoint = { x: store.dataPointsESOP[i].x };
    if (vestedYears < 2) {
      endOfYearPoint.y = 0;
      vestedPercentages.push(0);
    } else {
      endOfYearPoint.y = Math.trunc(
        store.dataPointsESOP[i].y * ((vestedYears - 1) * 0.2)
      );
      vestedPercentages.push((vestedYears - 1) * 20);
    }
    vestedValues.push(endOfYearPoint);

    if (i === 0) {
      // Check if they vested their first year
      if (getYearsOfService(store.startDate, store.initYear) === 1) {
        const vestingPoint = {};
        vestingPoint.x = dateFormatter.format(getVestingDayByStartDate(store.startDate));
        vestingPoint.y = 0;
        vestedValues.push(vestingPoint);
        vestedPercentages.push(0);
      } else if (getYearsOfService(store.startDate, store.initYear) > 1) {
        const vestingPoint = {};
        vestingPoint.x = dateFormatter.format(getVestingDayByYear(store.initYear));
        vestingPoint.y = Math.trunc(store.dataPointsESOP[i].y * ((vestedYears) * 0.2));
        vestedValues.push(vestingPoint);
        vestedPercentages.push(vestedYears * 20);
      }
    } else if (vestedYears < 6) {
      const vestingPoint = {};
      vestingPoint.x = dateFormatter.format(getVestingDayByYear(store.initYear + i));
      vestingPoint.y = Math.trunc(store.dataPointsESOP[i].y * ((vestedYears) * 0.2));
      vestedValues.push(vestingPoint);
      vestedPercentages.push(vestedYears * 20);
    }
  }

  const data = {
    datasets: [
      {
        label: "ESOP Account Value",
        fill: false,
        steppedLine: true,
        data: store.dataPointsESOP,
        backgroundColor: "#44A3FF",
        borderColor: "#44A3FF",
      },
    ],
  };

  if (remainingYearsToVest > 0) {
    data.datasets[1] = {
      label: "Vested Value",
      fill: false,
      steppedLine: true,
      data: vestedValues,
      backgroundColor: "#93989D",
      borderColor: "#93989D",
    };

    if (
      getPlanEntryDate(store.startDate) >= new Date(store.dataPointsESOP[0].x)
    ) {
      data.datasets[2] = {
        label: "Plan Entry Date",
        fill: false,
        pointRadius: 5,
        pointHoverRadius: 7,
        data: [
          {
            label: "Plan Entry Point",
            x: getPlanEntryDate(store.startDate),
            y: 0,
          },
        ],
        backgroundColor: "#EE7468",
        borderColor: "#EE7468",
      };
    }
  }

  return (
    <Line
      data={data}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
          mode: "x",
          intersect: "false",
          callbacks: {
            // eslint-disable-next-line no-unused-vars
            label: (tooltipItems, _data) => {
              let itemLabel = "";
              if (tooltipItems.datasetIndex === 0) {
                itemLabel = `ESOP Account Value: ${numFormatter.format(
                  Math.trunc(tooltipItems.value)
                )}`;
              } else if (tooltipItems.datasetIndex === 1) {
                itemLabel = `Vested Value (${vestedPercentages[tooltipItems.index]}%): ${numFormatter.format(
                  Math.trunc(tooltipItems.value)
                )}`;
              } else if (tooltipItems.datasetIndex === 2) {
                itemLabel = "Employee enters the ESOP";
              }
              return itemLabel;
            },
            // eslint-disable-next-line no-unused-vars
            title: (tooltipItems, _data) => {
              return dateFormatter.format(new Date(tooltipItems[0].label));
            },
          },
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: false,
                min: `1/1/${store.initYear}`,
              },
              type: "time",
              time: {
                displayFormats: {
                  day: "MM/YYYY",
                  week: "MM/YYYY",
                  month: "MM/YYYY",
                  quarter: "MM/YYYY",
                  year: "YYYY",
                },
                parser: "MM/DD/YYYY",
              },
              distribution: "linear",
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
                // eslint-disable-next-line no-unused-vars
                callback: (value, _index, _values) => {
                  return numFormatter.format(value);
                },
              },
            },
          ],
        },
      }}
      redraw
    />
  );
}

ProjectionESOP.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default observer(ProjectionESOP);
