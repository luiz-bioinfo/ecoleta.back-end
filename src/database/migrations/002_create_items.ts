import Knex from 'knex';

export async function up(knex: Knex) {
  return await knex.schema.createTable('items', table => {
    table.increments();

    table.string('title', 40).notNullable();
    table.string('image').notNullable();
  });
};

export async function down(knex: Knex) {
  return await knex.schema.dropTable('items');
};