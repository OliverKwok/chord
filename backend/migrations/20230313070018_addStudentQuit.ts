import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('student', (table) => {
    table.string('is_quitted');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('student', (table) => {
    table.dropColumn('is_quitted');
  });
}
