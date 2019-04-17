import axios from "axios";

import { LOGIN_SUCCESS, LOGIN_FAIL } from "./logIn.action-types";

export const logIn = ({ email, password }) => dispatch => {
  debugger;
  const url = "http://localhost:5000/api/auth";

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  axios
    .post(url, body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err.response.data.message);
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response
      });
    });
};
