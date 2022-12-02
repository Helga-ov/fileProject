let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let now = days[date.getDay()];
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let dateNow = document.querySelector("#currentTime");
dateNow.innerHTML = `${now} ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="80"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}°/ </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let citySearch1 = document.querySelector("#searchForm");
citySearch1.addEventListener("submit", search);

function displayTemperature(response) {
  let curTemp = document.querySelector("#temperature");
  curTemp.innerHTML = `${Math.round(response.data.main.temp)}°C`;

  let curLocation = document.querySelector("#lc");
  curLocation.innerHTML = response.data.name;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;

  let minTemperature = document.querySelector("#minTemp");
  minTemperature.innerHTML = `${Math.round(response.data.main.temp_min)}°C`;

  let maxTemperature = document.querySelector("#maxTemp");
  maxTemperature.innerHTML = `${Math.round(response.data.main.temp_max)}°C`;

  let feelLike = document.querySelector("#feelsLike");
  feelLike.innerHTML = `${Math.round(response.data.main.feels_like)}°C`;

  let iconElement = document.querySelector("#icon1");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let description1 = document.querySelector("#description");
  description1.innerHTML = response.data.weather[0].description;

  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "d2f8357c65447d4cec2a7942b9dfdd3d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handlSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector(".city2");
  search(cityInputElement.value);
}

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handlSubmit);

search("Innsbruck");

function geoposition(position) {
  let apiKey = "d2f8357c65447d4cec2a7942b9dfdd3d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url1 = `${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(`${url1}`).then(displayTemperature);
}

function change(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(geoposition);
}

let currentCity = document.querySelector(".current");
currentCity.addEventListener("click", change);
