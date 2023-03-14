import { Knex } from 'knex';
import * as bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // check before insert instead of deleting table
  async function seedRow(table: string, rowData: object) {
    let row = await knex(table).select('id').where(rowData).first();
    if (!row) {
      let rows = await knex(table).insert(rowData).returning('id');
      row = rows[0];
    }
    return row;
  }

  // Inserts seed entries
  const encryptedPassword = await bcrypt.hash('1122', 10);
  await seedRow('users', {
    username: 'charis',
    password: encryptedPassword,
  });
}
