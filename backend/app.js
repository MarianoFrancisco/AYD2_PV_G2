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

import creditCardRouter from "./app/routes/credit-card.routes.js";

import paycreditcardrouter from "./app/routes/pay-credit-card.routes.js";

import updatecurren from "./app/routes/update-currency.routes.js";

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
const account = `${api}/account`;

const paymentService = `${api}/payment-service`;
const loanPayment = `${api}/loan-payment`;
const loanList = `${api}/loan-list`;
const createAccount = `${api}/create`;

const creditCard = `${api}/get-credit-card`;
const paycreditcard = `${api}/pay-credit-card`;

const updcurrencys = `${api}/accounts/update-currency`;

const clientService = `${api}/client`;

const deposit = `${api}/deposit`;

const withdrawal = `${api}/withdrawal`;

app.use(authenticator, auhenticatorRouter);
app.use(user, userRouter);
app.use(account, accountRouter);
app.use(createAccount, accountRouter);
app.use(paymentService, paymentServiceRouter);
app.use(loanPayment, loanPaymentRouter);
app.use(loanList, loanListRouter);

app.use(creditCard, creditCardRouter);
app.use(paycreditcard, paycreditcardrouter)

app.use(updcurrencys,updatecurren)

app.use(clientService, clientRouter);

app.use(deposit, depositRouter);

app.use(withdrawal, withdrawalRouter);

export default app;
