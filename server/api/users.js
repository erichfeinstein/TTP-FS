const router = require('express').Router();
const { Transaction, Stock } = require('../db/models');
module.exports = router;

//Get a user's transactions (only your own for privacy reasons)
router.get('/:id/transactions', async (req, res, next) => {
  try {
    if (req.user) {
      const transactions = await Transaction.findAll({
        where: {
          userId: req.params.id,
        },
      });
      res.json(transactions);
    } else {
      res.send('You must be signed in to view transactions');
    }
  } catch (error) {
    next(error);
  }
});

//Get a user's portfolio (only your own for privacy reasons)
router.get('/:id/portfolio', async (req, res, next) => {
  try {
    if (req.user) {
      const stocks = await Stock.findAll({
        where: {
          userId: req.params.id,
        },
      });
      res.json(stocks);
    } else {
      res.send('You must be signed in to view portfolio');
    }
  } catch (error) {
    next(error);
  }
});
