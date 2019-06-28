import React from 'react';

export const TransactionListItem = props => {
  return (
    <div>
      <div className="transaction-list-item">
        <span>
          {`BUY (${props.purchase.tickerSymbol}) - ${
            props.purchase.numberOfShares
          } Shares`}
        </span>
        <span>{`@ $${props.purchase.priceTradedAt / 100}`}</span>
      </div>
      <hr />
    </div>
  );
};
