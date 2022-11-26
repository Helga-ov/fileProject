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

function dCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".city2");
  let searCity = cityInput.value;
  let apiKey = "d2f8357c65447d4cec2a7942b9dfdd3d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

let citySearch1 = document.querySelector("#searchForm");
citySearch1.addEventListener("submit", dCity);

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
}
