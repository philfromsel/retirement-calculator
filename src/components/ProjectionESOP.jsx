import React from "react";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import { getYearsOfService, getPlanEntryDate } from "../common/DateHelpers";
import { getVestedValue } from "../common/Equations";
import { numFormatter, dateFormatter } from "../common/Formatters";

/**
 *
 * @param {any} props - props passed to the object
 * @returns {ProjectionESOP} - An ESOP Projection display
 */
function ProjectionESOP(props) {
  const { store } = props;

  const remainingYearsToVest = 7 - getYearsOfService(store.startDate, store.initYear);
  const initVestedYears = 5 - remainingYearsToVest;
  const vestedValues = [];
  for (
    let i = 0;
    i <= remainingYearsToVest && i < store.dataPointsESOP.length;
    i += 1
  ) {
    const vestedYears = getYearsOfService(
      store.startDate,
      store.initYear + i - 1
    );
    vestedValues[i] = { x: store.dataPointsESOP[i].x };
    if (vestedYears < 2) {
      vestedValues[i].y = 0;
    } else {
      vestedValues[i].y = Math.trunc(
        store.dataPointsESOP[i].y * ((vestedYears - 1) * 0.2)
      );
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
      data-testid="chart-esop"
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
                itemLabel = `Vested Value (${getVestedValue(initVestedYears,tooltipItems.index)}%): ${numFormatter.format(
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
