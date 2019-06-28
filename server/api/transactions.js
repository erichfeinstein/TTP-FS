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
  await user.save();

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
const sell = async (
  user,
  userId,
  numberOfShares,
  latestPrice,
  tickerSymbol
) => {
  //Get the user's current number of shares in a stock, if they have any
  const existingStock = await Stock.findOne({
    where: {
      tickerSymbol,
      userId,
    },
  });
  if (existingStock) {
    const newShareCount =
      Number(existingStock.numberOfSharesOwned) - Number(numberOfShares);
    if (newShareCount >= 0) {
      //Create a transaction for transaction history
      const transaction = await Transaction.create({
        tickerSymbol,
        numberOfShares,
        priceTradedAt: latestPrice * 100, //Adjust for cents
        isPurchase: false,
      });

      transaction.setUser(user);

      if (newShareCount === 0) {
        //If no shares remain after this transaction, remove this row
        await existingStock.destroy();
      } else {
        //Update existing stock count
        existingStock.numberOfSharesOwned = newShareCount;
        await existingStock.save();
      }

      //Update user balance
      user.balance += numberOfShares * latestPrice * 100;
      await user.save();
    } else
      throw new Error(
        'Error! You cannot sell more shares than you currently have!'
      );
  } else {
    throw new Error('Error! You cannot sell stock you do not have!');
  }
};

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
      if (isPurchase) {
        if (user.balance < numberOfShares * latestPrice * 100) {
          res.status(304).send('Not enough funds to purchase!');
        } else {
          await purchase(
            user,
            userId,
            numberOfShares,
            latestPrice,
            tickerSymbol
          );
          res.status(201).send('Successfully traded');
        }
      } else {
        await sell(user, userId, numberOfShares, latestPrice, tickerSymbol);
        res.status(201).send('Successfully traded');
      }
    } else {
      res.send('You must be signed in to trade');
    }
  } catch (error) {
    next(error);
  }
});
