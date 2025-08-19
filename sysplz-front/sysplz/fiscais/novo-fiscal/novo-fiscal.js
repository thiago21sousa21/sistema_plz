import {forceUppercase} from '../../../utils/formatters.js';

import {API_URL} from '../../../config.js';
const form = document.getElementById('form-novo-fiscal');
const messageContainer = document.getElementById('message-container');
const pageTitle = document.querySelector('h1');
const submitButton = form.querySelector('button[type="submit"]');
const idInput = document.getElementById('id');
const matriculaInput = document.getElementById('matricula');
const codigoInput = document.getElementById('codigo');
const nomeInput = document.getElementById('nome');

let isUpdateMode = false;
let fiscalToUpdateId = null;

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  fiscalToUpdateId = urlParams.get('id');

  matriculaInput.addEventListener('input', forceUppercase);
  codigoInput.addEventListener('input', forceUppercase); 
  nomeInput.addEventListener('input', forceUppercase);

  if (fiscalToUpdateId) {
    isUpdateMode = true;
    initializeUpdateMode();
  }
});

async function initializeUpdateMode() {
  pageTitle.textContent = 'Atualizar Fiscal';
  submitButton.textContent = 'Salvar Alterações';
  
  try {
    const response = await axios.get(`${API_URL}/fiscais/${fiscalToUpdateId}`);
    const fiscal = response.data;
    
    idInput.value = fiscal.id;
    idInput.readOnly = true;
    idInput.style.backgroundColor = '#eee';
    document.getElementById('nome').value = fiscal.nome;
    document.getElementById('matricula').value = fiscal.matricula || '';
    document.getElementById('codigo').value = fiscal.codigo || '';
  } catch (error) {
    showMessage('Não foi possível carregar os dados do fiscal.', 'error');
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const fiscalData = {
    id: parseInt(idInput.value, 10),
    nome: document.getElementById('nome').value,
    matricula: document.getElementById('matricula').value,
    codigo: document.getElementById('codigo').value,
  };

  try {
    let response;
    if (isUpdateMode) {
      response = await axios.put(`${API_URL}/fiscais/${fiscalToUpdateId}`, fiscalData);
      showMessage('Fiscal atualizado com sucesso!', 'success');
    } else {
      response = await axios.post(`${API_URL}/fiscais`, fiscalData);
      showMessage('Fiscal cadastrado com sucesso!', 'success');
    }
    setTimeout(() => { window.location.href = '../'; }, 2000);
  } catch (error) {
    const errorMsg = error.response?.data?.errors?.map(e => e.message).join('<br>') || 'Ocorreu um erro.';
    showMessage(errorMsg, 'error');
  }
}

function showMessage(message, type) {
  messageContainer.innerHTML = `<div class="message ${type}">${message}</div>`;
}

form.addEventListener('submit', handleFormSubmit);