import "../src/index.css";
import { setupSearchEvent } from "./js/event.js";
import { setTemperatureUnit, getTemperatureUnit } from "./js/helpers.js";
import { updateWeatherUI } from "./js/ui.js";

let currentWeatherData = null;

export function setCurrentWeatherData(data) {
  currentWeatherData = data;
}

// Passa a função como parâmetro
setupSearchEvent(setCurrentWeatherData);

// --- Seleção de unidade de temperatura ---
const btnF = document.getElementById("unit-f");
const btnC = document.getElementById("unit-c");

function updateUnitUI() {
  // Atualiza a UI com a temperatura na unidade atual
  if (currentWeatherData) {
    updateWeatherUI(currentWeatherData);
  }

  // Atualiza bold nos botões
  if (getTemperatureUnit() === "C") {
    btnC.classList.add("font-bold");
    btnF.classList.remove("font-bold");
  } else {
    btnF.classList.add("font-bold");
    btnC.classList.remove("font-bold");
  }
}

btnC.addEventListener("click", () => {
  setTemperatureUnit("C");
  updateUnitUI();
});

btnF.addEventListener("click", () => {
  setTemperatureUnit("F");
  updateUnitUI();
});
