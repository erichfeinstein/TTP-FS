import React from 'react';
import axios from 'axios';

//Components
import PortfolioTable from './PortfolioTable';
import Purchase from './Purchase';

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

  purchase = async (tickerSymbol, numberOfShares) => {
    await axios.post('/api/purchases', {
      tickerSymbol,
      numberOfShares,
    });
    await this.retrievePortfolio();
  };

  render() {
    return (
      <div id="portfolio-container">
        <div id="portfolio-page-container">
          <PortfolioTable stocks={this.state.stocks} />
          <Purchase purchase={this.purchase} />
        </div>
      </div>
    );
  }
}
