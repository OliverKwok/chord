import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('student').del();

  // Inserts seed entries
  await knex('student').insert([
    { name: 'StudentA' },
    { name: 'StudentB' },
    { name: 'StudentC' },
    { name: 'StudentD' },
    { name: 'StudentE' },
    { name: 'StudentF' },
    { name: 'StudentG' },
    { name: 'StudentF' },
    { name: 'StudentI' },
    { name: 'StudentF' },
    { name: 'StudentK' },
    { name: 'StudentL' },
    { name: 'StudentM' },
    { name: 'StudentN' },
    { name: 'StudentO' },
    { name: 'StudentP' },
    { name: 'StudentQ' },
    { name: 'StudentR' },
    { name: 'StudentS' },
  ]);
}
