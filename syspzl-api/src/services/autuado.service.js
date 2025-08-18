import autuadoRepository from '../repositories/autuado.repository.js';
import fiscalRepository from '../repositories/fiscal.repository.js';

class AutuadoService {
  async getAllAutuados() {
    return await autuadoRepository.findAll();
  }

  async getAutuadoById(id) {
    const autuado = await autuadoRepository.findById(id);
    if (!autuado) {
      const error = new Error('Autuado não encontrado.');
      error.statusCode = 404;
      throw error;
    }
    return autuado;
  }

  async createAutuado(autuadoData) {
    // Verifica se o CPF/CNPJ já está cadastrado
    const existingAutuado = await autuadoRepository.findByCpfCnpj(autuadoData.cpf_cnpj);
    if (existingAutuado) {
      const error = new Error(`O CPF/CNPJ ${autuadoData.cpf_cnpj} já está cadastrado.`);
      error.statusCode = 409; // Conflict
      throw error;
    }

    // Verifica se o fiscal existe, se um ID for fornecido
    if (autuadoData.fiscal_id) {
      const fiscal = await fiscalRepository.findById(autuadoData.fiscal_id);
      if (!fiscal) {
        const error = new Error(`O fiscal com ID ${autuadoData.fiscal_id} não existe.`);
        error.statusCode = 400;
        throw error;
      }
    }
    
    return await autuadoRepository.create(autuadoData);
  }

  async updateAutuado(id, autuadoData) {
    await this.getAutuadoById(id); // Garante que o autuado a ser atualizado existe
    
    // Lógica de verificação para o update
    const existingAutuado = await autuadoRepository.findByCpfCnpj(autuadoData.cpf_cnpj);
    if (existingAutuado && existingAutuado.id !== parseInt(id, 10)) {
        const error = new Error(`O CPF/CNPJ ${autuadoData.cpf_cnpj} já pertence a outro cadastro.`);
        error.statusCode = 409;
        throw error;
    }

    if (autuadoData.fiscal_id) {
        const fiscal = await fiscalRepository.findById(autuadoData.fiscal_id);
        if (!fiscal) {
            const error = new Error(`O fiscal com ID ${autuadoData.fiscal_id} não existe.`);
            error.statusCode = 400;
            throw error;
        }
    }

    return await autuadoRepository.update(id, autuadoData);
  }

  async deleteAutuado(id) {
    await this.getAutuadoById(id);
    return await autuadoRepository.delete(id);
  }

  async getAutuadoByCpfCnpj(cpfCnpj) {
    const autuado = await autuadoRepository.findByCpfCnpj(cpfCnpj);
    // Não é um erro se não encontrar, apenas retorna nulo ou o objeto encontrado
    return autuado;
  }

  async searchAutuado(query) {
    return await autuadoRepository.search(query);
  }

}

export default new AutuadoService();