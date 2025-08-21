import {API_URL} from '../../../config.js';
let eventoId = null;
import {forceUppercase} from "../../../utils/formatters.js"

const resumoEventoContainer = document.getElementById('resumo-evento');
const fiscalSelect = document.getElementById('fiscal_id');
const form = document.getElementById('form-gerar-infracao');

// Elementos da nova busca
const autuadoSearchInput = document.getElementById('autuado-search');
const btnSearchAutuado = document.getElementById('btn-search-autuado');
const autuadoResultContainer = document.getElementById('autuado-result-container');
const autuadoIdInput = document.getElementById('autuado_id');

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    eventoId = urlParams.get('eventoId');
    if (!eventoId) { alert('ID do Evento não encontrado!'); return; }
    
    document.querySelector('h1').textContent += ` (Evento #${eventoId})`;
    
    fetchDadosEvento();
    populateFiscaisSelect();
    
    autuadoSearchInput.addEventListener('input', forceUppercase);
    btnSearchAutuado.addEventListener('click', handleSearchAutuado);
    form.addEventListener('submit', handleGerarInfracao);
});

async function fetchDadosEvento() {
    try {
        const { data: evento } = await axios.get(`${API_URL}/eventos/${eventoId}`);
        resumoEventoContainer.innerHTML = `
            <p><strong>Placa:</strong> ${evento.placa || 'N/A'}</p>
            <p><strong>Descrição:</strong> ${evento.descricao}</p>
        `;
    } catch (err) {
        resumoEventoContainer.innerHTML = `<p class="error">Erro ao carregar evento.</p>`;
    }
}

async function populateFiscaisSelect() {
    try {
        const { data: fiscais } = await axios.get(`${API_URL}/fiscais`);
        fiscalSelect.innerHTML = '<option value="">-- Selecione --</option>';
        fiscais.forEach(f => {
            fiscalSelect.innerHTML += `<option value="${f.id}">${f.nome}</option>`;
        });
    } catch (err) {
        fiscalSelect.innerHTML = '<option value="">Erro ao carregar</option>';
    }
}

async function handleSearchAutuado() {
    const query = autuadoSearchInput.value.trim();
    console.log(autuadoIdInput)
    if (!query) {
        alert("Por favor, digite um termo para a busca.");
        return;
    }

    autuadoResultContainer.textContent = 'Buscando...';
    autuadoResultContainer.className = '';
    autuadoIdInput.value = '';

    try {
        const { data: autuado } = await axios.get(`${API_URL}/autuados/search?q=${query}`);
        autuadoResultContainer.innerHTML = `
            <p><strong>Autuado Encontrado:</strong> ${autuado.autor}</p>
            <p><strong>CPF/CNPJ:</strong> ${autuado.cpf_cnpj}</p>
        `;
        autuadoResultContainer.className = 'found';
        autuadoIdInput.value = autuado.id; // Armazena o ID encontrado
    } catch (error) {
        autuadoResultContainer.textContent = 'Nenhum autuado encontrado com este termo.';
        autuadoResultContainer.className = 'not-found';
    }
}

async function handleGerarInfracao(e) {
  e.preventDefault();

  const autuadoId = parseInt(autuadoIdInput.value);
  if (!autuadoId) {
    alert("Busque e encontre um autuado válido antes de gerar a infração.");
    return;
  }
  
  const infracaoData = {
    evento_id: parseInt(eventoId),
    autuado_id: autuadoId,
    fiscal_id: parseInt(fiscalSelect.value),
  };
  
  if (isNaN(infracaoData.fiscal_id)) {
      alert("Por favor, selecione o fiscal responsável.");
      return;
  }

  try {
    await axios.post(`${API_URL}/infracoes`, infracaoData);
    alert('Infração gerada com sucesso! O evento foi marcado como "Feito".');
    window.location.href = '../../eventos/';
  } catch (error) {
    alert(error.response?.data?.message || 'Erro ao gerar infração.');
  }
}