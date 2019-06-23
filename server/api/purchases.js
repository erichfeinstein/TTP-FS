const router = require('express').Router();
const { Purchase, Stock, User } = require('../db/models');
module.exports = router;

//IEX functions
const { getQuote } = require('../iex');

//Make a new stock purchase
router.post('/', async (req, res, next) => {
  try {
    if (req.user) {
      const tickerSymbol = req.body.tickerSymbol.toUpperCase();
      const numberOfShares = req.body.numberOfShares;
      const { latestPrice } = await getQuote(tickerSymbol);
      //Ensure valid tickerSymbol
      if (latestPrice < 0) throw new Error('Bad ticker symbol!');

      //Verify user has enough balance
      const userId = req.user.id;
      const user = await User.findById(userId);
      if (user.balance < numberOfShares * latestPrice * 100) {
        res.status(304).send('Not enough funds to purchase!');
      } else {
        //Update user balance
        user.balance -= numberOfShares * latestPrice * 100;
        user.save();

        //Create a purchase for purchase history
        const purchase = await Purchase.create({
          tickerSymbol,
          numberOfShares,
          pricePurchasedAt: latestPrice * 100, //Adjust for cents
        });

        purchase.setUser(user);

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
          const newStock = await Stock.create({
            tickerSymbol,
            numberOfSharesOwned: numberOfShares,
          });
          newStock.setUser(user);
        }
        res.status(201).send('Successfully purchased');
      }
    } else {
      res.send('You must be signed in to purchase');
    }
  } catch (error) {
    next(error);
  }
});
