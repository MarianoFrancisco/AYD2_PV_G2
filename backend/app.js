/*
* @author
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import accountRouter from "./app/routes/account.routes.js";

const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: '15mb' }));
app.use(cors());

const api = '/api';

const showBalance = `${api}/Account`;



app.use(showBalance, accountRouter)

export default app;
