import axios from "axios";
import { backendUrl } from "../../../constants/backendUrl";

import {
  SUCCESS_GET_DAY_SENSOR_DATA,
  FAIL_GET_DAY_SENSOR_DATA
} from "./chart.action-types";

export const getDaySensorData = ({ id, type, time }) => dispatch => {
  const url = `${backendUrl}/flower-sensor/${id}/${type}/${time}`;

  axios
    .get(url)
    .then(sensorDayData =>
      dispatch({
        type: SUCCESS_GET_DAY_SENSOR_DATA,
        payload: sensorDayData.data
      })
    )
    .catch(err =>
      dispatch({ type: FAIL_GET_DAY_SENSOR_DATA, payload: err.response })
    );
};
