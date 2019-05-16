const checkFlower = flowerId => (isNaN(parseInt(flowerId)) ? false : true);

const checkSensors = ([sensorData]) => {
  return sensorData.dh22Err || sensorData.soilErr || sensorData.socketErr
    ? false
    : true;
};

function renderSensorData(sensors, flower) {
  if (checkSensors(sensors)) {
    if (checkFlower(flower)) {
      const [active] = sensors.filter(
        sensor => sensor.pack.package_id === parseInt(flower)
      );

      const {
        humidity,
        light,
        temperature,
        soilMoisture
      } = active.pack.sensors;
      return {
        sensorHumidity: parseFloat(humidity),
        sensorLight: parseFloat(light),
        sensorTemperature: parseFloat(temperature),
        sensorSoilMoisture: parseFloat(soilMoisture["Sensor data"]),
        connected: true
      };
    }
  }

  return {
    sensorHumidity: 0,
    sensorLight: 0,
    sensorTemperature: 0,
    sensorSoilMoisture: 0,
    connected: false
  };
}

export { renderSensorData, checkSensors };
