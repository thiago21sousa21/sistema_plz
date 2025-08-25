import { Router } from "express";
import camera from './camera.route.js';
import fiscal from './fiscal.route.js';
import evento from './evento.route.js';
import autuado from './autuado.route.js';
import endereco from './endereco.route.js';
import veiculo from './veiculo.route.js';
import infracao from './infracao.route.js';
import laudo from './laudo.route.js';


const index = Router();
index.use('/api',camera);
index.use('/api', fiscal);
index.use('/api', evento);
index.use('/api', autuado);
index.use('/api', endereco);
index.use('/api', veiculo);
index.use('/api', infracao);
index.use('/api', laudo);


export default index;

