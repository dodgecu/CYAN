import {
  REGISTRATION_FAIL,
  REGISTRATION_SUCCESS
} from "../sign-up/signUp.action-types";

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  isRegistered: false,
  message: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isRegistered: true
      };
    case REGISTRATION_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isLoading: false,
        message: action.payload.data.message
      };
    default:
      return state;
  }
}
