import {maskPlaca, forceUppercase, cleanInput} from '../../utils/formatters.js';

import {API_URL} from '../../config.js';
const form = document.getElementById('form-veiculo');
const listContainer = document.getElementById('veiculo-list-container');
const messageContainer = document.getElementById('message-container');
const pageTitle = document.querySelector('h1');
const formTitle = document.querySelector('#form-section h3');
const submitButton = form.querySelector('button');

const placaInput = document.getElementById('placa');
const marcaModeloInput = document.getElementById('marca_modelo');

let autuadoId = null;
let isUpdateMode = false;

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  autuadoId = urlParams.get('autuadoId');
  if (!autuadoId) {
    pageTitle.textContent = "ID do Autuado não encontrado!";
    return;
  }

  placaInput.addEventListener('input', maskPlaca);
  marcaModeloInput.addEventListener('input', forceUppercase);

  document.getElementById('autuado_id').value = autuadoId;
  pageTitle.textContent = `Veículos do Autuado #${autuadoId}`;
  fetchVeiculos();
});

async function fetchVeiculos() {
  try {
    const { data: veiculos } = await axios.get(`${API_URL}/autuados/${autuadoId}/veiculos`);
    renderVeiculos(veiculos);
  } catch (error) {
    listContainer.innerHTML = `<p class="error-message">Erro ao buscar veículos.</p>`;
  }
}

function renderVeiculos(veiculos) {
  listContainer.innerHTML = '<h3>Veículos Cadastrados</h3>';
  if (veiculos.length === 0) {
    listContainer.innerHTML += '<p>Nenhum veículo cadastrado para este autuado.</p>';
    return;
  }
  veiculos.forEach(v => {
    const item = document.createElement('div');
    item.className = 'veiculo-item';
    item.innerHTML = `
      <div>
        <p><strong>Placa:</strong> ${v.placa}</p>
        <p><strong>Marca/Modelo:</strong> ${v.marca_modelo || 'N/A'}</p>
      </div>
      <div class="actions">
        <button class="button small btn-edit" data-id="${v.id}" data-placa="${v.placa}" data-modelo="${v.marca_modelo || ''}">Editar</button>
        <button class="button small danger btn-delete" data-id="${v.id}">Deletar</button>
      </div>
    `;
    listContainer.appendChild(item);
  });
}

function enterEditMode(id, placa, modelo) {
  isUpdateMode = true;
  formTitle.textContent = `Editando Veículo (Placa: ${placa})`;
  submitButton.textContent = 'Salvar Alterações';
  document.getElementById('veiculo_id').value = id;
  document.getElementById('placa').value = placa;
  document.getElementById('marca_modelo').value = modelo;

  placaInput.dispatchEvent(new Event('input'));

  window.scrollTo(0, document.body.scrollHeight); // Rola para o formulário
}

function resetForm() {
  isUpdateMode = false;
  form.reset();
  formTitle.textContent = 'Adicionar Novo Veículo';
  submitButton.textContent = 'Adicionar Veículo';
  document.getElementById('veiculo_id').value = '';
  document.getElementById('autuado_id').value = autuadoId;
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const veiculoData = {
    autuado_id: parseInt(autuadoId),
    placa: cleanInput(placaInput.value),
    marca_modelo: document.getElementById('marca_modelo').value,
  };

  try {
    if (isUpdateMode) {
      const veiculoId = document.getElementById('veiculo_id').value;
      await axios.put(`${API_URL}/veiculos/${veiculoId}`, veiculoData);
      showMessage('Veículo atualizado com sucesso!', 'success');
    } else {
      await axios.post(`${API_URL}/veiculos`, veiculoData);
      showMessage('Veículo adicionado com sucesso!', 'success');
    }
    resetForm();
    fetchVeiculos();
  } catch (error) {
    const errorMsg = error.response?.data?.message || 'Ocorreu um erro.';
    showMessage(errorMsg, 'error');
  }
}

async function handleDelete(id) {
  if (!window.confirm("Tem certeza que deseja deletar este veículo?")) return;
  try {
    await axios.delete(`${API_URL}/veiculos/${id}`);
    fetchVeiculos(); // Recarrega a lista
  } catch (error) {
    showMessage('Erro ao deletar veículo.', 'error');
  }
}

function showMessage(message, type) {
  messageContainer.innerHTML = `<div class="message ${type}">${message}</div>`;
  setTimeout(() => messageContainer.innerHTML = '', 3000);
}

listContainer.addEventListener('click', e => {
  if (e.target.classList.contains('btn-delete')) {
    handleDelete(e.target.dataset.id);
  }
  if (e.target.classList.contains('btn-edit')) {
    const { id, placa, modelo } = e.target.dataset;
    enterEditMode(id, placa, modelo);
  }
});

form.addEventListener('submit', handleFormSubmit);