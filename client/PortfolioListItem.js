import React from 'react';
import axios from 'axios';

export default class PortfolioListItem extends React.Component {
  constructor() {
    super();
    this.state = {
      marketOpen: 0,
      latestPrice: 0,
    };
  }

  async componentDidMount() {
    const { data } = await axios.get(
      `/api/stocks/${this.props.stock.tickerSymbol}`
    );
    const marketOpen = data.open;
    const latestPrice = data.latestPrice;

    this.setState({
      marketOpen,
      latestPrice,
    });

    //Interval on price update here?
  }

  render() {
    const { latestPrice, marketOpen } = this.state;
    return (
      <div className="portfolio-list-item">
        <span>
          {this.props.stock.tickerSymbol} -{' '}
          {this.props.stock.numberOfSharesOwned} Shares
        </span>
        <span
          className={
            (latestPrice > marketOpen && 'priceUp') ||
            (latestPrice < marketOpen && 'priceDown') ||
            (latestPrice === marketOpen && 'priceEven')
          }
        >
          {this.state.latestPrice}
        </span>
      </div>
    );
  }
}
