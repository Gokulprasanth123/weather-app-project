var array;
var countArray = [0],
  sunny = document.getElementById("sunny"),
  snow = document.getElementById("snow"),
  wind = document.getElementById("wind"),
  midSec = document.getElementById("middle-section-bottom"),
  spinner,
  spinValue,
  setTimeintervalValue,
  IntervalArray = [],
  extraWidth,
  getTheSelectedCityArray,
  getCityObject,
  spinInputBox = document.getElementById("num"),
  sunnyCities,
  snowCities,
  windyCities;

class CityCardDetails extends CurrentCityDetails {
  constructor() {
    super();
    this.setSelectedIconArray = function (selectedIconArray) {
      this.selectedIconArray = selectedIconArray;
    };
    this.getSelectedIconArray = function () {
      return this.selectedIconArray;
    };
  }
  /**
   *This function is used to sort the given arrays in descending order based on the appropriate condition
   *
   * @param {Array} sunnyCities - This is the array to be sorted based on its temperature values
   * @param {Array} snowCities - This is the array to be sorted based on its precipitation values
   * @param {Array} rainyCities - This is the array to be sorted based on its humidity values
   * @return {Array} - This function returns the sorted arrays
   */
  sortingDataBasedOnWeatherInfo(citiesArray, parameter) {
    citiesArray.sort(function (a, b) {
      return parseInt(b.parameter) - parseInt(a.parameter);
    });
    return citiesArray;
  }
  /**
   *this is a function which sorts the climate array based on certain condition
   *
   * @param {Array} climateArray - it is an array which consists of the city values
   * @param {string} typeOfWeather - it is a variable which has either sunny or snowy or windy
   * @return {Array} - returns the sorted climate
   */
  findWeatherSortedArray(climateArray, typeOfWeather) {
    switch (typeOfWeather) {
      case "sunny":
        climateArray = this.sortingDataBasedOnWeatherInfo(
          climateArray,
          "temperature"
        );
        return climateArray;
        break;
      case "windy":
        climateArray = this.sortingDataBasedOnWeatherInfo(
          climateArray,
          "humidity"
        );
        return climateArray;
        break;
      case "snowy":
        climateArray = this.sortingDataBasedOnWeatherInfo(
          climateArray,
          "precipitation"
        );
        return climateArray;
        break;
    }
  }
  /**
   * this is a function which adds the eventlistener to a html element
   *
   * @param {html element} id - id of an element
   * @param {string} events - indicates which event needs to be triggered
   * @param {callback} callback - indicates the function which needs to be called when a event is triggered
   * @param {string} parameter - indicates the parameters which are passed to a function
   * @return {void}
   */
  addEventListenerForTheSelectedElement(id, events, callback, parameter) {
    document
      .getElementById(id)
      .addEventListener(events, () => callback(parameter));
  }
  /**
   *this is a function which gives the highlighting feature for the button which is selected
   *
   * @param {string} climateValue - type of climate(sunny,windy or snowny)
   * @return {void}
   */
  styleTheIconBasedOnTheWeather(climateValue) {
    spinValue = climateValue;
    sunny.setAttribute("class", "middle-sunny-no-border");
    snow.setAttribute("class", "middle-sunny-no-border");
    wind.setAttribute("class", "middle-sunny-no-border");
    switch (climateValue) {
      case "sunnyCities":
        sunny.setAttribute("class", "middle-sunny");
        break;
      case "windyCities":
        wind.setAttribute("class", "middle-sunny");
        break;
      case "snowCities":
        snow.setAttribute("class", "middle-sunny");
        break;
    }
  }
  /**
   *this is a function which returns the images name
   *
   * @param {string} typeOfWeather - either sunny, snowy or windy city
   * @return {Array} - returns the images names
   */
  findWeatherIcons(typeOfWeather) {
    if (typeOfWeather === "sunnyCities") {
      return sunnyCities;
    } else if (typeOfWeather === "snowCities") {
      return snowCities;
    } else {
      return windyCities;
    }
  }
  /**
   *this is a function which scrolls the carousel based on the direction
   *
   * @param {string} direction - scroll towards left or right
   * @return {void}
   */
  carouselScroll(direction) {
    let cont = document.getElementById("middle-section-bottom");
    direction == "left"
      ? (cont.scrollLeft -=
          document.getElementsByClassName("middle-section-bottom-box-1")[0]
            .clientWidth + extraWidth)
      : (cont.scrollLeft +=
          document.getElementsByClassName("middle-section-bottom-box-1")[0]
            .clientWidth + extraWidth);
    cont.style.scrollBehavior = "smooth";
  }
  /**
   *this is a function which clears the time interval array
   *
   * @param {Array} arr - it is an array which consists of the setInterval array
   * @return {void}
   */
  clearTheSetIntervalArray(arr) {
    while (arr.length > 0) {
      let ref = arr.shift();
      clearInterval(ref);
    }
  }
  /**
   *This function is used to align the cards center in some exceptional cases
   *
   *@param {} - nothing
   *@return {void}
   */
  alignTheCardsCenter() {
    if (Number(spinner) === 3 && midSec.scrollWidth >= "940") {
      midSec.style.justifyContent = "center";
    } else if (Number(spinner) === 2 && midSec.scrollWidth >= "650") {
      midSec.style.justifyContent = "center";
    } else if (Number(spinner) === 1 && midSec.scrollWidth >= "450") {
      midSec.style.justifyContent = "center";
    } else {
      midSec.style.justifyContent = "normal";
    }
  }
  /**
   *this is a function which creates the card using dom
   *
   * @param {object} date - consists of the date of current city
   * @param {html element} midSecContainer - main card div element
   * @param {Number} iteration - incrementor
   * @return {void}
   */
  addTheCardsToMidSecContainer(date, midSecContainer, iteration) {
    const findTheWeatherIconOfMidSection = () => {
      var imgSrc1;
      if (parseInt(this.getSelectedIconArray()[iteration].temperature) < 20) {
        imgSrc1 = "rainyIcon";
      } else if (
        parseInt(this.getSelectedIconArray()[iteration].temperature) >= 20 &&
        parseInt(this.getSelectedIconArray()[iteration].temperature) < 29
      ) {
        imgSrc1 = "snowflakeIcon";
      } else {
        imgSrc1 = "sunnyIcon";
      }
      return imgSrc1;
    };
    let time = this.updateTheCurrentTime(
      this.getSelectedIconArray()[iteration].timeZone
    );
    let box = `
  <div class="middle-section-bottom-box-1 mid-box" style="background-image:url('./assets/${this.getSelectedIconArray()[
    iteration
  ].cityName.toLowerCase()}.svg">
  <div class="middle-section-climate">
    <p class="middle-section-name-of-city">${
      this.getSelectedIconArray()[iteration].cityName
    }</p>
    <p class="middle-section-temp-box">${
      this.getSelectedIconArray()[iteration].temperature
    }</p>
    <img
      src="./assets//${findTheWeatherIconOfMidSection()}.svg"
      alt="icons"
      class="middle-section-climate-icon"
    />
  </div>
  <div class="middle-section-date-time">
    <p class="middle-section-time-box" id="time-${iteration}">${time}</p>
    <p class="middle-section-date-box">${date.date}</p>
  </div>
  <div class="middle-section-humidity-box">
    <img src="./assets/humidityIcon.svg" alt="icons" />
    <p class="mid-sec-temp">${
      this.getSelectedIconArray()[iteration].humidity
    }</p>
  </div>
  <div class="middle-section-prec-box">
    <img src="./assets/precipitationIcon.svg" alt="icons" />
    <p class="mid-sec-temp">${
      this.getSelectedIconArray()[iteration].precipitation
    }</p>
  </div>
  </div>`;
    midSecContainer.innerHTML += box;
    setTimeintervalValue = setInterval(() => {
      time = this.updateTheCurrentTime(
        this.getSelectedIconArray()[iteration].timeZone
      );
      this.updateElementInnerText(
        document.getElementById(`time-${iteration}`),
        time
      );
    }, 1);
    IntervalArray.push(setTimeintervalValue);
  }
  /**
   *this is a function for adding or hiding the carousel
   *
   *@param {} nothing
   *@return {void}
   */
  showOrHideCarousel() {
    var carousalButtons = document.getElementsByClassName("mid-btn");
    var mid = document.getElementById("middle-section-bottom");
    for (let i = 0; i < carousalButtons.length; i++) {
      if (mid.scrollWidth > mid.clientWidth) {
        carousalButtons[i].style.display = "block";
      } else {
        carousalButtons[i].style.display = "none";
      }
    }
  }
  /**
   *this is a function which gives th live time
   *
   * @param {html element} tag - tag is the parameter (html element) whose inner text will be changed
   * @param {string} timeZone - timeZone gets the continents timeZone
   * @return {void}
   */
  updateTheCurrentTime(timeZone) {
    var date = new Date().toLocaleString("en-US", {
      timeZone: timeZone,
    });
    let time = date.split(",")[1].split(":")[0];
    let time1 = date.split(",")[1].split(":")[1];
    let time2 = time + ":" + time1 + " " + date.split(",")[1].split(" ")[2];
    return time2;
  }
}

function getDataForProcessingCards(citiesObject) {
  currentCityObject.setAllCityValues(citiesObject);
  array = Object.values(currentCityObject.getAllCityValues());
  sunnyCities = array.filter(
    (value) =>
      parseInt(value.temperature) > 29 &&
      parseInt(value.humidity) < 50 &&
      parseInt(value.precipitation) >= 50
  );

  snowCities = array.filter(
    (value) =>
      parseInt(value.temperature) > 20 &&
      parseInt(value.temperature) < 29 &&
      parseInt(value.humidity) > 50 &&
      parseInt(value.precipitation) < 50
  );

  windyCities = array.filter(
    (value) =>
      parseInt(value.temperature) < 20 && parseInt(value.humidity) >= 50
  );
  getCityObject = new CityCardDetails();
  sunnyCities = getCityObject.findWeatherSortedArray(sunnyCities, "sunny");
  windyCities = getCityObject.findWeatherSortedArray(windyCities, "windy");
  snowCities = getCityObject.findWeatherSortedArray(snowCities, "snowy");

  spinValue = "sunnyCities";

  var interval = setInterval(() => {
    if (document.getElementById("middle-section-bottom").clientWidth > 850) {
      extraWidth = 45;
    } else {
      extraWidth = 22;
    }
  }, 1);

  setInterval(getCityObject.alignTheCardsCenter, 1);
  /**
   *this is a function which gives the value for appending and
   *replacing the cards
   *@param {} - nothing
   *@return {void}
   */
  function createOrReplaceCardsBasedOnTheChosenWeather() {
    spinner = spinInputBox.value;
    getTheSelectedCityArray = new CityCardDetails();
    getTheSelectedCityArray.setSelectedIconArray(
      getTheSelectedCityArray.findWeatherIcons(spinValue)
    );
    spinInputBox.setCustomValidity("");
    if (spinInputBox.value > 10) {
      spinner = 10;
      spinInputBox.value = 10;
      spinInputBox.setCustomValidity("enter any values between 3 and 10");
    } else if (spinInputBox.value < 3) {
      spinner = 3;
      spinInputBox.value = 3;
      spinInputBox.setCustomValidity("enter any values between 3 and 10");
    }
    if (getTheSelectedCityArray.getSelectedIconArray().length < spinner)
      spinner = getTheSelectedCityArray.getSelectedIconArray().length;
    countArray.push(spinner);
    if (
      countArray[countArray.length - 1] - countArray[countArray.length - 2] >=
      0
    ) {
      midSec.replaceChildren();
      getTheSelectedCityArray.clearTheSetIntervalArray(IntervalArray);
      for (
        let i = 0;
        i <
        countArray[countArray.length - 1] - countArray[countArray.length - 2];
        i++
      ) {
        var d = new Date().toLocaleString("en-US", {
          timeZone: getTheSelectedCityArray.getSelectedIconArray()[i].timeZone,
        });
        var dateTime = {
          date:
            d.split(",")[0].split("/")[1] +
            "-" +
            monthNames[d.split(",")[0].split("/")[0] - 1] +
            "-" +
            d.split(",")[0].split("/")[2],
        };
        getTheSelectedCityArray.addTheCardsToMidSecContainer(
          dateTime,
          midSec,
          i
        );
      }
      countArray.push(0);
    } else {
      for (
        let i = 0;
        i <
        countArray[countArray.length - 2] - countArray[countArray.length - 1];
        i++
      ) {
        midSec.removeChild(midSec.lastElementChild);
      }
    }
    getTheSelectedCityArray.showOrHideCarousel();
  }

  window.onresize = () => getCityObject.showOrHideCarousel();

  getCityObject.addEventListenerForTheSelectedElement(
    "sunny-btn",
    "click",
    getCityObject.styleTheIconBasedOnTheWeather,
    "sunnyCities"
  );
  getCityObject.addEventListenerForTheSelectedElement(
    "snowy-btn",
    "click",
    getCityObject.styleTheIconBasedOnTheWeather,
    "snowCities"
  );
  getCityObject.addEventListenerForTheSelectedElement(
    "windy-btn",
    "click",
    getCityObject.styleTheIconBasedOnTheWeather,
    "windyCities"
  );
  getCityObject.addEventListenerForTheSelectedElement(
    "sunny-btn",
    "click",
    createOrReplaceCardsBasedOnTheChosenWeather
  );
  getCityObject.addEventListenerForTheSelectedElement(
    "snowy-btn",
    "click",
    createOrReplaceCardsBasedOnTheChosenWeather
  );
  getCityObject.addEventListenerForTheSelectedElement(
    "windy-btn",
    "click",
    createOrReplaceCardsBasedOnTheChosenWeather
  );
  getCityObject.addEventListenerForTheSelectedElement(
    "num",
    "change",
    createOrReplaceCardsBasedOnTheChosenWeather
  );
  getCityObject.addEventListenerForTheSelectedElement(
    "left-scroll",
    "click",
    getCityObject.carouselScroll,
    "left"
  );
  getCityObject.addEventListenerForTheSelectedElement(
    "right-scroll",
    "click",
    getCityObject.carouselScroll,
    "right"
  );
  window.onload = createOrReplaceCardsBasedOnTheChosenWeather();
}
