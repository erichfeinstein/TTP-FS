const Sequelize = require('sequelize');
const db = require('../db');

const Transaction = db.define('transaction', {
  tickerSymbol: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  numberOfShares: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1, //Must buy at least one share
    },
  },
  priceTradedAt: {
    type: Sequelize.INTEGER, //In cents
    allowNull: false,
  },
});

module.exports = Transaction;
