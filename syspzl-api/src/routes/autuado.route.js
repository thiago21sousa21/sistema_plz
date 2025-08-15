import { Router } from "express";
import autuadoController from '../controllers/autuado.controller.js';
import { schemaValidation } from '../middlewares/schema.validation.js';
import { autuadoSchema } from '../schemas/autuado.schema.js';

const autuado = Router();

autuado.get('/autuados', autuadoController.getAllAutuados);
autuado.get('/autuados/:id', autuadoController.getAutuadoById);
autuado.post('/autuados', schemaValidation(autuadoSchema), autuadoController.createAutuado);
autuado.put('/autuados/:id', schemaValidation(autuadoSchema), autuadoController.updateAutuado);
autuado.delete('/autuados/:id', autuadoController.deleteAutuado);

autuado.get('/autuados/search', autuadoController.getAutuadoByCpfCnpj);


export default autuado;