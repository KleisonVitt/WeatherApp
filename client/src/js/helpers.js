// client/src/js/helerps.js
let currentUnit = "C"; // Unidade padrão: Celsius

export function setTemperatureUnit(unit) {
  currentUnit = unit; // "C" ou "F"
}

export function getTemperatureUnit() {
  return currentUnit;
}

export function formatTemperature(tempC) {
  if (currentUnit === "C") {
    return Math.round(tempC) + "°C";
  } else {
    // converter para Fahrenheit
    return Math.round((tempC * 9) / 5 + 32) + "°F";
  }
}

export function convertTemperature(temp, toUnit) {
  if (toUnit === "C") return ((temp - 32) * 5) / 9;
  if (toUnit === "F") return (temp * 9) / 5 + 32;
  return temp;
}
