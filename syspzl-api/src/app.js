import express from "express";
import cors from 'cors';
import index from "./routes/index.route.js";
import erroHandler from "./middlewares/erro.handler.js";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, '..', 'public', 'sysplz-front')));
app.use(express.json());
app.use(cors());
app.use(index);
app.use(erroHandler);

const port = process.env.PORT || 5000;
app.listen(port, ()=>{console.log(`RUNNING IN PORT ${port}`)});
