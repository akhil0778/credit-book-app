const db = require('../config/db');

const getCustomersByUser = (userId) =>
  db('customers').where({ user_id: userId });

const addCustomer = (data) => db('customers').insert(data);

const updateCustomer = (id, userId, data) =>
  db('customers').where({ id, user_id: userId }).update(data);

const deleteCustomer = (id, userId) =>
  db('customers').where({ id, user_id: userId }).del();

module.exports = { getCustomersByUser, addCustomer, updateCustomer, deleteCustomer };
