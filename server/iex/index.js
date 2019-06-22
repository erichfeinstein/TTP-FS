const axios = require('axios');

const localToken = require('./token.json').publishableKey;
const token = process.env.TOKEN || localToken;

const URL = 'https://cloud.iexapis.com';

const getPrice = async tickerSymbol => {
  try {
    const { data } = await axios.get(
      URL + `/stable/stock/${tickerSymbol}/price?token=${token}`
    );
    return data;
  } catch (error) {
    console.error('Error! Bad ticker symbol');
    return -1;
  }
};

module.exports = { getPrice };
