import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('student').del();

  // Inserts seed entries
  await knex('student').insert([
    { name: '鄺昇溢' },
    { name: '姚峻禹' },
    { name: '余昊霆' },
    { name: '蘇仲賢' },
    { name: '徐然' },
    { name: '楊程光' },
    { name: '黃天悠' },
    { name: '李思靖' },
    { name: '傅倫纓' },
    { name: '鄧子涵' },
    { name: '譚智灦' },
    { name: '洪志澄' },
    { name: '譚家傑' },
    { name: '楊程匡' },
    { name: '蘇逸軒' },
    { name: '蘇仲賢' },
    { name: '郭曉澄' },
    { name: '鄭朗曦' },
    { name: '施順搖' },
    { name: '何卓琛' },
    { name: '吳沛霖' },
    { name: '易智熙' },
    { name: '蘇家洋' },
    { name: '李虹臻' },
  ]);
}
