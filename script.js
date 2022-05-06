const input = document.querySelector(".weather__input");
const form = document.querySelector(".weahter__form");
const cardImg = document.querySelector(".weather__icon");
const cardGrad = document.querySelector(".weather__grad");
const cardMaxMin = document.querySelector(".weather__max-min");
const cardHumidity = document.querySelector(".weather__humidity");
const cardCity = document.querySelector(".weather__city");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  cardCity.textContent = input.value;
  weather(input.value);
});

function weather(city) {
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=32ffbabacb8762d60cdf100eaa4bd07e`,
    { mode: "cors" }
  )
    .then((parse) => {
      return parse.json();
    })

    .then((data) => {
      return data[0];
    })

    .then((dataFirstChild) => {
      const lat = dataFirstChild.lat;
      const lon = dataFirstChild.lon;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=32ffbabacb8762d60cdf100eaa4bd07e`,
        { mode: "cors" }
      )
        .then((data) => {
          return data.json();
        })
        .then((card) => {
          const icon = `https://openweathermap.org/img/wn/${card.weather[0].icon}@2x.png`;
          cardImg.src = icon;
          const temp = card.main.temp;
          const tempMax = card.main["temp_max"];
          const tempMin = card.main["temp_min"];
          const humidity = card.main.humidity;
          cardGrad.textContent = Math.round(temp - 273.15) + "°C";
          cardMaxMin.textContent = `Макс.${Math.round(
            tempMax - 273.15
          )}°C, Мин.${Math.round(tempMin - 273.15)}°C`;
          cardHumidity.textContent = `Влажность: ${humidity}%`;
        });
    });
}

weather("Moscow");
cardCity.textContent = "Москва";
