import React from "react";
import {
  createMuiTheme,
  makeStyles,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { observer } from "mobx-react";

import Constants from "../common/Constants";
import Disclaimer from "../components/Disclaimer";
import UsageGuide from "../components/UsageGuide";
import ProjectionInputs from "../components/ProjectionInputs";
import ProjectionESOP from "../components/ProjectionESOP";
import Projection401k from "../components/Projection401k";
import ProjectionCombined from "../components/ProjectionCombined";
import { useStores } from "../stores";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    padding: "15px 15px 5px 15px",
    backgroundColor: "#F7F7F8",
    borderWidth: "0px",
  },
  flexBoss: {
    boxSizing: "border-box",
    display: "flex",
    "@media (max-width: 800px)": {
      flexFlow: "row wrap",
      justifyContent: "space-around",
      height: "100%",
    },
  },
  inputs: {
    display: "inline-block",
    boxSizing: "border-box",
    minWidth: "300px",
    width: "300px",
    maxWidth: "300px",
    verticalAlign: "top",
    paddingLeft: "15px",
    paddingRight: "15px",
    borderWidth: "0px 1px 0px 0px",
    borderStyle: "solid",
    borderColor: "#AAAEB2",
    "@media (max-width: 800px)": {
      width: "100%",
      maxWidth: "100%",
      textAlign: "center",
      borderWidth: "0px 0px 0px 0px",
    },
    overflowY: "auto",
  },
  charts: {
    display: "inline-block",
    flexGrow: 1,
    boxSizing: "border-box",
    minWidth: "475px",
    minHeight: "450px",
    height: "calc(100vh - 270px)",
    verticalAlign: "top",
    paddingLeft: "2.5%",
    paddingRight: "2.5%",
    "@media (max-width: 800px)": {
      height: "450px",
    },
  },
  footer: {
    margin: "15px",
    textAlign: "center",
  },
});

const App = () => {
  const classes = useStyles();
  const { calculatorStore } = useStores();

  return (
    <MuiThemeProvider
      theme={createMuiTheme({
        palette: {
          type: "light",
          accent: true,
        },
        typography: {
          useNextVariants: true,
        },
      })}
    >
      {!calculatorStore.acknowledgedDisclaimer && (
        <Disclaimer store={calculatorStore} />
      )}
      <div className={classes.root}>
        <Typography variant="h4" color="primary">
          SEL Retirement Benefits Calculator
        </Typography>
        <Typography variant="body2" color="textSecondary">
          This is a simple mathematical calculator. It is not a guarantee of
          future returns. All investments (including the ESOP and 401(k)) are
          subject to risk. The potential for loss (or gains) may be greater than
          calculated. This calculator is not intended to provide tax,
          investment, or legal advice.
        </Typography>
        <hr />
        <div className={classes.flexBoss}>
          <div className={classes.inputs}>
            <ProjectionInputs
              data-testid="projInputs"
              store={calculatorStore}
            />
          </div>
          <div className={classes.charts}>
            <Tabs
              data-testid="tabSelector"
              value={calculatorStore.selectedTab}
              onChange={calculatorStore.handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              id="tabs"
            >
              {calculatorStore.tabs.map((item) => (
                <Tab key={item} label={item} disableRipple />
              ))}
            </Tabs>
            <hr />
            {calculatorStore.selectedTabName === Constants.USAGE_GUIDE && (
              <UsageGuide data-testid="UsageGuide" />
            )}
            {calculatorStore.selectedTabName === Constants.ESOP_GROWTH && (
              <Typography
                variant="caption"
                color="textSecondary"
                data-testid="capESOP"
              >
                <i>
                  This is the calculated growth for an ESOP account based on the
                  supplied parameters. Its purpose is to help SEL Employee
                  Owners visualize the long-term rewards of employee ownership
                  over the length of their career.
                </i>
              </Typography>
            )}
            {calculatorStore.selectedTabName === Constants.ONLY_401K && (
              <Typography
                variant="caption"
                color="textSecondary"
                data-testid="cap401k"
              >
                <i>
                  This is the calculated growth for an SEL 401(k) account based
                  on the supplied parameters. Its purpose is to help SEL
                  Employee Owners to visualize the growth potential of their own
                  elective savings over the length of their career.
                </i>
              </Typography>
            )}
            {calculatorStore.selectedTabName ===
              Constants.COMBINED_INVESTMENTS && (
              <Typography
                variant="caption"
                color="textSecondary"
                data-testid="capCombined"
              >
                <i>
                  This is the combined calculated retirement savings for an ESOP
                  account + SEL 401(k) account, based on the supplied
                  parameters. Its purpose is to empower SEL Employee Owners to
                  better visualize the benefits that SEL provides in planning
                  and funding their own retirement.
                </i>
              </Typography>
            )}
            {calculatorStore.selectedTabName === Constants.ESOP_GROWTH && (
              <ProjectionESOP data-testid="projESOP" store={calculatorStore} />
            )}
            {calculatorStore.selectedTabName === Constants.ONLY_401K && (
              <Projection401k data-testid="proj401k" store={calculatorStore} />
            )}
            {calculatorStore.selectedTabName ===
              Constants.COMBINED_INVESTMENTS && (
              <ProjectionCombined
                data-testid="projCombined"
                store={calculatorStore}
              />
            )}
            <div className={classes.footer}>
              <Typography variant="subtitle1" color="textPrimary">
                SEL CONFIDENTIAL
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default observer(App);
