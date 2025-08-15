const API_URL = 'http://localhost:5000/api';
const listContainer = document.getElementById('event-list-container');

async function fetchAndRenderEventos() {
  try {
    const response = await axios.get(`${API_URL}/eventos`);
    renderEventos(response.data);
  } catch (error) {
    listContainer.innerHTML = `<p class="error-message">Não foi possível carregar os eventos.</p>`;
  }
}

function renderEventos(eventos) {
  listContainer.innerHTML = '';
  if (eventos.length === 0) {
    listContainer.innerHTML = '<p class="empty-message">Nenhum evento registrado.</p>';
    return;
  }
  
  eventos.forEach(evento => {
    const eventoCard = document.createElement('div');
    eventoCard.className = 'event-card';
    eventoCard.setAttribute('data-evento-id', evento.id);
    
    // --- LÓGICA ATUALIZADA DOS BOTÕES ---
    let actionsHtml = '';

    // Adiciona o botão de Editar se o evento NÃO estiver finalizado
    if (!evento.feito) {
      actionsHtml += `<a href="novo-evento/?id=${evento.id}" class="button small edit">Editar</a>`;
    }

    // Lógica para o botão de ação principal
    if (evento.feito) {
      actionsHtml += `<button class="button small" disabled>Finalizado</button>`;
    } else if (evento.consultado) {
      actionsHtml += `<a href="../infracoes/nova-infracao/?eventoId=${evento.id}" class="button small success">Gerar Infração</a>`;
    } else {
      actionsHtml += `<a href="vincular-autuado/?eventoId=${evento.id}" class="button small">Consultar e Vincular</a>`;
    }
    
    // O botão de deletar sempre aparece
    actionsHtml += `<button class="button small danger" data-id="${evento.id}">Deletar</button>`;
    
    eventoCard.innerHTML = `
      <div>
        <h3>${evento.descricao || 'Evento sem descrição'}</h3>
        <p><strong>ID:</strong> ${evento.id} | <strong>Momento:</strong> ${new Date(evento.momento).toLocaleString('pt-BR')}</p>
        <p><strong>Placa:</strong> ${evento.placa || 'N/A'} | <strong>Fiscal:</strong> ${evento.fiscal_nome || 'N/A'}</p>
        <div class="status-flags">
          ${evento.e_infracao ? '<span class="infracao">Infração</span>' : ''}
          ${evento.consultado ? '<span class="consultado">Consultado</span>' : ''}
          ${evento.feito ? '<span class="feito">Feito</span>' : ''}
        </div>
      </div>
      <div class="card-actions">${actionsHtml}</div>
    `;
    listContainer.appendChild(eventoCard);
  });
}

async function handleDelete(id) {
  if (!window.confirm(`Deseja realmente deletar o evento com ID ${id}?`)) return;
  try {
    await axios.delete(`${API_URL}/eventos/${id}`);
    document.querySelector(`[data-evento-id="${id}"]`).remove();
    alert('Evento deletado com sucesso!');
  } catch (error) {
    alert('Não foi possível deletar o evento.');
  }
}

listContainer.addEventListener('click', e => {
  if (e.target.classList.contains('danger')) handleDelete(e.target.dataset.id);
});

document.addEventListener('DOMContentLoaded', fetchAndRenderEventos);