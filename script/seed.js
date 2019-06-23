'use strict';

const db = require('../server/db');
const { Purchase, User } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
    }),
    User.create({
      email: 'tdawg@email.com',
      password: '123',
    }),
  ]);

  const purchases = await Promise.all([
    Purchase.create({
      tickerSymbol: 'AAPL',
      numberOfShares: 25,
      pricePurchasedAt: 10000,
    }),
    Purchase.create({
      tickerSymbol: 'GOOG',
      numberOfShares: 15,
      pricePurchasedAt: 300000,
    }),
    Purchase.create({
      tickerSymbol: 'GOOG',
      numberOfShares: 50,
      pricePurchasedAt: 3000,
    }),
  ]);

  await purchases[0].setUser(users[0]);
  await purchases[1].setUser(users[0]);
  await purchases[2].setUser(users[0]);
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
