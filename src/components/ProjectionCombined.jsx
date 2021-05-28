import React from "react";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import { numFormatter, dateFormatter } from "../common/Formatters";

/**
 *
 * @param {*} props - Passed in properties
 * @returns {ProjectionCombined} - A component to display combined ESOP and 401k projections
 */
function ProjectionCombined(props) {
  const { store } = props;

  const combinedValuePoints = [];
  for (let i = 0; i < store.dataPointsESOP.length; i += 1) {
    combinedValuePoints[i] = {
      x: store.dataPointsESOP[i].x,
      y: store.dataPointsESOP[i].y + store.dataPoints401k[i].y,
    };
  }

  const data = {
    datasets: [
      {
        label: "Combined ESOP + 401(k) Value",
        fill: false,
        lineTension: 0.1,
        data: combinedValuePoints,
        backgroundColor: "#26943A",
        borderColor: "#26943A",
      },
      {
        label: "ESOP Account Value",
        fill: false,
        steppedLine: true,
        data: store.dataPointsESOP,
        backgroundColor: "#44A3FF",
        borderColor: "#44A3FF",
      },
      {
        label: "401(k) Balance",
        fill: false,
        lineTension: 0.1,
        data: store.dataPoints401k,
        backgroundColor: "#F37A0F",
        borderColor: "#F37A0F",
      },
    ],
  };

  return (
    <Line
      data={data}
      options={{
        maintainAspectRatio: false,
        tooltips: {
          mode: "x",
          intersect: "false",
          callbacks: {
            // eslint-disable-next-line no-unused-vars
            label: (tooltipItems, _data) => {
              let itemLabel = "";
              if (tooltipItems.datasetIndex === 0) {
                itemLabel = `Combined Employee Retirement Accounts balance: ${numFormatter.format(
                  Math.trunc(tooltipItems.value)
                )}`;
              } else if (tooltipItems.datasetIndex === 1) {
                itemLabel = `ESOP Account Value: ${numFormatter.format(
                  Math.trunc(tooltipItems.value)
                )}`;
              } else if (tooltipItems.datasetIndex === 2) {
                itemLabel = `401(k) balance: ${numFormatter.format(
                  Math.trunc(tooltipItems.value)
                )}`;
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

ProjectionCombined.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default observer(ProjectionCombined);
