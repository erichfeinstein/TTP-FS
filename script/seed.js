'use strict';

const db = require('../server/db');
const { User } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  await Promise.all([
    User.create({
      name: 'Cody',
      email: 'cody@email.com',
      password: '123',
    }),
    User.create({
      name: 'Murphy',
      email: 'murphy@email.com',
      password: '123',
    }),
    User.create({
      name: 'TopDawg',
      email: 'tdawg@email.com',
      password: '123',
    }),
  ]);
}
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}
if (module === require.main) {
  runSeed();
}
module.exports = seed;
