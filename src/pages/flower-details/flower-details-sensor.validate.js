const validIncomingObj = data =>
  Object.entries(data).length !== 0 && data.constructor === Object;

const validateFlower = flower =>
  isNaN(parseInt(flower.package_id)) ? false : validIncomingObj(flower);

const validateSensors = sensors => {
  if (sensors.dh22Err || sensors.soilErr || sensors.socketErr) {
    return false;
  } else {
    return sensors.every(sensor => validIncomingObj(sensor));
  }
};

const noData = flow => {
  return {
    sensorHumidity: null,
    sensorLight: null,
    sensorSoilmoisture: null,
    sensorTemperature: null,
    currentFlower: flow,
    connected: false
  };
};

const fetchDataFromSensors = (sensors, flower) => {
  if (validateFlower(flower)) {
    if (validateSensors(sensors)) {
      const [pack] = sensors.filter(
        sensor => sensor.pack.package_id === parseInt(flower.package_id)
      );
      const { humidity, light, soilMoisture, temperature } = pack.pack.sensors;
      return {
        currentFlower: flower,
        sensorHumidity: parseFloat(humidity),
        sensorLight: parseFloat(light),
        sensorSoilmoisture: parseFloat(soilMoisture["Sensor data"]),
        sensorTemperature: parseFloat(temperature),
        connected: true
      };
    } else {
      return noData(flower);
    }
  } else {
    return noData(flower);
  }
};

export { fetchDataFromSensors, validIncomingObj };
