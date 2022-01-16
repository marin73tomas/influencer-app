import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import IntlMessages from "../../../utils/IntlMessages";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import { alpha, makeStyles } from "@material-ui/core/styles";
import CmtImage from "../../../../@coremat/CmtImage";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "next/link";
import AuthWrapper from "./AuthWrapper";
import { useAuth } from "../../../../authentication";
import { NotificationLoader } from "../../ContentLoader";
import { getProviders } from "next-auth/react";
import { signIn } from "next-auth/react";

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
const SignIn = ({ variant = "default", wrapperVariant = "default" }) => {
  const classes = useStyles({ variant });
  const { isLoading, error, userLogin, userFacebookLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();

      setProviders(res);
    })();
  }, []);

  const onSubmit = () => {
    userLogin({ username: email, password });
  };

  const onFacebookSubmit = () => {
    userFacebookLogin();
  };

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
              onChange={(event) => setEmail(event.target.value)}
              defaultValue={email}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="password"
              label={<IntlMessages id="appModule.password" />}
              fullWidth
              onChange={(event) => setPassword(event.target.value)}
              defaultValue={password}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <FormControlLabel
              className={classes.formcontrolLabelRoot}
              control={<Checkbox name="checkedA" />}
              label="Remember me"
            />
            <Box component="p" fontSize={{ xs: 12, sm: 16 }}>
              <Link href="/forgot-password">
                <a>
                  <IntlMessages id="appModule.forgotPassword" />
                </a>
              </Link>
            </Box>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Button onClick={onSubmit} variant="contained" color="primary">
              <IntlMessages id="appModule.signIn" />
            </Button>

            <Box component="p" fontSize={{ xs: 12, sm: 16 }}>
              <Link href="/signup">
                <a>
                  <IntlMessages id="signIn.signUp" />
                </a>
              </Link>
            </Box>
          </Box>
        </form>
        <Box mb={2} mx="auto" display="flex" justifyContent="center">
          {Object.values(providers || {}).map((provider) => (
            <div key={provider.name}>
              <button
                className="loginBtn loginBtn--facebook"
                onClick={() => signIn(provider.id)}
              >
                Continue with {provider.name}
              </button>
            </div>
          ))}
        </Box>
        <NotificationLoader loading={isLoading} error={error} />
      </Box>
    </AuthWrapper>
  );
};

export default SignIn;
