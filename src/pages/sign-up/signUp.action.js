import axios from "axios";

import { REGISTRATION_FAIL, REGISTRATION_SUCCESS } from "./signUp.action-types";

export const register = ({ name, email, password }) => dispatch => {
  const url = "http://localhost:5000/api/users";
  debugger;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password });

  axios
    .post(url, body, config)
    .then(res =>
      dispatch({
        type: REGISTRATION_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: REGISTRATION_FAIL,
        payload: err.response
      });
    });
};
