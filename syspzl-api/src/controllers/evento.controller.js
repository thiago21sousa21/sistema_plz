import eventoService from '../services/evento.service.js';

class EventoController {
  async getAllEventos(req, res, next) {
    try {
      const eventos = await eventoService.getAllEventos();
      res.status(200).json(eventos);
    } catch (error) {
      next(error);
    }
  }

  async getEventoById(req, res, next) {
    try {
      const evento = await eventoService.getEventoById(req.params.id);
      res.status(200).json(evento);
    } catch (error) {
      next(error);
    }
  }

  async createEvento(req, res, next) {
    try {
      const novoEvento = await eventoService.createEvento(req.body);
      res.status(201).json({ message: 'Evento criado com sucesso!', data: novoEvento });
    } catch (error) {
      next(error);
    }
  }

  async updateEvento(req, res, next) {
    try {
      const eventoAtualizado = await eventoService.updateEvento(req.params.id, req.body);
      res.status(200).json({ message: 'Evento atualizado com sucesso!', data: eventoAtualizado });
    } catch (error) {
      next(error);
    }
  }

  async deleteEvento(req, res, next) {
    try {
      await eventoService.deleteEvento(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async updateEventoStatus(req, res, next) {
    try {
      const { id } = req.params;
      const statusData = req.body; // Ex: { "consultado": true }
      await eventoService.updateEventoStatus(id, statusData);
      res.status(200).json({ message: 'Status do evento atualizado com sucesso!' });
    } catch (error) {
      next(error);
    }
  }
}

export default new EventoController();