import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADING,
  LOGOUT_SUCCESS
} from "./logIn.action-types";

import {
  REGISTRATION_FAIL,
  REGISTRATION_SUCCESS
} from "../sign-up/signUp.action-types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  user: null,
  isRegistered: false,
  message: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
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
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: false,
        isLoading: false,
        isRegistered: true
      };
    case LOGIN_FAIL:
      debugger;
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        message: action.payload.data.message
      };
    case LOGOUT_SUCCESS:
    case REGISTRATION_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        message: action.payload.data.message
      };
    default:
      return state;
  }
}
