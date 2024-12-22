/*
* @author
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import auhenticatorRouter from "./app/routes/authenticator.routes.js";
import userRouter from "./app/routes/user.routes.js";
import accountRouter from "./app/routes/account.routes.js";
import paymentServiceRouter from "./app/routes/payment-services.routes.js";
import loanPaymentRouter from "./app/routes/loan-payment.routes.js";
import loanListRouter from "./app/routes/loan-list.routes.js";

import clientRouter from "./app/routes/client.routes.js";

import depositRouter from './app/routes/deposit.routes.js';

import withdrawalRouter from './app/routes/withdrawal.routes.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(bodyParser.json({ limit: '15mb' }));
app.use(cors());
app.use('/signature', express.static(path.join(__dirname, 'img')));

const api = '/api';
const authenticator = `${api}/authenticator`;
const user = `${api}/user`;
const showBalance = `${api}/account`;

const paymentService = `${api}/payment-service`;
const loanPayment = `${api}/loan-payment`;
const loanList = `${api}/loan-list`;
const createAccount = `${api}/create`;

const clientService = `${api}/client`;

const deposit = `${api}/deposit`;

const withdrawal = `${api}/withdrawal`;

app.use(authenticator, auhenticatorRouter);
app.use(user, userRouter);
app.use(showBalance, accountRouter);
app.use(createAccount, accountRouter);
app.use(paymentService, paymentServiceRouter);
app.use(loanPayment, loanPaymentRouter);
app.use(loanList, loanListRouter);

app.use(clientService, clientRouter);

app.use(deposit, depositRouter);

app.use(withdrawal, withdrawalRouter);

export default app;
