import infracaoService from '../services/infracao.service.js';

class InfracaoController {
  async getAllInfracoes(req, res, next) {
    try {
      const infracoes = await infracaoService.getAllInfracoesDetailed(req.query);
      res.status(200).json(infracoes);
    } catch (error) {
      next(error);
    }
  }

  async createInfracao(req, res, next) {
    try {
      const novaInfracao = await infracaoService.createInfracao(req.body);
      res.status(201).json({ message: 'Infração gerada com sucesso!', data: novaInfracao });
    } catch (error) {
      next(error);
    }
  }
}

export default new InfracaoController();