import { OBTENER_TOKEN } from "../../types";

export default (state, action) => {
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
