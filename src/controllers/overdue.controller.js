const db = require('../config/db');

const getOverdueLoans = async (req, res) => {
  const userId = req.user.userId;
  const today = new Date().toISOString().split('T')[0];

  try {
    const overdueLoans = await db('loans')
      .join('customers', 'loans.customer_id', 'customers.id')
      .where('loans.user_id', userId)
      .andWhere('loans.due_date', '<', today)
      .andWhereNot('loans.status', 'paid')
      .select(
        'loans.id as loan_id',
        'customers.name as customer_name',
        'loans.item_description',
        'loans.amount',
        'loans.due_date',
        'loans.status'
      );

    // Calculate pending amount
    const results = await Promise.all(
      overdueLoans.map(async (loan) => {
        const repaid = await db('repayments')
          .where({ loan_id: loan.loan_id })
          .sum('amount as total');

        const paid = Number(repaid[0].total || 0);
        return {
          ...loan,
          pending_amount: (loan.amount - paid).toFixed(2),
        };
      })
    );

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch overdue loans' });
  }
};
module.exports = {
  getOverdueLoans
};