import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

import { OBTENER_TOKEN } from "../../types";

const AuthState = ({ children }) => {
  const initialState = {
    token: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Funciones
  const obtenerToken = (token) => {
    dispatch({
      type: OBTENER_TOKEN,
      payload: token,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        obtenerToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
