import veiculoService from '../services/veiculo.service.js';

class VeiculoController {
  async getVeiculosByAutuadoId(req, res, next) {
    try {
      const veiculos = await veiculoService.getVeiculosByAutuadoId(req.params.autuadoId);
      res.status(200).json(veiculos);
    } catch (error) {
      next(error);
    }
  }

  async createVeiculo(req, res, next) {
    try {
      const novoVeiculo = await veiculoService.createVeiculo(req.body);
      res.status(201).json({ message: 'Veículo criado com sucesso!', data: novoVeiculo });
    } catch (error) {
      next(error);
    }
  }

  async updateVeiculo(req, res, next) {
    try {
      const veiculoAtualizado = await veiculoService.updateVeiculo(req.params.id, req.body);
      res.status(200).json({ message: 'Veículo atualizado com sucesso!', data: veiculoAtualizado });
    } catch (error) {
      next(error);
    }
  }

  async deleteVeiculo(req, res, next) {
    try {
      await veiculoService.deleteVeiculo(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new VeiculoController();