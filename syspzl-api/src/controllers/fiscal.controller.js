import fiscalService from '../services/fiscal.service.js';

class FiscalController {
  async getAllFiscais(req, res, next) {
    try {
      const fiscais = await fiscalService.getAllFiscais();
      res.status(200).json(fiscais);
    } catch (error) {
      next(error);
    }
  }

  async getFiscalById(req, res, next) {
    try {
      const { id } = req.params;
      const fiscal = await fiscalService.getFiscalById(id);
      res.status(200).json(fiscal);
    } catch (error) {
      next(error);
    }
  }

  async createFiscal(req, res, next) {
    try {
      const novoFiscal = await fiscalService.createFiscal(req.body);
      res.status(201).json({ message: 'Fiscal criado com sucesso!', data: novoFiscal });
    } catch (error) {
      next(error);
    }
  }

  async updateFiscal(req, res, next) {
    try {
      const { id } = req.params;
      const fiscalAtualizado = await fiscalService.updateFiscal(id, req.body);
      res.status(200).json({ message: 'Fiscal atualizado com sucesso!', data: fiscalAtualizado });
    } catch (error) {
      next(error);
    }
  }

  async deleteFiscal(req, res, next) {
    try {
      const { id } = req.params;
      await fiscalService.deleteFiscal(id);
      res.status(204).send(); // 204 No Content
    } catch (error) {
      next(error);
    }
  }
}

export default new FiscalController();