const API_URL = 'http://localhost:5000/api';
const tableContainer = document.getElementById('infracoes-table-container');
const fiscalFilter = document.getElementById('fiscal-filter');
const searchInput = document.getElementById('search-input');
const dataInicioInput = document.getElementById('data-inicio-filter');
const dataFimInput = document.getElementById('data-fim-filter');
const btnFilter = document.getElementById('btn-filter');
const btnClear = document.getElementById('btn-clear');

document.addEventListener('DOMContentLoaded', () => {
  populateFiscalFilter();
  fetchAndRenderInfracoes();
  
  btnFilter.addEventListener('click', fetchAndRenderInfracoes);
  btnClear.addEventListener('click', clearFilters);
});

async function populateFiscalFilter() {
  try {
    const { data: fiscais } = await axios.get(`${API_URL}/fiscais`);
    fiscais.forEach(f => {
      fiscalFilter.innerHTML += `<option value="${f.id}">${f.nome}</option>`;
    });
  } catch (err) {
    console.error("Erro ao carregar fiscais para o filtro", err);
  }
}

async function fetchAndRenderInfracoes() {
  tableContainer.innerHTML = '<p>Buscando infrações...</p>';
  
  // 1. Monta o objeto de parâmetros para a API
  const params = {
    search: searchInput.value,
    fiscalId: fiscalFilter.value,
    dataInicio: dataInicioInput.value,
    dataFim: dataFimInput.value,
  };

  try {
    const { data: infracoes } = await axios.get(`${API_URL}/infracoes`, { params });
    renderTable(infracoes);
  } catch (error) {
    tableContainer.innerHTML = `<p class="error-message">Erro ao carregar infrações.</p>`;
  }
}

function renderTable(infracoes) {
  if (infracoes.length === 0) {
    tableContainer.innerHTML = '<p>Nenhuma infração encontrada para os filtros aplicados.</p>';
    return;
  }
  
  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Data/Hora</th>
        <th>Autuado</th>
        <th>CPF/CNPJ</th>
        <th>Placa</th>
        <th>Local</th>
        <th>Fiscal</th>
      </tr>
    </thead>
    <tbody>
      ${infracoes.map(i => `
        <tr>
          <td>${i.infracao_id}</td>
          <td>${new Date(i.momento).toLocaleString('pt-BR')}</td>
          <td>${i.autuado_nome}</td>
          <td>${i.cpf_cnpj}</td>
          <td>${i.placa}</td>
          <td>${i.bairro || 'N/A'}, ${i.cidade || 'N/A'}</td>
          <td>${i.fiscal_nome}</td>
        </tr>
      `).join('')}
    </tbody>
  `;
  tableContainer.innerHTML = '';
  tableContainer.appendChild(table);
}

function clearFilters() {
  searchInput.value = '';
  fiscalFilter.value = '';
  dataInicioInput.value = '';
  dataFimInput.value = '';
  fetchAndRenderInfracoes();
}