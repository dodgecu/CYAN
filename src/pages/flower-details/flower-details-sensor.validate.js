const validIncomingObj = data =>
  Object.entries(data).length !== 0 && data.constructor === Object;

const validateFlower = flower =>
  isNaN(parseInt(flower.package_id)) ? false : validIncomingObj(flower);

const validateSensors = sensors => {
  return sensors.dh22Err || sensors.soilErr || sensors.socketErr ? false : true;
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

let current = null;
const fetchDataFromSensors = (sensors, flower) => {
  if (validateFlower(flower)) {
    if (validateSensors(sensors)) {
      for (let sensor of sensors) {
        if (validIncomingObj(sensor)) {
          if (sensor.pack.package_id === parseInt(flower.package_id)) {
            current = sensor.pack;
          }
        }
      }

      if (current !== null) {
        const { humidity, light, soilMoisture, temperature } = current.sensors;
        return {
          currentFlower: flower,
          sensorHumidity: parseFloat(humidity),
          sensorLight: parseFloat(light),
          sensorSoilmoisture: parseFloat(soilMoisture["Sensor data"]),
          sensorTemperature: parseFloat(temperature),
          connected: true
        };
      }
    }
  }
  return noData(flower);
};

export { fetchDataFromSensors, validIncomingObj };
