import { Router } from "express";
import enderecoController from '../controllers/endereco.controller.js';
import { schemaValidation } from '../middlewares/schema.validation.js';
import { enderecoSchema } from '../schemas/endereco.schema.js';

const endereco = Router();

// Rota para buscar o endereço de um autuado específico
endereco.get('/autuados/:autuadoId/endereco', enderecoController.getEnderecoByAutuadoId);

// Rotas CRUD padrão para endereço
endereco.post('/enderecos', schemaValidation(enderecoSchema), enderecoController.createEndereco);
endereco.put('/enderecos/:id', schemaValidation(enderecoSchema), enderecoController.updateEndereco);
endereco.delete('/enderecos/:id', enderecoController.deleteEndereco);

export default endereco;