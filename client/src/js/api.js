// src/js/api.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getWeatherByCity(city) {
  if (!city || city.length < 2) throw new Error("Cidade inválida");

  const response = await fetch(
    `${API_BASE_URL}/weather?city=${encodeURIComponent(city)}`,
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erro ao buscar clima: ${errText}`);
  }

  return response.json();
}

export async function getWeatherMockData() {
  const response = await fetch(`${API_BASE_URL}/weather/mock`);

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erro ao buscar mock: ${errText}`);
  }

  return await response.json();
}
