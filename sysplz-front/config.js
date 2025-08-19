/**
 * Detecta automaticamente o endereço e monta a URL da API.
 * Funciona tanto em 'localhost' quanto no IP da sua rede local.
 */

const hostname = window.location.hostname;
const API_PORT = 5000; // Altere aqui se a porta da sua API for diferente

// Monta e exporta a URL completa da API
export const API_URL = `http://${hostname}:${API_PORT}/api`;

console.log("API URL configurada para:", API_URL);