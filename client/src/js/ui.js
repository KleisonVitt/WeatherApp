// src/js/ui.js
import { formatTemperature } from "./helpers.js";

export function updateWeatherUI(data) {
  const cityElement = document.querySelector(".city");
  const conditionElement = document.querySelector(".current-condition");
  const tempElement = document.querySelector(".current-temp");
  const minElement = document.querySelector(".min-temp");
  const maxElement = document.querySelector(".max-temp");

  const windElement = document.querySelector(".wind");
  const humidityElement = document.querySelector(".humidity");
  const precipprobElement = document.querySelector(".precipprob");
  const mainIconElement = document.querySelector(".icon-day");

  if (!data || !data.currentConditions) {
    console.log("data ou data.currentConditions não encontrados");
    return;
  }

  // --- Atualiza informações do clima atual ---
  const cityName = data.address || "";
  const current = data.currentConditions;
  const today = data.days[0];

  cityElement.textContent = capitalizeSentence(cityName);
  conditionElement.textContent = current.conditions;
  tempElement.textContent = formatTemperature(current.temp);
  minElement.textContent = formatTemperature(today.tempmin);
  maxElement.textContent = formatTemperature(today.tempmax);

  windElement.textContent = today.windspeed;
  humidityElement.textContent = today.humidity;
  precipprobElement.textContent = today.precipprob;

  const icon = getWeatherEmoji(current.icon);
  mainIconElement.textContent = icon;

  updateWeeklyForecast(data.days);
}

export function showLoading() {
  const cityElement = document.querySelector(".city");
  cityElement.textContent = "Carregando...";
}

export function showError(message) {
  const cityElement = document.querySelector(".city");
  cityElement.textContent = "Erro: " + message;
}

function capitalizeSentence(string) {
  if (!string) return "";

  const ignoreWords = [
    "de",
    "do",
    "da",
    "dos",
    "das",
    "em",
    "no",
    "na",
    "nos",
    "nas",
    "a",
    "e",
    "o",
    "os",
    "as",
    "com",
    "por",
    "para",
    "um",
    "uma",
    "uns",
    "umas",
  ];

  const words = string.toLowerCase().split(" ");

  return words
    .map((word, index) => {
      if (index === 0 || !ignoreWords.includes(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(" ");
}

export function updateWeeklyForecast(days) {
  const cards = document.querySelectorAll(".day-card");
  const nextDays = days.slice(1, cards.length + 1);

  nextDays.forEach((day, i) => {
    const card = cards[i];
    if (!card) return;

    const icon = card.querySelector(".icon");
    const min = card.querySelector(".min");
    const max = card.querySelector(".max");
    const name = card.querySelector(".day-name");

    const date = new Date(day.datetime);
    const weekday = date
      .toLocaleDateString("en-US", { weekday: "short" })
      .toUpperCase();

    icon.textContent = getWeatherEmoji(day.icon);
    min.textContent = formatTemperature(day.tempmin);
    max.textContent = formatTemperature(day.tempmax);
    name.textContent = weekday;
  });
}

function getWeatherEmoji(icon) {
  const map = {
    "clear-day": "☀️",
    "clear-night": "🌙",
    "partly-cloudy-day": "🌤️",
    "partly-cloudy-night": "🌥️",
    cloudy: "☁️",
    rain: "🌧️",
    snow: "❄️",
    wind: "💨",
    fog: "🌫️",
  };
  return map[icon] || "❔";
}
