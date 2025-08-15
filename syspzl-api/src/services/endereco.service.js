import enderecoRepository from '../repositories/endereco.repository.js';
import autuadoRepository from '../repositories/autuado.repository.js';

class EnderecoService {
  async getEnderecoByAutuadoId(autuadoId) {
    const endereco = await enderecoRepository.findByAutuadoId(autuadoId);
    // Não é um erro se não encontrar, apenas retorna nulo
    return endereco;
  }

  async createEndereco(enderecoData) {
    // Garante que o autuado existe
    const autuado = await autuadoRepository.findById(enderecoData.autuado_id);
    if (!autuado) {
      const error = new Error(`O autuado com ID ${enderecoData.autuado_id} não existe.`);
      error.statusCode = 400;
      throw error;
    }

    // Garante que o autuado ainda não tem endereço (respeitando a constraint UNIQUE)
    const existingEndereco = await enderecoRepository.findByAutuadoId(enderecoData.autuado_id);
    if (existingEndereco) {
      const error = new Error(`Este autuado já possui um endereço cadastrado.`);
      error.statusCode = 409; // Conflict
      throw error;
    }

    return await enderecoRepository.create(enderecoData);
  }

  async updateEndereco(id, enderecoData) {
    // A lógica de verificação de existência do autuado já está implícita pela relação
    return await enderecoRepository.update(id, enderecoData);
  }

  async deleteEndereco(id) {
    return await enderecoRepository.delete(id);
  }
}

export default new EnderecoService();