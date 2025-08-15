import { Router } from "express";
import eventoController from '../controllers/evento.controller.js';
import { schemaValidation } from '../middlewares/schema.validation.js';
import { eventoSchema } from '../schemas/evento.schema.js';

const evento = Router();

evento.get('/eventos', eventoController.getAllEventos);
evento.get('/eventos/:id', eventoController.getEventoById);
evento.post('/eventos', schemaValidation(eventoSchema), eventoController.createEvento);
evento.put('/eventos/:id', schemaValidation(eventoSchema), eventoController.updateEvento);
evento.delete('/eventos/:id', eventoController.deleteEvento);
// Rota para atualizar apenas o status de um evento (ex: 'consultado' ou 'feito')
evento.put('/eventos/:id/status', eventoController.updateEventoStatus);


export default evento;