import React from 'react';
import axios from 'axios';

//Components
import PortfolioTable from './PortfolioTable';
import Purchase from './Purchase';
import Sell from './Sell';

export default class Portfolio extends React.Component {
  constructor() {
    super();
    this.state = {
      stocks: [],
    };
  }

  //setInterval update all prices

  async componentDidMount() {
    await this.retrievePortfolio();
  }

  retrievePortfolio = async () => {
    const { data } = await axios.get(
      `/api/users/${this.props.userId}/portfolio`
    );
    const stocks = await Promise.all(
      data.map(async stock => {
        const res = await axios.get(`/api/stocks/${stock.tickerSymbol}`);
        return {
          tickerSymbol: stock.tickerSymbol,
          numberOfSharesOwned: stock.numberOfSharesOwned,
          marketOpen: res.data.open,
          latestPrice: res.data.latestPrice,
        };
      })
    );
    this.setState({
      stocks,
    });
  };

  purchase = async (tickerSymbol, numberOfShares, pricePerShare = 0) => {
    await axios.post('/api/transactions', {
      tickerSymbol,
      numberOfShares,
      isPurchase: true,
    });
    this.props.updateBalance(true, pricePerShare * numberOfShares * 100);
    await this.retrievePortfolio();
  };

  sell = async (tickerSymbol, numberOfShares) => {
    const { data } = await axios.get(`/api/stocks/${tickerSymbol}`);
    if (data) {
      await axios.post('/api/transactions', {
        tickerSymbol,
        numberOfShares,
        isPurchase: false,
      });
      this.props.updateBalance(false, data.latestPrice * numberOfShares * 100);
      await this.retrievePortfolio();
    }
  };

  render() {
    return (
      <div id="portfolio-container">
        <div id="portfolio-page-container">
          <PortfolioTable stocks={this.state.stocks} />
          <div id="transaction-cta-container">
            <Purchase purchase={this.purchase} />
            <br />
            <Sell stocks={this.state.stocks} sell={this.sell} />
          </div>
        </div>
      </div>
    );
  }
}
