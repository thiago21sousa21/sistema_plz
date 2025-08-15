const API_URL = 'http://localhost:5000/api';
const listContainer = document.getElementById('autuado-list-container');

async function fetchAndRenderAutuados() {
  try {
    const response = await axios.get(`${API_URL}/autuados`);
    renderAutuados(response.data);
  } catch (error) {
    listContainer.innerHTML = `<p class="error-message">Não foi possível carregar os autuados.</p>`;
  }
}

function renderAutuados(autuados) {
  listContainer.innerHTML = '';
  if (autuados.length === 0) {
    listContainer.innerHTML = '<p class="empty-message">Nenhum autuado registrado.</p>';
    return;
  }
  autuados.forEach(autuado => {
    const autuadoCard = document.createElement('div');
    autuadoCard.className = 'autuado-card';
    autuadoCard.setAttribute('data-autuado-id', autuado.id);
    autuadoCard.innerHTML = `
      <div>
        <h3>${autuado.autor}</h3>
        <p><strong>ID:</strong> ${autuado.id} | <strong>CPF/CNPJ:</strong> ${autuado.cpf_cnpj}</p>
        <p><strong>Data de Registro:</strong> ${new Date(autuado.data).toLocaleDateString('pt-BR')}</p>
        <p><strong>Registrado pelo Fiscal:</strong> ${autuado.fiscal_nome || 'N/A'}</p>
      </div>
      <div class="card-actions">
        <a href="novo-autuado/?id=${autuado.id}" class="button small">Atualizar</a>
        <a href="../enderecos/?autuadoId=${autuado.id}" class="button small">Endereço</a>
        <a href="../veiculos/?autuadoId=${autuado.id}" class="button small">Veículos</a>      
        <button class="button small danger" data-id="${autuado.id}">Deletar</button>
      </div>
    `;
    listContainer.appendChild(autuadoCard);
  });
}

async function handleDelete(id) {
  if (!window.confirm(`Deseja realmente deletar o autuado com ID ${id}?`)) return;
  try {
    await axios.delete(`${API_URL}/autuados/${id}`);
    document.querySelector(`[data-autuado-id="${id}"]`).remove();
  } catch (error) {
    alert('Não foi possível deletar o autuado.');
  }
}

listContainer.addEventListener('click', e => {
  if (e.target.classList.contains('danger')) handleDelete(e.target.dataset.id);
});

document.addEventListener('DOMContentLoaded', fetchAndRenderAutuados);