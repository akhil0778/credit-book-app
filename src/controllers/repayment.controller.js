const db = require('../config/db');
const axios = require('axios');
const repaymentModel = require('../models/repayment.model');

const addRepayment = async (req, res) => {
  const { loan_id, amount, date } = req.body;
  const userId = req.user.userId;

  try {
    // Verify loan belongs to user
    const loan = await db('loans').where({ id: loan_id, user_id: userId }).first();
    if (!loan) return res.status(404).json({ error: 'Loan not found' });

    // Add repayment
    const repaymentId = await repaymentModel.addRepayment({ loan_id, amount, date });

    // Calculate new balance
    const totalRepaid = await repaymentModel.getTotalRepaid(loan_id);
    const remaining = parseFloat(loan.amount) - parseFloat(totalRepaid);

    // Update loan status
    let status = loan.status;
    if (remaining <= 0) {
      status = 'paid';
    } else if (new Date(date) > new Date(loan.due_date)) {
      status = 'overdue';
    } else {
      status = 'pending';
    }

    await db('loans').where({ id: loan_id }).update({ status });

    // Fetch shopkeeper webhook URL
    const user = await db('users').where({ id: userId }).first();

    // Send webhook if available
    if (user.webhook_url) {
      try {
        await axios.post(user.webhook_url, {
          event: 'repayment_made',
          data: {
            userId,
            loanId: loan_id,
            repaymentId,
            amount,
            date,
            remaining_balance: remaining,
            loan_status: status,
          },
        });
        console.log('✅ Webhook sent successfully');
      } catch (error) {
        console.warn('⚠️ Webhook failed:', error.message);
      }
    }

    res.json({ message: 'Repayment added', remaining_balance: remaining });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to record repayment' });
  }
};

const getRepayments = async (req, res) => {
  const loanId = req.params.loanId;
  const userId = req.user.userId;

  try {
    const loan = await db('loans').where({ id: loanId, user_id: userId }).first();
    if (!loan) return res.status(404).json({ error: 'Loan not found' });

    const repayments = await repaymentModel.getRepaymentsByLoan(loanId);
    res.json(repayments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch repayments' });
  }
};

module.exports = {
  addRepayment,
  getRepayments,
};
