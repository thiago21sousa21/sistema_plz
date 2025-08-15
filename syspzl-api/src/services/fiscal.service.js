import fiscalRepository from '../repositories/fiscal.repository.js';

class FiscalService {
  async getAllFiscais() {
    return await fiscalRepository.findAll();
  }

  async getFiscalById(id) {
    const fiscal = await fiscalRepository.findById(id);
    if (!fiscal) {
      const error = new Error('Fiscal não encontrado.');
      error.statusCode = 404; // Not Found
      throw error;
    }
    return fiscal;
  }

  async createFiscal(fiscalData) {
    // Poderia ter uma lógica aqui para verificar se a matrícula já existe, por exemplo.
    return await fiscalRepository.create(fiscalData);
  }

  async updateFiscal(id, fiscalData) {
    await this.getFiscalById(id); // Garante que o fiscal existe antes de atualizar
    await fiscalRepository.update(id, fiscalData);
    return { id, ...fiscalData };
  }

  async deleteFiscal(id) {
    await this.getFiscalById(id); // Garante que o fiscal existe antes de deletar
    return await fiscalRepository.delete(id);
  }
}

export default new FiscalService();