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
const ClientData = ({ variant = "default", wrapperVariant = "default" }) => {
  const classes = useStyles({ variant });
  const { isLoading, setLoading, error, fetchStripePaymentIntent } = useAuth();
  const [options, setOptions] = useState({});
  useEffect(() => {
    setLoading(true);

    (async function () {
      try{
      const paymentIntent = await fetchStripePaymentIntent();
      console.log({paymentIntent})
      setOptions({ clientSecret: paymentIntent?.data?.client_secret });
      setLoading(false);
      }catch(error){
        console.log(error)
        setLoading(false);
      }
    })();


  }, []);

  const stripePromise = getStripe();

  const onSubmit = () => {};

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
              label={<IntlMessages id="appModule.brandName" />}
              fullWidth
              // onChange={(event) => setEmail(event.target.value)}
              // defaultvalue={email}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>

          {options.clientSecret && (
            <Elements stripe={stripePromise} options={options}>
              <Typography
                component="label"
                className={classes.titleRoot}
              >
                Card Details
              </Typography>
              <CheckoutForm />
            </Elements>
          )}
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
