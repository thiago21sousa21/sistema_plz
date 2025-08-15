import { Router } from "express";
import veiculoController from '../controllers/veiculo.controller.js';
import { schemaValidation } from '../middlewares/schema.validation.js';
import { veiculoSchema } from '../schemas/veiculo.schema.js';

const veiculo = Router();

// Rota para buscar os veículos de um autuado
veiculo.get('/autuados/:autuadoId/veiculos', veiculoController.getVeiculosByAutuadoId);

// Rotas CRUD padrão para veículos
veiculo.post('/veiculos', schemaValidation(veiculoSchema), veiculoController.createVeiculo);
veiculo.put('/veiculos/:id', schemaValidation(veiculoSchema), veiculoController.updateVeiculo);
veiculo.delete('/veiculos/:id', veiculoController.deleteVeiculo);

export default veiculo;