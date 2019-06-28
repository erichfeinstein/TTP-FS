import React from 'react';

export default class Sell extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedStock: null,
      numberOfShares: 0,
    };
  }

  createNumberOfSharesOptions = maxNumberOfShares => {
    let options = [];
    for (let i = 0; i <= maxNumberOfShares; i++) {
      options.push(<option key={i}>{i}</option>);
    }
    return options;
  };

  render() {
    const selectedStock = JSON.parse(this.state.selectedStock);
    return (
      <div id="transaction-container">
        <h2>Sell</h2>
        <div>Ticker Symbol</div>
        <br />
        <select
          onChange={evt =>
            this.setState({
              selectedStock: evt.target.value,
            })
          }
        >
          <option value={null} />
          {this.props.stocks.map((stock, index) => {
            return (
              <option key={index} value={JSON.stringify(stock)}>
                {stock.tickerSymbol}
              </option>
            );
          })}
        </select>
        <br />
        <div>Number of Shares</div>
        <br />
        <select
          onChange={evt =>
            this.setState({
              numberOfShares: Number(evt.target.value),
            })
          }
        >
          {this.createNumberOfSharesOptions(
            this.state.selectedStock ? selectedStock.numberOfSharesOwned : 0
          )}
        </select>
        <br />
        <button
          onClick={() =>
            this.props.sell(
              selectedStock.tickerSymbol,
              this.state.numberOfShares
            )
          }
          disabled={
            !this.state.selectedStock || this.state.numberOfShares === 0
          }
        >
          Sell
        </button>
      </div>
    );
  }
}
