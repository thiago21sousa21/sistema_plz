import { Router } from "express";
import infracaoController from '../controllers/infracao.controller.js';
import { schemaValidation } from '../middlewares/schema.validation.js';
import { infracaoSchema } from '../schemas/infracao.schema.js';

const infracao = Router();

// Rota para listar todas as infrações (útil para relatórios)
infracao.get('/infracoes', infracaoController.getAllInfracoes);

// Rota para criar a infração
infracao.post('/infracoes', schemaValidation(infracaoSchema), infracaoController.createInfracao);

export default infracao;