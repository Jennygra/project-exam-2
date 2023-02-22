import React from "react";
import useLocalStorage from "../hooks/localStorage/uesLocalStorage";

/**
 * The authentication contect for the application
 * @typedef {object} AuthContext
 * @property {*} value - The value of the authentication context
 * @property {Function} Provider - A provider component that provides the authentication context to its children
 */

const AuthContext = React.createContext([null, () => {}]);

export const AuthProvider = (props) => {
  const [auth, setAuth] = useLocalStorage("auth", null);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
