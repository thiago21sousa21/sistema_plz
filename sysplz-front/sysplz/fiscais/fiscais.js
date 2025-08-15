const API_URL = 'http://localhost:5000/api';
const listContainer = document.getElementById('fiscal-list-container');

async function fetchAndRenderFiscais() {
  try {
    const response = await axios.get(`${API_URL}/fiscais`);
    renderFiscais(response.data);
  } catch (error) {
    console.error('Falha ao buscar fiscais:', error);
    listContainer.innerHTML = `<p class="error-message">Não foi possível carregar os fiscais.</p>`;
  }
}

function renderFiscais(fiscais) {
  listContainer.innerHTML = '';
  if (fiscais.length === 0) {
    listContainer.innerHTML = '<p class="empty-message">Nenhum fiscal cadastrado.</p>';
    return;
  }
  fiscais.forEach(fiscal => {
    const fiscalCard = document.createElement('div');
    fiscalCard.className = 'fiscal-card';
    fiscalCard.setAttribute('data-fiscal-id', fiscal.id);
    fiscalCard.innerHTML = `
      <div>
        <h3>${fiscal.nome}</h3>
        <p><strong>ID:</strong> ${fiscal.id}</p>
        <p><strong>Matrícula:</strong> ${fiscal.matricula || 'N/A'}</p>
        <p><strong>Código:</strong> ${fiscal.codigo || 'N/A'}</p>
      </div>
      <div class="card-actions">
        <a href="novo-fiscal/?id=${fiscal.id}" class="button small">Atualizar</a>
        <button class="button small danger" data-id="${fiscal.id}">Deletar</button>
      </div>
    `;
    listContainer.appendChild(fiscalCard);
  });
}

async function handleDelete(id) {
  if (!window.confirm(`Deseja realmente deletar o fiscal com ID ${id}?`)) return;
  try {
    await axios.delete(`${API_URL}/fiscais/${id}`);
    document.querySelector(`[data-fiscal-id="${id}"]`).remove();
    alert('Fiscal deletado com sucesso!');
  } catch (error) {
    console.error('Erro ao deletar fiscal:', error);
    alert('Não foi possível deletar o fiscal.');
  }
}

listContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('danger')) {
    handleDelete(event.target.dataset.id);
  }
});

document.addEventListener('DOMContentLoaded', fetchAndRenderFiscais);