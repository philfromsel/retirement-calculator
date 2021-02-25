import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

/**
 *
 * @param {*} props - passed in properties
 * @returns {Disclaimer} - A disclaimer which must be acknowledged before using the calculator
 */
function Disclaimer(props) {
  const { store } = props;

  const handleClose = () => {
    store.acknowledgedDisclaimer = true;
  };

  return (
    <div>
      <Dialog
        data-testid="disclaimer"
        disableBackdropClick
        disableEscapeKeyDown
        open={!store.acknowledgedDisclaimer}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Disclaimer</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This is a simple mathematical calculator. It is not a guarantee of
            future returns. All investments (including the ESOP and 401(k)) are
            subject to risk. The potential for loss (or gains) may be greater
            than calculated. This calculator is not intended to provide tax,
            investment, or legal advice.
            <br />
            <br />
            Please also keep in mind the following:
            <br />
            - Results using the calculator may change over time based on your
            inputs and as we update our assumptions.
            <br />
            - Our assumptions may not be correct or accurately project market
            conditions, inflation, or tax rates.
            <br />
            - The calculator also does not take into account IRS or plan
            contribution limits, which may result in an overestimate of
            benefits.
            <br />
            - The calculator does not take into account taxes you may owe or
            that may be withheld at distribution. These will affect how much of
            the benefits you actually receive.
            <br />
            - The operation of the plans and the benefits to which you (or your
            beneficiaries) may be entitled will be governed solely by the terms
            of the official plan documents. To the extent that any of the
            information in this calculator or any information you receive orally
            is inconsistent with the official plan documents, the provisions set
            forth in the plan documents will govern in all cases.
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            data-testid="acknowledge-button"
            onClick={handleClose}
            variant="contained"
            color="primary"
            autoFocus
            disableFocusRipple
          >
            Acknowledge
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

Disclaimer.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default observer(Disclaimer);
