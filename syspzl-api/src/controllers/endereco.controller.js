import enderecoService from '../services/endereco.service.js';

class EnderecoController {
  // Rota especial para buscar pelo ID do autuado
  async getEnderecoByAutuadoId(req, res, next) {
    try {
      const endereco = await enderecoService.getEnderecoByAutuadoId(req.params.autuadoId);
      if (!endereco) {
        return res.status(404).json({ message: 'Nenhum endereço encontrado para este autuado.' });
      }
      res.status(200).json(endereco);
    } catch (error) {
      next(error);
    }
  }

  async createEndereco(req, res, next) {
    try {
      const novoEndereco = await enderecoService.createEndereco(req.body);
      res.status(201).json({ message: 'Endereço criado com sucesso!', data: novoEndereco });
    } catch (error) {
      next(error);
    }
  }

  async updateEndereco(req, res, next) {
    try {
      const enderecoAtualizado = await enderecoService.updateEndereco(req.params.id, req.body);
      res.status(200).json({ message: 'Endereço atualizado com sucesso!', data: enderecoAtualizado });
    } catch (error) {
      next(error);
    }
  }

  async deleteEndereco(req, res, next) {
    try {
      await enderecoService.deleteEndereco(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new EnderecoController();