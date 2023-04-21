import React, { useState, createContext } from "react";
import { login, signup } from "../api/tmdb-api";

export const AuthenticationContext = createContext(null);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken);
  const [email, setEmail] = useState("");

  //Function to put JWT token in local storage.
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

  const authenticate = async (email, password) => {
    const result = await login(email, password);
    if (result.token) {
      setToken(result.token);
      setIsAuthenticated(true);
      setEmail(email);
    };
    return result;
  };

  const register = async (email, password, firstName, lastName) => {
    const result = await signup(email, password, firstName, lastName);
    console.log(result.code);
    return (result.code == 201) ? true : false;
  };

  const signout = () => {
    setTimeout(() => {
      setIsAuthenticated(false);
      setToken(null);
    }, 100);
  }

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
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