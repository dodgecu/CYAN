import { LOGOUT_SUCCESS, USER_LOADING } from "./log-out.action-types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: true,
  isLoading: false,
  message: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false
      };
    default:
      return state;
  }
}
