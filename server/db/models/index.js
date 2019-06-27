const User = require('./user');
const Transaction = require('./Transaction');
const Stock = require('./stock');

Transaction.belongsTo(User);
User.hasMany(Transaction);

Stock.belongsTo(User);

module.exports = {
  User,
  Transaction,
  Stock,
};
