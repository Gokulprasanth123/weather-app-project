var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var startTime = new Date();
var daycheck = 14400000;
var weatherData = [];
const { fork } = require("child_process");
//use of middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/index.html", express.static(__dirname));

//get the individual city details
app.get("/", function (req, res) {
  let individualCityDetails = req.query.city;
  const child = fork("./scripts/getOneCity.js");
  child.send(individualCityDetails);
  child.on("message", (message) => {
    res.json(message);
  });
});

//get all city details
app.get("/all-timezone-cities", function (req, res) {
  let currentTime = new Date();
  const child = fork("./scripts/allTimeZones.js");
  if (currentTime - startTime > daycheck) {
    startTime = new Date();
    child.send("");
    child.on("message", (message) => {
      res.json(message);
    });
  } else {
    if (weatherData.length === 0) {
      child.send("");
      child.on("message", (message) => {
        res.json(message);
      });
    }
  }
});

//post a city detail and get the next five hours
app.post("/hourly-forecast", function (req, res) {
  const childProcess = fork("./scripts/allTimeZones.js");
  childProcess.send("");
  childProcess.on("message", (message) => {
    let getNextFiveHoursOfACity = req.body;
    getNextFiveHoursOfACity.lastForecast = JSON.stringify(message);
    const child = fork("./scripts/NextFiveHours.js");
    child.send(getNextFiveHoursOfACity);
    child.on("message", (message) => {
      res.json(message);
    });
  });
});
app.listen(8088);
