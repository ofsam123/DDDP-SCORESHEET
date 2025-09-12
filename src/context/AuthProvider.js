

import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

// Initial state with safer localStorage parsing
const INITIAL_STATE = {
  user: (() => {
    try {
      const storedUser = localStorage.getItem("dddp_user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing localStorage user:", error);
      return null;
    }
  })(),
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  // Persist user to localStorage only if it has changed
  useEffect(() => {
    try {
      const serializedUser = JSON.stringify(state.user);
      const storedUser = localStorage.getItem("dddp_user");
      if (serializedUser !== storedUser) {
        localStorage.setItem("dddp_user", serializedUser);
      }
    } catch (error) {
      console.error("Error saving user to localStorage:", error);
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};