const router = require('express').Router();
const { Transaction, Stock, User } = require('../db/models');
module.exports = router;

//IEX functions
const { getQuote } = require('../iex');

const purchase = async (
  user,
  userId,
  numberOfShares,
  latestPrice,
  tickerSymbol
) => {
  //Update user balance
  user.balance -= numberOfShares * latestPrice * 100;
  user.save();

  //Create a transaction for transaction history
  const transaction = await Transaction.create({
    tickerSymbol,
    numberOfShares,
    priceTradedAt: latestPrice * 100, //Adjust for cents
    isPurchase: true,
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
};
const sell = () => {};

//Make a new stock transaction
router.post('/', async (req, res, next) => {
  try {
    if (req.user) {
      const tickerSymbol = req.body.tickerSymbol.toUpperCase();
      const numberOfShares = req.body.numberOfShares;
      const isPurchase = req.body.isPurchase;

      const { latestPrice } = await getQuote(tickerSymbol);
      //Ensure valid tickerSymbol
      if (latestPrice < 0) throw new Error('Bad ticker symbol!');

      //Verify user has enough balance
      const userId = req.user.id;
      const user = await User.findById(userId);

      //If purchasing, check if the user has enough money to fulfill purchase request
      if (user.balance < numberOfShares * latestPrice * 100 && isPurchase) {
        res.status(304).send('Not enough funds to purchase!');
      } else if (isPurchase) {
        await purchase(user, userId, numberOfShares, latestPrice, tickerSymbol);
        res.status(201).send('Successfully traded');
      } else {
        //!isPurchase
      }
    } else {
      res.send('You must be signed in to trade');
    }
  } catch (error) {
    next(error);
  }
});
