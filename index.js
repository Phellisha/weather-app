let now = new Date();

function formatDate() {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let weekDay = weekDays[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let day = now.getDate();
  let today = `It is ${weekDay}, ${month} ${day}, ${year} </br> ${hours}:${minutes}`;
  return today;
}
let p = document.querySelector("p.date");
p.innerHTML = formatDate();

//
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "imperial";
  let apiKey = "de748fd3bf1f61bb45b092b19a2fceca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}
&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
//
function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let description = document.querySelector("p.description");
  description.innerHTML = response.data.weather[0].description;
  let currentTemp = document.querySelector("span.now");
  currentTemp.innerHTML = `${temperature}°f`;
  let high = document.querySelector("div.high");
  high.innerHTML = `High: ${Math.round(response.data.main.temp_max)}°f`;
  let low = document.querySelector("div.low");
  low.innerHTML = `Low: ${Math.round(response.data.main.temp_min)}°f`;
  let wind = document.querySelector("div.wind");
  wind.innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)} mph`;
  let humidity = document.querySelector("div.humidity");
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
  let currentCity = document.querySelector(".current-city");
  currentCity.innerHTML = response.data.name;
}
navigator.geolocation.getCurrentPosition(showPosition);

function searchCity(city) {
  let apiKey = "de748fd3bf1f61bb45b092b19a2fceca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
//

function displayCity(event) {
  event.preventDefault();
  let input = document.querySelector("#change-city");
  let cityName = document.querySelector(".current-city");
  cityName.innerHTML = input.value;
  let city = input.value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", displayCity);
//
function currentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#location");
locationButton.addEventListener("click", currentPosition);
