import {
  REGISTRATION_FAIL,
  REGISTRATION_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOADING,
  LOGOUT_SUCCESS
} from "./authorization.action-types";

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  isAuthenticated: false,
  isRegistered: false,
  message: null,
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        isRegistered: true,
        isLoading: false
      };
    case REGISTRATION_FAIL:
      return {
        ...state,
        isLoading: false,
        message: action.payload.data.message
      };
    case LOADING:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        message: action.payload.data.message
      };
    default:
      return state;
  }
}
