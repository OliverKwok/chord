import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('student', (table) => {
    table.enu('gender', ['M', 'F']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('student', (table) => {
    table.dropColumn('gender');
  });
}
