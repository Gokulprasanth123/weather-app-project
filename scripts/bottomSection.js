var buttonToSortByContinent = document.getElementById("lower-btn-1");
var buttonToSortByTemperature = document.getElementById("lower-btn-2");
var SortByContinentImage = document.getElementById("by-continent");
var SortByTemperatureImage = document.getElementById("by-temperature");
var sortedArray;
var timeIntervalValue;
var currentCityTileValue;
timeArr = [];
class CityTileDetails extends CityCardDetails {
  constructor() {
    super();
  }
  /**
   * this is a function which sorts the data and updates it in UI
   *
   * @param {callback} callback - indicates the function which needs to be called after sorting
   * @return {void}
   */
  sortAndUpdate(callback, parameter) {
    var sortedArray = callback(parameter);
    createOrReplaceTilesBasedOnTheChosenData(sortedArray);
  }
  /**
   *this is a function for changing the arrow icons to up and down
   *
   *@param {} nothing
   *@return {void}
   */
  changeContinentIcon() {
    if (SortByContinentImage.name === "up-1") {
      currentCityTileValue.sortAndUpdate(
        currentCityTileValue.sortByContinentName,
        "descending"
      );
      SortByContinentImage.name = "down-1";
      buttonToSortByContinent.title = "sorted Descendingly by continent name";
      SortByContinentImage.src = pathOfAssets + "arrowDown.svg";
    } else if (SortByContinentImage.name === "down-1") {
      currentCityTileValue.sortAndUpdate(
        currentCityTileValue.sortByContinentName,
        "Ascending"
      );
      buttonToSortByContinent.title = "sorted Ascendingly by continent name";
      SortByContinentImage.name = "up-1";
      SortByContinentImage.src = pathOfAssets + "arrowUp.svg";
    }
  }
  /**
   *this is a function which sorts the array either in ascending or in descening order as per the continent name
   *
   *@param {} nothing
   *@return {void}
   */
  sortByContinentName(sortOrder) {
    sortedArray.sort((a, b) => {
      a = a.timeZone.split("/")[0];
      b = b.timeZone.split("/")[0];
      if (sortOrder == "Ascending") {
        let returnValue = a < b ? -1 : a > b ? 1 : 0;
        return returnValue;
      } else {
        let returnValue = a > b ? -1 : a < b ? 1 : 0;
        return returnValue;
      }
    });
    return sortedArray;
  }
  /**
   *this is a function which sorts the array either in ascending or in descening order as per the temperature
   *
   *@param {} nothing
   *@return {void}
   */
  sortByTemperatureAndTimeZone(sortOrder) {
    let temp;
    for (let i = 0; i < sortedArray.length; i++) {
      for (let j = i + 1; j < sortedArray.length; j++) {
        if (
          parseInt(sortedArray[i].temperature) >
            parseInt(sortedArray[j].temperature) &&
          sortedArray[i].timeZone.split("/")[0] ===
            sortedArray[j].timeZone.split("/")[0] &&
          sortOrder == "Ascending"
        ) {
          temp = sortedArray[i];
          sortedArray[i] = sortedArray[j];
          sortedArray[j] = temp;
        } else if (
          parseInt(sortedArray[i].temperature) <
            parseInt(sortedArray[j].temperature) &&
          sortedArray[i].timeZone.split("/")[0] ===
            sortedArray[j].timeZone.split("/")[0] &&
          sortOrder == "Descending"
        ) {
          temp = sortedArray[i];
          sortedArray[i] = sortedArray[j];
          sortedArray[j] = temp;
        }
      }
    }
    return sortedArray;
  }
  /**
   *this is a fucntion which changes the arrow icon to up or down
   *
   *@param {} - nothing
   *@return {void}
   */
  changeTempIcons() {
    if (SortByTemperatureImage.name === "up-2") {
      currentCityTileValue.sortAndUpdate(
        currentCityTileValue.sortByTemperatureAndTimeZone,
        "Descending"
      );
      buttonToSortByTemperature.title = "sorted Descendingly by temperature";
      SortByTemperatureImage.name = "down-2";
      SortByTemperatureImage.src = pathOfAssets + "arrowDown.svg";
    } else if (SortByTemperatureImage.name === "down-2") {
      currentCityTileValue.sortAndUpdate(
        currentCityTileValue.sortByTemperatureAndTimeZone,
        "Ascending"
      );
      buttonToSortByTemperature.title = "sorted Ascendingly by temperature";
      SortByTemperatureImage.name = "up-2";
      SortByTemperatureImage.src = pathOfAssets + "arrowUp.svg";
    }
  }
  /**
   * this is a function for the creation of html elements
   *
   * @param {html element} element - indicates a html element
   * @return {void}
   */
  createElementForTile(element) {
    return document.createElement(element);
  }
  /**
   * this is a function for setting attribute to the html element
   *
   * @param {html element} element - indicates a html element
   * @param {string} type - indicates the type of attribute
   * @param {string} value - indicates the value of the attribute
   * @return {void}
   */
  setAttributeForTheElement(element, type, value) {
    element.setAttribute(type, value);
  }
  /**
   *this is a function which appends the child element to the parent element
   *
   * @param {html element} parentElement - the parent element to which the child element needs to get appended
   * @param {html element} childElement - the child element which needs to get appended to the parent element
   * @return {void}
   */
  appendTheChildToParent(parentElement, childElement) {
    parentElement.appendChild(childElement);
  }
  /**
   * this is a function which creates or replaces the tiles based on the chosen data
   *
   * @param {Array} sortedArray - indicates the array which got sorted either based on temperature or continent name
   * @param {Number} i  - iterative varible
   * @param {html element} bottom - bottom section container
   * @return {void}
   */
  createOrReplaceTilesBasedOnTheChosenDataForBottomSection(
    sortedArray,
    i,
    bottom
  ) {
    var tileDiv = this.createElementForTile("div");
    var continentValue = this.createElementForTile("strong");
    var temperatureValue = this.createElementForTile("strong");
    var cityNameValues = this.createElementForTile("strong");
    var liveTimeRunning = this.createElementForTile("strong");
    var humidityDiv = this.createElementForTile("div");
    var humidityValue = this.createElementForTile("p");
    var humidityImg = this.createElementForTile("img");
    var firstBreakTag = this.createElementForTile("br");
    var secondBreakTag = this.createElementForTile("br");
    this.setAttributeForTheElement(tileDiv, "class", "grid");
    this.setAttributeForTheElement(continentValue, "class", "grid-city-1");
    if (i == 0 || i == 4 || i == 7 || i == 10)
      this.setAttributeForTheElement(temperatureValue, "class", "grid-left");
    else if (i == 2 || i == 5 || i == 8 || i == 11)
      this.setAttributeForTheElement(temperatureValue, "class", "grid-center");
    else
      this.setAttributeForTheElement(temperatureValue, "class", "grid-right");
    this.setAttributeForTheElement(humidityDiv, "class", "grid-box-1");
    this.setAttributeForTheElement(
      humidityImg,
      "src",
      "./assets/humidityIcon.svg"
    );
    this.setAttributeForTheElement(humidityImg, "alt", "icons");
    this.setAttributeForTheElement(humidityImg, "class", "grid-img");
    this.setAttributeForTheElement(humidityValue, "class", "grid-hum");
    this.updateElementInnerText(
      continentValue,
      sortedArray[i].timeZone.split("/")[0]
    );
    this.updateElementInnerText(temperatureValue, sortedArray[i].temperature);
    this.updateElementInnerText(cityNameValues, sortedArray[i].cityName + ", ");
    let time = this.updateTheCurrentTime(sortedArray[i].timeZone);
    this.updateElementInnerText(liveTimeRunning, time);
    timeIntervalValue = setInterval(() => {
      let time = this.updateTheCurrentTime(sortedArray[i].timeZone);
      this.updateElementInnerText(liveTimeRunning, time);
    }, 1);
    timeArr.push(timeIntervalValue);
    this.updateElementInnerText(humidityValue, sortedArray[i].humidity);
    this.appendTheChildToParent(humidityDiv, humidityImg);
    this.appendTheChildToParent(humidityDiv, humidityValue);
    this.appendTheChildToParent(tileDiv, continentValue);
    this.appendTheChildToParent(tileDiv, temperatureValue);
    this.appendTheChildToParent(tileDiv, firstBreakTag);
    this.appendTheChildToParent(tileDiv, secondBreakTag);
    this.appendTheChildToParent(tileDiv, cityNameValues);
    this.appendTheChildToParent(tileDiv, liveTimeRunning);
    this.appendTheChildToParent(tileDiv, humidityDiv);
    this.appendTheChildToParent(bottom, tileDiv);
  }
}

currentCityTileValue = new CityTileDetails();
function getDataForProcessingTiles(citiesObject) {
  currentCityObject.setAllCityValues(citiesObject);
  sortedArray = Object.values(currentCityObject.getAllCityValues());
  /**
   * this is a function which calls the functions when the window loads
   *
   * @param {}- nothing
   * @return {void}
   *
   */
  function windowOnLoadFunctions() {
    currentCityTileValue.styleTheIconBasedOnTheWeather(spinValue);
    currentCityTileValue.sortAndUpdate(
      currentCityTileValue.sortByContinentName,
      "Descending"
    );
    currentCityTileValue.sortAndUpdate(
      currentCityTileValue.sortByTemperatureAndTimeZone,
      "Ascending"
    );
  }
  window.onload = windowOnLoadFunctions();
  currentCityTileValue.addEventListenerForTheSelectedElement(
    "lower-btn-1",
    "click",
    currentCityTileValue.changeContinentIcon
  );
  currentCityTileValue.addEventListenerForTheSelectedElement(
    "lower-btn-2",
    "click",
    currentCityTileValue.changeTempIcons
  );
}

/**
 *this is an function in which the createOrReplaceTilesBasedOnTheChosenData will be added as per the sortedArray array values
 *
 * @param {Array} sortedArray - sortedArray array
 * @return {void}
 */
function createOrReplaceTilesBasedOnTheChosenData(sortedArray) {
  var bottom = document.getElementById("lower-content-container");
  bottom.replaceChildren();
  for (let i = 0; i < 12; i++) {
    currentCityTileValue.createOrReplaceTilesBasedOnTheChosenDataForBottomSection(
      sortedArray,
      i,
      bottom
    );
  }
}
