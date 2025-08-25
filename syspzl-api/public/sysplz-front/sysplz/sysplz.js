import { API_URL } from '../config.js';

// Função para exibir a data e hora atual
function displayCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (!dateElement) return;

    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('pt-BR', options);
}

// Função para buscar e exibir as estatísticas
async function fetchDashboardStats() {
    // Seleciona os elementos onde os números serão exibidos
    const eventosEl = document.getElementById('stats-eventos');
    const infracoesEl = document.getElementById('stats-infracoes');
    const autuadosEl = document.getElementById('stats-autuados');

    // Para as estatísticas funcionarem, sua API precisará ter rotas que contam os registros.
    // Ex: GET /api/eventos/count, GET /api/infracoes/count
    // Por enquanto, vamos simular com números aleatórios.
    try {
        // Exemplo de como seria com a API real:
        // const [eventosRes, infracoesRes, autuadosRes] = await Promise.all([
        //     axios.get(`${API_URL}/eventos`),
        //     axios.get(`${API_URL}/infracoes`),
        //     axios.get(`${API_URL}/autuados`)
        // ]);
        // eventosEl.textContent = eventosRes.data.length;
        // infracoesEl.textContent = infracoesRes.data.length;
        // autuadosEl.textContent = autuadosRes.data.length;

        // --- Simulação enquanto as rotas de contagem não existem ---
        eventosEl.textContent =null;
        infracoesEl.textContent = null;
        autuadosEl.textContent = null;
        // --- Fim da simulação ---

    } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
        eventosEl.textContent = 'Erro';
        infracoesEl.textContent = 'Erro';
        autuadosEl.textContent = 'Erro';
    }
}


// Executa as funções quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    displayCurrentDate();
    fetchDashboardStats();
});