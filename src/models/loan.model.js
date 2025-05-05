const db = require('../config/db');

const createLoan = (data) => db('loans').insert(data);

const getLoansByUser = (userId) => db('loans').where({ user_id: userId });

const getLoansByCustomer = (userId, customerId) =>
  db('loans').where({ user_id: userId, customer_id: customerId });

module.exports = {
  createLoan,
  getLoansByUser,
  getLoansByCustomer,
};
