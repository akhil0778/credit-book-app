const db = require('../config/db');

const addRepayment = (data) => db('repayments').insert(data);

const getRepaymentsByLoan = (loanId) =>
  db('repayments').where({ loan_id: loanId }).orderBy('date', 'asc');

const getTotalRepaid = async (loanId) => {
  const result = await db('repayments')
    .where({ loan_id: loanId })
    .sum('amount as total');
  return result[0].total || 0;
};

module.exports = {
  addRepayment,
  getRepaymentsByLoan,
  getTotalRepaid,
};
