var mainContainer = document.getElementById("main");
mainContainer.classList.add("main-container-hidden");
document.body.classList.add("loading-visible");

/**
 * this function gets invoked when a individual city detail is needed
 *
 * @param {string} city - individual city name
 * @return {Promise} - returns a promise which consists of either error or data
 */
function getIndividualCityDetails(city) {
  const getIndividualCity = new Promise(async (resolve, reject) => {
    try {
      let individualCityResponse = await fetch(
        `http://localhost:8088/?city=${city}`,
        {
          method: "GET",
          Headers: {
            Accept: "application.json",
            "Content-Type": "application/json",
          },
        }
      );
      resolve(individualCityResponse.json());
    } catch (error) {
      console.log(error);
    }
  });
  return getIndividualCity;
}

/**
 * this function gets invoked when a city data needs to get posted
 *
 * @param {object} cityData - consists of the city name and time
 * @return {Promise} - returns a promise which consists of either error or data
 */
function postCityDetails(cityData) {
  const PromiseToPostTheCityDetails = new Promise(async (resolve, reject) => {
    try {
      let getTheCityDetailResponse = await fetch(
        `http://localhost:8088/hourly-forecast`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cityData),
        }
      );
      resolve(getTheCityDetailResponse.json());
    } catch (error) {
      reject(error);
    }
  });
  return PromiseToPostTheCityDetails;
}

/**
 * this function gets invoked when all city details is needed
 *
 * @param {} - nothing
 * @return {Promise} - returns a promise which consists of either error or data
 */
async function getAllCitiesDetails() {
  const PromiseToGetAllCity = new Promise(async (resolve, reject) => {
    try {
      let getAllCitiesResponse = await fetch(
        `http://localhost:8088/all-timezone-cities`,
        {
          method: "GET",
          Headers: {
            Accept: "application.json",
            "Content-Type": "application/json",
          },
        }
      );
      resolve(getAllCitiesResponse.json());
    } catch (error) {
      reject(error);
    }
  });
  return PromiseToGetAllCity;
}

/**
 * this function gets invoked when we need to convert the object of object to array of object
 *
 * @param {Array} arr - array
 * @param {string} key - key value of an object
 * @return {void}
 */
const arrayToObject = (arr, key) => {
  return arr.reduce((obj, item) => {
    obj[item[key].toLowerCase()] = item;
    return obj;
  }, {});
};

/**
 * this function gets invoked when the temperature array is neeeded
 *
 * @param {object} cityValue - consists of the city name and time
 * @return {Array} - returns the temperature array
 */
const getNextNHours = async (cityValue) => {
  let individualCityDetail = await getIndividualCityDetails(cityValue);
  individualCityDetail.hours = 6;
  let getNextNHoursOfSelectedCity = await postCityDetails(individualCityDetail);
  return getNextNHoursOfSelectedCity.temperature;
};

/**
 * this function will get invoked if we want to create a object of object of cities
 *
 * @param {} - nothing
 * @return {void}
 */
const getAllCityDetailsWithNextNHoursAndUpdate = async () => {
  let getAllCities = await getAllCitiesDetails();
  let individualCityDetail = await getIndividualCityDetails(
    document.getElementById("select").value
  );
  individualCityDetail.hours = 6;
  let allCityObject = arrayToObject(getAllCities, "cityName");
  getDataForProcessingHourlyWeather(allCityObject);
  getDataForProcessingCards(allCityObject);
  getDataForProcessingTiles(allCityObject);
  mainContainer.classList.remove("main-container-hidden");
  mainContainer.classList.add("main-container-visible");
  document.body.classList.remove("loading-visible");
  document.body.classList.add("loading-hidden");
};
window.onload = getAllCityDetailsWithNextNHoursAndUpdate();
(function () {
  setInterval(getAllCityDetailsWithNextNHoursAndUpdate, 14400000);
})();
