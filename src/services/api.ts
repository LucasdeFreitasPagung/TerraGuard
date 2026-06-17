import axios from 'axios';

// API da NASA (Eventos Naturais Rastreáveis por Satélite)
export const nasaApi = axios.create({
  baseURL: 'https://eonet.gsfc.nasa.gov/api/v3',
});

// API de Clima
export const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: 'SUA_CHAVE_API_AQUI', // Lembre-se de criar uma conta no OpenWeather para pegar a chave
    units: 'metric',
    lang: 'pt_br'
  }
});