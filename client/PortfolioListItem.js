import React from 'react';

export const PortfolioListItem = props => {
  const {
    tickerSymbol,
    numberOfSharesOwned,
    latestPrice,
    marketOpen,
  } = props.stock;
  return (
    <div className="portfolio-list-item">
      <span>
        {tickerSymbol}
        {' - '}
        {numberOfSharesOwned} Shares
      </span>
      <span
        className={
          (latestPrice > marketOpen && 'priceUp') ||
          (latestPrice < marketOpen && 'priceDown') ||
          (latestPrice === marketOpen && 'priceEven')
        }
      >
        Current Price: ${props.stock.latestPrice}
      </span>
    </div>
  );
};
