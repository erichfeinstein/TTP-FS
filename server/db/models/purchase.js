const Sequelize = require('sequelize');
const db = require('../db');

const Purchase = db.define('purchase', {
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
});

module.exports = Purchase;
