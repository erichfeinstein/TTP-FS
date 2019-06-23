import React from 'react';

export default class Purchase extends React.Component {
  constructor() {
    super();
    this.state = {
      tickerSymbol: '',
      numberOfShares: 0,
    };
  }

  render() {
    return (
      <div id="purchase-container">
        <h2>Purchase</h2>
        <div>Ticker Symbol</div>
        <br />
        <input
          placeholder="ex: AAPL"
          className="form-field"
          onChange={evt =>
            this.setState({
              tickerSymbol: evt.target.value,
            })
          }
        />
        <br />
        <div>Number of Shares</div>
        <br />
        <input
          placeholder="ex: 5"
          className="form-field"
          onChange={evt =>
            this.setState({
              numberOfShares: evt.target.value,
            })
          }
        />
        <br />
        <button
          onClick={() =>
            this.props.purchase(
              this.state.tickerSymbol,
              this.state.numberOfShares
            )
          }
        >
          Purchase
        </button>
      </div>
    );
  }
}
