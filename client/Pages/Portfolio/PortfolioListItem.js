import React from 'react';

export const PortfolioListItem = props => {
  const {
    tickerSymbol,
    numberOfSharesOwned,
    latestPrice,
    marketOpen,
  } = props.stock;
  const fontColor =
    (latestPrice > marketOpen && 'priceUp') ||
    (latestPrice < marketOpen && 'priceDown') ||
    (latestPrice === marketOpen && 'priceEven');
  return (
    <div className={`portfolio-list-item ${fontColor}`}>
      <span>
        {tickerSymbol}
        {' - '}
        {numberOfSharesOwned} Shares
      </span>
      <span>
        Value: ${(props.stock.latestPrice * numberOfSharesOwned).toFixed(2)}
      </span>
    </div>
  );
};
