import React from 'react';

//Components
import PortfolioListItem from './PortfolioListItem';

export const PortfolioTable = props => {
  return (
    <div className="table-container">
      {props.stocks.map((stock, i) => (
        <div key={i}>
          <PortfolioListItem stock={stock} />
          <hr />
        </div>
      ))}
    </div>
  );
};
