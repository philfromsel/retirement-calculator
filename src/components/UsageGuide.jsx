import React from "react";
import { Typography } from "@material-ui/core";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

/**
 * @returns {UsageGuide} - a component displaying information about how the calculator should be
 * used
 */
function UsageGuide() {
  const d = new Date();
  const monthName = months[d.getMonth()];

  return (
    <div align="left" background-color="#F7F7F8">

      <Typography variant="h5">Using The Tool</Typography>
      <br />
        <Typography variant="body2" color="textPrimary">
          This calculator is a tool for modeling possible ESOP and 401(k) growth using the
          provided input values. Values can be set using the inputs on the left, and then the
          visual growth calculations can be seen by selecting a tab above to view them separately or
          in a combined graph. The ESOP Growth chart will also include your ESOP entry data and
          vesting percentages, if applicable.
        </Typography>
      <br />
      <Typography variant="h5">How It Works</Typography>
      <br />
      <Typography variant="body2" color="textPrimary">
        Calculations are made as simple interest plus contributions. ESOP account values are
        contributed to and compounded annually, 401(k) account values are contributed to and
        compounded monthly.
      </Typography>
      <br />
      <Typography variant="body2" color="textPrimary">
        This calculator assumes that an employee started as full time employee on the given start
        date and will be 18 years of age by the time they have completed one year of employment,
        and then calculates their ESOP entry date and vesting dates accordingly. Based on
        8 hours per working day, employees will enter the ESOP on the quarterly entry date
        (January 1st, April 1st, July 1st, October 1st) following their fulfillment of the
        following criteria:
      </Typography>
      <div>
        <ul>
          <li><Typography variant="body2" color="textPrimary">US Employee</Typography></li>
          <li><Typography variant="body2" color="textPrimary">Age 18 or older</Typography></li>
          <li>
            <Typography variant="body2" color="textPrimary">
              Have completed one year of employment and been paid for at least 1,000 hours</Typography>
          </li>
        </ul>
      </div>
      <br />
      <Typography variant="h5">Chart Usage Tips</Typography>
      <div>
        <ul>
          <li>
            <Typography variant="body2" color="textPrimary">
              Hovering over a specific point on the chart will display the specific value(s).
            </Typography>
          </li>
          <li>
            <Typography variant="body2" color="textPrimary">
              Clicking on the legend entry for a line will toggle the visibility of the line.
            </Typography>
          </li>
        </ul>
      </div>
      <br />
      <Typography variant="h5">How Do I Choose An Average Return?</Typography>
      <br />
      <Typography variant="body2" color="textPrimary">
        Accurately projecting future economic growth is beyond the scope of this tool.
        This tool is best used to assess various possible scenarios and then consider what impact
        that would have on planning your retirement. It is recommended to try a range of average
        return values to help visualize future growth potential.  Here are some references that
        may assist you, and provide a frame of reference for more conservative or aggressive
        calculations:
      </Typography>
      <div >
        <ul>
          <li>
            <Typography variant="body2" color="textPrimary">
              <a
                href="https://www.nceo.org/articles/research-employee-ownership-corporate-performance"
                rel="noopener noreferrer"
                target="_blank"
              >
                National Center for Employee Ownership: Research On ESOP Performance
              </a>
              </Typography>
          </li>
          <li>
            <Typography variant="body2" color="textPrimary">
              <a
                href="https://personal.vanguard.com/us/insights/saving-investing/model-portfolio-allocations"
                rel="noopener noreferrer"
                target="_blank"
              >
                Vanguard Portfolio Allocation Models
              </a>
            </Typography>
          </li>
          <li>
            <Typography variant="body2" color="textPrimary">
              <a
                href={`https://advisors.vanguard.com/insights/article/marketperspectives${  monthName.toLowerCase()  }2020`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {`Vanguard Market Perspective (${  monthName  } 2020)`}
              </a>
            </Typography>
          </li>
        </ul>
      </div>
      <br />
      <Typography variant="h5">401(k) Fees?</Typography>
      <br />
      <Typography variant="body2" color="textPrimary">
        As employee-owners, we share in the overhead costs associated with administering our
        company&apos;s 401(k) offering. There are administration overhead fees,and each individual
        fund will have its own fund management fees. For index funds, this is typically very low
        (less than 2 tenths of a percent), but it can be significantly higher for actively managed
        funds. A more detailed value to use for calculations can be determined by referencing
        your current fund balance and aggregating the percentage of various fees at your target
        asset allocation.
      </Typography>
      <br />
      <Typography variant="h5">Questions?</Typography>
      <br />
      <Typography variant="body2" color="textPrimary">
        For more information, please contact your ESOP administrator.
      </Typography>
    </div>
  );
}

export default UsageGuide;
