import { useEffect, useState } from "react";
import { httpClient } from "./config";
import { useSession } from "next-auth/react";
export const useProvideAuth = () => {
  const [authUser, setAuthUser] = useState(null);
  const [error, setError] = useState("");
  const [loadingAuthUser, setLoadingAuthUser] = useState(true);
  const { data: session, status } = useSession();
  const [isLoading, setLoading] = useState(false);

  const fetchStart = () => {
    setLoading(true);
    setError("");
  };

  const fetchSuccess = () => {
    setLoading(false);
    setError("");
  };

  const fetchError = (error) => {
    setLoading(false);
    setError(error);
  };
  const userFacebookLogin = () => {
    fetchStart();
    const URL = `/auth/callback/facebook`;
    httpClient
      .get(URL)
      .then(({ data }) => {
        if (data.result) {
          fetchSuccess();
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        fetchError(error.message);
      });
  };
  const userLogin = (user, callbackFun) => {
    fetchStart();
    httpClient
      .post("/signin", user)
      .then(({ data }) => {
        if (data.result) {
          fetchSuccess();
          httpClient.defaults.headers.common["Authorization"] =
            "Bearer " + data.token.access_token;
          localStorage.setItem("token", data.token.access_token);
          getAuthUser();
          if (callbackFun) callbackFun();
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        fetchError(error.message);
      });
  };

  const userSignup = (user, callbackFun) => {
    fetchStart();
    httpClient
      .post("/signup", user)
      .then(({ data }) => {
        if (data.result) {
          fetchSuccess();
          localStorage.setItem("token", data.token.access_token);
          httpClient.defaults.headers.common["Authorization"] =
            "Bearer " + data.token.access_token;
          getAuthUser();
          if (callbackFun) callbackFun();
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        fetchError(error.message);
      });
  };

  const sendPasswordResetEmail = (email, callbackFun) => {
    fetchStart();

    setTimeout(() => {
      fetchSuccess();
      if (callbackFun) callbackFun();
    }, 300);
  };

  const confirmPasswordReset = (code, password, callbackFun) => {
    fetchStart();

    setTimeout(() => {
      fetchSuccess();
      if (callbackFun) callbackFun();
    }, 300);
  };

  const renderSocialMediaLogin = () => null;

  const userSignOut = (callbackFun) => {
    fetchStart();
    httpClient
      .post("auth/logout")
      .then(({ data }) => {
        if (data.result) {
          fetchSuccess();
          httpClient.defaults.headers.common["Authorization"] = "";
          localStorage.removeItem("token");
          setAuthUser(false);
          if (callbackFun) callbackFun();
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        fetchError(error.message);
      });
  };

  const getAuthUser = () => {
    fetchStart();
    if (session && session.user) {
      fetchSuccess();
      setAuthUser(session.user);
    } else {
      fetchError("Could not load user session.");
    }
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.

  useEffect(() => {
    if (session && session.user) {
      setAuthUser(session.user);
    }
    setLoadingAuthUser(status === "loading");
  }, []);

  // Return the user object and auth methods
  return {
    loadingAuthUser,
    isLoading,
    authUser,
    error,
    setError,
    setAuthUser,
    getAuthUser,
    userLogin,
    userSignup,
    userSignOut,
    renderSocialMediaLogin,
    sendPasswordResetEmail,
    confirmPasswordReset,
    userFacebookLogin,
  };
};
