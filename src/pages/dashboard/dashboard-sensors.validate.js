const validIncomingObj = data =>
  Object.entries(data).length !== 0 && data.constructor === Object;

const checkFlower = flowerId => (isNaN(parseInt(flowerId)) ? false : true);

const checkSensors = sensors => {
  return sensors.dh22Err || sensors.soilErr || sensors.socketErr ? false : true;
};

const nodata = () => {
  return {
    sensorHumidity: null,
    sensorLight: null,
    sensorTemperature: null,
    sensorSoilMoisture: null,
    notConnected: true
  };
};

let current = null;

function renderSensorData(sensors, flower) {
  if (checkFlower(flower)) {
    if (checkSensors(sensors)) {
      for (let sensor of sensors) {
        if (validIncomingObj(sensor)) {
          if (sensor.pack.package_id === parseInt(flower)) {
            current = sensor.pack;
          }
        }
      }
      if (current !== null) {
        const { humidity, light, temperature, soilMoisture } = current.sensors;
        return {
          sensorHumidity: parseFloat(humidity),
          sensorLight: parseFloat(light),
          sensorTemperature: parseFloat(temperature),
          sensorSoilMoisture: parseFloat(soilMoisture["Sensor data"]),
          notConnected: false
        };
      }
    }
  }
  return nodata();
}

export { renderSensorData };
