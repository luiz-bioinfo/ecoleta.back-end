import Knex from 'knex';

export async function up(knex: Knex) {
  return await knex.schema.createTable('points', table => {
    table.increments();

    table.string('name', 40).notNullable();
    table.string('image').notNullable();
    table.string('email', 30).notNullable();
    table.string('whatsapp', 16).notNullable(); // (00) 9 0000-0000
    table.decimal('latitude').notNullable();
    table.decimal('longitude').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
};

export async function down(knex: Knex) {
  return await knex.schema.dropTable('points');
};