const router = require('express').Router();
const { Transaction, Stock, User } = require('../db/models');
module.exports = router;

//IEX functions
const { getQuote } = require('../iex');

//Make a new stock transaction
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

      //TODO add check if buy or sell
      if (user.balance < numberOfShares * latestPrice * 100) {
        res.status(304).send('Not enough funds to purchase!');
      } else {
        //Update user balance
        user.balance -= numberOfShares * latestPrice * 100;
        user.save();

        //Create a transaction for transaction history
        const transaction = await Transaction.create({
          tickerSymbol,
          numberOfShares,
          priceTradedAt: latestPrice * 100, //Adjust for cents
        });

        transaction.setUser(user);

        //Update the user's share count in this stock (this makes it easier to sell stock later)
        const existingStock = await Stock.findOne({
          where: {
            tickerSymbol,
            userId,
          },
        });
        if (existingStock) {
          const newShareCount =
            Number(existingStock.numberOfSharesOwned) + Number(numberOfShares);
          existingStock.numberOfSharesOwned = newShareCount;
          await existingStock.save();
        } else {
          const newStock = await Stock.create({
            tickerSymbol,
            numberOfSharesOwned: numberOfShares,
          });
          newStock.setUser(user);
        }
        res.status(201).send('Successfully traded');
      }
    } else {
      res.send('You must be signed in to trade');
    }
  } catch (error) {
    next(error);
  }
});
