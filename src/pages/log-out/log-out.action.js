import { LOGOUT_SUCCESS } from "./log-out.action-types";

export const logOut = () => dispatch => {
  dispatch({
    type: LOGOUT_SUCCESS,
    payload: null
  });
};
