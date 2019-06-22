const User = require('./user');
const Purchase = require('./purchase');

Purchase.belongsTo(User);
User.hasMany(Purchase);

module.exports = {
  User,
  Purchase,
};
