import { DELETE_SUCCESS, DELETE_FAIL } from "./settings.action-types";

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  message: null,
  isDeleted: false,
  isAuthenticated: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DELETE_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        message: action.payload.message,
        token: null,
        isDeleted: true,
        isAuthenticated: false
      };
    case DELETE_FAIL:
      return {
        ...state,
        user: null,
        token: localStorage.getItem("token"),
        isDeleted: false
      };
    default:
      return state;
  }
}
