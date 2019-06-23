const router = require('express').Router();
const { getQuote } = require('../iex');
module.exports = router;

router.get('/:tickerSymbol', async (req, res, next) => {
  try {
    if (req.user) {
      const tickerSymbol = req.params.tickerSymbol;
      const quote = await getQuote(tickerSymbol);
      res.json(quote);
    } else {
      res.send('You must be signed in to view price info');
    }
  } catch (error) {
    next(error);
  }
});
