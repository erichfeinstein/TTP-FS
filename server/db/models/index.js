const User = require('./user');
const Purchase = require('./purchase');
const Stock = require('./stock');

Purchase.belongsTo(User);
User.hasMany(Purchase);

Stock.belongsTo(User);

module.exports = {
  User,
  Purchase,
  Stock,
};
