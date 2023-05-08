import React, { useState, createContext, useEffect } from "react";
import { login, signup } from "../api/tmdb-api";

export const AuthenticationContext = createContext(null);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticationStatusLoaded, setIsAuthenticationStatusLoaded] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken);
  const [accountId, setAccountId] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    let persistedAccountId = localStorage.getItem("accountId");
    let persistedEmail = localStorage.getItem("email");
    if (persistedAccountId !== "" && persistedEmail !== "") {
      setIsAuthenticated(true);
      setEmail(persistedEmail);
      setAccountId(persistedAccountId);
    } else {
      setIsAuthenticated(false);
    }
    setIsAuthenticationStatusLoaded(true);
  })

  //Function to put JWT token in local storage.
  const setUserData = (token, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    setEmail(email);
    setAuthToken(token);
  }

  const authenticate = async (email, password) => {
    const result = await login(email, password);
    if (result.token && result.accountId) {
      setUserData(result.token, email);
      setAccountIdInLocalStorage(result.accountId);
      setIsAuthenticated(true);
    };
    return result;
  };

  const register = async (email, password, firstName, lastName) => {
    const result = await signup(email, password, firstName, lastName);
    return (result.code == 201) ? true : false;
  };

  const setAccountIdInLocalStorage = (accountId) => {
    localStorage.setItem("accountId", accountId);
    setAuthToken(accountId);
  }

  const signout = () => {
    setIsAuthenticated(false);
    setUserData("", "");
    setAccountId("");
  }

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        isAuthenticationStatusLoaded,
        authenticate,
        register,
        signout,
        email
      }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
};

export default AuthContextProvider;