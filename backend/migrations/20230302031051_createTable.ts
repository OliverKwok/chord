import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username');
    table.string('password');
  });

  await knex.schema.createTable('students', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.enu('level', [
      'K1',
      'K2',
      'K3',
      'P1',
      'P2',
      'P3',
      'P4',
      'P5',
      'P6',
      'S1',
      'S2',
      'S3',
      'S4',
      'S5',
      'S6',
    ]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users');
}
