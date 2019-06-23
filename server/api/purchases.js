const router = require('express').Router();
const { Purchase, Stock, User } = require('../db/models');
module.exports = router;

//IEX functions
const { getQuote } = require('../iex');

//Make a new stock purchase
router.post('/', async (req, res, next) => {
  try {
    if (req.user) {
      const tickerSymbol = req.body.tickerSymbol;
      const numberOfShares = req.body.numberOfShares;
      const pricePurchasedAt = await getQuote(tickerSymbol).latestPrice;
      //Ensure valid tickerSymbol
      if (pricePurchasedAt < 0) throw new Error('Bad ticker symbol!');

      //Create a purchase for purchase history
      const purchase = await Purchase.create({
        tickerSymbol,
        numberOfShares,
        pricePurchasedAt,
      });
      const userId = req.user.id;
      purchase.setUser(await User.findById(userId));

      //Update the user's share count in this stock (this makes it easier to sell stock later)
      const existingStock = await Stock.findOne({
        where: {
          tickerSymbol,
          userId,
        },
      });
      if (existingStock) {
        existingStock.numberOfSharesOwned += numberOfShares;
        await existingStock.save();
      } else {
        console.log('here', tickerSymbol, numberOfShares);
        const newStock = await Stock.create({
          tickerSymbol,
          numberOfSharesOwned: numberOfShares,
        });
        newStock.setUser(await User.findById(userId));
      }
      res.status(201).send('Successfully purchased');
    } else {
      res.send('You must be signed in to purchase');
    }
  } catch (error) {
    next(error);
  }
});
