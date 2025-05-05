const db = require('../config/db');

const createUser = (email, password) => db('users').insert({ email, password });

const findUserByEmail = (email) => db('users').where({ email }).first();

module.exports = { createUser, findUserByEmail };
