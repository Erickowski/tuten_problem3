import { OBTENER_TOKEN } from "../../types";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
