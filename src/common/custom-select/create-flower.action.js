export const getType = data => dispatch => {
  dispatch({ type: "SET_TYPE", payload: data });
};
