import { Router } from "express";
import fiscalController from '../controllers/fiscal.controller.js';
import { schemaValidation } from '../middlewares/schema.validation.js';
import { fiscalSchema } from '../schemas/fiscal.schema.js';

const fiscal = Router();

// Define o endpoint base como '/fiscais'
fiscal.get('/fiscais', fiscalController.getAllFiscais);
fiscal.get('/fiscais/:id', fiscalController.getFiscalById);
fiscal.post('/fiscais', schemaValidation(fiscalSchema), fiscalController.createFiscal);
fiscal.put('/fiscais/:id', schemaValidation(fiscalSchema), fiscalController.updateFiscal);
fiscal.delete('/fiscais/:id', fiscalController.deleteFiscal);

export default fiscal;