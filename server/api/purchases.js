const router = require('express').Router();
const { Purchase } = require('../db/models');
module.exports = router;

//IEX functions
const { getPrice } = require('../iex');

router.post('/', async (req, res, next) => {
  try {
    if (req.user) {
      const tickerSymbol = req.body.tickerSymbol;
      const numberOfShares = req.body.numberOfShares;
      const pricePurchasedAt = await getPrice(tickerSymbol);
      //Ensure valid tickerSymbol
      if (pricePurchasedAt < 0) throw new Error('Bad ticker symbol!');
      //TODO Add req.user.id to Purchase creation
      await Purchase.create({ tickerSymbol, numberOfShares, pricePurchasedAt });
      res.status(201).send('Successfully purchased');
    } else {
      res.send('You must be signed in to purchase');
    }
  } catch (error) {
    next(error);
  }
});
