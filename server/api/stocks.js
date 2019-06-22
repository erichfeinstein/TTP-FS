const router = require('express').Router();
const { getPrice } = require('../iex');
module.exports = router;

router.get('/:tickerSymbol', async (req, res, next) => {
  try {
    if (req.user) {
      const tickerSymbol = req.params.tickerSymbol;
      const price = await getPrice(tickerSymbol);
      res.send({ price });
    } else {
      res.send('You must be signed in to view price info');
    }
  } catch (error) {
    next(error);
  }
});
