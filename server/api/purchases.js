const router = require('express').Router();
const { Purchase, User } = require('../db/models');
module.exports = router;

//IEX functions
const { getPrice } = require('../iex');

//Make a new stock purchase
router.post('/', async (req, res, next) => {
  try {
    if (req.user) {
      const tickerSymbol = req.body.tickerSymbol;
      const numberOfShares = req.body.numberOfShares;
      const pricePurchasedAt = await getPrice(tickerSymbol);
      //Ensure valid tickerSymbol
      if (pricePurchasedAt < 0) throw new Error('Bad ticker symbol!');
      const purchase = await Purchase.create({
        tickerSymbol,
        numberOfShares,
        pricePurchasedAt,
      });

      const userId = req.user.id;
      purchase.setUser(await User.findById(userId));
      res.status(201).send('Successfully purchased');
    } else {
      res.send('You must be signed in to purchase');
    }
  } catch (error) {
    next(error);
  }
});

//Get a user's purchases (only your own for privacy reasons)
router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const purchases = await Purchase.findAll({
        where: {
          userId: req.user.id,
        },
      });
      res.json(purchases);
    } else {
      res.send('You must be signed in to view purchases');
    }
  } catch (error) {
    next(error);
  }
});

//Portfolio
