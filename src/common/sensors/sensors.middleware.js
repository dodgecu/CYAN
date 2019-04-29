import io from "socket.io-client";

const socket = io.connect("http://localhost:1335", {
  reconnection: false
});

export const fetchSensors = () => dispatch => {
  socket.on("clientEvent", data => {
    console.log(data);
    dispatch({ type: "GET_DATA", payload: data });
  });

  socket.on("connect_error", data => {
    console.log("connection error");
  });
};
