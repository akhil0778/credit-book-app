const db = require('../config/db');

const getSummary = async (req, res) => {
  const userId = req.user.userId;

  try {
    // Total loaned
    const totalLoaned = await db('loans')
      .where({ user_id: userId })
      .sum('amount as total');
    
    // Total collected
    const totalCollected = await db('repayments')
      .join('loans', 'repayments.loan_id', 'loans.id')
      .where('loans.user_id', userId)
      .sum('repayments.amount as total');

    // Overdue amount
    const overdueAmount = await db('loans')
      .where({ user_id: userId, status: 'overdue' })
      .sum('amount as total');

    // Average repayment time (in days)
    const paidLoans = await db('loans')
      .where({ user_id: userId, status: 'paid' })
      .select('id', 'issue_date');

    let totalDays = 0;
    let count = 0;

    for (const loan of paidLoans) {
      const lastRepayment = await db('repayments')
        .where({ loan_id: loan.id })
        .orderBy('date', 'desc')
        .first();

      if (lastRepayment) {
        const daysTaken =
          (new Date(lastRepayment.date) - new Date(loan.issue_date)) /
          (1000 * 60 * 60 * 24);
        totalDays += daysTaken;
        count++;
      }
    }

    const avgRepaymentTime = count > 0 ? (totalDays / count).toFixed(2) : 0;

    res.json({
      total_loaned: Number(totalLoaned[0].total || 0),
      total_collected: Number(totalCollected[0].total || 0),
      overdue_amount: Number(overdueAmount[0].total || 0),
      avg_repayment_time: avgRepaymentTime,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
};

module.exports = {
  getSummary
};