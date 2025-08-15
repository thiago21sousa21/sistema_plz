import eventoRepository from '../repositories/evento.repository.js';
// NOVO: Importamos os repositórios necessários para a verificação
import fiscalRepository from '../repositories/fiscal.repository.js';
import cameraRepository from '../repositories/camera.repository.js';

function formatDateToMySQL(isoDateString) {
  if (!isoDateString) return null;
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

class EventoService {
  async getAllEventos() {
    return await eventoRepository.findAll();
  }

  async getEventoById(id) {
    const evento = await eventoRepository.findById(id);
    if (!evento) {
      const error = new Error('Evento não encontrado.');
      error.statusCode = 404;
      throw error;
    }
    return evento;
  }

  async createEvento(eventoData) {
    // --- NOVO: Bloco de verificação de chaves estrangeiras ---
    const fiscal = await fiscalRepository.findById(eventoData.fiscal_id);
    if (!fiscal) {
      const error = new Error(`O fiscal com ID ${eventoData.fiscal_id} não existe.`);
      error.statusCode = 400; // 400 Bad Request, pois o cliente enviou um ID inválido
      throw error;
    }

    // A câmera é opcional, então só verificamos se um ID foi fornecido
    if (eventoData.camera_id) {
      const camera = await cameraRepository.findById(eventoData.camera_id);
      if (!camera) {
        const error = new Error(`A câmera com ID ${eventoData.camera_id} não existe.`);
        error.statusCode = 400;
        throw error;
      }
    }
    // --- FIM DO BLOCO DE VERIFICAÇÃO ---

    const dadosFormatados = {
      ...eventoData,
      momento: formatDateToMySQL(eventoData.momento)
    };
    return await eventoRepository.create(dadosFormatados);
  }

  async updateEvento(id, eventoData) {
    await this.getEventoById(id); // Garante que o evento a ser atualizado existe

    // --- NOVO: Bloco de verificação também na atualização ---
    const fiscal = await fiscalRepository.findById(eventoData.fiscal_id);
    if (!fiscal) {
      const error = new Error(`O fiscal com ID ${eventoData.fiscal_id} não existe.`);
      error.statusCode = 400;
      throw error;
    }
    if (eventoData.camera_id) {
      const camera = await cameraRepository.findById(eventoData.camera_id);
      if (!camera) {
        const error = new Error(`A câmera com ID ${eventoData.camera_id} não existe.`);
        error.statusCode = 400;
        throw error;
      }
    }
    // --- FIM DO BLOCO DE VERIFICAÇÃO ---
    
    const dadosFormatados = {
      ...eventoData,
      momento: formatDateToMySQL(eventoData.momento)
    };
    return await eventoRepository.update(id, dadosFormatados);
  }

  async deleteEvento(id) {
    await this.getEventoById(id);
    return await eventoRepository.delete(id);
  }

  async updateEventoStatus(id, statusData) {
    await this.getEventoById(id); // Garante que o evento existe
    return await eventoRepository.updateStatus(id, statusData);
  }
}

export default new EventoService();