const checkFlower = flowerId => (isNaN(parseInt(flowerId)) ? false : true);

const checkSensors = sensorData => {
  if (sensorData.dh22Err || sensorData.soilErr || sensorData.socketErr) {
    return false;
  } else {
    return sensorData.every(
      sensor =>
        Object.entries(sensor).length !== 0 && sensor.constructor === Object
    );
  }
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

function renderSensorData(sensors, flower) {
  if (checkFlower(flower)) {
    if (checkSensors(sensors)) {
      const active = sensors.filter(
        sensor => sensor.pack.package_id === parseInt(flower)
      );
      const {
        humidity,
        light,
        temperature,
        soilMoisture
      } = active[0].pack.sensors;
      return {
        sensorHumidity: parseFloat(humidity),
        sensorLight: parseFloat(light),
        sensorTemperature: parseFloat(temperature),
        sensorSoilMoisture: parseFloat(soilMoisture["Sensor data"]),
        notConnected: false
      };
    } else {
      return nodata();
    }
  } else {
    return nodata();
  }
}

export { renderSensorData };
