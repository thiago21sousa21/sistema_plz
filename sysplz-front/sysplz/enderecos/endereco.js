import {maskCep, forceUppercase, cleanInput} from '../../utils/formatters.js';

const API_URL = 'http://localhost:5000/api';
const form = document.getElementById('form-endereco');
const displaySection = document.getElementById('display-endereco');
const messageContainer = document.getElementById('message-container');
const pageTitle = document.querySelector('h1');

const cepInput = document.getElementById('cep');
const estadoInput = document.getElementById('estado');
const cidadeInput = document.getElementById('cidade');
const bairroInput = document.getElementById('bairro');
const logradouroInput = document.getElementById('logradouro');
const numeroInput = document.getElementById('numero');
const complementoInput = document.getElementById('complemento');

let autuadoId = null;
let enderecoId = null;
let isUpdateMode = false;

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  autuadoId = urlParams.get('autuadoId');
  if (!autuadoId) {
    pageTitle.textContent = "ID do Autuado não encontrado!";
    return;
  }

  cepInput.addEventListener('input', maskCep);
  [estadoInput, cidadeInput, bairroInput, logradouroInput, complementoInput].forEach(input => {input.addEventListener('input', forceUppercase)});

  document.getElementById('autuado_id').value = autuadoId;
  pageTitle.textContent = `Endereço do Autuado #${autuadoId}`;
  fetchEndereco();
});

async function fetchEndereco() {
  try {
    const { data: endereco } = await axios.get(`${API_URL}/autuados/${autuadoId}/endereco`);
    enderecoId = endereco.id;
    isUpdateMode = true;
    displayEndereco(endereco);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      showForm(); // Nenhum endereço encontrado, mostra o formulário para criar
    } else {
      showMessage('Erro ao buscar endereço.', 'error');
    }
  }
}

function displayEndereco(endereco) {
  displaySection.innerHTML = `
    <h3>Endereço Cadastrado</h3>
    <p><strong>CEP:</strong> ${endereco.cep}</p>
    <p><strong>Logradouro:</strong> ${endereco.logradouro || 'N/A'}, ${endereco.numero || 'S/N'}</p>
    <p><strong>Bairro:</strong> ${endereco.bairro || 'N/A'} - ${endereco.cidade}/${endereco.estado}</p>
    <p><strong>Complemento:</strong> ${endereco.complemento || 'N/A'}</p>
    <div class="actions">
      <button id="btn-update" class="button">Atualizar</button>
      <button id="btn-delete" class="button danger">Deletar</button>
    </div>
  `;
  displaySection.classList.remove('hidden');
  document.getElementById('btn-update').addEventListener('click', () => showForm(endereco));
  document.getElementById('btn-delete').addEventListener('click', handleDelete);
}

function showForm(endereco = {}) {
  displaySection.classList.add('hidden');
  form.classList.remove('hidden');
  // Preenche o formulário se estiver no modo de atualização
  document.getElementById('cep').value = endereco.cep || '';
  document.getElementById('estado').value = endereco.estado || '';
  document.getElementById('cidade').value = endereco.cidade || '';
  document.getElementById('bairro').value = endereco.bairro || '';
  document.getElementById('logradouro').value = endereco.logradouro || '';
  document.getElementById('numero').value = endereco.numero || '';
  document.getElementById('complemento').value = endereco.complemento || '';
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const enderecoData = {
    autuado_id: parseInt(autuadoId),
    cep: cepInput(cepInput.value),
    estado: document.getElementById('estado').value,
    cidade: document.getElementById('cidade').value,
    bairro: document.getElementById('bairro').value,
    logradouro: document.getElementById('logradouro').value,
    numero: document.getElementById('numero').value,
    complemento: document.getElementById('complemento').value,
  };

  try {
    if (isUpdateMode) {
      await axios.put(`${API_URL}/enderecos/${enderecoId}`, enderecoData);
    } else {
      await axios.post(`${API_URL}/enderecos`, enderecoData);
    }
    showMessage('Endereço salvo com sucesso!', 'success');
    setTimeout(() => location.reload(), 1500);
  } catch (error) {
    const errorMsg = error.response?.data?.message || 'Ocorreu um erro ao salvar.';
    showMessage(errorMsg, 'error');
  }
}

async function handleDelete() {
  if (!window.confirm("Tem certeza que deseja deletar este endereço?")) return;
  try {
    await axios.delete(`${API_URL}/enderecos/${enderecoId}`);
    showMessage('Endereço deletado com sucesso!', 'success');
    setTimeout(() => location.reload(), 1500);
  } catch (error) {
    showMessage('Erro ao deletar endereço.', 'error');
  }
}

function showMessage(message, type) {
  messageContainer.innerHTML = `<div class="message ${type}">${message}</div>`;
  setTimeout(() => messageContainer.innerHTML = '', 3000);
}

form.addEventListener('submit', handleFormSubmit);