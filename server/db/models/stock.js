const Sequelize = require('sequelize');
const db = require('../db');

const Stock = db.define('stock', {
  tickerSymbol: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  numberOfSharesOwned: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0, //Can't have negative shares
    },
  },
});

module.exports = Stock;
