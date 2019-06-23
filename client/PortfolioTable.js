import React from 'react';
import axios from 'axios';

//Components
import { PortfolioListItem } from './PortfolioListItem';

export default class PortfolioTable extends React.Component {
  render() {
    let totalValue = 0;
    return (
      <div className="table-container">
        {this.props.stocks.map((stock, i) => {
          totalValue += stock.latestPrice * stock.numberOfSharesOwned;
          return (
            <div key={i}>
              <PortfolioListItem stock={stock} />
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}
