const customerModel = require('../models/customer.model');

const getAll = async (req, res) => {
  const customers = await customerModel.getCustomersByUser(req.user.userId);
  res.json(customers);
};

const add = async (req, res) => {
  const data = { ...req.body, user_id: req.user.userId };
  await customerModel.addCustomer(data);
  res.status(201).json({ message: 'Customer added' });
};

const update = async (req, res) => {
  await customerModel.updateCustomer(req.params.id, req.user.userId, req.body);
  res.json({ message: 'Customer updated' });
};

const remove = async (req, res) => {
  await customerModel.deleteCustomer(req.params.id, req.user.userId);
  res.json({ message: 'Customer deleted' });
};

module.exports = { getAll, add, update, remove };
