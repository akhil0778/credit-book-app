const express = require('express');
const authRoutes = require('./routes/auth.route');
const customerRoutes = require('./routes/customer.route');
const loanRoutes = require('./routes/loan.route');
const repaymentRoutes = require('./routes/repayment.route');
const summaryRoutes = require('./routes/summary.route');
const receiptRoutes = require('./routes/receipt.route');
const reminderRoutes = require('./routes/reminder.route');
const webhookRoutes = require('./routes/webhook.route');

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/repayments', repaymentRoutes);
app.use('/api', summaryRoutes);
app.use('/api', receiptRoutes);
app.use('/api', reminderRoutes);
app.use('/api', webhookRoutes);


module.exports = app;
