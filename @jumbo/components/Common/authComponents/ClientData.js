import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import IntlMessages from "../../../utils/IntlMessages";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import { alpha, makeStyles } from "@material-ui/core/styles";
import CmtImage from "../../../../@coremat/CmtImage";
import Typography from "@material-ui/core/Typography";
import CheckoutForm from "./CheckOutForm";
import AuthWrapper from "./AuthWrapper";
import { useAuth } from "../../../../authentication";
import { NotificationLoader } from "../../ContentLoader";
import getStripe from "../../../../services/getStripe";
import { Elements } from "@stripe/react-stripe-js";

const useStyles = makeStyles((theme) => ({
  authThumb: {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50%",
      order: 2,
    },
  },
  authContent: {
    padding: 30,
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: (props) => (props.variant === "default" ? "50%" : "100%"),
      order: 1,
    },
    [theme.breakpoints.up("xl")]: {
      padding: 50,
    },
  },
  titleRoot: {
    marginBottom: 14,
    color: theme.palette.text.primary,
  },
  textFieldRoot: {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: alpha(theme.palette.common.dark, 0.12),
    },
  },
  formcontrolLabelRoot: {
    "& .MuiFormControlLabel-label": {
      [theme.breakpoints.down("xs")]: {
        fontSize: 12,
      },
    },
  },
}));
//variant = 'default', 'standard'
// eslint-disable-next-line react/prop-types
const ClientData = ({
  variant = "default",
  wrapperVariant = "default",
  paymentIntent,
}) => {
  const classes = useStyles({ variant });
  const { isLoading, error } = useAuth();
  const options = {
    // passing the client secret obtained from the server
    clientSecret: "{{CLIENT_SECRET}}",
  };
  const stripePromise = getStripe();

  const onSubmit = () => {};

  useEffect(() => {}, []);

  return (
    <AuthWrapper variant={wrapperVariant}>
      {variant === "default" ? (
        <Box className={classes.authThumb}>
          <CmtImage src="/images/auth/login-img.png" />
        </Box>
      ) : null}
      <Box className={classes.authContent}>
        <Box mb={7}>
          <CmtImage src="/images/logo.png" />
        </Box>
        <Typography component="div" variant="h1" className={classes.titleRoot}>
          Login
        </Typography>
        <form>
          <Box mb={2}>
            <TextField
              label={<IntlMessages id="appModule.email" />}
              fullWidth
              // onChange={(event) => setEmail(event.target.value)}
              // defaultvalue={email}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm paymentIntent={paymentIntent} />
          </Elements>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Button onClick={onSubmit} variant="contained" color="primary">
              <IntlMessages id="appModule.ClientData" />
            </Button>
          </Box>
        </form>
        <NotificationLoader loading={isLoading} error={error} />
      </Box>
    </AuthWrapper>
  );
};

export default ClientData;
