const router = require('express').Router();
const sequelize = require('sequelize');
const { Purchase, Stock, User } = require('../db/models');
module.exports = router;

//Get a user's purchases (only your own for privacy reasons)
router.get('/:id/purchases', async (req, res, next) => {
  try {
    if (req.user) {
      const purchases = await Purchase.findAll({
        where: {
          userId: req.params.id,
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

//Get a user's purchases (only your own for privacy reasons)
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
      res.send('You must be signed in to view purchases');
    }
  } catch (error) {
    next(error);
  }
});
