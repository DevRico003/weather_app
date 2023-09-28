var weatherApi = "/weather";
const weatherForm = document.querySelector("form");

const search = document.querySelector("input");

const weatherIcon = document.querySelector(".weatherIcon i");

const weatherCondition = document.querySelector(".weatherCondition");

const tempElement = document.querySelector(".temperature span");

const humidityElement = document.querySelector(".humidity span");

const atmospherePressureElement = document.querySelector(".atmospherePressure span");

const locationElement = document.querySelector(".place");

const tempElementCelsius = document.getElementById("tempElementCelsius");
const tempElementFahrenheit = document.getElementById("tempElementFahrenheit");

let currentTempMode = "C"

const dateElement = document.querySelector(".date");
const currentDate = new Date();
const options = { month: "long" };
const monthName = currentDate.toLocaleString("en-US", options);
const year = currentDate.getFullYear()
dateElement.textContent = new Date().getDate() + "." + monthName + " " + year;

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //   console.log(search.value);
  locationElement.textContent = "Loading...";
  weatherIcon.className = "";
  tempElement.textContent = "";
  weatherCondition.textContent = "";

  showData(search.value);
});

document.querySelector(".toggleTemp-button").addEventListener("click", function() {
  if (currentTempMode === "C") {
    currentTempMode = "F";
    this.textContent = "Celsius";
  } else {
    currentTempMode = "C";
    this.textContent = "Fahrenheit";
  }
  updateTemperatureDisplay();
});

function showData(city) {
  getWeatherData(city, (result) => {
    console.log(result);
    if (result.cod == 200) {
      const tempCelsius = (result?.main?.temp - 273.15).toFixed(2);
      const tempFahrenheit = ((tempCelsius * 9/5) + 32).toFixed(2);

      // Zeigt den Button an, sobald Daten für eine Stadt erhalten wurden
      document.querySelector(".toggleTemp-button").style.display = "block"

      if (
        result.weather[0].description == "rain" ||
        result.weather[0].description == "fog"
      ) {
        weatherIcon.className = "wi wi-day-" + result.description;
      } else {
        weatherIcon.className = "wi wi-day-cloudy";
      }

      locationElement.textContent = result?.name;

      document.querySelector(".tempElementCelsius span").textContent = tempCelsius + "°C";
      document.querySelector(".tempElementFahrenheit span").textContent = tempFahrenheit + "°F";

      updateTemperatureDisplay();
      
      weatherCondition.textContent =
        result?.weather[0]?.description?.toUpperCase();
    } else {
      locationElement.textContent = "Stadt wurde nicht gefunden.";
    }
  });
}

function updateTemperatureDisplay() {
  const tempElementCelsiusDiv = document.querySelector(".tempElementCelsius");
  const tempElementFahrenheitDiv = document.querySelector(".tempElementFahrenheit");

  if (currentTempMode === "C") {
    tempElementCelsiusDiv.style.display = "block";
    tempElementFahrenheitDiv.style.display = "none";
  } else {
    tempElementCelsiusDiv.style.display = "none";
    tempElementFahrenheitDiv.style.display = "block";
  }
}

function getWeatherData(city, callback) {
  const locationApi = weatherApi + "?address=" + city;
  fetch(locationApi).then((response) => {
    response.json().then((response) => {
      callback(response);
    });
  });
}
