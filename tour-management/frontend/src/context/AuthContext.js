import { createContext, useEffect, useReducer } from "react";

const initial_state = {
  user:
    localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  loading: false,
  error: null,
  emailConfirm: null,
};

export const AuthContext = createContext(initial_state);
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: false,
        error: null,
        emailConfirm: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
        emailConfirm: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
        emailConfirm: null,
      };
    case "REGISTER_SUCCESS":
      return {
        user: null,
        loading: false,
        error: action.payload,
        emailConfirm: null,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: action.payload,
        emailConfirm: null,
      };
    case "CONFIRM_EMAIL":
      return {
        user: null,
        loading: false,
        error: null,
        emailConfirm: action.payload,
      };
    case "CONFIRM_EMAIL_FALSE":
      return {
        user: null,
        loading: false,
        error: null,
        emailConfirm: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        emailConfirm: state.emailConfirm,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
