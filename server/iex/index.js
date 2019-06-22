const axios = require('axios');

const localToken = require('./token.json').publishableKey;
const token = process.env.TOKEN || localToken;

const URL = 'https://cloud.iexapis.com';

const getPrice = async tickerSymbol => {
  const { data } = await axios.get(
    URL + `/stable/stock/${tickerSymbol}/price?token=${token}`
  );
  return data;
};

module.exports = { getPrice };
