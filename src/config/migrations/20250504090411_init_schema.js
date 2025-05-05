exports.up = function (knex) {
    return knex.schema
      .createTable('users', (table) => {
        table.increments('id').primary();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('webhook_url');
        table.timestamps(true, true);
      })
      .createTable('customers', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.string('name').notNullable();
        table.string('phone').notNullable();
        table.string('address');
        table.integer('trust_score').defaultTo(5);
        table.integer('credit_limit').defaultTo(0);
        table.timestamps(true, true);
      })
      .createTable('loans', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.integer('customer_id').unsigned().references('id').inTable('customers').onDelete('CASCADE');
        table.decimal('amount', 10, 2).notNullable();
        table.date('due_date').notNullable();
        table.string('status').defaultTo('pending');
        table.string('note');
        table.timestamps(true, true);
      })
      .createTable('repayments', (table) => {
        table.increments('id').primary();
        table.integer('loan_id').unsigned().references('id').inTable('loans').onDelete('CASCADE');
        table.decimal('amount', 10, 2).notNullable();
        table.date('date').notNullable();
        table.timestamps(true, true);
      });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('customers').dropTableIfExists('users').dropTableIfExists('loans').dropTableIfExists('repayments');
  };
  