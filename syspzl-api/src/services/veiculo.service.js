import veiculoRepository from '../repositories/veiculo.repository.js';
import autuadoRepository from '../repositories/autuado.repository.js';

class VeiculoService {
  async getVeiculosByAutuadoId(autuadoId) {
    // Garante que o autuado existe antes de buscar seus veículos
    const autuado = await autuadoRepository.findById(autuadoId);
    if (!autuado) {
      const error = new Error(`O autuado com ID ${autuadoId} não existe.`);
      error.statusCode = 404;
      throw error;
    }
    return await veiculoRepository.findByAutuadoId(autuadoId);
  }

  async createVeiculo(veiculoData) {
    // Garante que o autuado existe
    const autuado = await autuadoRepository.findById(veiculoData.autuado_id);
    if (!autuado) {
      const error = new Error(`O autuado com ID ${veiculoData.autuado_id} não existe.`);
      error.statusCode = 400;
      throw error;
    }

    // Garante que a placa é única em todo o sistema
    const existingVeiculo = await veiculoRepository.findByPlaca(veiculoData.placa);
    if (existingVeiculo) {
      const error = new Error(`A placa ${veiculoData.placa} já está cadastrada.`);
      error.statusCode = 409; // Conflict
      throw error;
    }

    return await veiculoRepository.create(veiculoData);
  }

  async updateVeiculo(id, veiculoData) {
    const veiculoToUpdate = await veiculoRepository.findById(id);
    if (!veiculoToUpdate) {
        const error = new Error('Veículo não encontrado.');
        error.statusCode = 404;
        throw error;
    }

    const existingVeiculo = await veiculoRepository.findByPlaca(veiculoData.placa);
    if (existingVeiculo && existingVeiculo.id !== parseInt(id, 10)) {
        const error = new Error(`A placa ${veiculoData.placa} já pertence a outro veículo.`);
        error.statusCode = 409;
        throw error;
    }
    
    return await veiculoRepository.update(id, veiculoData);
  }

  async deleteVeiculo(id) {
    const veiculoToDelete = await veiculoRepository.findById(id);
    if (!veiculoToDelete) {
        const error = new Error('Veículo não encontrado.');
        error.statusCode = 404;
        throw error;
    }
    return await veiculoRepository.delete(id);
  }
}

export default new VeiculoService();