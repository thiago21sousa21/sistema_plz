import autuadoService from '../services/autuado.service.js';

class AutuadoController {
  async getAllAutuados(req, res, next) {
    try {
      const autuados = await autuadoService.getAllAutuados();
      res.status(200).json(autuados);
    } catch (error) {
      next(error);
    }
  }

  async getAutuadoById(req, res, next) {
    try {
      const autuado = await autuadoService.getAutuadoById(req.params.id);
      res.status(200).json(autuado);
    } catch (error) {
      next(error);
    }
  }

  async createAutuado(req, res, next) {
    try {
      const novoAutuado = await autuadoService.createAutuado(req.body);
      res.status(201).json({ message: 'Autuado criado com sucesso!', data: novoAutuado });
    } catch (error) {
      next(error);
    }
  }

  async updateAutuado(req, res, next) {
    try {
      const autuadoAtualizado = await autuadoService.updateAutuado(req.params.id, req.body);
      res.status(200).json({ message: 'Autuado atualizado com sucesso!', data: autuadoAtualizado });
    } catch (error) {
      next(error);
    }
  }

  async deleteAutuado(req, res, next) {
    try {
      await autuadoService.deleteAutuado(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getAutuadoByCpfCnpj(req, res, next) {
    try {
      const { cpf_cnpj } = req.query;
      if (!cpf_cnpj) {
        return res.status(400).json({ message: 'Parâmetro cpf_cnpj é obrigatório.' });
      }
      const autuado = await autuadoService.getAutuadoByCpfCnpj(cpf_cnpj);
      if (!autuado) {
        return res.status(404).json({ message: 'Nenhum autuado encontrado com este CPF/CNPJ.' });
      }
      res.status(200).json(autuado);
    } catch (error) {
      next(error);
    }
  }

}

export default new AutuadoController();