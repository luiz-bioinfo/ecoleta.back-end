import Knex from 'knex';

export async function up(knex: Knex) {
  return await knex.schema.createTable('point_items', table => {
    table.integer('point').unsigned().notNullable();
    table.foreign('point').references('id').inTable('points').onUpdate('cascade').onDelete('cascade');

    table.integer('item').unsigned().notNullable();
    table.foreign('item').references('id').inTable('items').onUpdate('cascade').onDelete('cascade');
  });
};

export async function down(knex: Knex) {
  return await knex.schema.dropTable('point_items');
};