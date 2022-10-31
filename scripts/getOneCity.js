const WeatherForTimeZones = require("fetch-weather-data");
var WeatherIns = new WeatherForTimeZones();
process.on("message", (message) => {
  const res = timeForOneCity(message);
  process.send(res);
});

const timeForOneCity = (cityName) => {
  return WeatherIns.getTimeForOneCity(cityName);
};
