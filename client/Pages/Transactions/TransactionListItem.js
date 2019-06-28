import React from 'react';

export const TransactionListItem = props => {
  const {
    tickerSymbol,
    numberOfShares,
    priceTradedAt,
    isPurchase,
  } = props.purchase;
  const transactionType = isPurchase ? 'BUY' : 'SELL';
  return (
    <div>
      <div className="transaction-list-item">
        <span>{`${transactionType} (${tickerSymbol}) - ${numberOfShares} Shares`}</span>
        <span>{`@ $${priceTradedAt / 100}`}</span>
      </div>
      <hr />
    </div>
  );
};
