// routes/cameraRoutes.js
import { Router } from "express";
import cameraController from '../controllers/camera.controller.js';
import { schemaValidation } from '../middlewares/schema.validation.js';
import {cameraSchema} from '../schemas/camera.schema.js';

const camera = Router();


camera.post('/cameras', schemaValidation(cameraSchema),cameraController.createCamera);
camera.get('/cameras', cameraController.getAllCameras);

// --- ADICIONE AS ROTAS ABAIXO ---

// Rota para buscar uma única câmera pelo ID
camera.get('/cameras/:id', cameraController.getCameraById);

// Rota para atualizar uma câmera
// A mesma validação de schema pode ser usada aqui
camera.put('/cameras/:id', schemaValidation(cameraSchema), cameraController.updateCamera);

// Rota para deletar uma câmera
camera.delete('/cameras/:id', cameraController.deleteCamera);

export default camera;