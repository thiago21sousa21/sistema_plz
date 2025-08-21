import { maskCpfCnpj, cleanInput, forceUppercase } from '../../../utils/formatters.js';

import {API_URL} from '../../../config.js';
let eventoId = null;

const formBusca = document.getElementById('form-busca-autuado');
const formNovo = document.getElementById('form-novo-autuado');
const buscaResultadoContainer = document.getElementById('busca-resultado');
const formNovoContainer = document.getElementById('form-novo-autuado-container');
const eventoContextoContainer = document.getElementById('evento-contexto');
const cpfBuscaInput = document.getElementById('cpf_cnpj_busca');
const cpfNovoInput = document.getElementById('cpf_cnpj_novo');

document.addEventListener('DOMContentLoaded', () => {
    // Aplica máscaras e formatações
    document.getElementById('autor').addEventListener('input', forceUppercase);
    cpfBuscaInput.addEventListener('input', maskCpfCnpj);
    cpfNovoInput.addEventListener('input', maskCpfCnpj);
    
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
  const cpfCnpj = cleanInput(cpfBuscaInput.value);
  if (!cpfCnpj) return;

  buscaResultadoContainer.innerHTML = `<p>Buscando...</p>`;
  try {
    // --- ESTA É A LINHA QUE FOI CORRIGIDA ---
    // Trocamos 'cpf_cnpj=' por 'q=' para corresponder à API atualizada.
    const { data: autuado } = await axios.get(`${API_URL}/autuados/search?q=${cpfCnpj}`);
    
    buscaResultadoContainer.innerHTML = `
        <p style="color: #2a9d8f; font-weight: bold;">Autuado encontrado: ${autuado.autor}</p>
        <button id="btn-vincular" class="button primary">Concluir Etapa e Vincular</button>
    `;
    formNovoContainer.classList.add('hidden'); // Esconde o form de novo se encontrar
    document.getElementById('btn-vincular').addEventListener('click', concluirEtapa);
  } catch (error) {
    buscaResultadoContainer.innerHTML = `<p style="color: #e76f51;">Nenhum autuado encontrado. Cadastre-o abaixo.</p>`;
    formNovoContainer.classList.remove('hidden');
    cpfNovoInput.value = cpfBuscaInput.value;
    cpfNovoInput.dispatchEvent(new Event('input')); // Aplica a máscara
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