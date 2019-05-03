import axios from "axios";
import { backendUrl } from "../../../constants/backendUrl";

import {
  SUCCESS_GET_DAY_SENSOR_DATA,
  FAIL_GET_DAY_SENSOR_DATA
} from "./chart.action-types";

export const getDaySensorData = ({ id, time }) => dispatch => {
  const url = `${backendUrl}/flower-sensor/${id}/${time}`;
  axios
    .get(url)
    .then(sensorDayData =>
      dispatch({ type: SUCCESS_GET_DAY_SENSOR_DATA, payload: sensorDayData })
    )
    .catch(err =>
      dispatch({ type: FAIL_GET_DAY_SENSOR_DATA, payload: err.response })
    );
};
