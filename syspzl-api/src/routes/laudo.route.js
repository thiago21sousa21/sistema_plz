import { Router } from "express";
import multer from 'multer';
import laudoController from '../controllers/laudo.controller.js';

// Configuração do Multer para receber os arquivos em memória
const upload = multer({ storage: multer.memoryStorage() });

const laudo = Router();

// A rota usará o middleware do multer para processar até 6 fotos (5 do evento + 1 do mapa)
// 'fotos' é o nome do campo no formulário que conterá os arquivos
laudo.post('/laudos/gerar', upload.array('fotos', 10), laudoController.generateLaudo);

export default laudo;