import { forceUppercase} from '../../../utils/formatters.js'

// src/system_plz/cameras/nova-camera/nova-camera.js
const API_URL = 'http://localhost:5000/api';


const form = document.getElementById('form-nova-camera');
const messageContainer = document.getElementById('message-container');
const pageTitle = document.querySelector('h1');
const submitButton = form.querySelector('button[type="submit"]');
const idInput = document.getElementById('id');
const bairroInput = document.getElementById('bairro');
const zonaInput = document.getElementById('zona');
const localInput = document.getElementById('local');

// Variáveis para controlar o modo da página
let isUpdateMode = false;
let cameraToUpdateId = null;

/**
 * Função que roda quando a página carrega para verificar o modo.
 */
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  cameraToUpdateId = urlParams.get('id');

  bairroInput.addEventListener('input', forceUppercase);
  zonaInput.addEventListener('input', forceUppercase);
  localInput.addEventListener('input', forceUppercase);

  if (cameraToUpdateId) {
    isUpdateMode = true;
    initializeUpdateMode();
  }
});

/**
 * Prepara a página para o modo de atualização.
 */
async function initializeUpdateMode() {
  pageTitle.textContent = 'Atualizar Câmera';
  submitButton.textContent = 'Salvar Alterações';
  
  try {
    const response = await axios.get(`${API_URL}/cameras/${cameraToUpdateId}`);
    const camera = response.data;
    
    // Preenche o formulário com os dados existentes
    idInput.value = camera.id;
    idInput.readOnly = true; // Torna o campo de ID não editável
    idInput.style.backgroundColor = '#eee';
    document.getElementById('bairro').value = camera.bairro;
    document.getElementById('zona').value = camera.zona;
    document.getElementById('local').value = camera.local;

  } catch (error) {
    showMessage('Não foi possível carregar os dados da câmera para edição.', 'error');
  }
}

/**
 * Lida com o envio do formulário para criar ou atualizar.
 */
async function handleFormSubmit(event) {
  event.preventDefault();
  messageContainer.innerHTML = '';

  const cameraData = {
    // O ID não é enviado no corpo da requisição PUT/POST se ele for auto-increment,
    // mas como o seu schema atual pede, vamos mantê-lo.
    id: parseInt(idInput.value, 10),
    bairro: document.getElementById('bairro').value,
    zona: document.getElementById('zona').value,
    local: document.getElementById('local').value,
  };

  try {
    let response;
    if (isUpdateMode) {
      // MODO ATUALIZAR: Faz uma requisição PUT
      response = await axios.put(`${API_URL}/cameras/${cameraToUpdateId}`, cameraData);
      showMessage('Câmera atualizada com sucesso!', 'success');
    } else {
      // MODO CRIAR: Faz uma requisição POST
      response = await axios.post(`${API_URL}/cameras`, cameraData);
      showMessage('Câmera cadastrada com sucesso!', 'success');
    }

    form.reset();
    setTimeout(() => {
      window.location.href = '../'; // Volta para a lista de câmeras
    }, 2000);

  } catch (error) {
    // Tratamento de erro unificado
    if (error.response && error.response.data.errors) {
      const errorMessages = error.response.data.errors.map(e => e.message).join('<br>');
      showMessage(errorMessages, 'error');
    } else {
      showMessage('Ocorreu um erro. Tente novamente.', 'error');
    }
  }
}

function showMessage(message, type) {
  messageContainer.innerHTML = `<div class="message ${type}">${message}</div>`;
}

form.addEventListener('submit', handleFormSubmit);