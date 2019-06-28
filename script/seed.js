'use strict';

const db = require('../server/db');
const { Transaction, User } = require('../server/db/models');

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

  const transactions = await Promise.all([
    Transaction.create({
      tickerSymbol: 'AAPL',
      numberOfShares: 25,
      priceTradedAt: 10000,
      isPurchase: true,
    }),
    Transaction.create({
      tickerSymbol: 'GOOG',
      numberOfShares: 15,
      priceTradedAt: 300000,
      isPurchase: true,
    }),
    Transaction.create({
      tickerSymbol: 'GOOG',
      numberOfShares: 50,
      priceTradedAt: 3000,
      isPurchase: true,
    }),
  ]);

  await transactions[0].setUser(users[0]);
  await transactions[1].setUser(users[0]);
  await transactions[2].setUser(users[0]);
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
