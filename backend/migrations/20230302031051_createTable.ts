import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username');
    table.string('password');
  });

  await knex.schema.createTable('student', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.date('birthdy');
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
    table.string('school');
    table.string('phone');
    table.string('phone_relation');
    table.string('phone2');
    table.string('phone2_relation');
    table.string('estate');
    table.string('remark');
  });

  await knex.schema.createTable('print_record', (table) => {
    table.increments('id').primary();
    table.string('student_id').references('student.id');
    table.string('print_file_name');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('print_record');
  await knex.schema.dropTableIfExists('student');
  await knex.schema.dropTableIfExists('users');
}
