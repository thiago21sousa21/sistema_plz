import { maskCpfCnpj, cleanInput, forceUppercase } from '../../../utils/formatters.js';

const API_URL = 'http://localhost:5000/api';
let eventoId = null;

const formBusca = document.getElementById('form-busca-autuado');
const formNovo = document.getElementById('form-novo-autuado');
const buscaResultadoContainer = document.getElementById('busca-resultado');
const formNovoContainer = document.getElementById('form-novo-autuado-container');
const eventoContextoContainer = document.getElementById('evento-contexto');

document.addEventListener('DOMContentLoaded', () => {
    // Aplica máscaras e formatações
    document.getElementById('autor').addEventListener('input', forceUppercase);
    document.getElementById('cpf_cnpj_busca').addEventListener('input', maskCpfCnpj);
    document.getElementById('cpf_cnpj_novo').addEventListener('input', maskCpfCnpj);
    
    // Lógica principal
    const urlParams = new URLSearchParams(window.location.search);
    eventoId = urlParams.get('eventoId');
    if (!eventoId) { alert('ID do Evento não encontrado!'); return; }
    
    document.querySelector('h1').textContent += ` #${eventoId}`;
    fetchEventoContexto();

    formBusca.addEventListener('submit', handleBuscaSubmit);
    formNovo.addEventListener('submit', handleNovoAutuadoSubmit);
});

async function fetchEventoContexto() {
    try {
        const { data: evento } = await axios.get(`${API_URL}/eventos/${eventoId}`);
        eventoContextoContainer.innerHTML = `
            <p><strong>Placa do Veículo:</strong> ${evento.placa || 'Não informada'}</p>
            <p><strong>Descrição:</strong> ${evento.descricao || 'Nenhuma'}</p>
            <p><strong>Data:</strong> ${new Date(evento.momento).toLocaleString('pt-BR')}</p>
        `;
    } catch(err) {
        eventoContextoContainer.innerHTML = `<p class="error">Erro ao carregar dados do evento.</p>`;
    }
}

async function handleBuscaSubmit(e) {
  e.preventDefault();
  const cpfCnpj = cleanInput(document.getElementById('cpf_cnpj_busca').value);
  buscaResultadoContainer.innerHTML = `<p>Buscando...</p>`;
  try {
    const { data: autuado } = await axios.get(`${API_URL}/autuados/search?cpf_cnpj=${cpfCnpj}`);
    buscaResultadoContainer.innerHTML = `
        <p>Autuado encontrado: <strong>${autuado.autor}</strong></p>
        <button id="btn-vincular" class="button primary">Concluir Etapa</button>
    `;
    document.getElementById('btn-vincular').addEventListener('click', concluirEtapa);
  } catch (error) {
    buscaResultadoContainer.innerHTML = `<p>Nenhum autuado encontrado com este CPF/CNPJ.</p>`;
    formNovoContainer.classList.remove('hidden'); // Mostra o formulário de cadastro
    document.getElementById('cpf_cnpj_novo').value = document.getElementById('cpf_cnpj_busca').value;
  }
}

async function handleNovoAutuadoSubmit(e) {
  e.preventDefault();
  const autuadoData = {
    autor: document.getElementById('autor').value,
    cpf_cnpj: cleanInput(document.getElementById('cpf_cnpj_novo').value),
    fiscal_id: document.getElementById('fiscal_id').value ? parseInt(document.getElementById('fiscal_id').value) : null,
  };
  try {
    await axios.post(`${API_URL}/autuados`, autuadoData);
    await concluirEtapa();
  } catch (error) {
    alert(error.response?.data?.message || 'Erro ao criar autuado.');
  }
}

async function concluirEtapa() {
    try {
        await axios.put(`${API_URL}/eventos/${eventoId}/status`, { consultado: true });
        alert('Etapa concluída! O evento foi marcado como "Consultado".');
        window.location.href = '../'; // Volta para a lista de eventos
    } catch (error) {
        alert('Erro ao atualizar status do evento.');
    }
}