import React from 'react';
import axios from 'axios';

//Components
import { PortfolioTable } from './PortfolioTable';

export default class Portfolio extends React.Component {
  constructor() {
    super();
    this.state = {
      stocks: [],
    };
  }

  async componentDidMount() {
    const { data } = await axios.get(
      `/api/users/${this.props.userId}/portfolio`
    );
    this.setState({
      stocks: data,
    });
  }

  purchase = async (tickerSymbol, numberOfShares) => {
    await axios.post('/api/purchases', {
      tickerSymbol,
      numberOfShares,
    });
  };

  render() {
    return (
      <div id="portfolio-container">
        <h2>Portfolio</h2>
        <div id="portfolio-page-container">
          <PortfolioTable stocks={this.state.stocks} />
          <div id="purchase-container">Purchase Component</div>
        </div>
      </div>
    );
  }
}
