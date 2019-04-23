import axios from "axios";

import { DELETE_SUCCESS, DELETE_FAIL } from "./settings.action-types";

export const deleteUser = () => dispatch => {
  const url = "http://localhost:5000/api/auth/user";

  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": `${localStorage.getItem("token")}`
    }
  };

  debugger;

  axios
    .delete(url, config)
    .then(res =>
      dispatch({
        type: DELETE_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: DELETE_FAIL,
        payload: err.response
      });
    });
};
