const WeatherForTimeZones = require("fetch-weather-data");
var WeatherIns = new WeatherForTimeZones();

process.on("message", (message) => {
  const res = nextNhoursWeather(
    message.city_Date_Time_Name,
    message.hours,
    message.lastForecast
  );
  process.send(res);
});

const nextNhoursWeather = (cityTDN, hours, lastForecast) => {
  return WeatherIns.nextNhoursWeather(cityTDN, hours, lastForecast);
};
