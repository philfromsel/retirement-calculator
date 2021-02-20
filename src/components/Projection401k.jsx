import React from "react";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import { numFormatter, dateFormatter } from "../common/Formatters";

/**
 *
 * @param {*} props - Passed in properties
 * @returns {Projection401k} - Component for displaying projected 401k values
 */
function Projection401k(props) {
  const { store } = props;

  const data = {
    datasets: [
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
              return `401(k) balance: ${numFormatter.format(
                Math.trunc(tooltipItems.value)
              )}`;
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

Projection401k.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default observer(Projection401k);
