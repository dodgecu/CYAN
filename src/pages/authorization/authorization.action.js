import axios from "axios";

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

export const register = ({ name, email, password }) => dispatch => {
  dispatch({ type: LOADING });
  const url = "http://localhost:4000/api/users";

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password });

  axios
    .post(url, body, config)
    .then(res => dispatch({ type: REGISTRATION_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: REGISTRATION_FAIL, payload: err.response }));
};

export const logIn = ({ email, password }) => dispatch => {
  dispatch({ type: LOADING });
  const url = "http://localhost:4000/api/auth";

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  axios
    .post(url, body, config)
    .then(res => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: LOGIN_FAIL, payload: err.response }));
};

export const deleteUser = () => dispatch => {
  dispatch({ type: LOADING });
  const url = "http://localhost:4000/api/auth/user";

  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": `${localStorage.getItem("token")}`
    }
  };

  axios
    .delete(url, config)
    .then(res => dispatch({ type: DELETE_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: DELETE_FAIL, payload: err.response }));
};

export const updateUser = property => dispatch => {
  dispatch({ type: LOADING });
  const url = `http://localhost:4000/api/auth/user/${Object.keys(property)}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token")
    }
  };

  const body = JSON.stringify(property);

  axios
    .put(url, body, config)
    .then(res => dispatch({ type: UPDATE_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: UPDATE_FAIL, payload: err.response }));
};
