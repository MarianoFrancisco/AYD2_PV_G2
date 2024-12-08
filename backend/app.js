/*
* @author
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import accountRouter from "./app/routes/account.routes.js";
import paymentServiceRouter from "./app/routes/payment-services.routes.js";
import loanPaymentRouter from "./app/routes/loan-payment.routes.js";

import clientRouter from "./app/routes/client-info.routes.js";

import depositRouter from './app/routes/deposit.routes.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(bodyParser.json({ limit: '15mb' }));
app.use(cors());
app.use('/signature', express.static(path.join(__dirname, 'img')));

const api = '/api';
const showBalance = `${api}/account`;
const paymentService = `${api}/payment-service`;
const loanPayment = `${api}/loan-payment`;

const clientService = `${api}/client`;

const deposit = `${api}/deposit`;

app.use(showBalance, accountRouter);
app.use(paymentService, paymentServiceRouter);
app.use(loanPayment, loanPaymentRouter);

app.use(clientService, clientRouter);

app.use(deposit, depositRouter);

export default app;
