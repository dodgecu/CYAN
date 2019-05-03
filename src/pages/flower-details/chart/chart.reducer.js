import {
  SUCCESS_GET_DAY_SENSOR_DATA,
  FAIL_GET_DAY_SENSOR_DATA
} from "./chart.action-types";

const initialState = {
  sensorData: null,
  message: null
};

export default function(state = initialState, action) {
  debugger;
  switch (action.type) {
    case SUCCESS_GET_DAY_SENSOR_DATA:
      return {
        ...state,
        sensorData: action.payload
      };
    case FAIL_GET_DAY_SENSOR_DATA:
      return {
        ...state,
        sensorData: null,
        message: action.payload
      };
    default:
      return state;
  }
}
