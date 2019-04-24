import {
  REGISTRATION_FAIL,
  REGISTRATION_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  LOADING
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
    case DELETE_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        message: action.payload.message,
        token: null,
        isDeleted: true,
        isLoading: false
      };
    case DELETE_FAIL:
      return {
        ...state,
        message: action.payload.message,
        isDeleted: false
      };
    case UPDATE_SUCCESS:
      debugger;
      return {
        ...state,
        user: action.payload,
        isLoading: false
      };
    case UPDATE_FAIL:
      debugger;
      localStorage.removeItem("token");
      return {
        ...state,
        message: action.payload.message,
        isLoading: false
      };
    default:
      return state;
  }
}
