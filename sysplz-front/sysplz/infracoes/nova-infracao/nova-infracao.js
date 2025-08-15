const API_URL = 'http://localhost:5000/api';
let eventoId = null;

const resumoEventoContainer = document.getElementById('resumo-evento');
const autuadoSelect = document.getElementById('autuado_id');
const fiscalSelect = document.getElementById('fiscal_id');
const form = document.getElementById('form-gerar-infracao');

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    eventoId = urlParams.get('eventoId');
    if (!eventoId) { alert('ID do Evento não encontrado!'); return; }
    
    document.querySelector('h1').textContent += ` (Evento #${eventoId})`;
    
    // Carrega todos os dados necessários em paralelo
    Promise.all([
        fetchDadosEvento(),
        populateAutuadosSelect(),
        populateFiscaisSelect()
    ]);
    
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

async function populateAutuadosSelect() {
    try {
        const { data: autuados } = await axios.get(`${API_URL}/autuados`);
        autuadoSelect.innerHTML = '<option value="">-- Selecione --</option>';
        autuados.forEach(a => {
            autuadoSelect.innerHTML += `<option value="${a.id}">${a.autor} (${a.cpf_cnpj})</option>`;
        });
    } catch (err) {
        autuadoSelect.innerHTML = '<option value="">Erro ao carregar</option>';
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

async function handleGerarInfracao(e) {
  e.preventDefault();
  const infracaoData = {
    evento_id: parseInt(eventoId),
    autuado_id: parseInt(autuadoSelect.value),
    fiscal_id: parseInt(fiscalSelect.value),
  };
  
  if (isNaN(infracaoData.autuado_id) || isNaN(infracaoData.fiscal_id)) {
      alert("Por favor, selecione o autuado e o fiscal.");
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