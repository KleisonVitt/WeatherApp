// src/js/events.js
import { getWeatherByCity, getWeatherMockData } from "./api.js";
import { updateWeatherUI, showLoading, showError } from "./ui.js";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export function setupSearchEvent(setCurrentWeatherData) {
  const input = document.getElementById("city-input");

  input.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      const city = input.value.trim();
      if (!city) return;

      showLoading();

      try {
        const data = USE_MOCK
          ? await getWeatherMockData()
          : await getWeatherByCity(city);

        setCurrentWeatherData?.(data); // atualiza o estado
        updateWeatherUI(data);
      } catch (err) {
        showError(err.message);
      }
    }
  });
}
