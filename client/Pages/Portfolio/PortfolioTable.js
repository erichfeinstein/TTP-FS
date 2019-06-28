import React from 'react';

//Components
import { PortfolioListItem } from './PortfolioListItem';

export default class PortfolioTable extends React.Component {
  render() {
    let totalValue = 0;
    return (
      <div className="table-container">
        <h2>Portfolio</h2>
        {this.props.stocks.map((stock, i) => {
          totalValue += stock.latestPrice * stock.numberOfSharesOwned;
          return (
            <div key={i}>
              <PortfolioListItem stock={stock} />
              <hr />
            </div>
          );
        })}
        <h2>Total Value: ${Number(totalValue).toFixed(2)}</h2>
      </div>
    );
  }
}
