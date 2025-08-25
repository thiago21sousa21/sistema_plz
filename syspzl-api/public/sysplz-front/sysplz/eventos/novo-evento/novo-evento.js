import {forceUppercase, maskPlaca, cleanInput, maskOnlyNumbers} from '../../../utils/formatters.js';

import {API_URL} from '../../../config.js';
const form = document.getElementById('form-novo-evento');
const messageContainer = document.getElementById('message-container');
const pageTitle = document.querySelector('h1');
const submitButton = form.querySelector('button');
let isUpdateMode = false;
let eventoToUpdateId = null;

const provenienciaInput = document.getElementById('proveniencia');
const placaInput = document.getElementById('placa');
const descricaoInput = document.getElementById('descricao');
const localInput = document.getElementById('local');
const tipoVeiculoInput = document.getElementById('tipo_veiculo');
const fiscalInput = document.getElementById('fiscal_id');
const cameraInput = document.getElementById('camera_id');

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  eventoToUpdateId = urlParams.get('id');

  placaInput.addEventListener('input', maskPlaca);
  [provenienciaInput, descricaoInput, localInput, tipoVeiculoInput].forEach(input => {
    input.addEventListener('input', forceUppercase);
  });
  fiscalInput.addEventListener('input', (event) => {
    forceUppercase(event); // Primeiro, aplica a caixa alta
    event.target.value = cleanInput(event.target.value); // Depois, limpa o valor
  });
  cameraInput.addEventListener('input', maskOnlyNumbers);


  if (eventoToUpdateId) {
    isUpdateMode = true;
    initializeUpdateMode();
  }
});

async function initializeUpdateMode() {
  pageTitle.textContent = 'Atualizar Evento';
  submitButton.textContent = 'Salvar Alterações';
  try {
    const response = await axios.get(`${API_URL}/eventos/${eventoToUpdateId}`);
    const evento = response.data;
    document.getElementById('momento').value = evento.momento.slice(0, 16);
    document.getElementById('proveniencia').value = evento.proveniencia;
    document.getElementById('placa').value = evento.placa || '';
    document.getElementById('descricao').value = evento.descricao || '';
    document.getElementById('local').value = evento.local || '';
    document.getElementById('e_infracao').checked = evento.e_infracao;
    document.getElementById('consultado').checked = evento.consultado;
    document.getElementById('feito').checked = evento.feito;
    document.getElementById('tipo_veiculo').value = evento.tipo_veiculo || '';
    document.getElementById('fiscal_id').value = evento.fiscal_id;
    document.getElementById('camera_id').value = evento.camera_id || '';
  } catch (error) {
    showMessage('Não foi possível carregar os dados do evento.', 'error');
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const eventoData = {
    momento: new Date(document.getElementById('momento').value).toISOString(),
    proveniencia: document.getElementById('proveniencia').value,
    placa: cleanInput(document.getElementById('placa').value),
    descricao: document.getElementById('descricao').value,
    local: document.getElementById('local').value,
    e_infracao: document.getElementById('e_infracao').checked,
    consultado: document.getElementById('consultado').checked,
    feito: document.getElementById('feito').checked,
    tipo_veiculo: document.getElementById('tipo_veiculo').value,
    fiscal_id: parseInt(document.getElementById('fiscal_id').value),
    camera_id: document.getElementById('camera_id').value ? parseInt(document.getElementById('camera_id').value) : null,
  };

  try {
    if (isUpdateMode) {
      await axios.put(`${API_URL}/eventos/${eventoToUpdateId}`, eventoData);
      showMessage('Evento atualizado com sucesso!', 'success');
    } else {
      await axios.post(`${API_URL}/eventos`, eventoData);
      showMessage('Evento cadastrado com sucesso!', 'success');
    }
    setTimeout(() => { window.location.href = '../'; }, 2000);
  } catch (error) {
    // --- BLOCO DE ERRO ATUALIZADO ---
    let displayMessage = 'Ocorreu um erro inesperado.'; // Mensagem padrão

    if (error.response && error.response.data) {
      const errorData = error.response.data;

      // Verifica se o erro veio da validação do Joi (que tem um array 'errors')
      if (errorData.errors && Array.isArray(errorData.errors)) {
        displayMessage = errorData.errors.map(e => e.message).join('<br>');
      } 
      // Verifica se o erro veio do nosso serviço (que tem uma propriedade 'message')
      else if (errorData.message) {
        displayMessage = errorData.message;
      }
    } else if (error.request) {
      // Erro de rede, a API não respondeu
      displayMessage = 'Não foi possível conectar à API. Verifique o servidor.';
    }

    // Exibe a mensagem de erro formatada
    showMessage(displayMessage, 'error');
    console.error("Detalhes do erro:", error); // Mantém o log no console para debug
  }
}

function showMessage(message, type) {
  messageContainer.innerHTML = `<div class="message ${type}">${message}</div>`;
}

form.addEventListener('submit', handleFormSubmit);