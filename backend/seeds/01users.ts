import { Knex } from 'knex';
import * as bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  const encryptedPassword = await bcrypt.hash('1122', 10);
  await knex('users').insert([
    { username: 'charis', password: encryptedPassword },
  ]);
}
