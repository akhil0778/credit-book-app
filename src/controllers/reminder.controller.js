const db = require('../config/db');
const sendReminder = require('../utils/reminderService');
const dayjs = require('dayjs');

const sendLoanReminders = async (req, res) => {
  const userId = req.user.userId;

  try {
    const today = dayjs().format('YYYY-MM-DD');

    const overdueLoans = await db('loans')
      .where('user_id', userId)
      .andWhere('status', 'pending')
      .andWhere('due_date', '<', today);

    for (const loan of overdueLoans) {
      const customer = await db('customers').where('id', loan.customer_id).first();
      sendReminder(customer, loan); // mock SMS
    }

    res.status(200).json({ message: `${overdueLoans.length} reminders sent (mocked)` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send reminders' });
  }
};

module.exports = { sendLoanReminders };