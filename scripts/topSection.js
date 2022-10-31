var cityValue,
  timeInterval,
  hourElementValues = [],
  iconElementValues = [],
  tempElementValues = [],
  citiesValues,
  pathOfAssets = "./assets/",
  isError = false,
  currentCityObject,
  degreeSymbol = "°";
monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
//dom element
var totalNoOfCities = document.getElementById("city").options.length;
var timeElement = document.getElementById("time");
var dateElement = document.getElementById("date");
var AmPmStateIcon = document.getElementById("top-sec-AmOrPm");
var tempElement = document.getElementById("top-sec-temp");
var fahrenheitElement = document.getElementById("top-sec-fah");
var humidityElement = document.getElementById("top-sec-humidity");
var precipitationElement = document.getElementById("top-sec-prep");
var currentTemperatureImage = document.getElementById("icon1");
var currentTemperatureValue = document.getElementById("top-last-sec-1");
var selectedCityDropDown = document.getElementById("city");
var selectedCityInputBox = document.getElementById("select");
var currentHourValue = document.getElementById("now");

for (let i = 0; i < 5; i++) {
  hourElementValues[i] = document.getElementById(`hour-${i + 1}`);
  iconElementValues[i] = document.getElementById(`top-last-img-${i + 2}`);
  tempElementValues[i] = document.getElementById(`temp-${i + 1}`);
}
//prototype
class CurrentCityDetails {
  constructor() {
    this.setAllCityValues = function (allCityValues) {
      this.allCityValues = allCityValues;
    };
    this.getAllCityValues = function () {
      return this.allCityValues;
    };
    this.setCityDetails = function (
      cityName,
      dateAndTime,
      timeZone,
      temperature,
      humidity,
      precipitation,
      nextNHours
    ) {
      this.cityName = cityName;
      this.dateAndTime = dateAndTime;
      this.timeZone = timeZone;
      this.temperature = temperature;
      this.humidity = humidity;
      this.precipitation = precipitation;
      this.nextNHours = nextNHours;
    };
    this.getCityDetails = function () {
      return {
        cityName: this.cityName,
        dateAndTime: this.dateAndTime,
        timeZone: this.timeZone,
        temperature: this.temperature,
        humidity: this.humidity,
        precipitation: this.precipitation,
        nextNHours: this.nextNHours,
      };
    };
  }
  /**
   *this is a function which writes the values to the html element
   *
   * @param {html element} element - indicates the html element whose value needs to be changed
   * @param {string} value - indicates the value that needs to be given to the html element
   * @return {void}
   */
  updateElementInnerText(element, value) {
    element.innerText = value;
  }
  /**
   *this is a function which returns the type of icon based
   *on the temperature given
   *
   * @param {string} temperature - it is a temperature value used to find the type of icon
   * @return {string} it returns the type of icon n=based on the temperature given
   */
  findWeatherIcon(temperature) {
    var imageSource;
    if (temperature < 18) {
      imageSource = "rainyIcon";
    } else if (temperature >= 18 && temperature <= 22) {
      imageSource = "windyIcon";
    } else if (temperature >= 23 && temperature <= 29) {
      imageSource = "cloudyIcon";
    } else {
      imageSource = "sunnyIcon";
    }
    return imageSource;
  }
  /**
   *this is a function which finds the nextfivehrs value based on the live time
   *
   * @param {Number} currentHour - current hour
   * @param {string} AmPmStateValues   - Am or Pm
   * @return {void}
   */
  findNextFiveHrs(currentHour, AmPmStateValues) {
    let hourArrayValues = [];
    if (AmPmStateValues == "PM") currentHour = Number(currentHour) + 12;
    for (let i = 0; i < 5; i++) {
      currentHour++;
      currentHour == 24 ? (currentHour = 0) : currentHour;
      var AmPm = currentHour >= 12 ? "PM" : "AM";
      var hours = ((currentHour + 11) % 12) + 1 + AmPm;
      hourArrayValues[i] = hours;
    }
    for (let i = 0; i < hourElementValues.length; i++) {
      this.updateElementInnerText(hourElementValues[i], hourArrayValues[i]);
    }
  }
  /**
   * this is a function which updates the Top section UI values
   *
   * @param {html element} currentHour - indicates the current hour
   * @param {html element} temperature  - indicates the temperature of the city
   * @param {html element} fahrenheit - indicates the fahrenheit value of the city
   * @param {html element} humidity - indicates the humidity value of the city
   * @param {html element} prep - indicates the precipitation value of the city
   * @param {html element} tempAndFah - indicates the temperature and fahrenheit value of the city
   * @return {void}
   */
  updateTopSecUiValues(
    currentHour,
    temperature,
    fahrenheit,
    humidity,
    precipitation,
    currentTemperature
  ) {
    this.updateElementInnerText(currentHourValue, currentHour);
    this.updateElementInnerText(tempElement, temperature+"°C");
    this.updateElementInnerText(fahrenheitElement, fahrenheit);
    this.updateElementInnerText(humidityElement, humidity);
    this.updateElementInnerText(precipitationElement, precipitation);
    this.updateElementInnerText(currentTemperatureValue, currentTemperature);
  }
  /**
   * this is a function which sets the values to the UI elements
   *
   * @param {} - nothing
   * @return {void}
   */
  setValuesForTheUiElements() {
    clearInterval(timeInterval);
    timeInterval = setInterval(this.updateLiveTime, 1000, this);
    var getTheCityDetails = this.getCityDetails();
    this.updateTopSecUiValues(
      "NOW",
      getTheCityDetails.temperature.split("°")[0],
      `${(parseInt(getTheCityDetails.temperature) * 1.8 + 32).toFixed(1)}°F`,
      getTheCityDetails.humidity.split("%")[0],
      getTheCityDetails.precipitation.split("%")[0],
      parseInt(getTheCityDetails.temperature)
    );
    currentTemperatureImage.src =
      pathOfAssets +
      this.findWeatherIcon(parseInt(getTheCityDetails.temperature)) +
      ".svg";
    for (let i = 0; i < iconElementValues.length; i++) {
      iconElementValues[i].src =
        pathOfAssets +
        this.findWeatherIcon(parseInt(getTheCityDetails.nextNHours[i])) +
        ".svg";
    }
    for (let i = 0; i < tempElementValues.length; i++) {
      this.updateElementInnerText(
        tempElementValues[i],
        parseInt(getTheCityDetails.nextNHours[i])
      );
    }
    selectedCityInputBox.style.border = "none";
  }
  /**
   *this is a function which returns the live time of a city every second
   *
   *@param {object}  currentObject -  the object which calls the function
   * @return {void} - to stop the function
   */
  updateLiveTime(currentObject) {
    if (isError) {
      clearInterval(timeInterval);
      return;
    }
    var date = new Date().toLocaleString("en-US", {
      timeZone: currentObject.getCityDetails().timeZone,
    });
    let amPmState = date.split(",")[1].trim().split(" ")[1];
    AmPmStateIcon.src =
      amPmState === "PM"
        ? pathOfAssets + "pmState.svg"
        : pathOfAssets + "amState.svg";
    currentObject.updateElementInnerText(
      dateElement,
      date.split(",")[0].split("/")[1] +
        "-" +
        monthNames[date.split(",")[0].split("/")[0] - 1] +
        "-" +
        date.split(",")[0].split("/")[2]
    );
    currentObject.updateElementInnerText(
      timeElement,
      date.split(",")[1].trim().split(" ")[0]
    );
    let hour = date.split(",")[1].split(":")[0];
    currentObject.findNextFiveHrs(hour, amPmState);
  }
  /**
   * this is a function which adds the options to the dropdown element
   *
   * @param {} - nothing
   * @return {void}
   */
  addOptionsToDropDrown() {
    citiesValues = Object.values(currentCityObject.getAllCityValues());
    citiesValues = citiesValues.map((city) => {
      return city.cityName.toLowerCase();
    });
    if (totalNoOfCities < citiesValues.length) {
      citiesValues.forEach((item) => {
        var option = document.createElement("option");
        option.value = item;
        selectedCityDropDown.appendChild(option);
      });
    }
  }
}
currentCityObject = new CurrentCityDetails();
function getDataForProcessingHourlyWeather(citiesObject) {
  currentCityObject.setAllCityValues(citiesObject);
  currentCityObject.addOptionsToDropDrown();
  /**
   *this is a function which collects the value of the datalist and allots it
   *to the other html elements
   *
   *@param {} - nothing
   *@return {void}
   */
  async function cityChangeHandler() {
    cityValue = selectedCityInputBox.value.toLowerCase();
    var cityImg = document.getElementById("top-sec-city-img");
    cityImg.src = pathOfAssets + cityValue + ".svg";
    currentCityObject.setAllCityValues(citiesObject);
    if (citiesValues.includes(selectedCityInputBox.value.toLowerCase())) {
      citiesObject[cityValue].nextFiveHrs = await getNextNHours(
        citiesObject[selectedCityInputBox.value.toLowerCase()].cityName
      );
      currentCityObject.setAllCityValues(citiesObject);
      var fullCityValue = currentCityObject.getAllCityValues();
      currentCityObject.setCityDetails(
        fullCityValue[cityValue].cityName,
        fullCityValue[cityValue].dateAndTime,
        fullCityValue[cityValue].timeZone,
        fullCityValue[cityValue].temperature,
        fullCityValue[cityValue].humidity,
        fullCityValue[cityValue].precipitation,
        fullCityValue[cityValue].nextFiveHrs
      );
      currentCityObject.setValuesForTheUiElements();
      isError = false;
    } else {
      isError = true;
      showWarningForCityNotFound();
    }

    /**
     *this is a function which checks for the empty values in the datalist.
     *if the datalist returns empty value it shows error
     *
     *@param {} nothing
     *@return {void}
     */
    function showWarningForCityNotFound() {
      if (isError) {
        clearInterval(timeInterval);
        selectedCityInputBox.style.border = "3px solid red";
        selectedCityInputBox.value = "Invalid city";
        cityImg.src = pathOfAssets + "warning.svg";
        currentCityObject.updateElementInnerText(dateElement, "NIL");
        currentCityObject.updateElementInnerText(timeElement, "NIL");
        AmPmStateIcon.src = pathOfAssets + "warning.svg";
        currentTemperatureImage.src = pathOfAssets + "warning.svg";
        for (let i = 0; i < iconElementValues.length; i++) {
          iconElementValues[i].src = pathOfAssets + "warning.svg";
        }
        currentCityObject.updateElementInnerText(
          currentTemperatureValue,
          "NIL"
        );
        for (let i = 0; i < tempElementValues.length; i++) {
          currentCityObject.updateElementInnerText(tempElementValues[i], "NIL");
        }
        for (let i = 0; i < hourElementValues.length; i++) {
          currentCityObject.updateElementInnerText(hourElementValues[i], "NIL");
        }
        currentCityObject.updateElementInnerText(tempElement, "NIL");
        currentCityObject.updateElementInnerText(precipitationElement, "NIL");
        currentCityObject.updateElementInnerText(humidityElement, "NIL");
        currentCityObject.updateElementInnerText(fahrenheitElement, "NIL");
      }
    }
  }

  selectedCityInputBox.addEventListener("change", cityChangeHandler);
  window.onload = cityChangeHandler();
}
