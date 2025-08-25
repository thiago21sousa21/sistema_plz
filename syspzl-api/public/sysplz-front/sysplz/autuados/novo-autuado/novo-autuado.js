// --- 1. IMPORTE AS NOVAS FUNÇÕES ---
// O caminho '../..' sobe duas pastas para chegar na raiz de `src/`
import { maskCpfCnpj, forceUppercase, cleanInput } from '../../../utils/formatters.js';
import {API_URL} from '../../../config.js';

const form = document.getElementById('form-novo-autuado');
const messageContainer = document.getElementById('message-container');
const pageTitle = document.querySelector('h1');
const submitButton = form.querySelector('button');

// --- 2. SELECIONE OS INPUTS QUE PRECISAM DE FORMATAÇÃO ---
const autorInput = document.getElementById('autor');
const cpfCnpjInput = document.getElementById('cpf_cnpj');

let isUpdateMode = false;
let autuadoToUpdateId = null;

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  autuadoToUpdateId = urlParams.get('id');
  
  // --- 3. ADICIONE OS EVENT LISTENERS PARA AS MÁSCARAS E FORMATAÇÕES ---
  autorInput.addEventListener('input', forceUppercase);
  cpfCnpjInput.addEventListener('input', maskCpfCnpj);

  if (autuadoToUpdateId) {
    isUpdateMode = true;
    initializeUpdateMode();
  }
});

async function initializeUpdateMode() {
  pageTitle.textContent = 'Atualizar Autuado';
  submitButton.textContent = 'Salvar Alterações';
  try {
    const { data: autuado } = await axios.get(`${API_URL}/autuados/${autuadoToUpdateId}`);
    autorInput.value = autuado.autor;
    // Dispara o evento de input para formatar o valor carregado
    cpfCnpjInput.value = autuado.cpf_cnpj;
    cpfCnpjInput.dispatchEvent(new Event('input'));
    document.getElementById('fiscal_id').value = autuado.fiscal_id || '';
  } catch (error) {
    showMessage('Não foi possível carregar os dados do autuado.', 'error');
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();
  
  // --- 4. LIMPE OS DADOS ANTES DE ENVIAR PARA A API ---
  const autuadoData = {
    autor: autorInput.value, // O nome já está em maiúsculas
    cpf_cnpj: cleanInput(cpfCnpjInput.value), // Remove a máscara
    fiscal_id: document.getElementById('fiscal_id').value ? parseInt(document.getElementById('fiscal_id').value) : null,
  };

  try {
    if (isUpdateMode) {
      await axios.put(`${API_URL}/autuados/${autuadoToUpdateId}`, autuadoData);
      showMessage('Autuado atualizado com sucesso!', 'success');
    } else {
      await axios.post(`${API_URL}/autuados`, autuadoData);
      showMessage('Autuado cadastrado com sucesso!', 'success');
    }
    setTimeout(() => { window.location.href = '../'; }, 2000);
  } catch (error) {
    const errorMsg = error.response?.data?.message || 'Ocorreu um erro.';
    showMessage(errorMsg, 'error');
  }
}

function showMessage(message, type) {
  messageContainer.innerHTML = `<div class="message ${type}">${message}</div>`;
  // Removi o timeout para que a mensagem de erro não suma
}

form.addEventListener('submit', handleFormSubmit);