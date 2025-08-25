// src/system_plz/cameras/cameras.js
import {API_URL} from '../../config.js';

const listContainer = document.getElementById('camera-list-container');

// ... (A função renderCameras será atualizada) ...

/**
 * Renderiza a lista de câmeras no DOM, agora com botões de ação.
 * @param {Array} cameras - Um array de objetos de câmera.
 */
function renderCameras(cameras) {
  listContainer.innerHTML = '';

  if (cameras.length === 0) {
    listContainer.innerHTML = '<p class="empty-message">Nenhuma câmera cadastrada ainda.</p>';
    return;
  }

  cameras.forEach(camera => {
    const cameraCard = document.createElement('div');
    cameraCard.className = 'card-list-item';
    // NOVO: Adicionamos um atributo data- para identificar o card facilmente
    cameraCard.setAttribute('data-camera-id', camera.id);
    
    cameraCard.innerHTML = `
      <div>
        <h3>Bairro: ${camera.bairro}</h3>
        <p><strong>ID:</strong> ${camera.id}</p>
        <p><strong>Zona:</strong> ${camera.zona}</p>
        <p><strong>Localização:</strong> ${camera.local}</p>
      </div>
      <div class="card-actions">
        <a href="nova-camera/?id=${camera.id}" class="button small">Atualizar</a>
        <button class="button small danger" data-id="${camera.id}">Deletar</button>
      </div>
    `;
    
    listContainer.appendChild(cameraCard);
  });
}


/**
 * NOVO: Lida com o clique no botão de deletar.
 * @param {string} id - O ID da câmera a ser deletada.
 */
async function handleDelete(id) {
  // Pede confirmação ao usuário
  const isConfirmed = window.confirm(`Tem certeza de que deseja deletar a câmera com ID ${id}?`);

  if (!isConfirmed) {
    return; // O usuário cancelou
  }

  try {
    await axios.delete(`${API_URL}/cameras/${id}`);
    
    // Remove o card da câmera da tela sem precisar recarregar a página
    const cardToRemove = document.querySelector(`[data-camera-id="${id}"]`);
    if (cardToRemove) {
      cardToRemove.remove();
    }
    // Poderíamos adicionar uma notificação de sucesso aqui
    alert('Câmera deletada com sucesso!');

  } catch (error) {
    console.error('Erro ao deletar câmera:', error);
    alert('Não foi possível deletar a câmera. Tente novamente.');
  }
}

// NOVO: Usamos delegação de eventos para ouvir cliques nos botões de deletar
listContainer.addEventListener('click', (event) => {
  // Verifica se o elemento clicado é um botão de deletar
  if (event.target.classList.contains('danger')) {
    const camera_id = event.target.dataset.id; // Pega o ID do atributo data-id
    handleDelete(camera_id);
  }
});


// ... (O resto do arquivo, como fetchAndRenderCameras, continua o mesmo) ...
async function fetchAndRenderCameras() {
  try {
    const response = await axios.get(`${API_URL}/cameras`);
    const cameras = response.data;
    renderCameras(cameras);
  } catch (error) {
    console.error('Falha ao buscar câmeras:', error);
    listContainer.innerHTML = `<p class="error-message">Não foi possível carregar as câmeras.</p>`;
  }
}
document.addEventListener('DOMContentLoaded', fetchAndRenderCameras);