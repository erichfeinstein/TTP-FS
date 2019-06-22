const router = require('express').Router();
const { Purchase } = require('../db/models');
module.exports = router;

router.post('/', async (req, res, next) => {
  try {
    if (req.user) {
      const tickerSymbol = req.body.tickerSymbol;
      const numberOfShares = req.body.numberOfShares;
      await Purchase.create({ tickerSymbol, numberOfShares });
      res.status(201).send('added product');
    } else {
      res.send('You must be signed in to purchase');
    }
  } catch (error) {
    next(error);
  }
});
