import express from "express";
import cors from 'cors';
import index from "./routes/index.route.js";
import erroHandler from "./middlewares/erro.handler.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(index);
app.use(erroHandler);

const port = process.env.PORT || 5000;
app.listen(port, ()=>{console.log(`RUNNING IN PORT ${port}`)});
