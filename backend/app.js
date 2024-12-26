/*
* @author
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import auhenticatorRouter from "./app/routes/authenticator.routes.js";
import userRouter from "./app/routes/user.routes.js";
import accountRouter from "./app/routes/account.routes.js";
import paymentServiceRouter from "./app/routes/payment-services.routes.js";
import loanPaymentRouter from "./app/routes/loan-payment.routes.js";
import loanListRouter from "./app/routes/loan-list.routes.js";
import creditCardRouter from "./app/routes/credit-card.routes.js";
import paycreditcardrouter from "./app/routes/pay-credit-card.routes.js";
import updatecurren from "./app/routes/update-currency.routes.js";
import surveyQuestionsRoute from './app/routes/survey-question.routes.js';
import surveyCreateRoute from './app/routes/survey-create.routes.js';
import surveyListRouter from "./app/routes/list-survey.routes.js";
import complaintListRouter from "./app/routes/list-complaints.routes.js";
import userManagementRouter from "./app/routes/user-management.routes.js";
import inventory from "./app/routes/inventory.routes.js"
import moni from "./app/routes/monitoring.routes.js"
import clientRouter from "./app/routes/client.routes.js";
import depositRouter from './app/routes/deposit.routes.js';
import withdrawalRouter from './app/routes/withdrawal.routes.js';
import databaseRouter from './app/routes/database.routes.js';

const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: '15mb' }));
app.use(cors());
const api = '/api';

const monitor = `${api}/monitoring`;
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
const surveygetquestion = `${api}/survey-questions`;
const createSurveyRoute = `${api}/create-survey`;
const surveyList = `${api}/survey-list`;

const complaintList = `${api}/complaint-list`;
const userManagement = `${api}/users`;
const database = `${api}/database`;

const clientService = `${api}/client`;

const deposit = `${api}/deposit`;

const withdrawal = `${api}/withdrawal`;
const invetory = `${api}/inventory`;

app.use(monitor, moni);
app.use(invetory, inventory);
app.use(authenticator, auhenticatorRouter);
app.use(user, userRouter);
app.use(account, accountRouter);
app.use(createAccount, accountRouter);
app.use(paymentService, paymentServiceRouter);
app.use(loanPayment, loanPaymentRouter);
app.use(loanList, loanListRouter);
app.use(database, databaseRouter);

app.use(creditCard, creditCardRouter);
app.use(paycreditcard, paycreditcardrouter)
app.use(surveygetquestion, surveyQuestionsRoute)
app.use(createSurveyRoute, surveyCreateRoute);
app.use(surveyList, surveyListRouter);

app.use(updcurrencys,updatecurren)

app.use(complaintList, complaintListRouter);
app.use(userManagement, userManagementRouter);

app.use(clientService, clientRouter);

app.use(deposit, depositRouter);

app.use(withdrawal, withdrawalRouter);

export default app;
