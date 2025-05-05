const loanModel = require('../models/loan.model');

const create = async (req, res) => {
  const { customer_id, amount, due_date, note } = req.body;
  try {
    await loanModel.createLoan({
      user_id: req.user.userId,
      customer_id,
      amount,
      due_date,
      note,
    });
    res.status(201).json({ message: 'Loan created' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create loan' });
  }
};

const getAll = async (req, res) => {
  try {
    const loans = await loanModel.getLoansByUser(req.user.userId);
    res.json(loans);
  } catch {
    res.status(500).json({ error: 'Failed to fetch loans' });
  }
};

const getByCustomer = async (req, res) => {
  const customerId = req.params.customerId;
  try {
    const loans = await loanModel.getLoansByCustomer(req.user.userId, customerId);
    res.json(loans);
  } catch {
    res.status(500).json({ error: 'Failed to fetch customer loans' });
  }
};

module.exports = {
  create,
  getAll,
  getByCustomer,
};
